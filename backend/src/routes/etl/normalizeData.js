export async function normalizeData(state, county, lat, lng, POWERAPI1, POWERAPI2, POWERAPI3, censusAPI) {

    let collection = {
        county: county,
        state: state,
        lat: lat,
        long: lng,
        NASA_power_data: {},
        household_income: 0,
        solar_rank: 0,
        wind_rank: 0,
        hydro_rank: 0
    };


    let powerData1, powerData2, powerData3, censusData, electricData;
    try {
        // eslint-disable-next-line no-undef
        [powerData1, powerData2, powerData3, censusData, electricData] = await Promise.all([fetch(POWERAPI1), fetch(POWERAPI2), fetch(POWERAPI3), fetch(censusAPI)]);
    } catch (e) {
        console.log(e);
        return;
    }

    let powerJson1, powerJson2, powerJson3, censusJson, electricJson;
    try {
        [powerJson1, powerJson2, powerJson3, censusJson, electricJson] = await Promise.all([powerData1.json(), powerData2.json(), powerData3.json(), censusData.json()]);
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

    collection.solar_rank = 2 + (powerJson["ALLSKY_KT"] && powerJson["ALLSKY_KT"]["ANN"] > 0.5 ? 1 : 0) +
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

    collection.wind_rank = 2 + (powerJson["ALLSKY_KT"] && powerJson["ALLSKY_KT"]["ANN"] > 0.5 ? 1 : 0) +
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

    collection.hydro_rank = (powerJson["ALLSKY_KT"] && powerJson["ALLSKY_KT"]["ANN"] > 0.5 ? 1 : 0) +
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

    collection.household_income = censusJson[1][1];

    return collection;
}