var e = require("../../@babel/runtime/helpers/defineProperty"),
  t = getApp(),
  a = require("../../utils/http");
Page({
  data: {
    name: "",
    dialogshow: !0,
    processorDeptName: "",
    userName: "",
    userPhone: "",
    timeStart: "",
    timeEnd: "",
    hidDangerName: "",
    rectifyFormData: {
      title: "",
      copiedType: [],
      finishTime: "",
      launchTime: "",
      processorDeptId: "",
      processorId: "",
      sectionId: "",
      rectifyProblemUpdates: [
        {
          title: "整改内容1",
          context: "",
          dataType: "1",
          hidDanger: "",
          images: [],
          attachments: [],
        },
      ],
      sendSms: 0,
    },
    uploadimgs: [],
    userList: [],
    processorDeptList: [],
    dangerlist: [
      { id: 22001, name: "履约" },
      { id: 22002, name: "进度" },
      { id: 22003, name: "预制场" },
      { id: 22004, name: "钢筋场" },
      { id: 22005, name: "拌合站" },
      { id: 22006, name: "驻地" },
      { id: 22007, name: "地基" },
      { id: 22008, name: "路面" },
      { id: 22009, name: "桥梁" },
      { id: 22010, name: "隧道" },
    ],
    senobj: [
      { id: 21001, name: "业主", checked: !0 },
      { id: 21004, name: "交通局" },
      { id: 21003, name: "监理", checked: !0 },
      { id: "", name: "其他" },
      { id: "", name: "无" },
    ],
    sendDic: { 21001: "业主", 21004: "交通局", 21003: "监理" },
    fileList: [],
    bumenList: [],
    deptName: "",
  },
  onLoad: function (e) {
    this.getProcessorDeptList(), e.type && this.getDetail(e.id);
  },
  onReady: function () {},
  onShow: function () {
    this.setData(e({}, "rectifyFormData.copiedType", ["21001", "21003"]));
  },
  closeDialog: function () {
    this.setData({ dialogshow: !1 });
  },
  perventmove: function (e) {
    return console.log(e), !1;
  },
  setDataType: function (t) {
    var a = t.currentTarget.dataset.index,
      i = t.currentTarget.dataset.item;
    this.setData(
      e({}, "rectifyFormData.rectifyProblemUpdates[" + a + "].dataType", i)
    ),
      console.log(this.data.rectifyFormData);
  },
  addZgbox: function (e) {
    var t = this.data.rectifyFormData.rectifyProblemUpdates || [];
    t.push({
      title: "整改内容1",
      context: "",
      dataType: "1",
      hidDanger: "",
      images: [],
      attachments: [],
    }),
      this.setData({ "rectifyFormData.rectifyProblemUpdates": t });
  },
  getDetail: function (e) {
    var i = this,
      s = t.globalData.service + "/rectifies/v2/" + e;
    a.get(s).then(function (e) {
      (e = e.data),
        i.setData({
          rectifyFormData: e.data,
          "rectifyFormData.rectifyProblemUpdates": e.data.problems,
          timeStart: i.timestampToTime(e.data.launchTime),
          timeEnd: i.timestampToTime(e.data.finishTime),
          userPhone: e.data.processorPhone,
          processorDeptName: e.data.processorDeptName,
          userName: e.data.processorNick,
          "rectifyFormData.copiedType": e.data.copies,
        }),
        e.data.copies && i.checboxValueReturn(e.data.copies),
        i.setData({
          userName: e.data.processorNick,
          processorDeptName: e.data.processorDeptName,
        });
    });
  },
  checboxValueReturn: function (e) {
    var t;
    (t = this.data.senobj.map(function (t) {
      return -1 !== e.indexOf(t.id) && (t.checked = !0), t;
    })),
      this.setData({ senobj: t });
  },
  contentInput: function (t) {
    var a = t.detail.value,
      i = t.currentTarget.dataset.type;
    if ("title" == i) this.setData(e({}, "rectifyFormData.title", a));
    else if ("context" == i) {
      var s = t.currentTarget.dataset.index;
      this.setData(
        e({}, "rectifyFormData.rectifyProblemUpdates[" + s + "].context", a)
      );
    }
  },
  bindDateChange: function (t) {
    console.log(t), console.log("picker发送选择改变，携带值为", t.detail.value);
    var a,
      i = t.currentTarget.dataset.item;
    if ("finishTime" == i)
      this.setData(
        (e(
          (a = {}),
          "rectifyFormData.finishTime",
          new Date(t.detail.value).getTime()
        ),
        e(a, "timeEnd", t.detail.value),
        a)
      );
    else if ("launchTime" == i) {
      var s;
      this.setData(
        (e(
          (s = {}),
          "rectifyFormData.launchTime",
          new Date(t.detail.value).getTime()
        ),
        e(s, "timeStart", t.detail.value),
        s)
      );
    }
  },
  bindPickerChange: function (t) {
    var a = t.detail.value;
    this.setData(
      e(
        {
          processorDeptName: this.data.processorDeptList[a].sectionName,
          bumenList: this.data.processorDeptList[a].deptList,
        },
        "rectifyFormData.sectionId",
        this.data.processorDeptList[a].sectionId
      )
    );
    var i = t.currentTarget.dataset.index;
    if ("zgcontent" == t.currentTarget.dataset.type) {
      var s,
        o = this.data.dangerlist[t.detail.value - 0];
      this.setData(
        (e(
          (s = {}),
          "rectifyFormData.rectifyProblemUpdates[" + i + "].hidDanger",
          o.id
        ),
        e(
          s,
          "rectifyFormData.rectifyProblemUpdates[" + i + "].hidDangerName",
          o.name
        ),
        s)
      );
    }
  },
  bindbumenchange: function (t) {
    var a = t.detail.value,
      i = this.data.bumenList[a].deptId;
    this.setData(
      e(
        { deptName: this.data.bumenList[a].deptName },
        "rectifyFormData.processorDeptId",
        this.data.bumenList[a].deptId
      )
    ),
      this.getUserList(i),
      console.log(this.data.rectifyFormData);
  },
  checkboxChange: function (t) {
    var a = t.detail.value;
    this.setData(e({}, "rectifyFormData.copiedType", a));
  },
  getUserList: function (i) {
    var s = this,
      o = t.globalData.service + "/accounts/v1/departments/" + i + "/users";
    a.get(o).then(function (t) {
      200 == (t = t.data).code &&
        s.setData(
          e(
            { userList: t.data.items, userName: t.data.items[0].nickName },
            "rectifyFormData.processorId",
            t.data.items[0].userId
          )
        );
    });
  },
  getProcessorDeptList: function () {
    var e = this,
      i = t.globalData.service + "/v1/section/section/search";
    a.get(i).then(function (t) {
      200 == (t = t.data).code &&
        e.setData({ processorDeptList: t.data.items });
    });
  },
  getUserInfo: function () {
    var e = this,
      i = t.globalData.service + "/accounts/v1/users";
    a.get(i).then(function (t) {
      200 == t.statusCode && e.setData({ userList: t.data.items });
    });
  },
  timestampToTime: function (e) {
    var t = new Date(e);
    return (
      t.getFullYear() +
      "-" +
      (t.getMonth() + 1 + "-") +
      (t.getDate() + " ") +
      (t.getHours() + ":") +
      (t.getMinutes() + ":") +
      t.getSeconds()
    );
  },
  chooseImage: function (e) {
    var t = e.currentTarget.dataset.index,
      a = e.currentTarget.dataset.usefor,
      i = this;
    wx.showActionSheet({
      itemList: ["从相册中选择", "拍照"],
      itemColor: "#61d89a",
      success: function (e) {
        e.cancel ||
          (0 == e.tapIndex
            ? i.chooseWxImage("album", t, a)
            : 1 == e.tapIndex && i.chooseWxImage("camera", t, a));
      },
    });
  },
  chooseWxImage: function (a, i, s) {
    var o = this;
    wx.getFileSystemManager();
    wx.chooseImage({
      sizeType: ["original", "compressed"],
      sourceType: [a],
      success: function (a) {
        var r =
          t.globalData.service +
          "/v1/communal/files/scopes/rectify/attachment/actions/upload";
        wx.uploadFile({
          filePath: a.tempFilePaths[0],
          name: "file",
          header: { "content-type": "multipart/form-data" },
          url: r,
          success: function (e) {},
          complete: function (t) {
            console.log(t);
            var a = JSON.parse(t.data);
            if ((console.log(a), "zhengai" === s)) {
              console.log(a.data.objectUrl),
                console.log(
                  o.data.rectifyFormData.rectifyProblemUpdates[i].images
                );
              var r = o.data.rectifyFormData.rectifyProblemUpdates[i].images;
              r.push(a.data.objectUrl),
                console.log(r),
                o.setData(
                  e(
                    {},
                    "rectifyFormData.rectifyProblemUpdates[" + i + "].images",
                    r
                  )
                ),
                console.log(
                  o.data.rectifyFormData.rectifyProblemUpdates[i].images
                );
            }
          },
        });
      },
    });
  },
  previewImage: function (e) {
    var t = e.target.dataset.index,
      a = e.target.dataset.index2,
      i = [];
    "zhengai" === e.target.dataset.usefor &&
      (i = this.data.rectifyFormData.rectifyProblemUpdates[a].images),
      wx.previewImage({ current: i[t], urls: i });
  },
  deleteImage: function (t) {
    var a = this,
      i = t.currentTarget.dataset.index,
      s = t.target.dataset.index2,
      o = t.target.dataset.usefor,
      r = [];
    wx.showModal({
      title: "提示",
      content: "确定要删除此图片吗？",
      success: function (t) {
        if (t.confirm)
          "zhengai" === o &&
            (r = a.data.rectifyFormData.rectifyProblemUpdates[s].images),
            r.splice(i, 1);
        else if (t.cancel) return !1;
        a.setData(
          e({}, "rectifyFormData.rectifyProblemUpdates[" + s + "].images", r)
        );
      },
    });
  },
  chooseFiletoUpload: function (a) {
    console.log(a);
    var i = a.currentTarget.dataset.index,
      s = a.currentTarget.dataset.usefor,
      o = this;
    wx.chooseMessageFile({
      count: 10,
      type: "file",
      extension: [".pdf"],
      success: function (a) {
        var r = a.tempFiles;
        for (var n in r) {
          var c = r[n].size;
          console.log(r[n]);
          var d = r[n].name;
          if (c > 52428800 || -1 == (d + "").indexOf(".pdf")) {
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
            filePath: r[n].path,
            name: "file",
            formData: { file: r[n].path },
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
                  "zhengai" === s)
                ) {
                  var r =
                    o.data.rectifyFormData.rectifyProblemUpdates[i].attachments;
                  r.push(a.data.objectUrl),
                    console.log(r),
                    o.setData(
                      e(
                        {},
                        "rectifyFormData.rectifyProblemUpdates[" +
                          i +
                          "].attachments",
                        r
                      )
                    );
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
      i = t.currentTarget.dataset.index2,
      s = t.currentTarget.dataset.index,
      o = t.currentTarget.dataset.usefor;
    wx.showModal({
      title: "提示",
      content: "确定要删除此文件吗？",
      success: function (t) {
        var r = [];
        if (t.confirm)
          "zhengai" === o &&
            (r = a.data.rectifyFormData.rectifyProblemUpdates[i].attachments),
            r.splice(s, 1);
        else if (t.cancel) return !1;
        a.setData(
          e(
            {},
            "rectifyFormData.rectifyProblemUpdates[" + i + "].attachments",
            r
          )
        );
      },
    });
  },
  deleteDealInfo: function () {
    var e =
      t.globalData.service +
      "/rectifies/v2/" +
      this.data.rectifyFormData.rectifyId;
    a.delete(e).then(function (e) {
      (e = e.data),
        console.log(e),
        e.success
          ? wx.showToast({
              title: "删除成功",
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
  submitBtnClick: function (e) {
    if (0 != this.data.rectifyFormData.title.length)
      if (0 != this.data.rectifyFormData.processorId.length)
        if (0 != this.data.rectifyFormData.processorDeptId.length)
          if (
            (this.data.rectifyFormData.rectifyProblemUpdates &&
              0 == this.data.rectifyFormData.rectifyProblemUpdates.length) ||
            (this.data.rectifyFormData.rectifyProblemUpdates &&
              0 ==
                this.data.rectifyFormData.rectifyProblemUpdates[0].hidDanger
                  .length)
          )
            wx.showToast({
              title: "请填写整改内容隐患点",
              image: "../images/warning-circle.png",
            });
          else {
            var i = t.globalData.service + "/rectifies/v2",
              s = Object.assign({}, this.data.rectifyFormData);
            10004 == s.status
              ? ((i =
                  t.globalData.service +
                  "/rectifies/v2/" +
                  this.data.rectifyFormData.rectifyId +
                  "/draft/actions/convertFormal"),
                a.put(i, s).then(function (e) {
                  console.log(e),
                    200 === e.statusCode
                      ? wx.showToast({
                          title: "发起成功",
                          icon: "success",
                          duration: 1500,
                          mask: !1,
                          success: function () {
                            wx.redirectTo({ url: "../main/index" });
                          },
                        })
                      : wx.showToast({
                          title: e.data.errors[0].defaultMessage,
                          icon: "none",
                          duration: 2e3,
                        });
                }))
              : a.post(i, s).then(function (e) {
                  console.log("整改吧", e),
                    200 === e.statusCode
                      ? wx.showToast({
                          title: "发起成功",
                          icon: "success",
                          duration: 1500,
                          mask: !1,
                          success: function () {
                            wx.redirectTo({ url: "../main/index" });
                          },
                        })
                      : wx.showToast({
                          title: e.data.errors[0].defaultMessage,
                          icon: "none",
                          duration: 2e3,
                        });
                });
          }
        else
          wx.showToast({
            title: "请输入处理角色",
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
  submitBtnClickcg: function (e) {
    if (
      (console.log(this.data.rectifyFormData),
      0 != this.data.rectifyFormData.title.length)
    )
      if (0 != this.data.rectifyFormData.processorId.length)
        if (
          0 !=
          this.data.rectifyFormData.rectifyProblemUpdates[0].hidDanger.length
        ) {
          var i = t.globalData.service + "/rectifies/v2/actions/saveAsDraft",
            s = Object.assign({}, this.data.rectifyFormData);
          s.rectifyId && s.rectifyId.length > 0
            ? ((i = t.globalData.service + "/rectifies/v2/" + s.rectifyId),
              a.put(i, s).then(function (e) {
                console.log(e),
                  200 === e.statusCode
                    ? wx.showToast({
                        title: "草稿保存成功",
                        icon: "success",
                        duration: 1500,
                        mask: !1,
                        success: function () {
                          wx.redirectTo({ url: "../main/index" });
                        },
                      })
                    : wx.showToast({
                        title: e.data.errors[0].defaultMessage,
                        icon: "none",
                        duration: 2e3,
                      });
              }))
            : a.post(i, s).then(function (e) {
                console.log(e),
                  200 === e.statusCode
                    ? wx.showToast({
                        title: "草稿保存成功",
                        icon: "success",
                        duration: 1500,
                        mask: !1,
                        success: function () {
                          wx.redirectTo({ url: "../main/index" });
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
            title: "请填写整改内容隐患点",
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
  returnpage: function () {
    wx.redirectTo({ url: "../main/index" });
  },
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {},
});
