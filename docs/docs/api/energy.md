# Energy

## `GET /:state/:county`
Retrieves energy data for a specific state and county.

### Request Parameters
- `state` (required): The name of the state.
- `county` (required): The name of the county.

### Response
Returns a JSON object containing the energy data for the specified state and county.

### Errors
Returns a JSON object with the following fields:
- `error`: An error message.

## `POST /:state/:county`
Adds energy data for a specific state and county.

### Request Parameters
- `state` (required): The name of the state.
- `county` (required): The name of the county.

### Request Body
A JSON object containing the energy data to be added.

### Response
Returns a JSON object with the following fields:
- `success`: A success message.
- `data`: The added energy data.

### Errors
Returns a JSON object with the following fields:
- `error`: An error message.

## `DELETE /:state/:county`
Deletes energy data for a specific state and county.

### Request Parameters
- `state` (required): The name of the state.
- `county` (required): The name of the county.

### Response
Returns a JSON object with the following fields:
- `success`: A success message.

### Errors
Returns a JSON object with the following fields:
- `error`: An error message.

## `PUT /:state/:county`
Updates energy data for a specific state and county.

### Request Parameters
- `state` (required): The name of the state.
- `county` (required): The name of the county.

### Request Body
A JSON object containing the energy data to be updated.

### Response
Returns a JSON object with the following fields:
- `success`: A success message.

### Errors
Returns a JSON object with the following fields:
- `error`: An error message.