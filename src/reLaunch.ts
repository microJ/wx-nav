import { getUrlRoute, getQueryAndCb } from "./utils"
import redirectTo from "./redirectTo"
import { IQueryOrNavCb } from "./types/index.t"
import { IReLaunch } from "./types/reLaunch.t"

const reLaunch: IReLaunch = (url: string, ...payload: IQueryOrNavCb[]) => {
  const { query, cb } = getQueryAndCb(...payload)
  // eslint-disable-next-line
  const pages = getCurrentPages() as any
  // 1. redirect
  if (pages.length <= 1) {
    redirectTo(url, query, cb)
  } else if (pages[0].route === getUrlRoute(url)) {
    // 2. back to first page and refresh
    wx.navigateBack({
      delta: pages.length - 1,
      success() {
        redirectTo(url, query, cb)
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
