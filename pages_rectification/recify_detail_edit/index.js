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
      o = t.currentTarget.dataset.type,
      s = t.currentTarget.dataset.index;
    "suggestion_sgfyj" == o &&
      this.setData(e({}, "sgfDealForm[" + s + "].advice", a)),
      "suggestion_check" == o && this.setData({ checkMsg: a });
  },
  submitBtnClick_cl: function (e) {
    var t = this;
    console.log(this.data.sgfDealForm),
      this.data.sgfDealForm.forEach(function (e, a) {
        t.subProblemItem(e, t.data.rectifyFormData.problems[a].problemId);
      });
  },
  subProblemItem: function (e) {
    var o = e.currentTarget.dataset.id,
      s = e.currentTarget.dataset.index;
    if (0 != this.data.sgfDealForm.length) {
      var i =
          t.globalData.service +
          "/rectifies/v2/problems/" +
          o +
          "/actions/handle",
        n = {};
      if (this.data.sgfDealForm[s].workflowId) {
        var r = this.data.sgfDealForm[s];
        n = {
          advice: r.advice,
          attachments: r.attachments || [],
          images: r.images || [],
        };
      } else n = Object.assign({}, this.data.sgfDealForm[s]);
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
                    console.log(c.data.rectifyFormData),
                    c.data.editTimes == c.data.rectifyFormData.problems.length
                      ? wx.redirectTo({ url: "../main/index" })
                      : c.getDetail(c.data.optionId);
                },
              })
            : wx.showToast({
                title: e.data.errors[0].defaultMessage,
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
      o = { accept: this.data.isAgree, advice: this.data.checkMsg },
      s = this;
    a.post(e, o).then(function (e) {
      console.log(e),
        200 === e.statusCode
          ? wx.showToast({
              title: "发起成功",
              icon: "success",
              duration: 1500,
              mask: !1,
              success: function () {
                s.data.editTimes++,
                  s.data.editTimes == s.data.rectifyFormData.problems.length
                    ? wx.redirectTo({ url: "../main/index" })
                    : (s.setData({ dialogshow: !1 }),
                      s.getDetail(s.data.optionId));
              },
            })
          : wx.showToast({
              title: e.data.errors[0].defaultMessage,
              icon: "none",
              duration: 2e3,
            });
    });
  },
  getDetail: function (e) {
    var o = this,
      s = t.globalData.service + "/rectifies/v2/" + e;
    a.get(s).then(function (e) {
      (e = e.data),
        o.setData({
          rectifyFormData: e.data,
          "rectifyFormData.rectifyProblemUpdates": e.data.problems,
        }),
        o.btnShow(o.data.rectifyFormData),
        o.setData({
          userName: e.data.processorNick,
          processorDeptName: e.data.processorDeptName,
          sgfDealForm: e.data.problems.map(function (e) {
            return e.workflows[0];
          }),
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
        userIdentityCode: wx.getStorageSync("identityCode"),
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
              title: e.data.errors[0].defaultMessage,
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
          success: function (t) {
            wx.openDocument({
              filePath: e.data.data.confirmationExcel.objectUrl,
              success: function (e) {
                console.log("打开文档成功");
              },
            });
          },
        }),
        wx.downloadFile({
          url: e.data.data.notificationExcel.objectUrl,
          success: function (t) {
            wx.openDocument({
              filePath: e.data.data.notificationExcel.objectUrl,
              success: function (e) {
                console.log("打开文档成功");
              },
            });
          },
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
      o = this;
    wx.showActionSheet({
      itemList: ["从相册中选择", "拍照"],
      itemColor: "#61d89a",
      success: function (e) {
        e.cancel ||
          (0 == e.tapIndex
            ? o.chooseWxImage("album", t, a)
            : 1 == e.tapIndex && o.chooseWxImage("camera", t, a));
      },
    });
  },
  chooseWxImage: function (a, o, s) {
    var i = this;
    wx.getFileSystemManager();
    wx.chooseImage({
      sizeType: ["original", "compressed"],
      sourceType: [a],
      success: function (a) {
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
            if (
              (console.log(a),
              console.log(i.data.sgfDealForm),
              "sgfDealForm" === s)
            ) {
              var n = i.data.sgfDealForm[o].images || [];
              n.push(a.data.objectUrl),
                console.log(n),
                i.setData(e({}, "sgfDealForm[" + o + "].images", n)),
                console.log(i.data.sgfDealForm[o].images);
            }
          },
        });
      },
    });
  },
  previewImage: function (e) {
    var t = e.target.dataset.index,
      a = e.target.dataset.index2,
      o = e.target.dataset.usefor,
      s = [];
    console.log(o),
      console.log(this.data.rectifyFormData),
      "zhengai" === o &&
        (s = this.data.rectifyFormData.rectifyProblemUpdates[a].images),
      "sgfDealForm" === o && (s = this.data.sgfDealForm[a].images),
      wx.previewImage({ current: s[t], urls: s });
  },
  deleteImage: function (t) {
    var a = this,
      o = t.currentTarget.dataset.index,
      s = t.target.dataset.index2,
      i = t.target.dataset.usefor,
      n = [];
    wx.showModal({
      title: "提示",
      content: "确定要删除此图片吗？",
      success: function (t) {
        if (t.confirm)
          "sgfDealForm" === i && (n = a.data.sgfDealForm[s].images),
            n.splice(o, 1);
        else if (t.cancel) return !1;
        a.setData(e({}, "usefor[" + s + "].images", n));
      },
    });
  },
  chooseFiletoUpload: function (a) {
    console.log(a);
    var o = a.currentTarget.dataset.index,
      s = a.currentTarget.dataset.usefor,
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
                  console.log(s),
                  "sgfDealForm" === s)
                ) {
                  var n = i.data.sgfDealForm[o].attachments;
                  n.push(a.data.objectUrl),
                    console.log(n),
                    i.setData(e({}, "sgfDealForm[" + o + "].attachments", n));
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
      o = t.currentTarget.dataset.index2,
      s = t.currentTarget.dataset.index,
      i = t.currentTarget.dataset.usefor;
    wx.showModal({
      title: "提示",
      content: "确定要删除此文件吗？",
      success: function (t) {
        var n = [];
        if (t.confirm)
          "sgfDealForm" === i && (n = a.data.sgfDealForm[o].attachments),
            n.splice(s, 1);
        else if (t.cancel) return !1;
        a.setData(e({}, "sgfDealForm[" + o + "].attachments", n));
      },
    });
  },
});
