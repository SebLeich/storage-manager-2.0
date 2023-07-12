import { LogLevel } from "../../shared/types/log-level.type";

export interface IConsoleMessage {
    id: string;
    channel?: string;
    timeStamp: Date;
    message: string;
    level: LogLevel;
    styles?: CSSStyleDeclaration;
}