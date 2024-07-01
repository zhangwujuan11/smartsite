var t = require("../../utils/http"),
  e = (require("../../utils/util"), getApp());
Page({
  data: { keyword: "", list: [], dataId: "", pid: "" },
  onLoad: function (t) {
    t.id
      ? (this.getFileList(t.id), this.setData({ dataId: t.id, pid: t.pid }))
      : (this.getFileList(0), this.setData({ dataId: null }));
  },
  returnback: function () {
    this.data.list && this.data.list.length > 0
      ? this.data.pid
        ? wx.navigateTo({
            url: "../../pages_home/profile/index?id=" + this.data.pid,
          })
        : wx.navigateTo({ url: "../../pages_home/profile/index" })
      : wx.navigateBack({ delta: 1 });
  },
  getFileList: function (i) {
    var a = this,
      n = e.globalData.service + "/front/v1/folderfile/list/" + i;
    console.log(n),
      t.get(n, { keyword: this.data.keyword }).then(function (t) {
        if ((console.log(t), t.errMsg.indexOf("request:fail") >= 0))
          return (
            a.setData({ searchLoading: !1 }),
            void wx.showToast({
              title: "网络环境异常，请稍后再试~",
              icon: "none",
              duration: 2e3,
            })
          );
        a.setData({
          page_now: a.data.page_now,
          page_list: Math.ceil(t.data.total / parseInt(a.data.limit)),
          list: t.data.items,
        });
      });
  },
  jumpnext: function (t) {
    var e = t.currentTarget.dataset.item;
    wx.navigateTo({
      url:
        "../../pages_home/profile/index?id=" +
        e +
        "&pid=" +
        this.data.list[0].pid,
    });
  },
  previewFile: function (t) {
    console.log(t);
    var e = t.currentTarget.dataset.item;
    wx.downloadFile({
      url: e,
      success: function (t) {
        var e = t.tempFilePath;
        wx.openDocument({
          filePath: e,
          success: function (t) {
            console.log("打开文档成功");
          },
        });
      },
    });
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {},
});
