var e = require("../../@babel/runtime/helpers/defineProperty"),
  t = getApp(),
  a = require("../../utils/http");
Page({
  data: {
    userId: "",
    identityCode: "",
    sendDic: { 21001: "业主", 21004: "交通局", 21003: "监理" },
    dataTypeDic: { 1: "安全", 2: "质量" },
    dangerDic: {
      22001: "履约",
      22002: "进度",
      22003: "预制场",
      22004: "钢筋场",
      22005: "拌合站",
      22006: "驻地",
      22007: "地基",
      22008: "路面",
      22009: "桥梁",
      22010: "隧道",
    },
    rectifyFormData: [],
    agreeBtn: !1,
    againstBtn: !1,
    saveBtn: !1,
    savecgBtn: !1,
    edit: !1,
    sendBtn: !1,
    sendSPBtn: !1,
    rebackBtn: !1,
    qxBtn: !1,
    sgfDealForm: [{ images: [], attachments: [], advice: "" }],
    isAgree: !0,
    checkMsg: "",
    problemid: "",
    editTimes: 0,
    optionId: "",
  },
  onLoad: function (e) {
    this.setData({
      userId: wx.getStorageSync("userId"),
      identityCode: wx.getStorageSync("identityCode"),
      optionId: e.id,
    });
    wx.getStorageSync("sessionid", "");
    e.type && this.getDetail(e.id), console.log(this.data.userId);
  },
  onReady: function () {},
  contentInput: function (t) {
    var a = t.detail.value,
      s = t.currentTarget.dataset.type,
      o = t.currentTarget.dataset.index;
    "suggestion_sgfyj" == s &&
      this.setData(e({}, "sgfDealForm[" + o + "].advice", a)),
      "suggestion_check" == s && this.setData({ checkMsg: a });
  },
  submitBtnClick_cl: function (e) {
    var t = this;
    console.log(this.data.sgfDealForm),
      this.data.sgfDealForm.forEach(function (e, a) {
        t.subProblemItem(e, t.data.rectifyFormData.problems[a].problemId);
      });
  },
  subProblemItem: function (e) {
    var s = e.currentTarget.dataset.id,
      o = e.currentTarget.dataset.index;
    if (0 != this.data.sgfDealForm.length) {
      var i =
          t.globalData.service +
          "/rectifies/v2/problems/" +
          s +
          "/actions/handle",
        n = {};
      if (this.data.sgfDealForm[o].workflows[0].workflowId) {
        var r = this.data.sgfDealForm[o];
        n = {
          advice: r.advice,
          attachments: r.attachments || [],
          images: r.images || [],
        };
      } else n = Object.assign({}, this.data.sgfDealForm[o]);
      console.log(n);
      var c = this;
      a.post(i, n).then(function (e) {
        console.log(e),
          200 === e.statusCode
            ? wx.showToast({
                title: "发起成功",
                icon: "success",
                duration: 1500,
                mask: !1,
                success: function () {
                  c.data.editTimes++,
                    c.data.editTimes == c.data.rectifyFormData.problems.length
                      ? wx.redirectTo({ url: "../main/index" })
                      : c.getDetail(c.data.optionId);
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
        title: "请输入处理意见内容",
        image: "../images/warning-circle.png",
      });
  },
  checkMsgPopShow: function (e) {
    var t = e.currentTarget.dataset.item,
      a = e.currentTarget.dataset.problemid;
    "agree" === t
      ? this.setData({ isAgree: !0 })
      : this.setData({ isAgree: !1 }),
      this.setData({ dialogshow: !0, problemid: a });
  },
  closeDialog: function () {
    this.setData({ checkMsg: "", dialogshow: !1 });
  },
  subCheckMsg: function () {
    var e =
        t.globalData.service +
        "/rectifies/v2/" +
        this.data.rectifyFormData.rectifyId +
        "/problems/" +
        this.data.problemid +
        "/actions/approve",
      s = { accept: this.data.isAgree, advice: this.data.checkMsg },
      o = this;
    a.post(e, s).then(function (e) {
      console.log(e),
        200 === e.statusCode
          ? wx.showToast({
              title: "发起成功",
              icon: "success",
              duration: 1500,
              mask: !1,
              success: function () {
                o.data.editTimes++,
                  o.data.editTimes == o.data.rectifyFormData.problems.length
                    ? wx.redirectTo({ url: "../main/index" })
                    : (o.setData({ dialogshow: !1 }),
                      o.getDetail(o.data.optionId));
              },
            })
          : wx.showToast({
              title: "网络环境异常，请稍后再试~",
              icon: "none",
              duration: 2e3,
            });
    });
  },
  getDetail: function (e) {
    var s = this,
      o = t.globalData.service + "/rectifies/v2/" + e;
    a.get(o).then(function (e) {
      (e = e.data),
        s.setData({ rectifyFormData: e.data }),
        s.btnShow(s.data.rectifyFormData),
        s.setData({
          userName: e.data.processorNick,
          processorDeptName: e.data.processorDeptName,
          sgfDealForm: e.data.problems,
        });
    });
  },
  returnpage: function () {
    wx.redirectTo({ url: "../main/index" });
  },
  onShow: function () {},
  btnShow: function (e) {
    var t = wx.getStorageSync("userId");
    console.log(
      -1 !== Object.keys(this.data.sendDic).indexOf(this.data.identityCode)
    ),
      console.log(e.processorId !== t);
    var a = wx.getStorageSync("identityCode");
    console.log(-1 !== e.copies.indexOf(a)),
      this.setData({
        againstBtn:
          e.processorId !== t &&
          -1 !== e.copies.indexOf(a) &&
          10003 !== e.status,
        saveBtn: e.processorId !== t,
        savecgBtn: 10004 == e.status && e.initiatorId == t,
        edit: 10004 == e.status && e.initiatorId == t && 10003 !== e.status,
        sendBtn: 10004 == e.status,
        sendSPBtn:
          ((e.processorId !== t && -1 !== e.copies.indexOf(a)) ||
            (e.workflows &&
              e.workflows[e.workflows.length - 1].processorId == t)) &&
          10003 !== e.status,
        rebackBtn: 10003 !== e.status && e.initiatorId == t,
        qxBtn: !0,
      });
  },
  deleteDeal: function () {
    var e =
      t.globalData.service +
      "/rectifies/v2/" +
      this.data.rectifyFormData.rectifyId +
      "/actions/revoke";
    a.post(e).then(function (e) {
      (e = e.data),
        console.log(e),
        e.success
          ? wx.showToast({
              title: "撤回成功",
              icon: "success",
              duration: 1500,
              mask: !1,
              success: function () {
                wx.redirectTo({ url: "../main/index" });
              },
            })
          : wx.showToast({
              title: e.msg,
              icon: "success",
              duration: 1500,
              mask: !1,
              success: function () {},
            });
    });
  },
  exportFile: function () {
    var e =
      t.globalData.service +
      "/rectifies/v2/" +
      this.data.rectifyFormData.rectifyId +
      "/actions/exportExcel";
    a.get(e).then(function (e) {
      console.log(e),
        wx.downloadFile({
          url: e.data.data.confirmationExcel.objectUrl,
          success: function (e) {},
        }),
        wx.downloadFile({
          url: e.data.data.notificationExcel.objectUrl,
          success: function (e) {},
        });
    });
  },
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {},
  chooseImage: function (e) {
    var t = e.currentTarget.dataset.index,
      a = e.currentTarget.dataset.usefor,
      s = this;
    wx.showActionSheet({
      itemList: ["从相册中选择", "拍照"],
      itemColor: "#61d89a",
      success: function (e) {
        e.cancel ||
          (0 == e.tapIndex
            ? s.chooseWxImage("album", t, a)
            : 1 == e.tapIndex && s.chooseWxImage("camera", t, a));
      },
    });
  },
  chooseWxImage: function (a, s, o) {
    var i = this;
    wx.getFileSystemManager();
    wx.chooseImage({
      sizeType: ["original", "compressed"],
      sourceType: [a],
      success: function (a) {
        console.log(a);
        var n =
          t.globalData.service +
          "/v1/communal/files/scopes/rectify/attachment/actions/upload";
        wx.uploadFile({
          filePath: a.tempFilePaths[0],
          name: "file",
          header: { "content-type": "multipart/form-data" },
          url: n,
          success: function (e) {},
          complete: function (t) {
            console.log(t);
            var a = JSON.parse(t.data);
            if ((console.log(a), "sgfDealForm" === o)) {
              var n = i.data.sgfDealForm[s].images;
              n.push(a.data.objectUrl),
                console.log(n),
                i.setData(e({}, "sgfDealForm[" + s + "].images", n)),
                console.log(i.data.sgfDealForm[s].images);
            }
          },
        });
      },
    });
  },
  previewImage: function (e) {
    var t = e.target.dataset.index,
      a = e.target.dataset.index2,
      s = e.target.dataset.usefor,
      o = [];
    "zhengai" === s &&
      (o = this.data.rectifyFormData.rectifyProblemUpdates[a].images),
      "sgfDealForm" === s && (o = this.data.sgfDealForm[a].images),
      wx.previewImage({ current: o[t], urls: o });
  },
  deleteImage: function (t) {
    var a = this,
      s = t.currentTarget.dataset.index,
      o = t.target.dataset.index2,
      i = t.target.dataset.usefor,
      n = [];
    wx.showModal({
      title: "提示",
      content: "确定要删除此图片吗？",
      success: function (t) {
        if (t.confirm)
          "sgfDealForm" === i && (n = a.data.sgfDealForm[o].images),
            n.splice(s, 1);
        else if (t.cancel) return !1;
        a.setData(e({}, "usefor[" + o + "].images", n));
      },
    });
  },
  chooseFiletoUpload: function (a) {
    console.log(a);
    var s = a.currentTarget.dataset.index,
      o = a.currentTarget.dataset.usefor,
      i = this;
    wx.chooseMessageFile({
      count: 10,
      type: "file",
      extension: [".pdf"],
      success: function (a) {
        var n = a.tempFiles;
        for (var r in n) {
          var c = n[r].size;
          console.log(n[r]);
          var l = n[r].name;
          if (c > 52428800 || -1 == (l + "").indexOf(".pdf")) {
            wx.showToast({
              title: "文件大小不能超过50MB,格式必须为pdf！",
              icon: "none",
              duration: 2e3,
              mask: !0,
            });
            break;
          }
          wx.uploadFile({
            url:
              t.globalData.service + "/v1/communal/files/import/actions/upload",
            filePath: n[r].path,
            name: "file",
            formData: { file: n[r].path },
            header: { "content-type": "multipart/form-data" },
            success: function (t) {
              var a = JSON.parse(t.data);
              if ((console.log(a), 200 == a.code)) {
                if (
                  (wx.showToast({
                    title: "上传成功",
                    icon: "none",
                    duration: 1300,
                  }),
                  console.log(o),
                  "sgfDealForm" === o)
                ) {
                  var n = i.data.sgfDealForm[s].attachments;
                  n.push(a.data.objectUrl),
                    console.log(n),
                    i.setData(e({}, "sgfDealForm[" + s + "].attachments", n));
                }
              } else
                wx.showToast({ title: a.message, icon: "none", duration: 2e3 });
            },
            fail: function (e) {
              console.log(e);
            },
          });
        }
      },
      fail: function (e) {
        console.log(e);
      },
    });
  },
  previewFile: function (e) {
    console.log(e);
    var t = e.currentTarget.dataset.item;
    wx.downloadFile({
      url: t,
      success: function (e) {
        var t = e.tempFilePath;
        wx.openDocument({
          filePath: t,
          success: function (e) {
            console.log("打开文档成功");
          },
        });
      },
    });
  },
  deleteFile: function (t) {
    var a = this,
      s = t.currentTarget.dataset.index2,
      o = t.currentTarget.dataset.index,
      i = t.currentTarget.dataset.usefor;
    wx.showModal({
      title: "提示",
      content: "确定要删除此文件吗？",
      success: function (t) {
        var n = [];
        if (t.confirm)
          "sgfDealForm" === i && (n = a.data.sgfDealForm[s].attachments),
            n.splice(o, 1);
        else if (t.cancel) return !1;
        a.setData(e({}, "sgfDealForm[" + s + "].attachments", n));
      },
    });
  },
});
