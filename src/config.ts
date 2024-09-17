import { BuildType, BuildTypesScheme, Config, DefaultConfig } from 'types/configTypes';

const defaultConfig: DefaultConfig = {
    stateVersion: 1.1,
    isProduction: () => process.env.REACT_APP_BUILD_TYPE === BuildType.PRODUCTION,
    isDev: () => process.env.REACT_APP_BUILD_TYPE === BuildType.DEVELOPMENT,
    APP_NAME: 'DiChShop',
};

const buildTypeConfigs: BuildTypesScheme = {
    development: {
        BUILD_TYPE: BuildType.DEVELOPMENT,
        API_URL: 'http://127.0.0.1:4000/',
        STATIC_PATH: 'http://127.0.0.1/api/static/',
        BOT_NAME: 'DiChAdminBot',
        AMPLITUDE: '5cce4fed5893cf0abed68c52c148a544',
    },
    stage: {
        BUILD_TYPE: BuildType.STAGE,
        API_URL: 'https://dich.tech/api',
        STATIC_PATH: 'https://dich.tech/api/static/',
        BOT_NAME: 'DiChShop_bot',
        AMPLITUDE: '5cce4fed5893cf0abed68c52c148a544',
    },
    production: {
        BUILD_TYPE: BuildType.PRODUCTION,
        API_URL: 'https://dich.tech/api',
        STATIC_PATH: 'https://dich.tech/api/static/',
        BOT_NAME: 'DiChShop_bot',
        AMPLITUDE: 'fdbb043fe62623e3a14dead3eb5598f0',
    },
};

const buildType: BuildType = process.env['REACT_APP_BUILD_TYPE'] as BuildType;
const config: Config = { ...defaultConfig, ...buildTypeConfigs[buildType] };
export default config;
