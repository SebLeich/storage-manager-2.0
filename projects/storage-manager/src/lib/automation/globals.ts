export enum API_CALL_AUTHORIZATION {
    NO_AUTH, BASIC, JWT_BEARER_LOGIN, STOLEN_JWT_BEARER, OAUTH2
}

export enum CONFIGURATION_ERROR {
    NO_AUTH_TYPE, NO_CONFIGURATION, NO_CALCULATION_ENDPOINT, NO_USERNAME, NO_PASSWORD, NO_AUTH_ENDPOINT
}

export enum ACCESS_GRANTED_STATUS {
    NOT_TESTED, SUCCEEDED, FAILED
}

export function apiCallAuthorizationTypeToString(type: API_CALL_AUTHORIZATION) {
    if (typeof type !== 'number') return '';
    switch (type.valueOf()) {
        case API_CALL_AUTHORIZATION.NO_AUTH:
            return 'Ohne Autorisierung';

        case API_CALL_AUTHORIZATION.BASIC:
            return 'Basic Auth';

        case API_CALL_AUTHORIZATION.JWT_BEARER_LOGIN:
            return 'JWT Bearer (mit Login Endpunkt)';

        case API_CALL_AUTHORIZATION.OAUTH2:
            return 'OAuth2';

        case API_CALL_AUTHORIZATION.STOLEN_JWT_BEARER:
            return 'JWT Bearer (nur Token)';

    }
    return '';
}
