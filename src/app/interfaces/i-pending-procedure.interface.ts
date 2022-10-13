export interface IProcedure {
    guid: string;
    startedUnix: number;
    progress: number | null;
}