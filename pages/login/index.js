var e = require("../../utils/http"),
  t = getApp();
Page({
  data: {
    userInfo: {},
    hasUserInfo: !1,
    canIUse: wx.canIUse("button.open-type.getUserInfo"),
    canIUseGetUserProfile: !1,
    canIUseOpenData:
      wx.canIUse("open-data.type.userAvatarUrl") &&
      wx.canIUse("open-data.type.userNickName"),
    background_url: t.globalData.service + "/webfiles/img/wechat/bg2.png",
    image_height: 0,
    agree: !1,
    basurl: "",
  },
  onLoad: function (e) {
    this.getPageHeight();
  },
  getPageHeight: function () {},
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {},
  loginForm: function (e) {
    if (
      (wx.showLoading({ title: "登录中" }),
      e.detail.value.name.indexOf("admin") >= 0)
    ) {
      (getApp().globalData.service = "https://zhgd.starhope.net/"),
        this.gologin(
          e,
          "https://zhgd.starhope.net/accounts/v1/actions/loginByPassword"
        );
    } else if (e.detail.value.name.indexOf("gt_") >= 0) {
      
      (getApp().globalData.service = "https://zhgd3.starhope.net/"),
    //   (getApp().globalData.service = "http://192.168.110.161:8094/"),
        this.gologin(
          e,
          "https://zhgd3.starhope.net/accounts/v1/actions/loginByPassword"
        );
    } else if (e.detail.value.name.indexOf("sh_") >= 0) {
      (getApp().globalData.service = "https://zhgd2.starhope.net/"),
        this.gologin(
          e,
          "https://zhgd2.starhope.net/accounts/v1/actions/loginByPassword"
        );
    } else
      wx.showToast({ title: "登录用户存在", icon: "error", duration: 2e3 }),
        wx.hideLoading();
  },
  gologin: function (e, t) {
    console.log(t);
    var a = this;
    wx.request({
      url: t,
      header: { "content-type": "application/json; charset=utf-8" },
      method: "POST",
      data: {
        userName: e.detail.value.name,
        password: e.detail.value.pwd,
        code: "",
      },
      success: function (e) {
        200 === e.data.code
          ? (wx.setStorageSync("sessionid", e.data.data.token),
            wx.setStorageSync("tocken", e.data.data.token),
            wx.setStorageSync("expireTime", e.data.data.expireTime),
            wx.showToast({ title: "登录成功", icon: "success", duration: 2e3 }),
            a.getUserInfo(),
            wx.switchTab({ url: "/pages/home/index" }))
          : wx.showToast({
              title: e.data.data.detail,
              icon: "error",
              duration: 2e3,
            });
      },
      fail: function (e) {
        wx.showToast({ title: "网络异常", icon: "error", duration: 2e3 });
      },
      complete: function (e) {
        wx.hideLoading();
      },
    });
  },
  getUserInfo: function () {
    var a = t.globalData.service + "/accounts/v1/users";
    e.get(a).then(function (e) {
      console.log(2222),
        console.log(e),
        wx.setStorageSync("username", e.data.data.userName),
        wx.setStorageSync("identityCode", e.data.data.identityCode),
        wx.setStorageSync("userId", e.data.data.userId);
    });
  },
  checkboxchange: function () {
    this.setData({ agree: !this.data.agree });
  },
});
