import { IPureStringObject, INavCb } from "./types/index.t";
export declare const MAX_PAGES_LENGTH: number;
/**
 * not start with '/', page stack saved route style
 * @param {string} url
 * @returns {string}
 */
export declare const getUrlRoute: (url: string) => string;
/**
 * start with '/', wx APIs reveive route style
 * @param {string} url
 */
export declare const safeWxApiTargetUrl: (url: string) => string;
export declare const getRepeatCountOfDelta: (delta?: number) => number;
/**
 *
 * @param {string} url
 * @returns {number}
 */
export declare const findLastUrlDelta: (url: string) => number;
export declare const emptyFn: () => void;
/**
 *
 * @param {object} params
 * @returns {string}
 */
export declare const parseObj2QueryStr: (params?: IPureStringObject) => string;
/**
 * url can not be strict that start with '/'. also can with "?query1=value1&query2=value2"
 * @param {string} url
 * @param {object} params
 */
export declare const joinUrlAndQuery: (url: string, params?: IPureStringObject) => string;
/**
 * default return params as {}, return cb as emptyFn
 * @param  {...[params, cb]} payload
 * @returns {params, cb}
 */
export declare const getParamsAndCb: (...payload: any[]) => {
    params: IPureStringObject;
    cb: INavCb;
};
