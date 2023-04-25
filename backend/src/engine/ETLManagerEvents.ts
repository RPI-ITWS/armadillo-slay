
export enum ETLManagerEvents {
    ETL_ERROR = 'armadillo-slay-etl-error',
    POWER_DATA_FETCHED = 'armadillo-slay-power-data-fetched',
    CENSUS_DATA_FETCHED = 'armadillo-slay-census-data-fetched',
    DATA_TRANSFORMED = 'armadillo-slay-data-normalized',
    START_ETL_JOB = 'armadillo-slay-start-etl-job',
    START_ETL_JOB_FOR_ALL_COUNTIES_IN_STATE = 'armadillo-slay-start-etl-job-for-all-counties-in-state',
    DATA_LOADED = 'armadillo-slay-data-loaded',
    RUN = 'armadillo-slay-run',
    RUN_COMPLETE = 'armadillo-slay-run-complete',
    LOAD_COMPLETE = 'armadillo-slay-load-complete',
    GET_RUN = 'armadillo-slay-get-run',
    RUN_FETCHED = 'armadillo-slay-run-fetched',
}
