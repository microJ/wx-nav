import { getUrlRoute, getParamsAndCb } from "./utils"
import redirectTo from "./redirectTo"
import { IParamsOrNavCb } from "./types/index.t"
import { IReLaunch } from "./types/reLaunch.t"

/**
 *
 * @param {string} url
 * @returns {void}
 */
const reLaunch: IReLaunch = (url: string, ...payload: IParamsOrNavCb[]) => {
  const { params, cb } = getParamsAndCb(...payload)
  // eslint-disable-next-line
  const pages = getCurrentPages() as any
  // 1. redirect
  if (pages.length <= 1) {
    redirectTo(url, params, cb)
  } else if (pages[0].route === getUrlRoute(url)) {
    // 2. back to first page and refresh
    wx.navigateBack({
      delta: pages.length - 1,
      success() {
        redirectTo(url, params, cb)
      },
      fail() {
        wx.reLaunch({ url })
      }
    })
  } else {
    // 3. wx.reLaunch
    wx.reLaunch({ url })
  }
}

export default reLaunch
