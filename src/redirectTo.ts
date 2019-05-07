import { joinUrlAndQuery, getParamsAndCb } from "./utils"
import { IParamsOrNavCb } from "./types/index.t"
import { IRedirectTo } from "./types/redirectTo.t"

/**
 *
 * @param {string} url
 * @returns {void}
 */
const redirectTo: IRedirectTo = (
  url: string,
  ...payload: IParamsOrNavCb[]
): void => {
  const { params, cb } = getParamsAndCb(...payload)
  wx.redirectTo({
    url: joinUrlAndQuery(url, params),
    success() {
      cb(true)
    },
    fail() {
      cb(false)
    }
  })
}

export default redirectTo
