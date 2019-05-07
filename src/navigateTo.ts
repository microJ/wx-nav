import redirectTo from "./redirectTo"
import { joinUrlAndQuery, getQueryAndCb } from "./utils"
import { IQueryOrNavCb } from "./types/index.t"
import { INavigateTo } from "./types/navigateTo.t"
import WxNavBase from "./base"

const navigateTo: INavigateTo = function(
  this: WxNavBase,
  url: string,
  ...payload: IQueryOrNavCb[]
) {
  const { query, cb } = getQueryAndCb(...payload)
  const pages = getCurrentPages()
  if (pages.length >= this.maxStack) {
    redirectTo(url, query, cb)
  } else {
    wx.navigateTo({
      url: joinUrlAndQuery(url, query),
      success() {
        cb(true)
      },
      fail() {
        cb(false)
      }
    })
  }
}

export default navigateTo
