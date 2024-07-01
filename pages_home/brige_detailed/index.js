var e = require("../../@babel/runtime/helpers/defineProperty"),
  t = getApp(),
  a = require("../../utils/http");
Page({
  data: {
    processorDeptName: "",
    processorDeptList: [],
    refrom: {
      girderId: "",
      girderName: "",
      inboundDate: null,
      groutDate: null,
      tensionDate: null,
      pourDate: null,
    },
    jiaozhudate: "",
    zhangladate: "",
    yajiangdate: "",
    rukudate: "",
  },
  bindPickerChange: function (r) {
    var i,
      s = this,
      o = r.detail.value;
    this.setData(
      (e(
        (i = {}),
        "refrom.sectionId",
        this.data.processorDeptList[o].sectionId
      ),
      e(i, "refrom.sectionName", this.data.processorDeptList[o].sectionName),
      e(
        i,
        "refrom.supervisorDeptId",
        this.data.processorDeptList[o].supervisorDeptId
      ),
      e(
        i,
        "refrom.supervisorDeptName",
        this.data.processorDeptList[o].supervisorDeptName
      ),
      i)
    );
    var n =
      t.globalData.service +
      "/accounts/v1/departments/" +
      this.data.processorDeptList[o].supervisorDeptId +
      "/users";
    a.get(n).then(function (t) {
      var a;
      200 == t.statusCode &&
        s.setData(
          (e((a = {}), "refrom.supervisorId", t.data.data.items[0].userId),
          e(a, "refrom.supervisorName", t.data.data.items[0].nickName),
          a)
        );
    });
  },
  getProcessorDeptList: function () {
    var e = this,
      r = t.globalData.service + "/v1/section/requireInfo/list";
    a.get(r).then(function (t) {
      200 == (t = t.data).code &&
        e.setData({ processorDeptList: t.data.items });
    });
  },
  contentInput: function (t) {
    var a = t.detail.value;
    this.setData(e({}, "refrom.girderName", a));
  },
  bindDateChange: function (t) {
    var a,
      r = t.currentTarget.dataset.item;
    if ("jiaozhu" == r)
      this.setData(
        (e((a = {}), "refrom.pourDate", new Date(t.detail.value).getTime()),
        e(a, "jiaozhudate", t.detail.value),
        a)
      );
    else if ("zhangla" == r) {
      var i;
      this.setData(
        (e((i = {}), "refrom.tensionDate", new Date(t.detail.value).getTime()),
        e(i, "zhangladate", t.detail.value),
        i)
      );
    } else if ("yajiang" == r) {
      var s;
      this.setData(
        (e((s = {}), "refrom.groutDate", new Date(t.detail.value).getTime()),
        e(s, "yajiangdate", t.detail.value),
        s)
      );
    } else if ("ruku" == r) {
      var o;
      this.setData(
        (e((o = {}), "refrom.inboundDate", new Date(t.detail.value).getTime()),
        e(o, "rukudate", t.detail.value),
        o)
      );
    }
  },
  submitrefrom: function () {
    var e = t.globalData.service + "/v1/girders";
    a.post(e, this.data.refrom).then(function (e) {
      200 == e.statusCode
        ? wx.showToast({
            title: "新增成功",
            icon: "success",
            duration: 1500,
            mask: !1,
            success: function () {
              wx.redirectTo({ url: "../brige/index" });
            },
          })
        : wx.showToast({
            title: e.data.errors[0].defaultMessage,
            icon: "none",
            duration: 2e3,
          });
    }),
      console.log(this.data.refrom);
  },
  pagesFn: function () {
    wx.navigateBack({ delta: 1 });
  },
  onLoad: function (t) {
    this.setData(e({}, "refrom.girderId", t.id)), this.getProcessorDeptList();
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {
    wx.setNavigationBarTitle({ title: "新增梁片" });
  },
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {},
});
