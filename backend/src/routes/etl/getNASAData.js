import * as counties from './counties.json' assert {type: 'json'};
import * as states from './states.json' assert {type: 'json'};
import { config } from "../../config";
import { normalizeData } from "./normalizeData.js";

if(!counties) {
    Error("Counties not found");
}
if(!states) {
    Error("States not found");
}
export const statesMap = new Map(Object.entries(states));
export const countiesMap = new Map(counties.map(county => [county.fips_code, county]));



export async function getNASAData(state, county) {
    let stateFips;
    for (const [fips, stateAbbr] of statesMap) {
        if (stateAbbr === state) {
            stateFips = fips;
            break;
        }
    }
    let countyEntry;
    for (const [fips, entry] of countiesMap) {
        let fipsString = entry.fips_code.toString();
        if (entry.name === county && fipsString.substring(0, 2) === stateFips) {
            countyEntry = entry;
            break;
        }
    }
    if (!countyEntry) {
        console.log(`County ${county} not found in state ${state}`);
        return;
    }

    let countyFips = countyEntry.fips_code;
    countyFips = countyFips.toString();
    countyFips = countyFips.substring(2, 5);
    let lat = countyEntry.lat;
    let lng = countyEntry.lng;

    let POWERAPI1 = "https://power.larc.nasa.gov/api/temporal/climatology/point?parameters=ALLSKY_SFC_SW_DWN,ALLSKY_SFC_SW_DWN_HR,ALLSKY_SFC_SW_DNI,ALLSKY_SFC_SW_DIFF,ALLSKY_KT,TOA_SW_DWN,ALLSKY_SFC_PAR_TOT,ALLSKY_SRF_ALB,SI_EF_TILTED_SURFACE,CLRSKY_SFC_SW_DWN&community=RE&longitude=" + lng + "&latitude=" + lat + "&format=JSON";
    let POWERAPI2 = "https://power.larc.nasa.gov/api/temporal/climatology/point?parameters=SG_NOON,SG_HR_SET_ANG,SG_MID_COZ_ZEN_ANG,SG_DEC,SG_DAY_HOURS,SG_HRZ_HR,SG_DAY_COZ_ZEN_AVG,T2M,T2MDEW,T2MWET,TS,FROST_DAYS,QV2M,RH2M,PRECTOTCORR,PRECTOTCORR_SUM&community=RE&longitude=" + lng + "&latitude=" + lat + "&format=JSON";
    let POWERAPI3 = "https://power.larc.nasa.gov/api/temporal/climatology/point?parameters=PS,WS10M,WD50M,WD10M,WS50M,CLOUD_AMT,SOLAR_DEFICITS_CONSEC_MONTH,INSOL_CONSEC_MONTH,MIDDAY_INSOL,EQUIV_NO_SUN_CONSEC_MONTH&community=RE&longitude=" + lng + "&latitude=" + lat + "&format=JSON";
    let censusAPI = "https://api.census.gov/data/2019/acs/acs5?get=NAME,B19013_001E&for=county:" + countyFips + "&in=state:" + stateFips + "&key=" + config.CENSUS_API_KEY;

    let newCollection;
    try {
        newCollection = await normalizeData(state, county, lat, lng, POWERAPI1, POWERAPI2, POWERAPI3, censusAPI);
    } catch (e) {
        console.log(e);
        return;
    }
    return newCollection;
}
