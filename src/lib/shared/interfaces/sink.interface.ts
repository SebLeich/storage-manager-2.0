import { LogLevel } from "../types/log-level.type";

export interface ISink {
    log(...messages: (string | { message: string, level: LogLevel, channel?: string })[]): void;
    logErrors(...messages: string[]): void;
    logInformations(...messages: string[]): void;
    logSuccess(...messages: string[]): void;
    logWarnings(...messages: string[]): void;
}