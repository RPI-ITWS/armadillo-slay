# ETL (Debug)

This API exposes the following endpoints:

## `GET /debug`
Retrieves debug information about the ETL process.

**Note:** This endpoint is considered private and may be subject to change or removal at any time.

### Query Parameters
- `solarRank`: Filter by the solar rank.
- `windRank`: Filter by the wind rank.
- `hydroRank`: Filter by the hydro rank.

### Response
Returns a JSON object containing debug information about the ETL process.

## `GET /debug/:state/:county`
Retrieves debug information for a specific state and county.

**Note:** This endpoint is considered private and may be subject to change or removal at any time.

### Request Parameters
- `state` (required): The name of the state.
- `county` (required): The name of the county.

### Response
Returns a JSON object containing debug information for the specified state and county.

## `GET /debug/preload-docs`
Preloads documents for the ETL process.

**Note:** This endpoint is considered private and may be subject to change or removal at any time.

### Response
Returns a JSON object with the following fields:
- `success`: A success message.

### Errors
Returns a JSON object with the following fields:
- `error`: An error message.

## `GET /debug/add-data/:state/:county`
Adds data for a specific state and county.

**Note:** This endpoint is considered private and may be subject to change or removal at any time.

### Request Parameters
- `state` (required): The name of the state.
- `county` (required): The name of the county.

### Response
Returns a JSON object with the following fields:
- `success`: A success message.

### Errors
Returns a JSON object with the following fields:
- `error`: An error message.
