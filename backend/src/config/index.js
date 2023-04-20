export const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017";

export const ENVIRONMENT = process.env.NODE_ENV || "development";

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
}



