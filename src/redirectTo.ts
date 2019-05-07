import { joinUrlAndQuery, getQueryAndCb } from "./utils"
import { IQueryOrNavCb } from "./types/index.t"
import { IRedirectTo } from "./types/redirectTo.t"

const redirectTo: IRedirectTo = (
  url: string,
  ...payload: IQueryOrNavCb[]
): void => {
  const { query, cb } = getQueryAndCb(...payload)
  wx.redirectTo({
    url: joinUrlAndQuery(url, query),
    success() {
      cb(true)
    },
    fail() {
      cb(false)
    }
  })
}

export default redirectTo
