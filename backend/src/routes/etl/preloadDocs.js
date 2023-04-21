import counties from './counties.json' assert {type: 'json'};
import states from './states.json' assert {type: 'json'};
import { normalizeData } from "./normalizeData.js";


export async function preloadDocs() {
    const chunkSize = 10; 
    const fetchChunk = async (countiesChunk) => {
        const promises = countiesChunk.map(async (county) => {
            const lat = county.lat;
            const lng = county.lng;
            const fips_code = county.fips_code;
            const name_1 = county.name;
            const state = parseFIPS(fips_code)[0];
            const countyCode = parseFIPS(fips_code)[1];
            const stateAbbr = states[state];

            const POWERAPI1 = `https://power.larc.nasa.gov/api/temporal/climatology/point?parameters=ALLSKY_SFC_SW_DWN,ALLSKY_SFC_SW_DWN_HR,ALLSKY_SFC_SW_DNI,ALLSKY_SFC_SW_DIFF,ALLSKY_KT,TOA_SW_DWN,CLOUD_AMT,ALLSKY_SFC_PAR_TOT,ALLSKY_SRF_ALB,SI_EF_TILTED_SURFACE,CLRSKY_SFC_SW_DWN&community=RE&longitude=${lng}&latitude=${lat}&format=JSON`;
            const POWERAPI2 = `https://power.larc.nasa.gov/api/temporal/climatology/point?parameters=SG_NOON,SG_HR_SET_ANG,SG_MID_COZ_ZEN_ANG,SG_DEC,SG_DAY_HOURS,SG_HRZ_HR,SG_DAY_COZ_ZEN_AVG,T2M,T2MDEW,T2MWET,TS,FROST_DAYS,QV2M,RH2M,PRECTOTCORR,PRECTOTCORR_SUM&community=RE&longitude=${lng}&latitude=${lat}&format=JSON`;
            const POWERAPI3 = `https://power.larc.nasa.gov/api/temporal/climatology/point?parameters=PS,WS10M,WD50M,WD10M,WS50M,CLOUD_AMT,SOLAR_DEFICITS_CONSEC_MONTH,INSOL_CONSEC_MONTH,MIDDAY_INSOL,EQUIV_NO_SUN_CONSEC_MONTH&community=RE&longitude=${lng}&latitude=${lat}&format=JSON`;
            const censusAPI = `https://api.census.gov/data/2019/acs/acs5?get=NAME,B19013_001E&for=county:${countyCode}&in=state:${state}&key=${process.env.CENSUS_API_KEY}`;

            const newCollection = await normalizeData(stateAbbr, name_1, lat, lng, POWERAPI1, POWERAPI2, POWERAPI3, censusAPI);

            console.log(`Processed: ${name_1}, ${stateAbbr}`);
            return newCollection;
        });

        return await Promise.all(promises);
    };

    const documentList = [];
    for (let i = 10; i < 1000; i += chunkSize) {
        const chunk = counties.slice(i, i + chunkSize);
        const chunkResults = await fetchChunk(chunk);
        documentList.push(...chunkResults);
        console.log(i)
    }

    return documentList;
}

export function parseFIPS(fips_code) {
    fips_code = fips_code.toString();
    let state;
    state = fips_code.substring(0, 2);
    let county;
    county = fips_code.substring(2, 5);
    return [state, county];
}