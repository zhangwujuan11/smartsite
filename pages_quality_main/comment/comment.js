var e = getApp(),
  t = require("../../utils/http.js");
Page({
  data: {
    uploadimgs: [],
    uploadImgs: "",
    noteMaxLen: 200,
    noteNowLen: 0,
    closed: !1,
  },
  onLoad: function (e) {
    this.setData({ id: e.id, title: e.title, uploadimgs: [] });
  },
  contentInput: function (e) {
    var t = e.detail.value,
      a = e.currentTarget.dataset.max,
      s = parseInt(t.length);
    s > a || ((this.data.describe = t), (this.data.noteNowLen = s));
  },
  chooseImage: function () {
    var e = this;
    wx.showActionSheet({
      itemList: ["从相册中选择", "拍照"],
      itemColor: "#61d89a",
      success: function (t) {
        t.cancel ||
          (0 == t.tapIndex
            ? e.chooseWxImage("album")
            : 1 == t.tapIndex && e.chooseWxImage("camera"));
      },
    });
  },
  chooseWxImage: function (e) {
    var t = this,
      a = wx.getFileSystemManager();
    wx.chooseImage({
      sizeType: ["original", "compressed"],
      sourceType: [e],
      success: function (e) {
        for (var s in e.tempFilePaths)
          a.readFile({
            filePath: e.tempFilePaths[s],
            encoding: "base64",
            success: function (e) {
              t.setData({
                uploadImgs:
                  t.data.uploadImgs +
                  "data:image/png;base64," +
                  e.data +
                  '""""',
              });
            },
          });
        t.setData({ uploadimgs: t.data.uploadimgs.concat(e.tempFilePaths) });
      },
    });
  },
  resetBtnClick: function (e) {
    this.setData({ describe: "", noteNowLen: 0, uploadimgs: [], closed: !1 });
  },
  deleteImage: function (e) {
    var t = this,
      a = t.data.uploadimgs,
      s = e.currentTarget.dataset.index;
    wx.showModal({
      title: "提示",
      content: "确定要删除此图片吗？",
      success: function (e) {
        if (e.confirm) a.splice(s, 1);
        else if (e.cancel) return !1;
        t.setData({ uploadimgs: a });
      },
    });
  },
  previewImage: function (e) {
    var t = e.target.dataset.index,
      a = this.data.uploadimgs;
    wx.previewImage({ current: a[t], urls: a });
  },
  submitBtnClick: function (a) {
    var s = this;
    a.target.dataset.id;
    if (0 == this.data.describe.length)
      wx.showToast({
        title: "请输入内容",
        image: "../images/warning-circle.png",
      });
    else {
      var o = e.globalData.service + "/save_comment_quality/";
      t.post(
        o,
        {
          MFTE_comment_data: s.data.describe,
          MFTE_comment_images: s.data.uploadImgs,
          MFTE_closed: s.data.closed,
          MFTE_id: parseInt(s.data.id),
          url_type: 1,
        },
        { "Content-Type": "application/x-www-form-urlencoded" }
      ).then(function (e) {
        console.log(e),
          e.errMsg.indexOf("request:fail") >= 0
            ? wx.showToast({
                title: "网络环境异常，请稍后再试~",
                icon: "none",
                duration: 2e3,
              })
            : wx.showToast({
                title: "发起成功",
                icon: "success",
                duration: 1500,
                mask: !1,
                success: function () {
                  s.setData({
                    describe: "",
                    noteNowLen: 0,
                    uploadimgs: [],
                    uploadImgs: "",
                  }),
                    wx.redirectTo({ url: "../main/index" });
                },
              });
      });
    }
  },
  onReady: function () {
    wx.setNavigationBarTitle({ title: "质量管理评论" });
  },
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {},
  checked: function (e) {
    var t = this.data.closed;
    (this.data.closed = !t), this.setData({ closed: this.data.closed });
  },
});
