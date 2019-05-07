import { emptyFn, getRepeatCountOfDelta } from "./utils"
import { INavCb } from "./types/index.t"
import { INavigateBack } from "./types/navigateBack.t"

const navigateBack: INavigateBack = (...payload) => {
  let delta: number = 1,
    cb: INavCb = emptyFn
  payload.forEach(param => {
    if (Number.isInteger(param as number)) {
      delta = param as number
    } else if (typeof param === "function") {
      cb = param
    }
  })
  const repeatCount = getRepeatCountOfDelta(delta)
  wx.navigateBack({
    delta: delta + repeatCount,
    success() {
      cb(true)
    },
    fail() {
      cb(false)
    }
  })
}

export default navigateBack
