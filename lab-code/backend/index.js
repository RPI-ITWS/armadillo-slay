const counties = require('./fips-long-lat.json');
const states = require('./fips-states.json');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const express = require('express');
const app = express();
const statesMap = new Map(Object.entries(states));
const countiesMap = new Map(counties.map(county => [county.fips_code, county]));

// async function preloadDocs() {
//     await client.connect();
//     const db = client.db("Lab6");
//     const collection = db.collection("NASA Data");
//     console.log("Connected to MongoDB");
//     for (let i = 100; i < 301; i++) {

//         let lat = parseFloat(counties[i].lat);

//         let lng = parseFloat(counties[i].lng);

//         let fips_code = counties[i].fips_code;

//         let name_1 = counties[i].name;

//         let state = parseFIPS(fips_code)[0];

//         let county = parseFIPS(fips_code)[1];

//         let stateAbbr = states[state];

//         let POWERAPI = "https://power.larc.nasa.gov/api/temporal/climatology/point?parameters=PS,WS10M,WS10M_MAX,WS10M_MIN,WS10M_RANGE,WS50M,WD10M,WS50M_MAX,WS50M_MIN,WS50M_RANGE,WD50M&community=RE&longitude=" + lng + "&latitude=" + lat + "&format=JSON";

//         let censusAPI = "https://api.census.gov/data/2019/acs/acs5?get=NAME,B19013_001E&for=county:" + county + "&in=state:" + state + "&key=" + process.env.CENSUS_API_KEY;

//         let eiaAPI = "https://api.eia.gov/v2/electricity/state-electricity-profiles/summary/data/?frequency=annual&data[0]=average-retail-price&data[1]=capacity-ipp&data[2]=carbon-dioxide-lbs&data[3]=direct-use&data[4]=generation-elect-utils&facets[stateID][]=" + stateAbbr + "&sort[0][column]=period&sort[0][direction]=desc&offset=0&length=5000&api_key=" + process.env.EIA_API_KEY;

//         let newCollection = await normalizeData(name_1, stateAbbr, POWERAPI, censusAPI, eiaAPI);
//         await collection.insertOne(newCollection);
//     }
// }

// preloadDocs();

async function addData(county, state) {
    const db = client.db("Lab6");
    const collection = db.collection("NASA Data");
    console.log("Connected to MongoDB");
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
    } else {
        let countyFips = countyEntry.fips_code;
        countyFips = countyFips.toString();
        countyFips = countyFips.substring(2, 5);
        let lat = countyEntry.lat;
        let lng = countyEntry.lng;

        console.log( countyFips, stateFips, lat, lng);

        let POWERAPI = "https://power.larc.nasa.gov/api/temporal/climatology/point?parameters=PS,WS10M,WS10M_MAX,WS10M_MIN,WS10M_RANGE,WS50M,WD10M,WS50M_MAX,WS50M_MIN,WS50M_RANGE,WD50M&community=RE&longitude=" + lng + "&latitude=" + lat + "&format=JSON";

        let censusAPI = "https://api.census.gov/data/2019/acs/acs5?get=NAME,B19013_001E&for=county:" + countyFips + "&in=state:" + stateFips + "&key=" + process.env.CENSUS_API_KEY;

        let eiaAPI = "https://api.eia.gov/v2/electricity/state-electricity-profiles/summary/data/?frequency=annual&data[0]=average-retail-price&data[1]=capacity-ipp&data[2]=carbon-dioxide-lbs&data[3]=direct-use&data[4]=generation-elect-utils&facets[stateID][]=" + state + "&sort[0][column]=period&sort[0][direction]=desc&offset=0&length=5000&api_key=" + process.env.EIA_API_KEY;

        let newCollection = await normalizeData(county, state, POWERAPI, censusAPI, eiaAPI);

        await collection.insertOne(newCollection);
    }
}

// function parseFIPS(fips_code) {
//     fips_code = fips_code.toString();
//     let state;
//     state = fips_code.substring(0, 2);
//     let county;
//     county = fips_code.substring(2, 5);
//     return [state, county];
// }

async function normalizeData(county, state, POWERAPI, censusAPI, eiaAPI) {
    let collection = {
        county: county,
        state: state,
        monthlyData: [],
        householdIncome: 0,
        stateStats: []
    };

    const [powerData, censusData, electricData] = await Promise.all([fetch(POWERAPI), fetch(censusAPI), fetch(eiaAPI)]);

    const [powerJson, censusJson, electricJson] = await Promise.all([powerData.json(), censusData.json(), electricData.json()]);

    let parameterArray;
    parameterArray = ["PS", "WD10M", "WD50M", "WS10M", "WS50M", "WS10M_MAX", "WS10M_MIN", "WS50M_MAX", "WS50M_MIN", "WS10M_RANGE", "WS50M_RANGE"];
    let monthArray;
    monthArray = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC", "ANN"];
    for (let i = 0; i < parameterArray.length; i++) {
        let parameter = {
            parameter: parameterArray[i],
            monthlyData: []
        };
        for (let j = 0; j < monthArray.length; j++) {
            let monthlyData = {
                month: monthArray[j],
                value: powerJson.properties.parameter[parameterArray[i]][monthArray[j]]
            };
            parameter.monthlyData.push(monthlyData);
        }
        collection.monthlyData.push(parameter);
    }
    collection.householdIncome = censusJson[1][1];
    for (let i = 0; i < electricJson.response.data.length; i++) {
        let stateStats = void 0;
        stateStats = {
            year: electricJson.response.data[i].period,
            averageRetailPrice: electricJson.response.data[i]["average-retail-price"],
            capacityIPP: electricJson.response.data[i]["capacity-ipp"],
            carbonDioxideLbs: electricJson.response.data[i]["carbon-dioxide-lbs"],
            directUse: electricJson.response.data[i]["direct-use"],
            generationElectUtils: electricJson.response.data[i]["generation-elect-utils"]
        };
        collection.stateStats.push(stateStats);
    }
    return collection;
}

app.get('/:state/:county', async (req, res) => {
    let state = req.params["state"];
    let county = req.params["county"];
    const db = client.db("Lab6");
    const collection = db.collection("NASA Data");
    const query = { county: county, state: state };
    const data = await collection.find(query).toArray();
    if (data.length == 0) {
        json = {
            error: "No data found"
        };
        res.json(json);
    }
    else {
        res.json(data);
    }
});

app.post('/:state/:county', async (req, res) => {
    let state = req.params["state"];
    let county = req.params["county"];
    const db = client.db("Lab6");
    const collection = db.collection("NASA Data");
    const query = { county: county, state: state };
    const data = await collection.find(query).toArray();
    if (data.length == 0) {
        addData(county, state);
        json = {
            success: "Data added"
        };
        res.json(json);
    }
    else {
        json = {
            error: "Data already exists"
        };
        res.json(json);
    }
});

app.delete('/:state/:county', async (req, res) => {
    let state = req.params["state"];
    let county = req.params["county"];
    const db = client.db("Lab6");
    const collection = db.collection("NASA Data");
    const query = { county: county, state: state };
    const data = await collection.find(query).toArray();
    if (data.length == 0) {
        json = {
            error: "No data to delete"
        };
        res.json(json);
    }
    else {
        const result = await collection.deleteOne(query);
        json = {
            success: "Data deleted"
        };
        res.json(json);
    }
});

app.put('/:state/:county', async (req, res) => {
    let state = req.params["state"];
    let county = req.params["county"];
    const db = client.db("Lab6");
    const collection = db.collection("NASA Data");
    const query = { county: county, state: state };
    const data = await collection.find(query).toArray();
    if (data.length == 0) {
        json = {
            error: "No data to update"
        };
        res.json(json);
    }
    else {
        const result = await collection.deleteOne(query);
        addData(county, state);
        json = {
            success: "Data updated"
        };
        res.json(json);
    }
});

app.listen(3000, async () => {
    console.log("Server running on port 3000");
    await client.connect();
    console.log("Connected to MongoDB");
});


process.on('SIGINT', () => {
    console.log("Closing MongoDB connection");
    console.log("Closing server");
    client.close();
    process.exit();
});