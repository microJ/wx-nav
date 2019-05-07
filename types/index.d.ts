import { IConstructorParams } from "./types/index.t";
import WxNavBase from "./base";
import { INavigateTo } from "./types/navigateTo.t";
import { INavigateBack } from "./types/navigateBack.t";
import { INavigateBackTo } from "./types/navigateBackTo.t";
import { INavigateLastTo } from "./types/navigateLastTo.t";
import { IRefresh } from "./types/refresh.t";
import { ISwitchTab } from "./types/switchTab.t";
import { IReLaunch } from "./types/reLaunch.t";
import { IRedirectTo } from "./types/redirectTo.t";
export default class WxNav extends WxNavBase {
    protected navigateTo: INavigateTo;
    protected navigateBack: INavigateBack;
    protected navigateBackTo: INavigateBackTo;
    protected navigateLastTo: INavigateLastTo;
    protected refresh: IRefresh;
    protected switchTab: ISwitchTab;
    protected reLaunch: IReLaunch;
    protected redirectTo: IRedirectTo;
    constructor({ maxStack, tabBarPages, beforeEach, afterEach }?: IConstructorParams);
}
