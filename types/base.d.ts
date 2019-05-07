import { IPureStringObject } from "./types/index.t";
export default class WxNavBase {
    protected maxStack: number;
    protected tabBarPages: IPureStringObject;
    protected tabBarPagesAlias: string[];
    protected tabBarPagesRoute: string[];
    protected initTabBarPages(tabBarPages: IPureStringObject): void;
    protected readonly currentPageRoute: string;
    /**
     *
     * @param {string} target url or url alias
     */
    protected checkTabBarPage(target: string): boolean;
    protected checkTabBarPageWithAlias(alias: string): boolean;
    protected checkTabBarPageWithRoute(pageRoute: string): boolean;
}
