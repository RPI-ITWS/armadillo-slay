import dotenv from "dotenv";
dotenv.config();
export const MONGO_URI = process.env.MONGO_URI;

export const ENVIRONMENT = process.env.NODE_ENV;

export const PORT = process.env.PORT || 3000;


export const config = {
    MONGO_URI,
    ENVIRONMENT,
    PORT,
    VERSION: "0.0.1",
    ETL_COLLECTION_NAME: "etl",
    ETL_DB_NAME: "etl",
    INFO_COLLECTION_NAME: "info",
    INFO_DB_NAME: "info",
    CENSUS_API_KEY: process.env.CENSUS_API_KEY,
    EIA_API_KEY: process.env.EIA_API_KEY,


}



