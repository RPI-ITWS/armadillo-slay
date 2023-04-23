import * as EventEmitter from 'events';
import {config} from "../config";
import * as counties from './counties.json'
import * as states from './states.json'
import {newMongoConnection} from "../db";


if(!counties) {
    Error("Counties not found");
}
if(!states) {
    Error("States not found");
}

enum ETLManagerEvents {
    ETL_ERROR = 'armadillo-slay-etl-error',
    POWER_DATA_FETCHED = 'armadillo-slay-power-data-fetched',
    CENSUS_DATA_FETCHED = 'armadillo-slay-census-data-fetched',
    DATA_TRANSFORMED = 'armadillo-slay-data-normalized',
    START_ETL_JOB = 'armadillo-slay-start-etl-job',
    START_ETL_JOB_FOR_ALL_COUNTIES_IN_STATE = 'armadillo-slay-start-etl-job-for-all-counties-in-state',
    DATA_LOADED = 'armadillo-slay-data-loaded',
    ETL_COMPLETE = 'armadillo-slay-etl-complete',
}


const countiesMap = new Map(counties.map(county => [county.fips_code, county]));
const statesMap = new Map(Object.entries(states).map(([fips, state]) => [state, fips]));

console.log(countiesMap);
console.log(statesMap);


const POWER_API_URLS = [
    'https://power.larc.nasa.gov/api/temporal/climatology/point?parameters=ALLSKY_SFC_SW_DWN,ALLSKY_SFC_SW_DWN_HR,ALLSKY_SFC_SW_DNI,ALLSKY_SFC_SW_DIFF,ALLSKY_KT,TOA_SW_DWN,ALLSKY_SFC_PAR_TOT,ALLSKY_SRF_ALB,SI_EF_TILTED_SURFACE,CLRSKY_SFC_SW_DWN&community=RE',
    'https://power.larc.nasa.gov/api/temporal/climatology/point?parameters=SG_NOON,SG_HR_SET_ANG,SG_MID_COZ_ZEN_ANG,SG_DEC,SG_DAY_HOURS,SG_HRZ_HR,SG_DAY_COZ_ZEN_AVG,T2M,T2MDEW,T2MWET,TS,FROST_DAYS,QV2M,RH2M,PRECTOTCORR,PRECTOTCORR_SUM&community=RE',
    'https://power.larc.nasa.gov/api/temporal/climatology/point?parameters=PS,WS10M,WD50M,WD10M,WS50M,CLOUD_AMT,SOLAR_DEFICITS_CONSEC_MONTH,INSOL_CONSEC_MONTH,MIDDAY_INSOL,EQUIV_NO_SUN_CONSEC_MONTH&community=RE'
];

async function fetchPowerData(lng, lat): Promise<FeaturesArray> {
    const fetchers = POWER_API_URLS.map(url => fetch(`${url}&longitude=${lng}&latitude=${lat}&format=JSON`).then(response => response.json()));
    const [data1, data2, data3] = await Promise.all(fetchers);
    return [data1, data2, data3];
}

async function fetchCensusData(stateFips, countyFips) {
    const url = `https://api.census.gov/data/2019/acs/acs5?get=NAME,B19013_001E&for=county:${countyFips}&in=state:${stateFips}&key=${config.CENSUS_API_KEY}`;
    const response = await fetch(url);
    return await response.json();
}




class ETLManager extends EventEmitter {


    constructor() {
        super();
        this.on(ETLManagerEvents.START_ETL_JOB, ({ state, county }) => this.runETL(state, county));
        this.on(ETLManagerEvents.START_ETL_JOB_FOR_ALL_COUNTIES_IN_STATE, ({ state }) => this.runETLForAllCountiesInState(state));
        this.on(ETLManagerEvents.DATA_TRANSFORMED, (data) => this.load(data));
        this.on(ETLManagerEvents.DATA_LOADED, () => this.emitETLComplete());
        this.on(ETLManagerEvents.ETL_ERROR, (error) => this.handleETLError(error));
    }


    async runETL(state: string, county: string) {
        console.log("runETL", state, county);

        const countyEntry = this.getCountyEntry(state, county);
        if (!countyEntry) {
            this.emit(ETLManagerEvents.ETL_ERROR, {error: `County ${county} not found in state ${state}`});
            return;
        }

        const {powerData, censusData} = await this.extract(countyEntry, state);
        this.emit(ETLManagerEvents.POWER_DATA_FETCHED, powerData);
        this.emit(ETLManagerEvents.CENSUS_DATA_FETCHED, censusData);

        const transformed = this.transform(state, county, countyEntry.lat, countyEntry.lng, powerData, censusData);
        this.emit(ETLManagerEvents.DATA_TRANSFORMED, transformed)
    }

    private async extract(countyEntry, state: string) {
        const countyFips = countyEntry.fips_code.toString().substring(2, 5);
        const stateFips = this.getStateFips(state);

        const [powerData, censusData] = await Promise.all([
            fetchPowerData(countyEntry.lng, countyEntry.lat),
            fetchCensusData(stateFips, countyFips)
        ]);

        return {powerData, censusData};
    }

    async load(data: any) {
        console.log('load', data);

        const client = await newMongoConnection()
        const db = client.db(config.ETL_DB_NAME);
        const collection = db.collection(config.ETL_COLLECTION_NAME);
        await collection.insertOne(data);
        this.emit(ETLManagerEvents.DATA_LOADED);
    }

    transform(state, county, lat, lng, powerData, censusData) {

        console.log(`Normalized data for ${state} ${county} ${lat} ${lng}`);
        console.log(powerData);
        console.log(censusData);

        return {
            state,
            county,
            lat,
            lng,
        }
    }

    getCountyEntry(state, countyName) {
        const stateFips = statesMap.get(state);
        if (!stateFips) {
            console.log(`State ${state} not found`);
            return;
        }

        const [entry] = [...countiesMap.values()]
            .filter(county => county.name === countyName && county.fips_code.toString().startsWith(stateFips))
            .map(county => county);

        if (!entry) {
            throw new Error(`County ${countyName} not found in state ${state}`);
        }

        return entry;
    }

    getStateFips(state) {
        console.debug("getStateFips", state);
        const stateFips = statesMap.get(state);
        if (!stateFips) {
            throw new Error(`State ${state} not found`);
        }
        return stateFips;
    }

    async startETLJob(state, county) {
        this.emit(ETLManagerEvents.START_ETL_JOB, { state, county });
    }

    async startETLJobForAllCountiesInState(state) {
        this.emit(ETLManagerEvents.START_ETL_JOB_FOR_ALL_COUNTIES_IN_STATE, { state });
    }

    async runETLForAllCountiesInState(state) {
        function getCountiesForState(state) {
            console.debug("getCountiesForState", state);
            const stateFips = statesMap.get(state);
            if (!stateFips) {
                console.log(`State ${state} not found`);
                return;
            }

            return [...countiesMap.values()]
                .filter(county => county.fips_code.toString().startsWith(stateFips))
                .map(county => county.name);

        }

        const counties = getCountiesForState(state);
        for (const county of counties) {
            await this.runETL(state, county);
        }
    }

    private emitETLComplete() {
        this.emit(ETLManagerEvents.ETL_COMPLETE);
    }

    private handleETLError(error) {
        console.log('ETL Error', error);
    }

    startETLJobAllCounties(state) {
        this.emit(ETLManagerEvents.START_ETL_JOB_FOR_ALL_COUNTIES_IN_STATE, { state });
    }
}

export const etlInstance = new ETLManager()

