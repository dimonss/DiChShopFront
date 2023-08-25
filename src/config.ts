import { BuildType, BuildTypesScheme, Config } from 'types/configTypes';

const defaultConfig: Config = {
    stateVersion: 1.0,
    BUILD_TYPE: BuildType.PRODUCTION,
    isProduction: () => process.env.BUILD_TYPE === BuildType.PRODUCTION,
    isDev: () => process.env.BUILD_TYPE === BuildType.DEVELOPMENT,
    API_URL: 'http://127.0.0.1:4000/',
};

const buildTypeConfigs: BuildTypesScheme = {
    development: {
        BUILD_TYPE: BuildType.DEVELOPMENT,
        API_URL: 'http://127.0.0.1:4000/',
    },
    production: {
        BUILD_TYPE: BuildType.PRODUCTION,
    },
};

const buildType: BuildType = process.env['BUILD_TYPE'] as BuildType;
const config: Config = { ...defaultConfig, ...buildTypeConfigs[buildType] };
export default config;
