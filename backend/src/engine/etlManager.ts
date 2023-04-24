import * as EventEmitter from 'events';
import {config} from "../config";
import * as counties from './counties.json'
import * as states from './states.json'
import {newMongoConnection} from "../db";
import * as crypto from "crypto";

if (!counties) {
    Error("Counties not found");
}
if (!states) {
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
    RUN = 'armadillo-slay-run',
    RUN_COMPLETE = 'armadillo-slay-run-complete',
    LOAD_COMPLETE = 'armadillo-slay-load-complete',
    GET_RUN = 'armadillo-slay-get-run',
    RUN_FETCHED = 'armadillo-slay-run-fetched',
}


const countiesMap = new Map(counties.map(county => [county.fips_code, county]));
const statesMap = new Map(Object.entries(states).map(([fips, state]) => [state, fips]));

const POWER_API_URLS = [
    'https://power.larc.nasa.gov/api/temporal/climatology/point?parameters=ALLSKY_SFC_SW_DWN,ALLSKY_SFC_SW_DWN_HR,ALLSKY_SFC_SW_DNI,ALLSKY_SFC_SW_DIFF,ALLSKY_KT,TOA_SW_DWN,ALLSKY_SFC_PAR_TOT,ALLSKY_SRF_ALB,SI_EF_TILTED_SURFACE,CLRSKY_SFC_SW_DWN&community=RE',
    'https://power.larc.nasa.gov/api/temporal/climatology/point?parameters=SG_NOON,SG_HR_SET_ANG,SG_MID_COZ_ZEN_ANG,SG_DEC,SG_DAY_HOURS,SG_HRZ_HR,SG_DAY_COZ_ZEN_AVG,T2M,T2MDEW,T2MWET,TS,FROST_DAYS,QV2M,RH2M,PRECTOTCORR,PRECTOTCORR_SUM&community=RE',
    'https://power.larc.nasa.gov/api/temporal/climatology/point?parameters=PS,WS10M,WD50M,WD10M,WS50M,CLOUD_AMT,SOLAR_DEFICITS_CONSEC_MONTH,INSOL_CONSEC_MONTH,MIDDAY_INSOL,EQUIV_NO_SUN_CONSEC_MONTH&community=RE'
];

/**
 *   const POWERAPI1 = `https://power.larc.nasa.gov/api/temporal/climatology/point?parameters=ALLSKY_SFC_SW_DWN,ALLSKY_SFC_SW_DWN_HR,ALLSKY_SFC_SW_DNI,ALLSKY_SFC_SW_DIFF,ALLSKY_KT,TOA_SW_DWN,CLOUD_AMT,ALLSKY_SFC_PAR_TOT,ALLSKY_SRF_ALB,SI_EF_TILTED_SURFACE,CLRSKY_SFC_SW_DWN&community=RE&longitude=${lng}&latitude=${lat}&format=JSON`;
 *             const POWERAPI2 = `https://power.larc.nasa.gov/api/temporal/climatology/point?parameters=SG_NOON,SG_HR_SET_ANG,SG_MID_COZ_ZEN_ANG,SG_DEC,SG_DAY_HOURS,SG_HRZ_HR,SG_DAY_COZ_ZEN_AVG,T2M,T2MDEW,T2MWET,TS,FROST_DAYS,QV2M,RH2M,PRECTOTCORR,PRECTOTCORR_SUM&community=RE&longitude=${lng}&latitude=${lat}&format=JSON`;
 *             const POWERAPI3 = `https://power.larc.nasa.gov/api/temporal/climatology/point?parameters=PS,WS10M,WD50M,WD10M,WS50M,CLOUD_AMT,SOLAR_DEFICITS_CONSEC_MONTH,INSOL_CONSEC_MONTH,MIDDAY_INSOL,EQUIV_NO_SUN_CONSEC_MONTH&community=RE&longitude=${lng}&latitude=${lat}&format=JSON`;
 *             const censusAPI = `https://api.census.gov/data/2019/acs/acs5?get=NAME,B19013_001E&for=county:${countyCode}&in=state:${state}&key=${process.env.CENSUS_API_KEY}`;
 * @param lng
 * @param lat
 */

async function fetchPowerData(lng, lat): Promise<FeaturesArray> {
    const fetchers = POWER_API_URLS.map(url => fetch(`${url}&longitude=${lng}&latitude=${lat}&format=JSON`).then(response => response.json()));
    const [data1, data2, data3] = await Promise.all(fetchers);
    return [data1, data2, data3];
}

async function fetchCensusData(stateFips, countyFips) {
    console.log("config.CENSUS_API_KEY", config.CENSUS_API_KEY)
    const url = `https://api.census.gov/data/2019/acs/acs5?get=NAME,B19013_001E&for=county:${countyFips}&in=state:${stateFips}&key=${config.CENSUS_API_KEY}`;
    const response = await fetch(url);
    return await response.json();
}


type CensusData = {
    [key: number]: string
}

type RunId = string;

interface Run {
    runId: RunId,
    timestamp: number,
    state: string,
}

class ETLManager extends EventEmitter {
    private runs: Map<RunId, Run> = new Map();


    constructor() {
        super();
        this.on(ETLManagerEvents.ETL_ERROR, (error) => this.handleETLError(error));
        this.on(ETLManagerEvents.START_ETL_JOB, ({state, county}) => this.runETLForStateAndCounty(state, county));
        this.on(ETLManagerEvents.START_ETL_JOB_FOR_ALL_COUNTIES_IN_STATE, ({state}) => this.runETLForAllCountiesInState(state));
        this.on(ETLManagerEvents.DATA_TRANSFORMED, (data) => this.loadTransformedDataToDB(data));
        this.on(ETLManagerEvents.DATA_LOADED, () => this. emitLoadComplete());
        this.on(ETLManagerEvents.RUN,({runId,timestamp})=> this.handleRun(runId,timestamp));
        this.on(ETLManagerEvents.RUN_COMPLETE,({runId,timestamp})=> this.handleRunComplete(runId,timestamp));
        this.on(ETLManagerEvents.GET_RUN,({runId})=> this.handleGetRun(runId));
    }


    async runETLForStateAndCounty(state: string, county: string) {
        const countyEntry = this.getCountyEntry(state, county);
        if (!countyEntry) {
            this.emit(ETLManagerEvents.ETL_ERROR, {error: `County ${county} not found in state ${state}`});
            return;
        }

        const {powerData, censusData} = await this.extractPowerAndCensusData(countyEntry, state);
        this.emit(ETLManagerEvents.POWER_DATA_FETCHED, powerData);
        this.emit(ETLManagerEvents.CENSUS_DATA_FETCHED, censusData);
        const transformed = this.transform(state, county, countyEntry.lat, countyEntry.lng, powerData, censusData);
        this.emit(ETLManagerEvents.DATA_TRANSFORMED, transformed)
    }

    private async extractPowerAndCensusData(countyEntry, state: string) {
        const countyFips = countyEntry.fips_code.toString().substring(2, 5);
        const stateFips = this.getStateFipsCode(state);

        const [powerData, censusData] = await Promise.all([
            fetchPowerData(countyEntry.lng, countyEntry.lat),
            fetchCensusData(stateFips, countyFips)
        ]);

        return {powerData, censusData};
    }

    private transform(state, county, lat, lng, powerData: FeaturesArray, censusData: CensusData) {
        console.log(`Normalized data for ${state} ${county} ${lat} ${lng}`);
        console.log(powerData);
        console.log(censusData);

        // TODO: transform data better
        return {
            state,
            county,
            lat,
            lng,
            powerData,
            censusData
        }
    }

    async loadTransformedDataToDB(data: any) {
        const client = await newMongoConnection()
        const db = client.db(config.ETL_DB_NAME);
        const collection = db.collection(config.ETL_COLLECTION_NAME);
        await collection.insertOne(data);
        this.emit(ETLManagerEvents.DATA_LOADED);
    }

    private getCountyEntry(state, countyName) {
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

    getStateFipsCode(state) {
        const stateFips = statesMap.get(state);
        if (!stateFips) {
            throw new Error(`State ${state} not found`);
        }
        return stateFips;
    }

    startETLJob(state, county) {
        this.emit(ETLManagerEvents.START_ETL_JOB, {state, county});
    }

    async startETLJobForAllCountiesInState(state) {
        this.emit(ETLManagerEvents.START_ETL_JOB_FOR_ALL_COUNTIES_IN_STATE, {state});
    }

    private async runETLForAllCountiesInState(state) {
        function getCountiesForState(state) {
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
            await this.runETLForStateAndCounty(state, county);
        }
    }

    private runETLForAllStates() {
        for (const state of statesMap.keys()) {
            this.runETLForAllCountiesInState(state);
        }
    }

    run(): RunId{
        const runId = crypto.randomUUID()
        const timestamp = new Date().toISOString();
        this.emit(ETLManagerEvents.RUN, {runId,timestamp});
        return runId;
    }
    private handleRun(runId,timestamp){
        this.runETLForAllStates();
        this.emit(ETLManagerEvents.RUN_COMPLETE,{runId,timestamp});
    }

    private emitLoadComplete() {
        this.emit(ETLManagerEvents.LOAD_COMPLETE);
    }

    private handleETLError(error) {
        console.log('ETL Error', error);
    }

    startETLJobAllCounties(state) {
        this.emit(ETLManagerEvents.START_ETL_JOB_FOR_ALL_COUNTIES_IN_STATE, {state});
    }

    private handleRunComplete(runId: any, timestamp: any) {
       console.log(`Run ${runId} completed at ${timestamp}🎉`);
    }

    async getRun(runId: RunId) {
        this.emit(ETLManagerEvents.GET_RUN, {runId});

        return new Promise<Run>((resolve, reject) => {

            this.on(ETLManagerEvents.RUN_FETCHED, (run) => {
                console.log(`Run ${runId} fetched`);
                return resolve(run);
            });

            setTimeout(() => {
                reject(new Error(`Run ${runId} not found`));
            }, 1000);

        });

    }

    handleGetRun(runId: RunId) {
        return this.runs.get(runId);
    }
}
export const etlInstance = new ETLManager()