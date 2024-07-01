var t = require("../../@babel/runtime/helpers/defineProperty"),
  e = getApp(),
  a = require("../../utils/http.js");
require("../../utils/util");
Page({
  data: {
    nadata: !1,
    examineList: [
      { value: 140101, label: "未审核" },
      { value: 140102, label: "通过" },
      { value: 140103, label: "不同意" },
    ],
    outboundList: [
      { value: 14e4, label: "未出库" },
      { value: 140001, label: "已出库" },
    ],
    bridgelist: [],
    identityCode: "",
    chengeda: { outBoundStatus: "", audit: "" },
    serinput: "",
  },
  gobride: function (t) {
    wx.navigateTo({
      url: "../brige_det/index?id=" + t.currentTarget.dataset.id,
    });
  },
  bridgelist: function (t) {
    var i = this,
      n = this,
      u = e.globalData.service + "/v1/girders/actions/search";
    a.get(u, { audit: t.audit, outBoundStatus: t.outBoundStatus }).then(
      function (t) {
        for (var e = t.data.data.items, a = 0; a < e.length; a++)
          e[a].inboundDate = n.timestampToTime(e[a].inboundDate);
        i.setData({ bridgelist: e });
      }
    );
  },
  serchlist: function (t) {
    this.setData({ serinput: t.detail.value });
  },
  goserch: function () {
    var i,
      n = this,
      u = this;
    this.setData(
      (t((i = {}), "chengeda.audit", ""),
      t(i, "chengeda.outBoundStatus", ""),
      i)
    );
    var o = e.globalData.service + "/v1/girders/actions/search";
    a.get(o, { audit: "", outboundStatus: "", keyWord: u.data.serinput }).then(
      function (t) {
        for (var e = t.data.data.items, a = 0; a < e.length; a++)
          e[a].inboundDate = u.timestampToTime(e[a].inboundDate);
        n.setData({ bridgelist: e });
      }
    );
  },
  timestampToTime: function (t) {
    if (null == t) return null;
    var e = new Date(t),
      a = e.getFullYear() + "-",
      i = e.getMonth() + 1 + "-",
      n = e.getDate() + " ";
    e.getHours(), e.getMinutes(), e.getSeconds();
    return a + i + n;
  },
  cameropen: function () {
    wx.scanCode({
      success: function (t) {
        var i = e.globalData.service + "/v1/girders/" + t.result;
        a.get(i).then(function (e) {
          400 == e.data.code
            ? wx.navigateTo({ url: "../brige_detailed/index?id=" + t.result })
            : wx.navigateTo({ url: "../brige_det/index?id=" + t.result });
        });
      },
    });
  },
  bindPickerChange: function (e) {
    var a = e.currentTarget.dataset.type;
    "audit" == a
      ? this.setData(
          t({}, "chengeda.audit", this.data.examineList[e.detail.value].value)
        )
      : "outBoundStatus" == a &&
        this.setData(
          t(
            {},
            "chengeda.outBoundStatus",
            this.data.outboundList[e.detail.value].value
          )
        ),
      this.setData({ serinput: "" }),
      this.bridgelist(this.data.chengeda);
  },
  onLoad: function (t) {
    this.bridgelist({ audit: "", outBoundStatus: "" }),
      this.setData({ identityCode: wx.getStorageSync("identityCode") });
  },
  onReady: function () {
    wx.setNavigationBarTitle({ title: "梁片管理" });
  },
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {},
});
