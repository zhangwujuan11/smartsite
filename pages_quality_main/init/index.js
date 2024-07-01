var e = getApp(),
  t = require("../../utils/http");
Page({
  data: {
    director_user: "",
    title: "",
    describe: "",
    titleMaxLen: 23,
    titleNowLen: 0,
    noteMaxLen: 200,
    noteNowLen: 0,
    uploadimgs: [],
    editable: !1,
    date: "",
    index: "",
    processorId: "",
    username: "",
    userList: [],
  },
  onLoad: function () {
    this.setData({ uploadimgs: [] }), this.getUserList();
  },
  onReady: function () {
    wx.setNavigationBarTitle({ title: "发起整改" });
  },
  bindDateChange: function (e) {
    this.setData({ date: e.detail.value });
  },
  bindPickerChange: function (e) {
    debugger;
    var t = this.data.userList[e.detail.value - 0];
    this.setData({ processorId: t.userId }),
      this.setData({ username: t.nickName });
  },
  getUserList: function () {
    var a = this,
      s = e.globalData.service + "/v1/communal/users/dropdown";
    t.get(s).then(function (e) {
      200 == e.statusCode &&
        (console.log(e.data.items), a.setData({ userList: e.data.items }));
    });
  },
  contentInput: function (e) {
    var t = e.detail.value,
      a = e.currentTarget.dataset.max,
      s = e.currentTarget.dataset.type,
      i = parseInt(t.length);
    i > a ||
      ("title" == s
        ? this.setData({ title: t, titleNowLen: i })
        : "content" == s
        ? this.setData({ describe: t, noteNowLen: i })
        : this.setData({ director_user: t }));
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
        var s =
          e.globalData.service + "/v1/communal/files/import/actions/upload";
        wx.uploadFile({
          filePath: t.tempFilePaths[0],
          name: "file",
          header: { "content-type": "multipart/form-data" },
          url: s,
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
  resetBtnClick: function (e) {
    this.setData({
      director_user: "",
      title: "",
      describe: "",
      noteNowLen: 0,
      uploadimgs: [],
      date: "",
    });
  },
  previewImage: function (e) {
    var t = e.target.dataset.index,
      a = this.data.uploadimgs;
    wx.previewImage({ current: a[t], urls: a });
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
  submitBtnClick: function (a) {
    var s = this;
    debugger;
    if (0 != this.data.title.length)
      if (0 != this.data.processorId.length)
        if (0 != this.data.describe.length)
          if (0 != this.data.uploadimgs.length) {
            var i = e.globalData.service + "/v1/security",
              o = s.data.date ? new Date(s.data.date).getTime() : "";
            t.post(i, {
              context: s.data.describe,
              title: s.data.title,
              cover: s.data.uploadimgs.join(","),
              nextProcessorId: s.data.processorId,
              effectTime: o,
              orders: 0,
              status: 0,
            }).then(function (e) {
              console.log(e);
              debugger;
              200 === e.statusCode
                ? wx.showToast({
                    title: "发起成功",
                    icon: "success",
                    duration: 1500,
                    mask: !1,
                    success: function () {
                      s.setData({
                        director_user: "",
                        describe: "",
                        title: "",
                        titleNowLen: 0,
                        noteNowLen: 0,
                        uploadimgs: [],
                        uploadImgs: "",
                        checked: 0,
                      }),
                        wx.redirectTo({ url: "../main/index" });
                    },
                  })
                : wx.showToast({
                    title: "网络环境异常，请稍后再试~",
                    icon: "none",
                    duration: 2e3,
                  });
            });
          } else
            wx.showToast({
              title: "请选择图片",
              image: "images/warning-circle.png",
            });
        else
          wx.showToast({
            title: "请输入内容",
            image: "../images/warning-circle.png",
          });
      else
        wx.showToast({
          title: "请输入负责人",
          image: "../images/warning-circle.png",
        });
    else
      wx.showToast({
        title: "请输入标题",
        image: "../images/warning-circle.png",
      });
  },
});
