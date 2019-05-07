import { safeWxApiTargetUrl } from "./utils"
import redirectTo from "./redirectTo"
import WxNavBase from "./base"
import { INavCb, IPureStringObject } from "./types/index.t"
import { IRefresh } from "./types/refresh.t"

const refresh: IRefresh = function(this: WxNavBase, cb: INavCb) {
  // eslint-disable-next-line
  const pages = getCurrentPages()
  const currentPage = (pages as any)[pages.length - 1]
  const { route, options } = currentPage as {
    route: string
    options: IPureStringObject
  }
  if (this.checkTabBarPageWithRoute(route)) {
    wx.switchTab({
      url: safeWxApiTargetUrl(route),
      success() {
        cb(true)
      },
      fail() {
        cb(false)
      }
    })
  } else {
    redirectTo(route, options, cb)
  }
}

export default refresh
