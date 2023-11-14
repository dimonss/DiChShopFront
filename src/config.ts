import { BuildType, BuildTypesScheme, Config } from 'types/configTypes';

const defaultConfig: Config = {
    stateVersion: 1.0,
    BUILD_TYPE: BuildType.PRODUCTION,
    isProduction: () => process.env.BUILD_TYPE === BuildType.PRODUCTION,
    isDev: () => process.env.BUILD_TYPE === BuildType.DEVELOPMENT,
    API_URL: 'http://172.20.10.7:4000/',
    STATIC_PATH: 'http://172.20.10.7/static/',
    BOT_NAME: 'DiChAdminBot'
};

const buildTypeConfigs: BuildTypesScheme = {
    development: {
        BUILD_TYPE: BuildType.DEVELOPMENT,
        API_URL: 'http://172.20.10.7:4000/',
        STATIC_PATH: 'http://172.20.10.7/static/',
        BOT_NAME: 'DiChAdminBot'
    },
    stage: {

    },
};

const buildType: BuildType = process.env['BUILD_TYPE'] as BuildType;
const config: Config = { ...defaultConfig, ...buildTypeConfigs[buildType] };
export default config;
