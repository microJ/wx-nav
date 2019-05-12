# wx-nav

微信路由增强工具.

`wx-nav` 的 `api` 完全根据微信小程序原生 `api` 实现和扩展:

|                 |   wx-nav API   |
| :-------------: | :------------: |
|  wx.navigateTo  |   navigateTo   |
| wx.navigateBack |  navigateBack  |
|                 | navigateBackTo |
|                 | navigateLastTo |
|                 |    refresh     |
|  wx.switchTab   |   switchTab    |
|   wx.reLaunch   |    reLaunch    |
|  wx.redirectTo  |   redirectTo   |

## Feature

1. 路由拦截器

1. 新增 `API`

1. 处理小程序页面栈最大长度问题

1. 回退时自动处理连续重复页面，包括 `navigateBack`、`navigateBackTo`、`navigateLastTo`

1. 根据路由自动处理 `tabBar` 页面跳转

1. 更好的性能和编码体验

## install

引入 `./dist/wx-nav.cjs.js` 或 `./dist/wx-nav.esm.js`。

或者使用 `npm` or `yarn` 安装:

`npm i --save wx-nav`

`yarn add wx-nav`

## Usage

```js
// src/utils/wxnav.js
import WxNav from "wx-nav"

export const {
  navigateTo,
  navigateBack,
  navigateBackTo,
  navigateLastTo,
  refresh,
  switchTab,
  reLaunch,
  redirectTo
} = new WxNav({
  // optional. default value 10. max length of page stack.
  maxStack: 10,
  // optional. for `refresh()` or `switchTab(pageAlias)`
  tabBarPages: {
    // pageAlias: pageRoute
    home: "pages/home/main",
    userCenter: "pages/userCenter/main"
  },
  // optional
  beforeEach(apiName, to, from, next){
    next()
  },
  // optional
  afterEach(apiName, to, from){}
})

// index.vue
goToNextPage(){
  navigateTo("pages/nextpage/main", {from: "home"}, (isSuccess) => {
    if(!isSuccess){
      console.log("navigateTo fail")
    }
  })
}
```

## API

### navigateTo

`navigateTo(url [, query [, cb]])`
`navigateTo(url [, cb])`

- `url`: string.
- `query`: object. 类似 `{a:b, c:d}` 会被拼接为页面地址参数 `${url}?a=b&c=d`.
- `cb`: function. 可选。接收一个布尔值表明跳转是否成功。

类似 `wx.navigateTo`, 不同的是，如果当前页面栈的长度是限定值时，`navigateTo` 会自动调用 `redirectTo`。

### navigateBack

`navigateBack(delta, cb)`
`navigateBack(cb)`
`navigateBack()`

- `delta`: integer。后退页数。默认为 `1`。

类似 `wx.navigateBack`, 但是 `navigateBack()` 会检查上个路径是否重复。如果当前页面栈是 `[A, B, C, C, C, D]`, `navigateBack()` 调用后页面栈会变为 `[A, B, C]`。

### navigateBackTo

`navigateBackTo(url [, cb])`

`navigateBackTo(url)` 会在页面栈中前面的页面中找到最后面的 `url` 并返回到该页。此时，如果 `url` 重复，会进行处理。
如果页面栈是 `[A, C, B, C, C, C, D, E, F]`, `navigateBackTo(C)` 调用后页面栈变为 `[A, C, B, C]`。

### navigateLastTo

`navigateLastTo(url [, cb])`

`navigateLastTo(url)` 断言上一页是 `url` 并返回到 `url`。

1. 如果 `url` 重复，会进行处理。
   如果页面栈是 `[A, B, C, C, C, D]`, `navigateLastTo(C)` 调用后页面栈变为 `[A, B, C]`。
2. 如果上个页面不是 `url`，则会调用 `redirectTo()` 重定向到 `url`。
   如果页面栈是 `[A, B, C, D]`, `navigateLastTo(C)` 调用后页面栈变为 `[A, B, C]`。
   如果页面栈是 `[A, B, C, D]`, `navigateLastTo(D)` 调用后页面栈变为 `[A, B, C, D]`, 当前页面 `D` 会刷新。

### refresh

`refresh(cb)`
`refresh()`

刷新当前页面，支持 `TabBar` 页面。

### switchTab

`switchTab(target [, cb])`

- `target`: string. `url` 或者 `url` 的别名。
  官方 `api` 不支持 `url` 带参，故不支持 `query`。详情见 [官方文档](https://developers.weixin.qq.com/miniprogram/dev/api/wx.switchTab.html)

### redirectTo

`redirectTo(url [, query, cb])`
`redirectTo(url [, cb])`

### reLaunch

`reLaunch(url [, query, cb])`
`reLaunch(url [, cb])`

比 `wx.reLaunch` 拥有更好的性能。

## License

MIT
