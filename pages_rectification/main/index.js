var t = getApp(),
  e = require("../../utils/http"),
  a = require("../../utils/util");
Page({
  data: {
    currentTab: 0,
    page_now: 1,
    searchLoading: !0,
    searchLoadingComplete: !1,
    data_list: [],
    tabs: [
      { name: "我的待办", type: "monitor_dev", list: [] },
      { name: "我的发起", type: "plane_dev", list: [] },
    ],
    keyword: "",
    isLoadingList: !1,
  },
  onLoad: function (t) {
    a.getUrl();
    var e = wx.getStorageSync("identityCode");
    this.setData({ identityCode: e }), this.getToDo();
  },
  getToDo: function () {
    var i = this;
    this.setData({ searchLoading: !0 });
    var n =
      t.globalData.service +
      "/rectifies/v2/pending/actions/search?limit=1000&offset=1&status=0&keyword=" +
      this.data.keyword;
    console.log(n, i.data.page_now),
      e.get(n, {}).then(function (t) {
        if (200 !== t.statusCode)
          return (
            i.setData({ searchLoading: !1 }),
            void wx.showToast({
              title: "网络环境异常，请稍后再试~",
              icon: "none",
              duration: 2e3,
            })
          );
        var e = t.data.data.items.map(function (t) {
          return (t.createTime = a.formatTime(t.createTime)), t;
        });
        0 !== e.length
          ? i.setData({ searchLoading: !1, data_list: e, loading: !1 })
          : i.setData({ searchLoadingComplete: !0, searchLoading: !1 });
      });
  },
  searchtext: function (t) {
    console.log(t);
    var e = t.detail.value;
    this.setData({ keyword: e }),
      1 == t.target.dataset.current ? this.getRectifyLists() : this.getToDo();
  },
  getRectifyLists: function () {
    var i = this;
    i.setData({ searchLoading: !0 });
    var n =
      t.globalData.service +
      "/rectifies/v2/initiate/actions/search?limit=9999&offset=1&status=&keyword=" +
      this.data.keyword;
    console.log(n, i.data.page_now),
      e.get(n, {}).then(function (t) {
        if (200 !== t.statusCode)
          return (
            i.setData({ searchLoading: !1 }),
            void wx.showToast({
              title: "网络环境异常，请稍后再试~",
              icon: "none",
              duration: 2e3,
            })
          );
        var e = t.data.data.items.map(function (t) {
          return (t.createTime = a.formatTime(t.createTime)), t;
        });
        0 !== e.length
          ? i.setData({ searchLoading: !1, data_list: e, loading: !1 })
          : i.setData({ searchLoadingComplete: !0, searchLoading: !1 });
      });
  },
  onRefresh: function () {
    this.onLoad(), this.onReady();
  },
  onReady: function () {
    wx.setNavigationBarTitle({ title: "检查整改" });
  },
  onUnload: function () {},
  swichNav: function (t) {
    if (this.data.currentTab === t.target.dataset.current) return !1;
    this.setData({ currentTab: t.target.dataset.current, data_list: [] }),
      1 == t.target.dataset.current ? this.getRectifyLists() : this.getToDo(),
      this.setData({});
  },
  swiperChange: function (t) {
    this.setData({ currentTab: t.detail.current });
  },
  recommendToLower: function () {
    this.selectComponent("#recommend").onReachBottom();
  },
  onReachBottom: function () {
    this.setData({ page_now: this.data.page_now + 1 });
  },
  open: function (t) {
    var e = t.currentTarget.dataset.name;
    wx.navigateTo({ url: "../" + e + "/index" });
  },
});
