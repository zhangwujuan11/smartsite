var e = getApp(),
  t = require("../../Component/wxParse/wxParse.js"),
  a = require("../../utils/http.js");
Page({
  data: {
    title: "",
    loading: !0,
    news_id: 1,
    movie: {},
    news_url: e.globalData.service,
    news_dict: {},
    type: "party_build",
    htmlSnip: "",
    modalHidden: !0,
    describe: "",
    tab: "",
    items: [
      { value: "1", name: "无", checked: "true" },
      { value: "2", name: "处理订单" },
      { value: "3", name: "转派" },
    ],
    status: "1",
    proid: "",
    uploadimgs: [],
    userList: [],
  },
  onLoad: function (e) {
    this.setData({ type: e.type, id: e.id, tab: e.tab, proid: e.proid }),
      wx.setNavigationBarTitle({ title: "检查整改" }),
      this.getNewsDetailByID(e.id, e.type),
      this.getUserList();
  },
  getUserList: function () {
    var t = this,
      i =
        (res.data.data.items.map(function (e) {
          return (e.effectTime = util.formatTime(e.effectTime)), e;
        }),
        e.globalData.service + "/v1/communal/users/dropdown");
    a.get(i).then(function (e) {
      200 == e.statusCode &&
        (console.log(e.data.items), t.setData({ userList: e.data.items }));
    });
  },
  getNewsDetailByID: function (i, s) {
    var o,
      n = this;
    (o = e.globalData.service + "/v1/rectifies/" + i),
      a.get(o).then(function (e) {
        if (200 != e.statusCode)
          return (
            n.setData({ loading: !1 }),
            void wx.showToast({
              title: "网络环境异常，请稍后再试~",
              icon: "none",
              duration: 2e3,
            })
          );
        t.wxParse("article", "html", e.data.data.context, n, 5);
        var a = n.formatime(e.data.data.createTime),
          i = {
            mfteTitle: e.data.data.title,
            mfteCreateTime: a,
            finishTime: n.formatime(e.data.data.effectTime),
          },
          s = e.data.data.cover,
          o = [];
        s && (o = s.split(",")),
          n.setData({ news_dict: i, loading: !1, img_list: o });
      });
  },
  formatime: function (e) {
    if (e) {
      var t = new Date(e);
      return (
        t.getFullYear() +
        "-" +
        (t.getMonth() + 1) +
        "-" +
        t.getDate() +
        " " +
        t.getHours() +
        ":" +
        t.getMinutes()
      );
    }
  },
  previewImage: function (e) {
    var t = e.target.dataset.index,
      a = this.data.img_list;
    wx.previewImage({ current: a[t], urls: a });
  },
  onReady: function () {},
  contentInput: function (e) {
    console.log(e);
    var t = e.detail.value;
    this.setData({ describe: t });
  },
  radioChange: function (e) {
    console.log(e.detail.value);
    for (var t = this.data.items, a = 0, i = t.length; a < i; ++a)
      t[a].checked = t[a].value === e.detail.value;
    this.setData({ items: t, status: e.detail.value });
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
  chooseWxImage: function (t) {
    var a = this;
    wx.getFileSystemManager();
    wx.chooseImage({
      sizeType: ["original", "compressed"],
      sourceType: [t],
      success: function (t) {
        var i =
          e.globalData.service + "/v1/communal/files/import/actions/upload";
        wx.uploadFile({
          filePath: t.tempFilePaths[0],
          name: "file",
          header: { "content-type": "multipart/form-data" },
          url: i,
          success: function (e) {
            console.log(e);
          },
          complete: function (e) {
            console.log(JSON.parse(e.data));
            var t = JSON.parse(e.data);
            a.setData({
              uploadimgs: a.data.uploadimgs.concat(t.data.objectUrl),
            });
          },
        });
      },
    });
  },
  deleteImage: function (e) {
    var t = this,
      a = t.data.uploadimgs,
      i = e.currentTarget.dataset.index;
    wx.showModal({
      title: "提示",
      content: "确定要删除此图片吗？",
      success: function (e) {
        if (e.confirm) a.splice(i, 1);
        else if (e.cancel) return !1;
        t.setData({ uploadimgs: a });
      },
    });
  },
  bindPickerChange: function (e) {
    var t = this.data.userList[e.detail.value - 0];
    this.setData({ processorId: t.userId }),
      this.setData({ username: t.nickName });
  },
  back: function () {
    wx.redirectTo({ url: "../main/index" });
  },
  confirm: function () {
    var t = this.data.status,
      i = this.data.describe;
    if ("2" === t) {
      var s =
          e.globalData.service +
          "/v1/rectifies/processes/" +
          this.data.proid +
          "/actions/handle",
        o = { context: i, cover: this.data.uploadimgs.join(",") };
      a.post(s, o).then(function (e) {
        200 == e.data.code &&
          wx.showToast({
            title: "处理成功",
            icon: "success",
            duration: 1500,
            mask: !1,
            success: function () {
              wx.redirectTo({ url: "../main/index" });
            },
          });
      });
    } else if ("3" === t) {
      o = { context: i, nextProcessorId: this.data.processorId };
      var n =
        e.globalData.service +
        "/v1/rectifies/processes/" +
        this.data.proid +
        "/actions/forward";
      a.post(n, o).then(function (e) {
        200 == e.data.code &&
          wx.showToast({
            title: "转派成功",
            icon: "success",
            duration: 1500,
            mask: !1,
            success: function () {
              wx.redirectTo({ url: "../main/index" });
            },
          });
      });
    }
  },
});
