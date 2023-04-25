"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = exports.EIA_API_KEY = exports.CENSUS_API_KEY = exports.INFO_DB_NAME = exports.INFO_COLLECTION_NAME = exports.ETL_DB_NAME = exports.ETL_COLLECTION_NAME = exports.VERSION = exports.PORT = exports.ENVIRONMENT = exports.MONGO_URI = void 0;
var dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.MONGO_URI = process.env.MONGO_URI || Error("MONGO_URI not set");
exports.ENVIRONMENT = process.env.NODE_ENV;
exports.PORT = process.env.PORT || 3000;
exports.VERSION = process.env.VERSION || "0.0.1";
exports.ETL_COLLECTION_NAME = process.env.ETL_COLLECTION_NAME || "etl";
exports.ETL_DB_NAME = process.env.ETL_DB_NAME || "etl";
exports.INFO_COLLECTION_NAME = process.env.INFO_COLLECTION_NAME || "info";
exports.INFO_DB_NAME = process.env.INFO_DB_NAME || "info";
exports.CENSUS_API_KEY = process.env.CENSUS_API_KEY || Error("CENSUS_API_KEY not set");
exports.EIA_API_KEY = process.env.EIA_API_KEY || Error("EIA_API_KEY not set");
exports.config = {
    MONGO_URI: exports.MONGO_URI,
    ENVIRONMENT: exports.ENVIRONMENT,
    PORT: exports.PORT,
    VERSION: exports.VERSION,
    ETL_COLLECTION_NAME: exports.ETL_COLLECTION_NAME,
    ETL_DB_NAME: exports.ETL_DB_NAME,
    INFO_COLLECTION_NAME: exports.INFO_COLLECTION_NAME,
    INFO_DB_NAME: exports.INFO_DB_NAME,
    CENSUS_API_KEY: exports.CENSUS_API_KEY,
    EIA_API_KEY: exports.EIA_API_KEY
};
