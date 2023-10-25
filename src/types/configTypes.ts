export enum BuildType {
    PRODUCTION = 'production',
    DEVELOPMENT = 'development',
    STAGE = 'stage',
}

export interface Config {
    stateVersion: number;
    BUILD_TYPE: BuildType;
    isProduction: () => boolean;
    isDev: () => boolean;
    API_URL: string;
    STATIC_PATH: string;
    BOT_NAME: string;
}

interface OverridableConfig extends Partial<Config> {}

export type BuildTypesScheme = {
    [key in BuildType]?: OverridableConfig;
};
