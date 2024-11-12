import { PATH_TO_IMAGE } from 'constants/globalConstants';
import config from "config";

export const getFullPathToImg = (img: string) =>
    config.isDev()
        ? 'http://localhost/api/' + PATH_TO_IMAGE + img
        : PATH_TO_IMAGE + img;
