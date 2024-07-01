var t = require("../../@babel/runtime/helpers/defineProperty"),
  e = getApp(),
  a = require("../../utils/http.js");
require("../../utils/util");
Page({
  data: {
    isenable: !0,
    identityCode: wx.getStorageSync("identityCode"),
    getinfo: {},
    comments: "",
    audit: 140102,
    outStock: { outboundAddress: "", outboundStatus: 140001 },
    chukudate: "",
  },
  enable: function () {
    this.setData({ isenable: !this.data.isenable }),
      this.data.isenable
        ? this.setData({ audit: 140102 })
        : this.setData({ audit: 140103 });
  },
  onLoad: function (t) {
    this.getinfo(t.id),
      this.setData({
        identityCode: wx.getStorageSync("identityCode"),
        audit: 140102,
      });
  },
  getinfo: function (o) {
    var i = this,
      n = this,
      s = e.globalData.service + "/v1/girders/" + o;
    a.get(s).then(function (e) {
      var a;
      i.setData(
        ((a = { getinfo: e.data.data }),
        t(a, "getinfo.tensionDate", n.timestampToTime(e.data.data.tensionDate)),
        t(a, "getinfo.pourDate", n.timestampToTime(e.data.data.pourDate)),
        t(a, "getinfo.groutDate", n.timestampToTime(e.data.data.groutDate)),
        t(a, "getinfo.inboundDate", n.timestampToTime(e.data.data.inboundDate)),
        t(
          a,
          "getinfo.outboundDate",
          n.timestampToTime(e.data.data.outboundDate)
        ),
        a)
      );
    });
  },
  approve: function () {
    var t =
      e.globalData.service +
      "/v1/girders/" +
      this.data.getinfo.girderId +
      "/actions/approve";
    a.put(t, { audit: this.data.audit, comments: this.data.comments }).then(
      function (t) {
        200 == t.statusCode
          ? wx.showToast({
              title: "提交成功",
              icon: "success",
              duration: 1500,
              mask: !1,
              success: function () {
                wx.redirectTo({ url: "../brige/index" });
              },
            })
          : wx.showToast({
              title: t.data.errors[0].defaultMessage,
              icon: "none",
              duration: 2e3,
            });
      }
    );
  },
  contentInput: function (t) {
    this.setData({ comments: t.detail.value });
  },
  contentadress: function (e) {
    this.setData(t({}, "outStock.outboundAddress", e.detail.value));
  },
  pagesFn: function () {
    wx.redirectTo({ url: "../brige/index" });
  },
  timestampToTime: function (t) {
    if (null == t) return null;
    var e = new Date(t),
      a = e.getFullYear() + "-",
      o = e.getMonth() + 1 + "-",
      i = e.getDate() + " ";
    e.getHours(), e.getMinutes(), e.getSeconds();
    return a + o + i;
  },
  outStock: function () {
    var t =
      e.globalData.service +
      "/v1/girders/" +
      this.data.getinfo.girderId +
      "/actions/outStock";
    a.put(t, this.data.outStock).then(function (t) {
      200 == t.statusCode
        ? wx.showToast({
            title: "出库成功",
            icon: "success",
            duration: 1500,
            mask: !1,
            success: function () {
              wx.redirectTo({ url: "../brige/index" });
            },
          })
        : wx.showToast({
            title: t.data.errors[0].defaultMessage,
            icon: "none",
            duration: 2e3,
          });
    }),
      console.log(this.data.outStock);
  },
  bindDateChange: function (e) {
    var a;
    "chuku" == e.currentTarget.dataset.item &&
      this.setData(
        (t(
          (a = {}),
          "outStock.outboundDate",
          new Date(e.detail.value).getTime()
        ),
        t(a, "chukudate", e.detail.value),
        a)
      );
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {},
});
