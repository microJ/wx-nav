import { INavCb, IQuery } from "./types/index.t";
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
export declare const parseObj2QueryStr: (query?: IQuery) => string;
/**
 * url can not be strict that start with '/'. also can with "?query1=value1&query2=value2"
 */
export declare const joinUrlAndQuery: (url: string, query?: IQuery) => string;
/**
 * default return query as {}, return cb as emptyFn
 */
export declare const getQueryAndCb: (...payload: any[]) => {
    query: IQuery;
    cb: INavCb;
};
