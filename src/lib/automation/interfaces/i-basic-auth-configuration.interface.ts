import { IConfiguration } from "./i-configuration.interface";

export interface IBasicAuthConfiguration extends IConfiguration {
    userName: string;
    password: string;
}