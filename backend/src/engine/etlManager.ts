import * as EventEmitter from 'events';
import * as counties from './counties.json'
import * as states from './states.json'
import * as crypto from "crypto";
import {DataFetcher} from "./DataFetcher";
import {DataLoader} from "./DataLoader";
import {DataTransformer} from "./DataTransformer";
import {countiesMap, getCountyEntry, statesMap} from "./countiesAndStates";
import {Run, RunId} from "./Runs";
import {ETLManagerEvents} from "./ETLManagerEvents";


if (!counties) {
    Error("Counties not found");
}
if (!states) {
    Error("States not found");
}


class EtlManager extends EventEmitter {
    private runs: Map<RunId, Run> = new Map();
    private dataFetcher: DataFetcher = new DataFetcher();
    private dataLoader: DataLoader = new DataLoader();
    private dataTransformer: DataTransformer = new DataTransformer();

    constructor() {
        super();
        this.registerEventListeners();
    }

    private registerEventListeners() {
        this.on(ETLManagerEvents.START_ETL_JOB, ({state, county}) => this.runETLForStateAndCounty(state, county));
        this.on(ETLManagerEvents.START_ETL_JOB_FOR_ALL_COUNTIES_IN_STATE, ({state}) => this.runETLForAllCountiesInState(state));
        this.on(ETLManagerEvents.DATA_TRANSFORMED, (data) => this.dataLoader.loadTransformedDataToDB(data));
        this.on(ETLManagerEvents.RUN, ({runId, timestamp}) => this.handleRun(runId, timestamp));
        this.on(ETLManagerEvents.GET_RUN, ({runId}) => this.handleGetRun(runId));
    }

    async runETLForStateAndCounty(state: string, county: string) {
        const countyEntry = getCountyEntry(state, county);
        if (!countyEntry) {
            this.emit(ETLManagerEvents.ETL_ERROR, {error: `County ${county} not found in state ${state}`});
            return;
        }
        const {powerData, censusData} = await this.dataFetcher.fetchPowerAndCensusData(countyEntry, state);
        const transformed = this.dataTransformer.transform(state, county, countyEntry.lat, countyEntry.lng, powerData, censusData);
        this.emit(ETLManagerEvents.DATA_TRANSFORMED, transformed)
    }

    startETLJob(state, county) {
        this.emit(ETLManagerEvents.START_ETL_JOB, {state, county});
    }

    async startETLJobForAllCountiesInState(state) {
        this.emit(ETLManagerEvents.START_ETL_JOB_FOR_ALL_COUNTIES_IN_STATE, {state});
    }

    private async runETLForAllCountiesInState(state) {
        const counties = [...countiesMap.values()].filter(county => county.fips_code.toString().startsWith(statesMap.get(state))).map(county => county.name);
        counties.forEach(county => this.startETLJob(state, county));
    }

    private runETLForAllStates() {
        for (const state of statesMap.keys()) {
            this.runETLForAllCountiesInState(state);
        }
    }

    run(): RunId {
        const runId = crypto.randomUUID()
        const timestamp = new Date().toISOString();
        this.emit(ETLManagerEvents.RUN, {runId, timestamp});
        return runId;
    }

    private handleRun(runId, timestamp) {
        this.runETLForAllStates();
        this.emit(ETLManagerEvents.RUN_COMPLETE, {runId, timestamp});
    }

    async getRun(runId: RunId) {
        this.emit(ETLManagerEvents.GET_RUN, {runId});
        return new Promise<Run>((resolve, reject) => {
            this.on(ETLManagerEvents.RUN_FETCHED, (run) => resolve(run));
            setTimeout(() => reject(new Error(`Run ${runId} not found`)), 1000);
        });
    }

    private handleGetRun(runId: RunId) {
        return this.runs.get(runId);
    }
}

export const etlInstance = new EtlManager();