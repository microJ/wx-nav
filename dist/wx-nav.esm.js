function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

var MAX_PAGES_LENGTH = 10;
/**
 * not start with '/', page stack saved route style
 * @param {string} url
 * @returns {string}
 */

var getUrlRoute = function getUrlRoute(url) {
  return url.replace(/^\//, "").replace(/\?.*/, "");
};
/**
 * start with '/', wx APIs reveive route style
 * @param {string} url
 */

var safeWxApiTargetUrl = function safeWxApiTargetUrl(url) {
  return url[0] === "/" ? url : "/" + url;
}; // [A, B, C, D]

var getRepeatCountOfDelta = function getRepeatCountOfDelta() {
  var delta = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  var repeatCount = 0;
  var pages = getCurrentPages();

  if (pages.length - delta > 1) {
    pages = pages.slice(0, pages.length - delta);
    var pagesLength = pages.length;
    var finalIndex = pagesLength - 1;
    var url = pages[finalIndex].route;

    for (var index = finalIndex - 1; index >= 0; index--) {
      if (pages[index].route !== url) {
        break;
      }

      repeatCount++;
    }
  }

  return repeatCount;
};
/**
 *
 * @param {string} url
 * @returns {number}
 */

var findLastUrlDelta = function findLastUrlDelta(url) {
  var pages = getCurrentPages();
  var targetIndex = pages.map(function (page) {
    return page.route;
  }).lastIndexOf(getUrlRoute(url), -2);

  if (targetIndex < 0) {
    return -1;
  }

  var delta = pages.length - 1 - targetIndex;
  var repeatCount = getRepeatCountOfDelta(delta);
  return delta + repeatCount;
};
var emptyFn = function emptyFn() {};
var parseObj2QueryStr = function parseObj2QueryStr() {
  var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return Object.keys(query).reduce(function (acc, key) {
    return "".concat(acc).concat(key, "=").concat(query[key], "&");
  }, "&");
};
/**
 * url can not be strict that start with '/'. also can with "?query1=value1&query2=value2"
 */

var joinUrlAndQuery = function joinUrlAndQuery(url) {
  var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var splitStr = /\?/.test(url) ? "" : "?";
  return safeWxApiTargetUrl(url) + splitStr + parseObj2QueryStr(query);
};
/**
 * default return query as {}, return cb as emptyFn
 */

var getQueryAndCb = function getQueryAndCb() {
  var query = {};
  var cb = emptyFn;

  for (var _len = arguments.length, payload = new Array(_len), _key = 0; _key < _len; _key++) {
    payload[_key] = arguments[_key];
  }

  payload.forEach(function (v) {
    if (typeof v === "function") {
      cb = v;
    } else if (Object.prototype.toString.call(v) === "[object Object]") {
      query = v;
    }
  });
  return {
    query: query,
    cb: cb
  };
};

var redirectTo = function redirectTo(url) {
  for (var _len = arguments.length, payload = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    payload[_key - 1] = arguments[_key];
  }

  var _getQueryAndCb = getQueryAndCb.apply(void 0, payload),
      query = _getQueryAndCb.query,
      cb = _getQueryAndCb.cb;

  wx.redirectTo({
    url: joinUrlAndQuery(url, query),
    success: function success() {
      cb(true);
    },
    fail: function fail() {
      cb(false);
    }
  });
};

var navigateTo = function navigateTo(url) {
  for (var _len = arguments.length, payload = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    payload[_key - 1] = arguments[_key];
  }

  var _getQueryAndCb = getQueryAndCb.apply(void 0, payload),
      query = _getQueryAndCb.query,
      cb = _getQueryAndCb.cb;

  var pages = getCurrentPages();

  if (pages.length >= this.maxStack) {
    redirectTo(url, query, cb);
  } else {
    wx.navigateTo({
      url: joinUrlAndQuery(url, query),
      success: function success() {
        cb(true);
      },
      fail: function fail() {
        cb(false);
      }
    });
  }
};

var navigateBack = function navigateBack() {
  var delta = 1,
      cb = emptyFn;

  for (var _len = arguments.length, payload = new Array(_len), _key = 0; _key < _len; _key++) {
    payload[_key] = arguments[_key];
  }

  payload.forEach(function (param) {
    if (Number.isInteger(param)) {
      delta = param;
    } else if (typeof param === "function") {
      cb = param;
    }
  });
  var repeatCount = getRepeatCountOfDelta(delta);
  wx.navigateBack({
    delta: delta + repeatCount,
    success: function success() {
      cb(true);
    },
    fail: function fail() {
      cb(false);
    }
  });
};

/**
 *
 * @param {string} url
 * @returns {void}
 */
var navigateBackTo = function navigateBackTo(url) {
  var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : emptyFn;
  var delta = findLastUrlDelta(url);

  if (delta > 0) {
    wx.navigateBack({
      delta: delta,
      success: function success() {
        cb(true);
      },
      fail: function fail() {
        cb(false);
      }
    });
  } else {
    // eslint-disable-next-line
    console.warn("\u4F7F\u7528 navigateBackTo() \u8DF3\u8F6C\u7684\u9875\u9762\u8DEF\u5F84 ".concat(url, " \u5728\u9875\u9762\u6808\u4E2D\u4E0D\u5B58\u5728\uFF0C\u5DF2\u4F7F\u7528 redirectTo() \u91CD\u5B9A\u5411"));
    redirectTo(url, {}, cb);
  }
};

var navigateLastTo = function navigateLastTo(url) {
  var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : emptyFn;
  var pages = getCurrentPages();
  var lastPageRoute = pages[pages.length - 2];

  if (lastPageRoute === getUrlRoute(url)) {
    navigateBack(cb);
  } else {
    redirectTo(url, {}, cb);
  }
};

var refresh = function refresh() {
  var cb = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : emptyFn;
  // eslint-disable-next-line
  var pages = getCurrentPages();
  var currentPage = pages[pages.length - 1];
  var _ref = currentPage,
      route = _ref.route,
      options = _ref.options;

  if (this.checkTabBarPageWithRoute(route)) {
    wx.switchTab({
      url: safeWxApiTargetUrl(route),
      success: function success() {
        cb(true);
      },
      fail: function fail() {
        cb(false);
      }
    });
  } else {
    redirectTo(route, options, cb);
  }
};

var switchTab = function switchTab(target) {
  var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : emptyFn;
  var route;

  if (this.checkTabBarPageWithAlias(target)) {
    route = this.tabBarPages[target];
  } else if (this.checkTabBarPageWithRoute(target)) {
    route = target;
  } else {
    return;
  }

  wx.switchTab({
    url: safeWxApiTargetUrl(route).split("?")[0],
    success: function success() {
      cb(true);
    },
    fail: function fail() {
      cb(false);
    }
  });
};

var reLaunch = function reLaunch(url) {
  for (var _len = arguments.length, payload = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    payload[_key - 1] = arguments[_key];
  }

  var _getQueryAndCb = getQueryAndCb.apply(void 0, payload),
      query = _getQueryAndCb.query,
      cb = _getQueryAndCb.cb; // eslint-disable-next-line


  var pages = getCurrentPages(); // 1. redirect

  if (pages.length <= 1) {
    redirectTo(url, query, cb);
  } else if (pages[0].route === getUrlRoute(url)) {
    // 2. back to first page and refresh
    wx.navigateBack({
      delta: pages.length - 1,
      success: function success() {
        redirectTo(url, query, cb);
      },
      fail: function fail() {
        wx.reLaunch({
          url: url
        });
      }
    });
  } else {
    // 3. wx.reLaunch
    wx.reLaunch({
      url: url
    });
  }
};

var WxNavBase =
/*#__PURE__*/
function () {
  function WxNavBase() {
    _classCallCheck(this, WxNavBase);

    _defineProperty(this, "maxStack", MAX_PAGES_LENGTH);

    _defineProperty(this, "tabBarPages", {});

    _defineProperty(this, "tabBarPagesAlias", []);

    _defineProperty(this, "tabBarPagesRoute", []);
  }

  _createClass(WxNavBase, [{
    key: "initTabBarPages",
    value: function initTabBarPages(tabBarPages) {
      this.tabBarPages = tabBarPages;
      this.tabBarPagesAlias = Object.keys(tabBarPages);
      this.tabBarPagesRoute = this.tabBarPagesAlias.map(function (alias) {
        return getUrlRoute(tabBarPages[alias]);
      });
    }
  }, {
    key: "checkTabBarPage",

    /**
     *
     * @param {string} target url or url alias
     */
    value: function checkTabBarPage(target) {
      return this.checkTabBarPageWithAlias(target) || this.checkTabBarPageWithRoute(target);
    }
  }, {
    key: "checkTabBarPageWithAlias",
    value: function checkTabBarPageWithAlias(alias) {
      return !!~this.tabBarPagesAlias.indexOf(alias);
    }
  }, {
    key: "checkTabBarPageWithRoute",
    value: function checkTabBarPageWithRoute(pageRoute) {
      return !!~this.tabBarPagesRoute.indexOf(getUrlRoute(pageRoute));
    }
  }, {
    key: "currentPageRoute",
    get: function get() {
      var pages = getCurrentPages();
      return pages[pages.length - 1].route;
    }
  }]);

  return WxNavBase;
}();

var apisMap = {
  navigateTo: navigateTo,
  navigateBack: navigateBack,
  navigateBackTo: navigateBackTo,
  navigateLastTo: navigateLastTo,
  refresh: refresh,
  switchTab: switchTab,
  reLaunch: reLaunch,
  redirectTo: redirectTo
};
var apisNeedDealTabBar = ["navigateTo", "navigateBackTo", "navigateLastTo", "redirectTo", "reLaunch"];

var WxNav =
/*#__PURE__*/
function (_WxNavBase) {
  _inherits(WxNav, _WxNavBase);

  function WxNav() {
    var _this;

    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$maxStack = _ref.maxStack,
        maxStack = _ref$maxStack === void 0 ? MAX_PAGES_LENGTH : _ref$maxStack,
        _ref$tabBarPages = _ref.tabBarPages,
        tabBarPages = _ref$tabBarPages === void 0 ? {} : _ref$tabBarPages,
        beforeEach = _ref.beforeEach,
        afterEach = _ref.afterEach;

    _classCallCheck(this, WxNav);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(WxNav).call(this));

    _defineProperty(_assertThisInitialized(_this), "navigateTo", void 0);

    _defineProperty(_assertThisInitialized(_this), "navigateBack", void 0);

    _defineProperty(_assertThisInitialized(_this), "navigateBackTo", void 0);

    _defineProperty(_assertThisInitialized(_this), "navigateLastTo", void 0);

    _defineProperty(_assertThisInitialized(_this), "refresh", void 0);

    _defineProperty(_assertThisInitialized(_this), "switchTab", void 0);

    _defineProperty(_assertThisInitialized(_this), "reLaunch", void 0);

    _defineProperty(_assertThisInitialized(_this), "redirectTo", void 0);

    _this.maxStack = maxStack;

    _this.initTabBarPages(tabBarPages);

    var apisName = Object.keys(apisMap);
    apisName.forEach(function (apiName) {
      _this[apiName] = function () {
        for (var _len = arguments.length, payload = new Array(_len), _key = 0; _key < _len; _key++) {
          payload[_key] = arguments[_key];
        }

        var from = _this.currentPageRoute;
        var to = payload[0];

        var next = function next() {
          // deal tabBar route
          if (~apisNeedDealTabBar.indexOf(apiName) && _this.checkTabBarPage(to)) {
            switchTab.call.apply(switchTab, [_assertThisInitialized(_this)].concat(_toConsumableArray(payload)));
          } else {
            var _ref2;

            (_ref2 = apisMap[apiName]).call.apply(_ref2, [_assertThisInitialized(_this)].concat(payload));
          }

          afterEach && afterEach(to, from);
        };

        beforeEach ? beforeEach(to, from, next) : next();
      };
    });
    return _this;
  }

  return WxNav;
}(WxNavBase);

export default WxNav;
