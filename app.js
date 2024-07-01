App({
  onLaunch: function () {
    var e = wx.getStorageSync("logs") || [];
    e.unshift(Date.now()),
      wx.setStorageSync("logs", e),
      wx.login({ success: function (e) {} });
  },
  getSessionid: function () {
    var e = wx.getStorageSync("sessionid", "");
    if ("" !== e) return e;
    wx.redirectTo({ url: "/pages/login/index" });
  },
  getTocken: function () {
    var e = wx.getStorageSync("tocken", "");
    if ("" !== e) return e;
    wx.redirectTo({ url: "/pages/login/index" });
  },
  globalData: {
    userInfo: null,
    service: "",
    currentType: 1,
    placeholder_img: "/images/placeholder_img.jpg",
    isIpx: !1,
    phoneInfo: null,
    times: 0,
  },
});
