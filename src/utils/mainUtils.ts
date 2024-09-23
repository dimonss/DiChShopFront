import { PATH_TO_IMAGE } from 'constants/globalConstants';
import {BuildType} from "types/configTypes";

export const getFullPathToImg = (img: string) =>
    process.env.REACT_APP_BUILD_TYPE === BuildType.DEVELOPMENT
        ? 'http://localhost/api/' + PATH_TO_IMAGE + img
        : PATH_TO_IMAGE + img;
