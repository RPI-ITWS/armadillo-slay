import { collection } from "../db/mongo.js";
import { normalizeData } from "../controllers/normalize-data.js";
export async function addData(county, state) {
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

    console.log(countyFips, stateFips, lat, lng);

    let POWERAPI =
      "https://power.larc.nasa.gov/api/temporal/climatology/point?parameters=PS,WS10M,WS10M_MAX,WS10M_MIN,WS10M_RANGE,WS50M,WD10M,WS50M_MAX,WS50M_MIN,WS50M_RANGE,WD50M&community=RE&longitude=" +
      lng +
      "&latitude=" +
      lat +
      "&format=JSON";

    let censusAPI =
      "https://api.census.gov/data/2019/acs/acs5?get=NAME,B19013_001E&for=county:" +
      countyFips +
      "&in=state:" +
      stateFips +
      "&key=" +
      process.env.CENSUS_API_KEY;

    let eiaAPI =
      "https://api.eia.gov/v2/electricity/state-electricity-profiles/summary/data/?frequency=annual&data[0]=average-retail-price&data[1]=capacity-ipp&data[2]=carbon-dioxide-lbs&data[3]=direct-use&data[4]=generation-elect-utils&facets[stateID][]=" +
      state +
      "&sort[0][column]=period&sort[0][direction]=desc&offset=0&length=5000&api_key=" +
      process.env.EIA_API_KEY;

    let newCollection = await normalizeData(
      county,
      state,
      POWERAPI,
      censusAPI,
      eiaAPI
    );

    await collection.insertOne(newCollection);
  }
}
