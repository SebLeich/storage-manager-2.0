import { IConfiguration } from "./i-configuration.interface";

export interface IInjectedJwtTokenConfiguration extends IConfiguration {
    jwtToken: string;
}