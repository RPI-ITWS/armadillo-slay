import counties from './counties.json' assert {type: 'json'};
import states from './states.json' assert {type: 'json'};
import {newMongoConnection} from '../../db/index.js';
import {Router} from "express";
import {config} from "../../config/index.js";

const statesMap = new Map(Object.entries(states));
const countiesMap = new Map(counties.map(county => [county.fips_code, county]));

const router = Router();

export async function preloadDocs() {
    let documentList = [];
    for (let i = 0; i < 101; i++) {

        let lat = counties[i]['lat'];

        let lng = counties[i]['lng'];

        let fips_code = counties[i].fips_code;

        let name_1 = counties[i].name;

        let state = parseFIPS(fips_code)[0];

        let county = parseFIPS(fips_code)[1];

        let stateAbbr = states[state];

        let POWERAPI1 = "https://power.larc.nasa.gov/api/temporal/climatology/point?parameters=ALLSKY_SFC_SW_DWN,ALLSKY_SFC_SW_DWN_HR,ALLSKY_SFC_SW_DNI,ALLSKY_SFC_SW_DIFF,ALLSKY_KT,TOA_SW_DWN,CLOUD_AMT,ALLSKY_SFC_PAR_TOT,ALLSKY_SRF_ALB,SI_EF_TILTED_SURFACE,CLRSKY_SFC_SW_DWN&community=RE&longitude=" + lng + "&latitude=" + lat + "&format=JSON";

        let POWERAPI2 = "https://power.larc.nasa.gov/api/temporal/climatology/point?parameters=SG_NOON,SG_HR_SET_ANG,SG_MID_COZ_ZEN_ANG,SG_DEC,SG_DAY_HOURS,SG_HRZ_HR,SG_DAY_COZ_ZEN_AVG,T2M,T2MDEW,T2MWET,TS,FROST_DAYS,QV2M,RH2M,PRECTOTCORR,PRECTOTCORR_SUM&community=RE&longitude=" + lng + "&latitude=" + lat + "&format=JSON";

        let POWERAPI3 = "https://power.larc.nasa.gov/api/temporal/climatology/point?parameters=PS,WS10M,WD50M,WD10M,WS50M,CLOUD_AMT,SOLAR_DEFICITS_CONSEC_MONTH,INSOL_CONSEC_MONTH,MIDDAY_INSOL,EQUIV_NO_SUN_CONSEC_MONTH&community=RE&longitude=" + lng + "&latitude=" + lat + "&format=JSON";

        let censusAPI = "https://api.census.gov/data/2019/acs/acs5?get=NAME,B19013_001E&for=county:" + county + "&in=state:" + state + "&key=" + process.env.CENSUS_API_KEY;

        let eiaAPI = "https://api.eia.gov/v2/electricity/state-electricity-profiles/summary/data/?frequency=annual&data[0]=average-retail-price&data[1]=capacity-ipp&data[2]=carbon-dioxide-lbs&data[3]=direct-use&data[4]=generation-elect-utils&facets[stateID][]=" + stateAbbr + "&sort[0][column]=period&sort[0][direction]=desc&offset=0&length=5000&api_key=" + process.env.EIA_API_KEY;

        let newCollection = await normalizeData(stateAbbr, name_1, lat, lng, POWERAPI1, POWERAPI2, POWERAPI3, censusAPI, eiaAPI);

        documentList.push(newCollection);
    }

    return documentList;
}

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

    console.log(countyFips, stateFips, lat, lng, config.CENSUS_API_KEY, config.EIA_API_KEY);

    let POWERAPI1 = "https://power.larc.nasa.gov/api/temporal/climatology/point?parameters=ALLSKY_SFC_SW_DWN,ALLSKY_SFC_SW_DWN_HR,ALLSKY_SFC_SW_DNI,ALLSKY_SFC_SW_DIFF,ALLSKY_KT,TOA_SW_DWN,ALLSKY_SFC_PAR_TOT,ALLSKY_SRF_ALB,SI_EF_TILTED_SURFACE,CLRSKY_SFC_SW_DWN&community=RE&longitude=" + lng + "&latitude=" + lat + "&format=JSON";
    let POWERAPI2 = "https://power.larc.nasa.gov/api/temporal/climatology/point?parameters=SG_NOON,SG_HR_SET_ANG,SG_MID_COZ_ZEN_ANG,SG_DEC,SG_DAY_HOURS,SG_HRZ_HR,SG_DAY_COZ_ZEN_AVG,T2M,T2MDEW,T2MWET,TS,FROST_DAYS,QV2M,RH2M,PRECTOTCORR,PRECTOTCORR_SUM&community=RE&longitude=" + lng + "&latitude=" + lat + "&format=JSON";
    let POWERAPI3 = "https://power.larc.nasa.gov/api/temporal/climatology/point?parameters=PS,WS10M,WD50M,WD10M,WS50M,CLOUD_AMT,SOLAR_DEFICITS_CONSEC_MONTH,INSOL_CONSEC_MONTH,MIDDAY_INSOL,EQUIV_NO_SUN_CONSEC_MONTH&community=RE&longitude=" + lng + "&latitude=" + lat + "&format=JSON";
    let censusAPI = "https://api.census.gov/data/2019/acs/acs5?get=NAME,B19013_001E&for=county:" + countyFips + "&in=state:" + stateFips + "&key=" + config.CENSUS_API_KEY;
    let eiaAPI = "https://api.eia.gov/v2/electricity/state-electricity-profiles/summary/data/?frequency=annual&data[0]=average-retail-price&data[1]=capacity-ipp&data[2]=carbon-dioxide-lbs&data[3]=direct-use&data[4]=generation-elect-utils&facets[stateID][]=" + state + "&sort[0][column]=period&sort[0][direction]=desc&offset=0&length=5000&api_key=" + process.env.EIA_API_KEY;

    let newCollection;
    try {
        newCollection = await normalizeData(county, state, POWERAPI1, POWERAPI2, POWERAPI3, censusAPI, eiaAPI);
    } catch (e) {
        console.log(e);
        return
    }
    return newCollection;
}

export function parseFIPS(fips_code) {
    fips_code = fips_code.toString();
    let state;
    state = fips_code.substring(0, 2);
    let county;
    county = fips_code.substring(2, 5);
    return [state, county];
}

export async function normalizeData(state, county, lat, lng, POWERAPI1, POWERAPI2, POWERAPI3, censusAPI, eiaAPI) {

    let collection = {
        county: county,
        state: state,
        lat: lat,
        long: lng,
        NASA_power_data: {},
        household_income: 0,
        EIA_data: [],
        solar_rank: 0,
        wind_rank: 0,
        hydro_rank: 0
    };


    let powerData1, powerData2, powerData3, censusData, electricData;
    try {
        // eslint-disable-next-line no-undef
        [powerData1, powerData2, powerData3, censusData, electricData] = await Promise.all([fetch(POWERAPI1), fetch(POWERAPI2), fetch(POWERAPI3), fetch(censusAPI), fetch(eiaAPI)]);
    } catch (e) {
        console.log(e);
        return;
    }

    let powerJson1, powerJson2, powerJson3, censusJson, electricJson;
    try {
        [powerJson1, powerJson2, powerJson3, censusJson, electricJson] = await Promise.all([powerData1.json(), powerData2.json(), powerData3.json(), censusData.json(), electricData.json()]);
    } catch (e) {

        console.log(e);
        return;
    }

    let powerParams1 = Object.keys(powerJson1.properties.parameter);
    let powerParams2 = Object.keys(powerJson2.properties.parameter);
    let powerParams3 = Object.keys(powerJson3.properties.parameter);

    let powerParams = powerParams1.concat(powerParams2, powerParams3);

    let powerJson = {...powerJson1.properties.parameter, ...powerJson2.properties.parameter, ...powerJson3.properties.parameter};

    let powerJsonParams = {...powerJson1.parameters, ...powerJson2.parameters, ...powerJson3.parameters};

    powerParams.map((param) => {
        collection.NASA_power_data[param] = powerJson[param];
        collection.NASA_power_data[param].units = powerJsonParams[param].units;
        collection.NASA_power_data[param].longname = powerJsonParams[param].longname;
    });

    let solar_rank = 2 + (powerJson["ALLSKY_KT"] && powerJson["ALLSKY_KT"]["ANN"] > 0.5 ? 1 : 0) +
        (powerJson["CLOUD_AMT"] && powerJson["CLOUD_AMT"]["ANN"] > 60 ? 1 : 0) +
        (powerJson["TOA_SW_DWN"] && powerJson["TOA_SW_DWN"]["ANN"] > 3.5 ? 1 : 0) +
        (powerJson["MIDDAY_INSOL"] && powerJson["MIDDAY_INSOL"]["ANN"] > 6 ? 1 : 0) +
        (powerJson["ALLSKY_SRF_ALB"] && powerJson["ALLSKY_SRF_ALB"]["ANN"] > 0.4 ? 1 : 0) +
        (powerJson["ALLSKY_SFC_SW_DNI"] && powerJson["ALLSKY_SFC_SW_DNI"]["ANN"] > 3.5 ? 1 : 0) +
        (powerJson["ALLSKY_SFC_SW_DWN"] && powerJson["ALLSKY_SFC_SW_DWN"]["ANN"] > 3.5 ? 1 : 0) +
        (powerJson["CLRSKY_SFC_SW_DWN"] && powerJson["CLRSKY_SFC_SW_DWN"]["ANN"] > 3.5 ? 1 : 0) +
        (powerJson["ALLSKY_SFC_PAR_TOT"] && powerJson["ALLSKY_SFC_PAR_TOT"]["ANN"] > 300 ? 1 : 0) +
        (powerJson["ALLSKY_SFC_SW_DIFF"] && powerJson["ALLSKY_SFC_SW_DIFF"]["ANN"] > 3.5 ? 1 : 0) +
        (powerJson["ALLSKY_SFC_SW_DWN_00"] && powerJson["ALLSKY_SFC_SW_DWN_00"]["ANN"] > 3.5 ? 1 : 0) +
        (powerJson["ALLSKY_SFC_SW_DWN_01"] && powerJson["ALLSKY_SFC_SW_DWN_01"]["ANN"] > 3.5 ? 1 : 0) +
        (powerJson["ALLSKY_SFC_SW_DWN_02"] && powerJson["ALLSKY_SFC_SW_DWN_02"]["ANN"] > 3.5 ? 1 : 0) +
        (powerJson["ALLSKY_SFC_SW_DWN_03"] && powerJson["ALLSKY_SFC_SW_DWN_03"]["ANN"] > 3.5 ? 1 : 0) +
        (powerJson["ALLSKY_SFC_SW_DWN_04"] && powerJson["ALLSKY_SFC_SW_DWN_04"]["ANN"] > 3.5 ? 1 : 0) +
        (powerJson["ALLSKY_SFC_SW_DWN_05"] && powerJson["ALLSKY_SFC_SW_DWN_05"]["ANN"] > 3.5 ? 1 : 0) +
        (powerJson["TS"] && powerJson["TS"]["ANN"] > -15 && powerJson["TS"]["ANN"] < -12 ? 1 : 0) +
        (powerJson["FROST_DAYS"] && powerJson["FROST_DAYS"]["ANN"] < 101 ? 1 : 0);

    let wind_rank = 2 + (powerJson["ALLSKY_KT"] && powerJson["ALLSKY_KT"]["ANN"] > 0.5 ? 1 : 0) +
        (powerJson["CLOUD_AMT"] && powerJson["CLOUD_AMT"]["ANN"] > 60 ? 1 : 0) +
        (powerJson["TOA_SW_DWN"] && powerJson["TOA_SW_DWN"]["ANN"] > 3.5 ? 1 : 0) +
        (powerJson["MIDDAY_INSOL"] && powerJson["MIDDAY_INSOL"]["ANN"] > 6 ? 1 : 0) +
        (powerJson["ALLSKY_SRF_ALB"] && powerJson["ALLSKY_SRF_ALB"]["ANN"] > 0.4 ? 1 : 0) +
        (powerJson["TS"] && powerJson["TS"]["ANN"] > -15 && powerJson["TS"]["ANN"] < -12 ? 1 : 0) +
        (powerJson["T2M"] && powerJson["T2M"]["ANN"] > -15 && powerJson["T2M"]["ANN"] < -12 ? 1 : 0) +
        (powerJson["QV2M"] && powerJson["QV2M"]["ANN"] < 4.3 ? 1 : 0) +
        (powerJson["RH2M"] && powerJson["RH2M"]["ANN"] < 4.3 ? 1 : 0) +
        (powerJson["T2MDEW"] && powerJson["T2MDEW"]["ANN"] > -10 && powerJson["T2MDEW"]["ANN"] < -3 ? 1 : 0) +
        (powerJson["T2MWET"] && powerJson["T2MWET"]["ANN"] > -10 && powerJson["T2MWET"]["ANN"] < -3 ? 1 : 0) +
        (powerJson["FROST_DAYS"] && powerJson["FROST_DAYS"]["ANN"] < 101 ? 1 : 0) +
        (powerJson["PRECTOTCORR"] && powerJson["PRECTOTCORR"]["ANN"] < 0.5 ? 1 : 0) +
        (powerJson["PS"] && powerJson["PS"]["ANN"] > 100 ? 1 : 0) +
        (powerJson["WD10M"] && powerJson["WD10M"]["ANN"] > 180 && powerJson["WD10M"]["ANN"] < 270 ? 1 : 0) +
        (powerJson["WD50M"] && powerJson["WD50M"]["ANN"] > 180 && powerJson["WD50M"]["ANN"] < 270 ? 1 : 0) +
        (powerJson["WS10M"] && powerJson["WS10M"]["ANN"] > 180 && powerJson["WS10M"]["ANN"] < 270 ? 1 : 0) +
        (powerJson["WS50M"] && powerJson["WS50M"]["ANN"] > 180 && powerJson["WS50M"]["ANN"] < 270 ? 1 : 0);

    let hydro_rank = (powerJson["ALLSKY_KT"] && powerJson["ALLSKY_KT"]["ANN"] > 0.5 ? 1 : 0) +
        (powerJson["CLOUD_AMT"] && powerJson["CLOUD_AMT"]["ANN"] < 60 ? 1 : 0) +
        (powerJson["TOA_SW_DWN"] && powerJson["TOA_SW_DWN"]["ANN"] > 3.5 ? 1 : 0) +
        (powerJson["MIDDAY_INSOL"] && powerJson["MIDDAY_INSOL"]["ANN"] > 6 ? 1 : 0) +
        (powerJson["ALLSKY_SRF_ALB"] && powerJson["ALLSKY_SRF_ALB"]["ANN"] > 0.4 ? 1 : 0) +
        (powerJson["ALLSKY_SFC_SW_DNI"] && powerJson["ALLSKY_SFC_SW_DNI"]["ANN"] > 3.5 ? 1 : 0) +
        (powerJson["ALLSKY_SFC_SW_DWN"] && powerJson["ALLSKY_SFC_SW_DWN"]["ANN"] > 3.5 ? 1 : 0) +
        (powerJson["CLRSKY_SFC_SW_DWN"] && powerJson["CLRSKY_SFC_SW_DWN"]["ANN"] > 3.5 ? 1 : 0) +
        (powerJson["ALLSKY_SFC_PAR_TOT"] && powerJson["ALLSKY_SFC_PAR_TOT"]["ANN"] > 300 ? 1 : 0) +
        (powerJson["ALLSKY_SFC_SW_DIFF"] && powerJson["ALLSKY_SFC_SW_DIFF"]["ANN"] > 3.5 ? 1 : 0) +
        (powerJson["TS"] && powerJson["TS"]["ANN"] > -15 && powerJson["TS"]["ANN"] < -12 ? 1 : 0) +
        (powerJson["T2M"] && powerJson["T2M"]["ANN"] > -15 && powerJson["T2M"]["ANN"] < -12 ? 1 : 0) +
        (powerJson["QV2M"] && powerJson["QV2M"]["ANN"] < 4.3 ? 1 : 0) +
        (powerJson["RH2M"] && powerJson["RH2M"]["ANN"] < 4.3 ? 1 : 0) +
        (powerJson["T2MDEW"] && powerJson["T2MDEW"]["ANN"] > -10 && powerJson["T2MDEW"]["ANN"] < -3 ? 1 : 0) +
        (powerJson["T2MWET"] && powerJson["T2MWET"]["ANN"] > -10 && powerJson["T2MWET"]["ANN"] < -3 ? 1 : 0) +
        (powerJson["FROST_DAYS"] && powerJson["FROST_DAYS"]["ANN"] < 101 ? 1 : 0) +
        (powerJson["PRECTOTCORR"] && powerJson["PRECTOTCORR"]["ANN"] < 0.5 ? 1 : 0);

    console.log("solar_rank: " + solar_rank);
    console.log("wind_rank: " + wind_rank);
    console.log("hydro_rank: " + hydro_rank);
    console.log("county: " + county);
    console.log("state: " + state);
    collection.household_income = censusJson[1][1];
    for (let i = 0; i < electricJson.response.data.length; i++) {
        let stateStats = {
            YEAR: electricJson.response.data[i].period,
            AVERAGE_RETAIL_PRICE: electricJson.response.data[i]["average-retail-price"],
            CAPACITY_IPP: electricJson.response.data[i]["capacity-ipp"],
            CARBON_DIOXIDE_LBS: electricJson.response.data[i]["carbon-dioxide-lbs"],
            DIRECT_USE: electricJson.response.data[i]["direct-use"],
            GENERATION_ELECT_UTILS: electricJson.response.data[i]["generation-elect-utils"]
        };
        collection.EIA_data.push(stateStats);
    }
    return collection;
}


router.get("/debug", async (req, res) => {
    const client = await newMongoConnection()
    const db = client.db("Lab6");
    const collection = db.collection("NASA Data");
    const data = await collection.find({}).toArray();
    res.json(data);
})

router.get("/debug/:state/:county", async (req, res) => {
    const client = await newMongoConnection()
    const db = client.db("Lab6");
    const collection = db.collection("NASA Data");
    const data = await collection.find({state: req.params["state"], county: req.params["county"]}).toArray();
    res.json(data);
});

router.get('/debug/preload-docs', async (req, res) => {
    const client = await newMongoConnection()
    const db = client.db("Lab6");
    const collection = db.collection("NASA Data");
    let data = await preloadDocs()
    await collection.insertMany(data);
    res.json({success: "Data loaded"});
})

router.get('/debug/add-data/:state/:county', async (req, res) => {

    console.log("state: " + req.params["state"]);
    console.log("county: " + req.params["county"]);

    const client = await newMongoConnection()
    const db = client.db(config.ETL_DB_NAME);
    const collection = db.collection(config.ETL_COLLECTION_NAME);
    let nasaData;
    try {
        nasaData = await getNASAData(req.params["state"], req.params["county"]);
    } catch (e) {
        console.log(e);
    }

    if (!nasaData) {
        return res.json({error: "Error getting data"});
    }
    let _id = Math.random().toString(36).substring(2, 15)
    let dbResponse = await collection.insertOne({_id, ...nasaData});
    if (!dbResponse) {
        return res.json({error: "Error inserting data"});
    }
    return res.json({success: "Data loaded"});
});


export default router;