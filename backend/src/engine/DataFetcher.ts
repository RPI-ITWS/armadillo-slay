import {config} from "../config";
import {statesMap} from "./countiesAndStates";



class DataFetcher {
    private POWER_API_URLS = [
        'https://power.larc.nasa.gov/api/temporal/climatology/point?parameters=ALLSKY_SFC_SW_DWN,ALLSKY_SFC_SW_DWN_HR,ALLSKY_SFC_SW_DNI,ALLSKY_SFC_SW_DIFF,ALLSKY_KT,TOA_SW_DWN,ALLSKY_SFC_PAR_TOT,ALLSKY_SRF_ALB,SI_EF_TILTED_SURFACE,CLRSKY_SFC_SW_DWN&community=RE',
        'https://power.larc.nasa.gov/api/temporal/climatology/point?parameters=SG_NOON,SG_HR_SET_ANG,SG_MID_COZ_ZEN_ANG,SG_DEC,SG_DAY_HOURS,SG_HRZ_HR,SG_DAY_COZ_ZEN_AVG,T2M,T2MDEW,T2MWET,TS,FROST_DAYS,QV2M,RH2M,PRECTOTCORR,PRECTOTCORR_SUM&community=RE',
        'https://power.larc.nasa.gov/api/temporal/climatology/point?parameters=PS,WS10M,WD50M,WD10M,WS50M,CLOUD_AMT,SOLAR_DEFICITS_CONSEC_MONTH,INSOL_CONSEC_MONTH,MIDDAY_INSOL,EQUIV_NO_SUN_CONSEC_MONTH&community=RE'
    ];

    async fetchPowerData(lng, lat): Promise<FeaturesArray> {
        const fetchers = this.POWER_API_URLS.map(url => fetch(`${url}&longitude=${lng}&latitude=${lat}&format=JSON`).then(response => response.json()));
        const [data1, data2, data3] = await Promise.all(fetchers);
        return [data1, data2, data3];
    }

    async fetchCensusData(stateFips, countyFips) {
        const url = `https://api.census.gov/data/2019/acs/acs5?get=NAME,B19013_001E&for=county:${countyFips}&in=state:${stateFips}&key=${config.CENSUS_API_KEY}`;
        const response = await fetch(url);
        return await response.json();
    }

    async fetchPowerAndCensusData(countyEntry, state: string) {
        const countyFips = countyEntry.fips_code.toString().substring(2, 5);
        const stateFips = statesMap.get(state);

        try{
            const [powerData, censusData] = await Promise.all([
                this.fetchPowerData(countyEntry.lng, countyEntry.lat),
                this.fetchCensusData(stateFips, countyFips)
            ]);

            return { powerData, censusData };
        }catch (e) {
            console.error("Error fetching data", e.message);
            throw e;
        }

    }

}
export{
    DataFetcher
}