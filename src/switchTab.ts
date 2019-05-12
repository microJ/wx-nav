import { emptyFn, safeWxApiTargetUrl } from "./utils"
import { INavCb } from "./types/index.t"
import WxNavBase from "./base"
import { ISwitchTab } from "./types/switchTab.t"

const switchTab: ISwitchTab = function(
  this: WxNavBase,
  target: string,
  cb: INavCb = emptyFn
) {
  let route
  if (this.checkTabBarPageWithAlias(target)) {
    route = this.tabBarPages[target]
  } else if (this.checkTabBarPageWithRoute(target)) {
    route = target
  } else {
    return
  }
  wx.switchTab({
    url: safeWxApiTargetUrl(route).split("?")[0],
    success() {
      cb(true)
    },
    fail() {
      cb(false)
    }
  })
}

export default switchTab
