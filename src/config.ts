import { BuildType, BuildTypesScheme, Config, DefaultConfig } from 'types/configTypes';

const defaultConfig: DefaultConfig = {
    stateVersion: 1.0,
    isProduction: () => process.env.REACT_APP_BUILD_TYPE === BuildType.PRODUCTION,
    isDev: () => process.env.REACT_APP_BUILD_TYPE === BuildType.DEVELOPMENT,
};

const buildTypeConfigs: BuildTypesScheme = {
    development: {
        BUILD_TYPE: BuildType.DEVELOPMENT,
        API_URL: 'http://127.0.0.1:4000/',
        STATIC_PATH: 'http://127.0.0.1/api/static/',
        BOT_NAME: 'DiChAdminBot',
    },
    stage: {
        BUILD_TYPE: BuildType.STAGE,
        API_URL: 'https://dich.tech/api',
        STATIC_PATH: 'http://207.154.247.249/api/static/',
        BOT_NAME: 'DiChShop_bot',
    },
    production: {
        BUILD_TYPE: BuildType.PRODUCTION,
        API_URL: 'https://dich.tech/api',
        STATIC_PATH: 'http://207.154.247.249/api/static/',
        BOT_NAME: 'DiChShop_bot',
    },
};

const buildType: BuildType = process.env['REACT_APP_BUILD_TYPE'] as BuildType;
const config: Config = { ...defaultConfig, ...buildTypeConfigs[buildType] };
export default config;
