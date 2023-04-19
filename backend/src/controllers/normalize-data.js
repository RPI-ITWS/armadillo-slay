async function normalizeData(county, state, POWERAPI, censusAPI, eiaAPI) {
  let collection = {
    county: county,
    state: state,
    monthlyData: [],
    householdIncome: 0,
    stateStats: [],
  };

  const [powerData, censusData, electricData] = await Promise.all([
    fetch(POWERAPI),
    fetch(censusAPI),
    fetch(eiaAPI),
  ]);

  const [powerJson, censusJson, electricJson] = await Promise.all([
    powerData.json(),
    censusData.json(),
    electricData.json(),
  ]);

  let parameterArray;
  parameterArray = [
    "PS",
    "WD10M",
    "WD50M",
    "WS10M",
    "WS50M",
    "WS10M_MAX",
    "WS10M_MIN",
    "WS50M_MAX",
    "WS50M_MIN",
    "WS10M_RANGE",
    "WS50M_RANGE",
  ];
  let monthArray;
  monthArray = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
    "ANN",
  ];
  for (let i = 0; i < parameterArray.length; i++) {
    let parameter = {
      parameter: parameterArray[i],
      monthlyData: [],
    };
    for (let j = 0; j < monthArray.length; j++) {
      let monthlyData = {
        month: monthArray[j],
        value: powerJson.properties.parameter[parameterArray[i]][monthArray[j]],
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
      generationElectUtils:
        electricJson.response.data[i]["generation-elect-utils"],
    };
    collection.stateStats.push(stateStats);
  }
  return collection;
}
