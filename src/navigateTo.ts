import redirectTo from "./redirectTo"
import { joinUrlAndQuery, getParamsAndCb } from "./utils"
import { IParamsOrNavCb } from "./types/index.t"
import { INavigateTo } from "./types/navigateTo.t"
import WxNavBase from "./base"

/**
 *
 * @param {string} url
 * @param {object} params
 * @param {Function} cb
 */
const navigateTo: INavigateTo = function(
  this: WxNavBase,
  url: string,
  ...payload: IParamsOrNavCb[]
) {
  const { params, cb } = getParamsAndCb(...payload)
  const pages = getCurrentPages()
  if (pages.length >= this.maxStack) {
    redirectTo(url, params, cb)
  } else {
    wx.navigateTo({
      url: joinUrlAndQuery(url, params),
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
