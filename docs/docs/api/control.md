# Control

This route controls the ETL process.

The control API exposes the following endpoints:

## `POST /start-etl-job`
Starts an ETL process for a specific state and county.

### Request Payload
- `state` (required): The name of the state to start the ETL process for.
- `county` (required): The name of the county to start the ETL process for.

### Response
Returns a JSON object with the following fields:
- `message`: A success message.
- `status`: The HTTP status code `200`.

### Errors
Returns a JSON object with the following fields:
- `message`: An error message.
- `status`: The HTTP status code `400`.

## `POST /start-etl-job-all-counties`
Starts an ETL process for all counties in a specific state.

### Request Payload
- `state` (required): The name of the state to start the ETL process for.

### Response
Returns a JSON object with the following fields:
- `message`: A success message.
- `status`: The HTTP status code `200`.

### Errors
Returns a JSON object with the following fields:
- `message`: An error message.
- `status`: The HTTP status code `400`.

## `POST /run`
Starts an ETL process for all counties in all states.

### Response
Returns a JSON object with the following fields:
- `message`: A success message.
- `runId`: The ID of the ETL process run.

## `GET /run/:runId`
Gets the status of an ETL process run.

### Response
Returns a JSON object with the status of the ETL process run.