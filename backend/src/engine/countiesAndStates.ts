import * as counties from './counties.json';
import * as states from './states.json';

const countiesMap = new Map(counties.map(county => [county.fips_code, county]));
const statesMap = new Map(Object.entries(states).map(([fips, state]) => [state, fips]));

const getCountyEntry = (state, countyName) => {
    const stateFips = statesMap.get(state);
    if (!stateFips) {
        console.log(`State ${state} not found`);
        return;
    }

    const [entry] = [...countiesMap.values()]
        .filter(county => county.name === countyName && county.fips_code.toString().startsWith(stateFips))
        .map(county => county);

    if (!entry) {
        throw new Error(`County ${countyName} not found in state ${state}`);
    }
    return entry;
}
export { countiesMap, statesMap, getCountyEntry };
