import { getUrlRoute, MAX_PAGES_LENGTH } from "./utils"
import { IPureStringObject } from "./types/index.t"

export default class WxNavBase {
  protected maxStack: number = MAX_PAGES_LENGTH
  protected tabBarPages: IPureStringObject = {}
  protected tabBarPagesAlias: string[] = []
  protected tabBarPagesRoute: string[] = []

  protected initTabBarPages(tabBarPages: IPureStringObject) {
    this.tabBarPages = tabBarPages

    this.tabBarPagesAlias = Object.keys(tabBarPages)
    this.tabBarPagesRoute = this.tabBarPagesAlias.map(alias =>
      getUrlRoute(tabBarPages[alias])
    )
  }

  protected get currentPageRoute(): string {
    const pages = getCurrentPages()
    return (pages[pages.length - 1] as any).route as string
  }

  /**
   *
   * @param {string} target url or url alias
   */
  protected checkTabBarPage(target: string) {
    return (
      this.checkTabBarPageWithAlias(target) ||
      this.checkTabBarPageWithRoute(target)
    )
  }

  protected checkTabBarPageWithAlias(alias: string) {
    return !!~this.tabBarPagesAlias.indexOf(alias)
  }

  protected checkTabBarPageWithRoute(pageRoute: string) {
    return !!~this.tabBarPagesRoute.indexOf(getUrlRoute(pageRoute))
  }
}
