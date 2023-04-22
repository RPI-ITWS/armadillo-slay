import states from './states.json' assert { type: "json" };
import { normalizeSData } from "./normalizeSData.js";


export async function preloadStateDocs() {
     const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const documentPromises = Object.keys(states).map(async function (key, index) {
    await delay(index * 1000); 
    const stateAbbr = states[key];
    const eiaAPI =
      "https://api.eia.gov/v2/electricity/state-electricity-profiles/summary/data/?frequency=annual&data[0]=average-retail-price&data[1]=capacity-ipp&data[2]=carbon-dioxide-lbs&data[3]=direct-use&data[4]=generation-elect-utils&facets[stateID][]=" +
      stateAbbr +
      "&sort[0][column]=period&sort[0][direction]=desc&offset=0&length=5000&api_key=" +
      process.env.EIA_API_KEY;

    const newCollection = await normalizeSData(stateAbbr, eiaAPI);
    return newCollection;
  });

  const documentList = await Promise.all(documentPromises);
  return documentList;
}
