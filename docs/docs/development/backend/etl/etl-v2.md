# ETL Manager

ETL (Extract, Transform, Load) Manager is responsible for orchestrating the process
of fetching, transforming, and loading data from various sources into a database.
It's designed using the event-driven architecture pattern and is composed of several
components.

## Architecture

ETL Manager is composed of the following components:

- DataFetcher: Responsible for fetching data from external sources.
- DataTransformer: Responsible for transforming fetched data.
- DataLoader: Responsible for loading transformed data into a database.
- EtlManager: Orchestrates the ETL process using events.

### DataFetcher

DataFetcher is a class responsible for fetching data from external sources. It
contains methods for fetching power and census data for a given county and state.

### DataTransformer

DataTransformer is a class responsible for transforming the fetched data. It
transforms the power and census data into a format suitable for loading into the
database.

### DataLoader

DataLoader is a class responsible for loading the transformed data into a
database. It contains a method for loading the data into the database.

### EtlManager

EtlManager is a class that extends the EventEmitter and is responsible for
orchestrating the ETL process. It listens to events emitted by other components
and triggers the appropriate actions.

EtlManager emits the following events:

- ETL_ERROR: Indicates an error occurred during the ETL process.
- START_ETL_JOB: Starts an ETL job for a given state and county.
- START_ETL_JOB_FOR_ALL_COUNTIES_IN_STATE: Starts ETL jobs for all counties in a
  state.
- DATA_TRANSFORMED: Indicates the data has been transformed.
- DATA_LOADED: Indicates the data has been loaded into the database.
- RUN: Starts a new ETL run.
- RUN_COMPLETE: Indicates an ETL run has completed.
- GET_RUN: Retrieves information about an ETL run.

## Example Usage

Below is an example of how to use EtlManager:

```typescript
import { etlInstance } from './etlManager';

etlInstance.startETLJob('New York', 'Albany');
```

This will start an ETL job for Albany county in New York state.

## Error Handling

To handle errors in EtlManager, use try-catch blocks around the parts of the code
that may throw errors, and emit the ETL_ERROR event when an error occurs. This
event can then be listened to and handled accordingly.

