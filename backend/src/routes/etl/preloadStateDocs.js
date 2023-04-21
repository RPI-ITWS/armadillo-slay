import states from './states.json';
import { normalizeSData } from "./normalizeSData.js";


export async function preloadStateDocs() {
    Object.keys(states).forEach(async function (key) {
        let stateAbbr = states[key];
        let eiaAPI = "https://api.eia.gov/v2/electricity/state-electricity-profiles/summary/data/?frequency=annual&data[0]=average-retail-price&data[1]=capacity-ipp&data[2]=carbon-dioxide-lbs&data[3]=direct-use&data[4]=generation-elect-utils&facets[stateID][]=" + stateAbbr + "&sort[0][column]=period&sort[0][direction]=desc&offset=0&length=5000&api_key=" + process.env.EIA_API_KEY;
        let newCollection = await normalizeSData(eiaAPI);
        return newCollection;
    });
}
