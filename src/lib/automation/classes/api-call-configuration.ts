export class Configuration {
    calculationEndpoint: string = null;
}

export class BasicAuthConfiguration extends Configuration {
    userName: string = null;
    password: string = null;
}

export class StolenJWTTokenConfiguration extends Configuration {
    jwtToken: string = null;
}

export class JWTTokenLoginConfiguration extends Configuration {
    userName: string = null;
    password: string = null;
    loginEndpoint: string = null;
}

export class OAuth2Configuration extends Configuration {
    
}
