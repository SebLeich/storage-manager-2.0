export interface IProcedure {
    guid: string;
    startedUnix: number;
    progress: number | boolean;
    finishedUnix: number | null;
}