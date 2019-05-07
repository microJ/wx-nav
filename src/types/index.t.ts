import { INavigateTo } from "./navigateTo.t"
import { INavigateBack } from "./navigateBack.t"
import { INavigateBackTo } from "./navigateBackTo.t"
import { INavigateLastTo } from "./navigateLastTo.t"
import { IRefresh } from "./refresh.t"
import { ISwitchTab } from "./switchTab.t"
import { IReLaunch } from "./reLaunch.t"
import { IRedirectTo } from "./redirectTo.t"

export interface IConstructorParams {
  maxStack?: number
  tabBarPages?: { [pageKey: string]: string }
  beforeEach?: (to: string, from: string, next: () => void) => void
  afterEach?: (to: string, from: string) => void
}

export type INavCb = (isNavSuccess?: boolean) => void

export interface IPureStringObject {
  [key: string]: string
}

export interface IQuery {
  [key: string]: string | number | boolean
}

export interface IApisName {
  navigateTo: "navigateTo"
  navigateBack: "navigateBack"
  navigateBackTo: "navigateBackTo"
  navigateLastTo: "navigateLastTo"
  refresh: "refresh"
  switchTab: "switchTab"
  reLaunch: "reLaunch"
  redirectTo: "redirectTo"
}

export type IQueryOrNavCb = INavCb | IQuery

export interface IWxNavWithApi {
  navigateTo: INavigateTo
  navigateBack: INavigateBack
  navigateBackTo: INavigateBackTo
  navigateLastTo: INavigateLastTo
  refresh: IRefresh
  switchTab: ISwitchTab
  reLaunch: IReLaunch
  redirectTo: IRedirectTo
}
