import { IConfiguration } from "./i-configuration.interface";

export interface IJwtByLoginConfiguration extends IConfiguration {
    userName: string;
    password: string;
    loginEndpoint: string;
}