import { MAX_PAGES_LENGTH } from "./utils"
import navigateTo from "./navigateTo"
import navigateBack from "./navigateBack"
import navigateBackTo from "./navigateBackTo"
import navigateLastTo from "./navigateLastTo"
import refresh from "./refresh"
import switchTab from "./switchTab"
import reLaunch from "./reLaunch"
import redirectTo from "./redirectTo"
import { IConstructorParams, IApisName, INavCb } from "./types/index.t"
import WxNavBase from "./base"
import { INavigateTo } from "./types/navigateTo.t"
import { INavigateBack } from "./types/navigateBack.t"
import { INavigateBackTo } from "./types/navigateBackTo.t"
import { INavigateLastTo } from "./types/navigateLastTo.t"
import { IRefresh } from "./types/refresh.t"
import { ISwitchTab } from "./types/switchTab.t"
import { IReLaunch } from "./types/reLaunch.t"
import { IRedirectTo } from "./types/redirectTo.t"

const apisMap = {
  navigateTo,
  navigateBack,
  navigateBackTo,
  navigateLastTo,
  refresh,
  switchTab,
  reLaunch,
  redirectTo
}

const apisNeedDealTabBar = [
  "navigateTo",
  "navigateBackTo",
  "navigateLastTo",
  "redirectTo",
  "reLaunch"
]

export default class WxNav extends WxNavBase {
  protected navigateTo!: INavigateTo
  protected navigateBack!: INavigateBack
  protected navigateBackTo!: INavigateBackTo
  protected navigateLastTo!: INavigateLastTo
  protected refresh!: IRefresh
  protected switchTab!: ISwitchTab
  protected reLaunch!: IReLaunch
  protected redirectTo!: IRedirectTo

  constructor({
    maxStack = MAX_PAGES_LENGTH,
    tabBarPages = {},
    beforeEach,
    afterEach
  }: IConstructorParams = {}) {
    super()

    this.maxStack = maxStack
    this.initTabBarPages(tabBarPages)

    const apisName = Object.keys(apisMap) as Array<keyof IApisName>
    apisName.forEach(apiName => {
      this[apiName] = (...payload: any[]) => {
        const from: string = this.currentPageRoute
        const to: string = payload[0]
        const next = () => {
          // deal tabBar route
          if (
            ~apisNeedDealTabBar.indexOf(apiName) &&
            this.checkTabBarPage(to)
          ) {
            switchTab.call(this, ...(payload as [string, INavCb]))
          } else {
            ;(apisMap[apiName] as Function).call(this, ...payload)
          }
          afterEach && afterEach(to, from)
        }
        beforeEach ? beforeEach(to, from, next) : next()
      }
    })
  }
}
