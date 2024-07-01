var t,
  a,
  e,
  i,
  n,
  r = require("../../@babel/runtime/helpers/defineProperty"),
  o = require("../../ec-canvas/echarts.js"),
  s = getApp(),
  c = require("../../utils/http"),
  l = require("../../utils/util"),
  u = null;
function h(t, a) {
  t.setOption(a, !0);
}
function d(t, r, o, s, c, l, d, p) {
  "#linchart" === t
    ? h(i, g(r, o, s, c, l, d, p))
    : "#barchart2" === t
    ? h(e, f(r, o, s, c, l, d, p))
    : "#barchart1" === t
    ? h(a, f(r, o, s, c, l, d, p))
    : "#barchartaq" === t
    ? h(n, f(r, o, s, c, l, d, p))
    : "#linchartaq" === t && h(u, g(r, o, s, c, l, d, p));
}
function g(t, a, e, i, n, r, o) {
  return {
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "cross", crossStyle: { color: "#999" } },
    },
    title: {
      text: t,
      left: "3%",
      top: "4%",
      textStyle: { color: "#ef784f", fontSize: "16px", fontWeight: "normal" },
    },
    xAxis: { type: "category", data: e },
    yAxis: {
      type: "value",
      scale: !0,
      max: parseInt(n) + 1,
      min: parseInt(i) - 1,
    },
    series: [{ data: a, type: "line", symbol: "none" }],
    grid: {
      left: "5%",
      right: "5%",
      top: "25%",
      bottom: "0",
      containLabel: !0,
    },
    type: "linear",
    x: 0,
    y: 0,
    x2: 0,
    y2: 1,
    color: {
      colorStops: [
        { offset: 0, color: r },
        { offset: 1, color: o },
      ],
      global: !1,
    },
  };
}
function f(t, a, e, i, n, r, o) {
  return {
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "cross", crossStyle: { color: "#999" } },
    },
    title: {
      text: t,
      left: "3%",
      top: "4%",
      textStyle: { color: "#ef784f", fontSize: "16px", fontWeight: "normal" },
    },
    xAxis: { type: "category", data: e },
    yAxis: { type: "value", scale: !0 },
    series: [{ data: a, type: "bar", symbol: "none" }],
    grid: {
      left: "5%",
      right: "5%",
      top: "25%",
      bottom: "0",
      containLabel: !0,
    },
    type: "linear",
    x: 0,
    y: 0,
    x2: 0,
    y2: 1,
    color: {
      colorStops: [
        { offset: 0, color: r },
        { offset: 1, color: o },
      ],
      global: !1,
    },
  };
}
Page({
  data:
    ((t = {
      currentTab: 0,
      page_now: 1,
      searchLoading: !0,
      searchLoadingComplete: !1,
      data_list: [],
      tabs: [
        { name: "质量整改", type: "monitor_dev", list: [] },
        { name: "安全整改", type: "plane_dev", list: [] },
      ],
      keyword: "",
      page_list: [],
    }),
    r(t, "page_now", 1),
    r(t, "page_total", 0),
    r(t, "limit", 4),
    r(t, "ecbarchart1", {
      disableTouch: !0,
      onInit: function (t, e, i) {
        return (a = o.init(t, null, { width: e, height: i })), t.setChart(a), a;
      },
    }),
    r(t, "ecbarchart2", {
      disableTouch: !0,
      onInit: function (t, a, i) {
        return (e = o.init(t, null, { width: a, height: i })), t.setChart(e), e;
      },
    }),
    r(t, "eclinchart", {
      disableTouch: !0,
      onInit: function (t, a, e) {
        return (i = o.init(t, null, { width: a, height: e })), t.setChart(i), i;
      },
    }),
    r(t, "eclinchartaq", {
      disableTouch: !0,
      onInit: function (t, a, e) {
        return (u = o.init(t, null, { width: a, height: e })), t.setChart(u), u;
      },
    }),
    r(t, "ecbarchartaq", {
      disableTouch: !0,
      onInit: function (t, a, e) {
        return (n = o.init(t, null, { width: a, height: e })), t.setChart(n), n;
      },
    }),
    t),
  onLoad: function (t) {
    var a = this;
    l.getUrl(),
      this.getToDo(),
      setTimeout(function () {
        a.getStaticsDateZL();
      }, 1e3);
  },
  copyArr: function (t) {
    return JSON.parse(JSON.stringify(t));
  },
  getStaticsDateZL: function () {
    var t = this,
      a =
        s.globalData.service +
        "/rectifies/v2/actions/statAmountByMonth?dataType=1",
      e =
        s.globalData.service +
        "/rectifies/v2/actions/statByProcessor?dataType=1",
      i =
        s.globalData.service +
        "/rectifies/v2/actions/statByHidDanger?dataType=1";
    c.get(a).then(function (a) {
      var e = a.data.data,
        i = t.copyArr(e.yaxis);
      if (
        (console.log(i.sort()),
        d(
          "#linchart",
          "趋势分析",
          e.yaxis,
          e.xaxis,
          i.sort(function (t, a) {
            return t - a;
          })[0] - 2,
          i.sort(function (t, a) {
            return t - a;
          })[i.length - 1] + 2,
          "#1377FE",
          "#58C2FB"
        ),
        200 !== a.statusCode)
      )
        return (
          t.setData({ searchLoading: !1 }),
          void wx.showToast({
            title: "网络环境异常，请稍后再试~",
            icon: "none",
            duration: 2e3,
          })
        );
    }),
      c.get(e).then(function (a) {
        var e = a.data.data,
          i = t.copyArr(e.yaxisSeries.bar);
        if (
          (d(
            "#barchart2",
            "责任人分析",
            e.yaxisSeries.bar,
            e.xaxis,
            i.sort(function (t, a) {
              return t - a;
            })[0] - 1,
            i.sort(function (t, a) {
              return t - a;
            })[i.length - 1] + 2,
            "#1377FE",
            "#58C2FB"
          ),
          200 !== a.statusCode)
        )
          return (
            t.setData({ searchLoading: !1 }),
            void wx.showToast({
              title: "网络环境异常，请稍后再试~",
              icon: "none",
              duration: 2e3,
            })
          );
      }),
      c.get(i).then(function (a) {
        var e = a.data.data,
          i = t.copyArr(e.yaxisSeries.bar);
        if (
          (d(
            "#barchart1",
            "类型分析",
            e.yaxisSeries.bar,
            e.xaxis,
            i.sort(function (t, a) {
              return t - a;
            })[0] - 1,
            i.sort(function (t, a) {
              return t - a;
            })[i.length - 1] + 2,
            "#1377FE",
            "#58C2FB"
          ),
          200 !== a.statusCode)
        )
          return (
            t.setData({ searchLoading: !1 }),
            void wx.showToast({
              title: "网络环境异常，请稍后再试~",
              icon: "none",
              duration: 2e3,
            })
          );
      });
  },
  getStaticsDateAQ: function () {
    var t = this,
      a =
        s.globalData.service +
        "/rectifies/v2/actions/statAmountByMonth?dataType=2",
      e =
        s.globalData.service +
        "/rectifies/v2/actions/statByHidDanger?dataType=2";
    c.get(a).then(function (a) {
      var e = a.data.data,
        i = t.copyArr(e.yaxis);
      if (
        (d(
          "#linchartaq",
          "趋势分析",
          e.yaxis,
          e.xaxis,
          i.sort(function (t, a) {
            return t - a;
          })[0] - 2,
          i.sort(function (t, a) {
            return t - a;
          })[i.length - 1] + 2,
          "#1377FE",
          "#58C2FB"
        ),
        200 !== a.statusCode)
      )
        return (
          t.setData({ searchLoading: !1 }),
          void wx.showToast({
            title: "网络环境异常，请稍后再试~",
            icon: "none",
            duration: 2e3,
          })
        );
    }),
      c.get(e).then(function (a) {
        var e = a.data.data,
          i = t.copyArr(e.yaxisSeries.bar);
        if (
          (d(
            "#barchartaq",
            "类型分析",
            e.yaxisSeries.bar,
            e.xaxis,
            i.sort(function (t, a) {
              return t - a;
            })[0] - 1,
            i.sort(function (t, a) {
              return t - a;
            })[i.length - 1] + 2,
            "#1377FE",
            "#58C2FB"
          ),
          200 !== a.statusCode)
        )
          return (
            t.setData({ searchLoading: !1 }),
            void wx.showToast({
              title: "网络环境异常，请稍后再试~",
              icon: "none",
              duration: 2e3,
            })
          );
      });
  },
  getToDo: function () {
    var t = this,
      a =
        s.globalData.service +
        "/rectifies/v2/actions/classify?limit=" +
        this.data.limit +
        "&offset=" +
        (this.data.page_now - 1) +
        "&dataType=2&keyword=" +
        this.data.keyword;
    c.get(a, {}).then(function (a) {
      if (200 !== a.statusCode)
        return (
          t.setData({ searchLoading: !1 }),
          void wx.showToast({
            title: "网络环境异常，请稍后再试~",
            icon: "none",
            duration: 2e3,
          })
        );
      var e = a.data.data.items.map(function (t) {
          return (t.createTime = l.formatTime(t.createTime)), t;
        }),
        i = [],
        n = Math.ceil(a.data.data.total / parseInt(t.data.limit)),
        r = t.data.page_now;
      n > 0 &&
        r <= n &&
        (i.push(r - 1),
        r < n && i.push(r),
        r + 1 < n &&
          (i.push(r + 1),
          r + 2 < n && (i.push(r + 2), r + 3 < n && i.push(r + 3)))),
        0 !== e.length
          ? t.setData({
              searchLoading: !0,
              data_list: e,
              page_list: i,
              page_total: Math.ceil(a.data.data.total / parseInt(t.data.limit)),
              loading: !1,
            })
          : t.setData({ searchLoadingComplete: !0, searchLoading: !1 });
    });
  },
  searchtext: function (t) {
    var a = t.detail.value;
    this.setData({ keyword: a }),
      1 == t.target.dataset.current ? this.getRectifyLists() : this.getToDo();
  },
  pagesFn: function (t) {
    var a = 1;
    if (0 == t.currentTarget.dataset.num || -1 == t.currentTarget.dataset.num)
      if (0 == t.currentTarget.dataset.num) {
        if (1 == this.data.page_now) return;
        a = this.data.page_now - 1;
      } else {
        if (
          this.data.page_now ==
          this.data.page_list[this.data.page_list.length - 1]
        )
          return;
        a = this.data.page_now + 1;
      }
    else a = t.currentTarget.dataset.num;
    this.setData({ page_now: a }),
      1 == this.data.currentTab ? this.getRectifyLists() : this.getToDo();
  },
  getRectifyLists: function () {
    var t = this,
      a =
        s.globalData.service +
        "/rectifies/v2/actions/classify?limit=" +
        this.data.limit +
        "&offset=" +
        (this.data.page_now - 1) +
        "&dataType=1&keyword=" +
        this.data.keyword;
    c.get(a, {}).then(function (a) {
      if (200 !== a.statusCode)
        return (
          t.setData({ searchLoading: !1 }),
          void wx.showToast({
            title: "网络环境异常，请稍后再试~",
            icon: "none",
            duration: 2e3,
          })
        );
      var e = a.data.data.items.map(function (t) {
          return (t.createTime = l.formatTime(t.createTime)), t;
        }),
        i = t.data.page_now,
        n = [],
        r = Math.ceil(a.data.data.total / parseInt(t.data.limit));
      r > 0 &&
        i <= r &&
        (n.push(i - 1),
        i < r && n.push(i),
        i + 1 < r &&
          (n.push(i + 1),
          i + 2 < r && (n.push(i + 2), i + 3 < r && n.push(i + 3)))),
        0 !== e.length
          ? t.setData({
              searchLoading: !0,
              data_list: e,
              page_list: n,
              page_total: Math.ceil(a.data.data.total / parseInt(t.data.limit)),
              loading: !1,
            })
          : t.setData({ searchLoadingComplete: !0, searchLoading: !1 });
    });
  },
  onRefresh: function () {
    this.onLoad(), this.onReady();
  },
  onReady: function () {
    wx.setNavigationBarTitle({ title: "质量安全" });
  },
  onUnload: function () {},
  swichNav: function (t) {
    var a = this;
    if (this.data.currentTab === t.target.dataset.current) return !1;
    this.setData({
      currentTab: t.target.dataset.current,
      data_list: [],
      page_now: 1,
    }),
      1 == t.target.dataset.current
        ? (this.getRectifyLists(),
          setTimeout(function () {
            a.getStaticsDateAQ();
          }, 1e3))
        : (this.getToDo(),
          setTimeout(function () {
            a.getStaticsDateZL();
          }, 1e3)),
      this.setData({});
  },
  swiperChange: function (t) {
    this.setData({ currentTab: t.detail.current });
  },
  recommendToLower: function () {
    this.selectComponent("#recommend").onReachBottom();
  },
  open: function (t) {
    var a = t.currentTarget.dataset.name;
    wx.navigateTo({ url: "../" + a + "/index" });
  },
});
