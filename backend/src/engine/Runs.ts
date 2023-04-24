export type RunId = string;

export interface Run {
    runId: RunId,
    timestamp: number,
    state: string,
}
