# ETL

Our ETL process is responsible for extracting data from the [EIA-861](https://www.eia.gov/electricity/data/eia861/) and [EIA-923](https://www.eia.gov/electricity/data/eia923/) datasets, transforming it into a format that is more suitable for our application, and loading it into our database.

It's implemented twice, once in javascript and once in typescript. Currently the javascript ETL pipeline is in use in production, but the typescript ETL pipeline is being developed in parallel and will eventually replace it.

## [ETL V1](etl-v1)

## [ETL V2](etl-v2)

