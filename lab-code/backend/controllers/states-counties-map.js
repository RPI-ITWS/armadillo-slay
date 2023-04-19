import client from "../db";
const counties = require("./fips-long-lat.json");
const states = require("./fips-states.json");
export const statesMap = new Map(Object.entries(states));
export const countiesMap = new Map(
  counties.map((county) => [county.fips_code, county])
);
