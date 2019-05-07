# wx-nav

[中文说明](./README.zh_cn.md)

powerful weixin miniapp router.

`wx-nav` 's APIs relative to weixin miniapp official API:

|                 |   wx-nav API   |
| :-------------: | :------------: |
|  wx.navigateTo  |   navigateTo   |
| wx.navigateBack |  navigateBack  |
|                 | navigateBackTo |
|                 | navigateLastTo |
|                 |    refresh     |
|  wx.switchTab   |   switchTab    |
|  wx.redirectTo  |   redirectTo   |
|   wx.reLaunch   |    reLaunch    |

## Feature

1. router interceptor

1. new `API`

1. deal with the max count of weixin miniapp page stack

1. when target page is repeated sequential, `navigateBack`、`navigateBackTo`、`navigateLastTo` will merge them

1. auto deal `tabBar` page

1. better performance and code experience

## install

require `./dist/index.js`

or use `npm` or `yarn`:

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
  redirectTo,
  reLaunch
} = new WxNav({
  maxStack: 10, // optional. default value 10. max length of page stack.
  // optional. for `refresh()` or `switchTab(pageAlias)`
  tabBarPages: {
    // pageAlias: pageRoute
    home: "pages/home/main",
    userCenter: "pages/userCenter/main"
  },
  beforeEach(){},  // optional
  afterEach(){}  // optional
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

`navigateTo(url, params, cb)`

- `url`: string.
- `params`: object. like `{a:b, c:d}` will be transform to `${url}?a=b&c=d`.
- `cb`: function. optional. receive a boolean value that mark the function call success or fail.

like `wx.navigateTo`, but `navigateTo` will use `redirectTo` instead when current pages length is MAX_PAGES_LENGTH.

### navigateBack

`navigateBack(delta ,cb)`

`navigateBack(cb)`

- `delta`: integer. default value is 1.

like `wx.navigateBack`, but `navigateBack()` will check the target url whether repeat sequential or not. if page stack is `[A, B, C, C, C, D]`, `navigateBack()` will be back to page C, stack is `[A, B, C]`.

### navigateBackTo

`navigateBackTo(url, cb)`

`navigateBackTo(url)` will find the latest `url` page in page stack, and back to the page. there is also check `url` whether repeat sequential or not. if `url` is repeated, back to the earlist `url`. if page stack is `[A, B, C, C, C, D, E, F]`, `navigateBackTo(C)` will be back to page C, stack is `[A, B, C]`.

### navigateLastTo

`navigateLastTo(url, cb)`

`navigateLastTo(url)` assert last page is `url`, and back to `url`。

1. if last page is `url` and repeat:
   page stack is `[A, B, C, C, C, D]`, `navigateLastTo(C)` will change page stack to `[A, B, C]`。
2. if last page is not `url`，there is call `redirectTo(url)` inside。
   page stack is `[A, B, C, D]`, `navigateLastTo(C)` will cahnge page stack to `[A, B, C]`.
   page stack is `[A, B, C, D]`, `navigateLastTo(D)` will change page stack to `[A, B, C, D]`, current page `D` will refresh。

### refresh

`refresh(cb)`

refresh current page, such as TabBar page.

### switchTab

`switchTab(target, cb)`

- `target`: string. `url` or alias of `url`.

### redirectTo

`redirectTo(url, params, cb)`

### reLaunch

`reLaunch(url, params, cb)`

it's better perfermance than `wx.reLaunch`.

## License

MIT
