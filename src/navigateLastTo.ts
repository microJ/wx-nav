import { emptyFn, getUrlRoute } from "./utils"
import redirectTo from "./redirectTo"
import navigateBack from "./navigateBack"
import { INavCb } from "./types/index.t"
import { INavigateLastTo } from "./types/navigateLastTo.t"

const navigateLastTo: INavigateLastTo = (url: string, cb: INavCb = emptyFn) => {
  const pages = getCurrentPages()
  const lastPageRoute = (pages as any)[pages.length - 2] as string
  if (lastPageRoute === getUrlRoute(url)) {
    navigateBack(cb)
  } else {
    redirectTo(url, {}, cb)
  }
}

export default navigateLastTo
