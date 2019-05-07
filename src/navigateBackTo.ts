import { emptyFn, findLastUrlDelta } from "./utils"
import redirectTo from "./redirectTo"
import { INavCb } from "./types/index.t"
import { INavigateBackTo } from "./types/navigateBackTo.t"

/**
 *
 * @param {string} url
 * @returns {void}
 */
const navigateBackTo: INavigateBackTo = (url: string, cb: INavCb = emptyFn) => {
  const delta = findLastUrlDelta(url)
  if (delta > 0) {
    wx.navigateBack({
      delta,
      success() {
        cb(true)
      },
      fail() {
        cb(false)
      }
    })
  } else {
    // eslint-disable-next-line
    console.warn(
      `使用 navigateBackTo() 跳转的页面路径 ${url} 在页面栈中不存在，已使用 redirectTo() 重定向`
    )
    redirectTo(url, {}, cb)
  }
}

export default navigateBackTo
