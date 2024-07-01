var e = require("../../utils/http"),
  t = (require("../../utils/util"), getApp());
Page({
  data: {
    depid:'',
    info: {},
    type: "",
    labelForm: {},
    labelFormConcrete: {
      construction: "施工单位",
      supervision: "监理单位",
      sampleNo: "报告编号",
      position: "使用部位",
      batchNo: "配合比编号",
      remark: "备 注",
    },
    labelFormSteel: {
      construction: "施工单位",
      supervision: "监理单位",
      sampleNo: "报告编号",
      position: "使用部位",
      batchNo: "生产产家",
      remark: "备 注",
    },
    headersSeelab: [
      "报告编号",
      "代表数量",
      "使用部位",
      "生产厂家",
      "28d抗压强度（MPa）",
      "试验结果",
      "备注",
    ],
    headersConcret: [
      "报告编号",
      "设计强度等级",
      "成型日期",
      "抗压日期",
      "配合比报告编号",
      "塌落度（mm）",
      "抗压强度",
      "平均值",
      "备注",
    ],
    keySeelab: [
      "sampleNo",
      "amount",
      "position",
      "variety",
      "diameters",
      "factory",
      "batchNo",
      "ky28",
      "tensile",
      "remark",
    ],
    keyConcret: [
      "sampleNo",
      "variety",
      "approachDate",
      "samplingDate",
      "batchNo",
      "amount",
      "labDetails",
      "verdict",
      "remark",
    ],
    tableList: [],
    headeKey: [],
    headlabel: [],
    ky28: [
      "yield",
      "eaf",
      "rb",
      "wd",
      "yield125",
      "yield130",
      "bp",
      "fm",
      "teomf",
    ],
  },
  onLoad: function (e) {
    
    var t = e.id,
      a = e.chart_type;
      this.setData({
        type: e.chart_type,
        depid:e. depid,
        headeKey:
          "SteelLab" == a
            ? this.data.keySeelab
            : "concrete" == a
            ? this.data.keyConcret
            : [],
        headlabel:
          "SteelLab" == a
            ? this.data.headersSeelab
            : "concrete" == a
            ? this.data.headersConcret
            : [],
        labelForm:
          "SteelLab" == a
            ? this.data.labelFormSteel
            : "concrete" == a
            ? this.data.labelFormConcrete
            : [],
      }),
     
      this.get_detail_data(t),
      this.get_bind_data(t);
  },
  onReady: function () {},
  onShow: function () {},
  get_detail_data: function (a) {
     
    var o = this,
      i = "";
    "concrete" == this.data.type
      ? (i = t.globalData.service + "/v1/labs/concrete/samples/" + a + "?deptId=" + this.data.depid)
      : "SteelLab" == this.data.type &&
        (i = t.globalData.service + "v1/labs/steel/samples/" + a + "?deptId=" + this.data.depid),
      e.get(i).then(function (e) {
        e.errMsg.indexOf("request:fail") >= 0 &&
          (o.setData({ searchLoading: !1 }),
          wx.showToast({
            title: "网络环境异常，请稍后再试~",
            icon: "none",
            duration: 2e3,
          })),
          console.log(e),
          o.setData({ info: e.data.data });
      });
  },
  get_bind_data: function (a) {
    var o = this,
      i = "";
    "concrete" == this.data.type
      ? (i = t.globalData.service + "/v1/labs/concrete/details/" + a + "?deptId=" + this.data.depid)
      : "SteelLab" == this.data.type &&
        (i = t.globalData.service + "/v1/labs/steel/details/" + a + "?deptId=" + this.data.depid),
      e.get(i).then(function (e) {
        e.errMsg.indexOf("request:fail") >= 0 &&
          (o.setData({ searchLoading: !1 }),
          wx.showToast({
            title: "网络环境异常，请稍后再试~",
            icon: "none",
            duration: 2e3,
          })),
          
          o.setData({
            tableList: e.data.data.items.map(function (e) {
              return (
                "concrete" == o.data.type &&
                  (e.labDetails = JSON.parse(e.labDetails)),
                e
              );
            }),
          }),
          console.log(o.data.tableList);
      });
  },
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {},
});
