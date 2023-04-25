import {config as dotEnvConfig} from "dotenv";
dotEnvConfig();

export const MONGO_URI = process.env.MONGO_URI || Error("MONGO_URI not set");

export const ENVIRONMENT = process.env.NODE_ENV;

export const PORT = process.env.PORT || 3000;

export const VERSION = process.env.VERSION || "0.0.1";

export const ETL_COLLECTION_NAME = process.env.ETL_COLLECTION_NAME || "etl";

export const ETL_DB_NAME = process.env.ETL_DB_NAME|| "etl";

export const INFO_COLLECTION_NAME = process.env.INFO_COLLECTION_NAME || "info";

export const INFO_DB_NAME = process.env.INFO_DB_NAME || "info";

export const CENSUS_API_KEY = process.env.CENSUS_API_KEY || Error("CENSUS_API_KEY not set")

export const EIA_API_KEY = process.env.EIA_API_KEY || Error("EIA_API_KEY not set");





export const config = {
    MONGO_URI,
    ENVIRONMENT,
    PORT,
    VERSION,
    ETL_COLLECTION_NAME,
    ETL_DB_NAME,
    INFO_COLLECTION_NAME,
    INFO_DB_NAME,
    CENSUS_API_KEY,
    EIA_API_KEY
}



