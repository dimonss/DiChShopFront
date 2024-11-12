export enum BuildType {
    PRODUCTION = 'production',
    DEVELOPMENT = 'development',
    STAGE = 'stage',
}

interface EnvConfig {
    BUILD_TYPE: BuildType;
    STATIC_PATH: string;
    BOT_NAME: string;
    AMPLITUDE: string;
    API_URL: string;
}

export interface Config extends EnvConfig {
    stateVersion: number;
    isProduction: () => boolean;
    isDev: () => boolean;
    APP_NAME: string;
}

export interface DefaultConfig {
    stateVersion: number;
    isProduction: () => boolean;
    isDev: () => boolean;
    APP_NAME: string;
}

export type BuildTypesScheme = {
    [key in BuildType]: EnvConfig;
};
