export enum BuildType {
    PRODUCTION = 'production',
    DEVELOPMENT = 'development',
    STAGE = 'stage',
}

export interface Config {
    stateVersion: number;
    isProduction: () => boolean;
    isDev: () => boolean;
    BUILD_TYPE: BuildType;
    API_URL: string;
    STATIC_PATH: string;
    BOT_NAME: string;
}

export interface DefaultConfig {
    stateVersion: number;
    isProduction: () => boolean;
    isDev: () => boolean;
}

interface EnvConfig {
    BUILD_TYPE: BuildType;
    API_URL: string;
    STATIC_PATH: string;
    BOT_NAME: string;
}

export type BuildTypesScheme = {
    [key in BuildType]: EnvConfig;
};
