import { INavCb, IQuery } from "./types/index.t"

export const MAX_PAGES_LENGTH: number = 10

/**
 * not start with '/', page stack saved route style
 * @param {string} url
 * @returns {string}
 */
export const getUrlRoute = (url: string): string => {
  return url.replace(/^\//, "").replace(/\?.*/, "")
}

/**
 * start with '/', wx APIs reveive route style
 * @param {string} url
 */
export const safeWxApiTargetUrl = (url: string): string =>
  url[0] === "/" ? url : "/" + url

// [A, B, C, D]
export const getRepeatCountOfDelta = (delta: number = 1) => {
  let repeatCount = 0
  let pages = getCurrentPages()
  if (pages.length - delta > 1) {
    pages = pages.slice(0, pages.length - delta)
    const pagesLength = pages.length
    const finalIndex = pagesLength - 1
    const url = pages[finalIndex].route
    for (let index = finalIndex - 1; index >= 0; index--) {
      if (pages[index].route !== url) {
        break
      }
      repeatCount++
    }
  }
  return repeatCount
}

/**
 *
 * @param {string} url
 * @returns {number}
 */
export const findLastUrlDelta = (url: string): number => {
  const pages = getCurrentPages()
  const targetIndex = pages
    .map(page => (page as any).route as string)
    .lastIndexOf(getUrlRoute(url), -2)
  if (targetIndex < 0) {
    return -1
  }
  const delta = pages.length - 1 - targetIndex
  const repeatCount = getRepeatCountOfDelta(delta)
  return delta + repeatCount
}

export const emptyFn = () => {}

export const parseObj2QueryStr = (query: IQuery = {}) =>
  Object.keys(query).reduce((acc, key) => `${acc}${key}=${query[key]}&`, "&")

/**
 * url can not be strict that start with '/'. also can with "?query1=value1&query2=value2"
 */
export const joinUrlAndQuery = (url: string, query: IQuery = {}) => {
  const splitStr = /\?/.test(url) ? "" : "?"
  return safeWxApiTargetUrl(url) + splitStr + parseObj2QueryStr(query)
}

/**
 * default return query as {}, return cb as emptyFn
 */
export const getQueryAndCb = (...payload: any[]) => {
  let query: IQuery = {}
  let cb: INavCb = emptyFn
  payload.forEach(v => {
    if (typeof v === "function") {
      cb = v
    } else if (Object.prototype.toString.call(v) === "[object Object]") {
      query = v
    }
  })
  return {
    query,
    cb
  }
}
