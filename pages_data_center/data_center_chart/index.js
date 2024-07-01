var t = require("../../@babel/runtime/helpers/interopRequireWildcard")(
    require("../../ec-canvas/echarts")
  ),
  a = require("../../utils/http"),
  e = require("../../utils/util"),
  s = getApp();
Page({
  data: {
    chart_type: "salary",
    pm25Charts: { disableTouch: !0, lazyLoad: !0 },
    pm10Chart: { disableTouch: !0, lazyLoad: !0 },
    noiseChart: { disableTouch: !0, lazyLoad: !0 },
    temChart: { disableTouch: !0, lazyLoad: !0 },
    humChart: { disableTouch: !0, lazyLoad: !0 },
    table_rows: [],
    headers: [],
    headersCementlab: [
      "配料通知单号",
      "时间",
      "工程名称",
      "施工地点",
      "配比编号",
      "搅拌时间",
      "强度",
      "目标重量",
      "实际重量",
    ],
    headersSeelab: [
      "报告编号",
      "工程部位",
      "钢筋类别",
      "直径",
      "生产产家",
      "批号",
      "代表数量(t)",
      "施工单位",
      "监理单位",
      "备注",
    ],
    headersConcret: [
      "报告编号",
      "工程部位",
      "设计强度等级",
      "成型日期",
      "抗压日期",
      "配合比报告编号",
      "塌落度（mm）",
      "施工单位",
      "监理单位",
      "备注",
    ],
    keySeelab: [
      "sampleNo",
      "position",
      "variety",
      "diameters",
      "samplingDate",
      "batchNo",
      "amount",
      "construction",
      "supervision",
      "remark",
    ],
    keyCementlab: [
      "propNo",
      "recordTime",
      "engineeringName",
      "constructionPart",
      "proportionCode",
      "stirringTime",
      "strengthGrade",
      "tagWeight",
      "actWeight",
    ],
    keyConcret: [
      "sampleNo",
      "position",
      "variety",
      "approachDate",
      "samplingDate",
      "batchNo",
      "amount",
      "construction",
      "supervision",
      "remark",
    ],
    headersSalary: [
      "序号",
      "年",
      "月",
      "工队",
      "姓名",
      "工种/职务",
      "开户行账号",
      "工资卡账号",
      "预支工资（元）",
      "代缴代扣（元）",
      "高温补贴",
      "本月应付工资（元）",
      "实付",
    ],
    keysSalary: [
      "index",
      "year",
      "month",
      "teamName",
      "workerName",
      "typeOfWork",
      "bankName",
      "cardNo",
      "payBefore",
      "cutCount",
      "temperatureSubsidies",
      "grossPay",
      "actualPay",
    ],
    headersEntrence: [
      "序号",
      "设备ID",
      "位置",
      "图片",
      "时间",
      "名字",
      "职务",
      "电话",
      "CardID",
      "人员ID",
      "体温",
      "检测时间",
    ],
    keysEntrence: [
      "index",
      "faceNo",
      "location",
      "faceImg",
      "createTime",
      "name",
      "duties",
      "telephone",
      "cardNo",
      "userNo",
      "temperature",
      "scandatetime",
    ],
    keys: ["id", "name", "age", "weight", "height", "remark"],
    tableConfig: {
      columnWidths: ["80rpx"],
      border: !1,
      scroll: !0,
      headbgcolor: "#DCDCDC",
      stripe: !0,
    },
    limit: 20,
    currentTab: "map",
    tabs: [
      { name: "图表走势", type: "map" },
      { name: "表格统计", type: "table" },
    ],
    page_list: [],
    page_now: 1,
    page_total: 0,
    keyword: "",
    table: "",
    processorDeptList: [],
    pickyes: !0,
    depid: null,
    value: 0,
    pickyes2: !0,
    processorDeptList2: [],
    depid2: null,
    value2: 0,
  },
  copyArr: function (t) {
    return JSON.parse(JSON.stringify(t));
  },
  getChart: function (a, e, s, i, r, o, n, l) {
    var d, p;
    (this.chart = this.selectComponent(a)),
      (d = this.chart),
      (p = (function (t, a, e, s, i, r, o) {
        return {
          tooltip: {
            trigger: "axis",
            axisPointer: { type: "cross", crossStyle: { color: "#999" } },
          },
          xAxis: { type: "category", data: e },
          yAxis: {
            type: "value",
            scale: !0,
            max: parseInt(i) + 1,
            min: parseInt(s) - 1,
          },
          series: [{ data: a, type: "line", symbol: "none" }],
          grid: {
            left: "5%",
            right: "5%",
            top: "25%",
            bottom: "0",
            containLabel: !0,
          },
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          color: {
            colorStops: [
              { offset: 0, color: r },
              { offset: 1, color: o },
            ],
            global: !1,
          },
        };
      })(0, s, i, r, o, n, l)),
      d.init(function (a, e, s, i) {
        var r = t.init(a, "none", { width: e, height: s, devicePixelRatio: i });
        return r.setOption(p), r;
      });
  },
  initDataToTable: function () {
    var t = e.getTimeLast25Days(new Date()),
      a = this.data.data,
      s = this.copyArr(a.pm25);
    this.getChart(
      "#pm25Chart",
      "PM2.5",
      a.pm25,
      t,
      s.sort()[0] - 2,
      s.sort()[s.length - 1] + 2,
      "#1377FE",
      "#58C2FB"
    ),
      (s = this.copyArr(a.pm10)),
      this.getChart(
        "#pm10Chart",
        "PM10",
        a.pm10,
        t,
        s.sort()[0] - 2,
        s.sort()[s.length - 1] + 2,
        "#C28FFE",
        "#FF62CA"
      ),
      (s = this.copyArr(a.noise)),
      this.getChart(
        "#noiseChart",
        "噪声",
        a.noise,
        t,
        s.sort()[0] - 2,
        s.sort()[s.length - 1] + 2,
        "#FFCE41",
        "#EF836F"
      ),
      (s = this.copyArr(a.tem)),
      this.getChart(
        "#temChart",
        "温度",
        a.tem,
        t,
        s.sort()[0] - 2,
        s.sort()[s.length - 1] + 2,
        "#AAED94",
        "#CAF97F"
      ),
      (s = this.copyArr(a.hum)),
      this.getChart(
        "#humChart",
        "湿度",
        a.hum,
        t,
        s.sort()[0] - 2,
        s.sort()[s.length - 1] + 2,
        "#FE4571",
        "#FEB64E"
      );
  },
  onShow: function () {},
  onLoad: function (t) {
    var a = this,
      e = t.chart_type,
      s = null;
    t.params && (s = JSON.parse(t.params));
    var i = "",
      r = "";
    console.log(e),
      a.setData({ data: s, chart_type: e }),
      "weather_chart" == e
        ? ((r = "大气监测信息"), a.initDataToTable(), (i = "weather"))
        : "salary" == e
        ? ((r = "农民工工资信息"), (i = "salary"))
        : "entrance" == e
        ? ((r = "考勤信息"), (i = "entrance"))
        : "SteelLab" == e
        ? ((r = "钢筋拉伸弯曲试验室数据"),
          (i = "SteelLab"),
          a.processorDeptList())
        : "concrete" == e
        ? ((r = "混泥土抗压试验室数据"),
          (i = "concrete"),
          a.processorDeptList2())
        : "cementlab" == e && ((r = "拌合站数据"), (i = "CementLab")),
      a.setData({ table: i, page_now: 1 }),
      console.log(this.data.table),
      wx.setNavigationBarTitle({ title: r }),
      ("salary" != e &&
        "entrance" != e &&
        "cementlab" != e &&
        "SteelLab" != e &&
        "concrete" != e) ||
        a.getManagementCommonData(i, 1),
      wx.getSystemInfo({
        success: function (t) {
          t.windowHeight;
          var e = 750 / t.windowWidth;
          a.data.ratio = e;
        },
      });
  },
  searchtext: function (t) {
    var a = t.detail.value;
    this.setData({ keyword: a }),
      this.getManagementCommonData(this.data.table, 1);
  },
  getManagementCommonData: function (t) {
    var e = this,
      i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
    return (function (i) {
      var r = e;
      if ("salary" === t) {
        var o =
          s.globalData.service + "/v1/human/workers/salary/actions/search";
        a.get(o, {
          teamId: "352205788802383872",
          offset: i,
          deptId: "223",
          limit: parseInt(r.data.limit),
        }).then(function (t) {
          if ((console.log(t), t.errMsg.indexOf("request:fail") >= 0))
            return (
              r.setData({ searchLoading: !1 }),
              void wx.showToast({
                title: "网络环境异常，请稍后再试~",
                icon: "none",
                duration: 2e3,
              })
            );
          var a = r.data.page_now,
            e = [],
            s = Math.ceil(t.data.data.total / parseInt(r.data.limit));
          s > 0 &&
            a <= s &&
            (e.push(a - 1),
            a < s && e.push(a),
            a + 1 < s &&
              (e.push(a + 1),
              a + 2 < s && (e.push(a + 2), a + 3 < s && e.push(a + 3)))),
            r.setData({
              page_now: r.data.page_now,
              page_list: e,
              table_rows: t.data.data.items,
              page_total:
                Math.ceil(t.data.data.total / parseInt(r.data.limit)) || 1,
            });
        });
      } else if ("entrance" === t) {
        o = s.globalData.service + "/front/v1/face/list";
        a.get(o, {
          pageNum: i,
          pageSize: parseInt(r.data.limit),
          keyWord: e.data.keyword,
          isAsc: "desc",
          orderByColumn: "scandatetime",
        }).then(function (t) {
          if ((console.log(t), t.errMsg.indexOf("request:fail") >= 0))
            return (
              r.setData({ searchLoading: !1 }),
              void wx.showToast({
                title: "网络环境异常，请稍后再试~",
                icon: "none",
                duration: 2e3,
              })
            );
          var a = i,
            e = [],
            s = Math.ceil(t.data.total / parseInt(r.data.limit));
          s > 0 &&
            a <= s &&
            (e.push(a - 1),
            a < s && e.push(a),
            a + 1 < s &&
              (e.push(a + 1),
              a + 2 < s && (e.push(a + 2), a + 3 < s && e.push(a + 3)))),
            r.setData({
              page_now: r.data.page_now,
              page_list: e,
              table_rows: t.data.items,
              page_total: Math.ceil(t.data.total / parseInt(r.data.limit)),
            });
        });
      } else if ("CementLab" === t) {
        (r = e), (o = s.globalData.service + "/v1/cementlab/search");
        a.get(o, {
          pageSize: 20,
          offset: i,
          limit: parseInt(r.data.limit),
        }).then(function (t) {
          if ((console.log(t), t.errMsg.indexOf("request:fail") >= 0))
            return (
              r.setData({ searchLoading: !1 }),
              void wx.showToast({
                title: "网络环境异常，请稍后再试~",
                icon: "none",
                duration: 2e3,
              })
            );
          r.setData({
            page_now: i,
            page_list: Math.ceil(t.data.data.total / parseInt(r.data.limit)),
            table_rows: t.data.data.items,
            table: t.data.table,
            page_total: Math.ceil(t.data.data.total / parseInt(r.data.limit)),
          });
        });
      } else if ("concrete" === t) {
        var n = e.data.value2;
        (i = (r = e).data.page_now),
          (o = s.globalData.service + "/v1/labs/concrete/samples");
        r.data.depid2 &&
          a
            .get(o, {
              pageSize: parseInt(r.data.limit),
              pageNum: i,
              keyWord: r.data.keyword,
              deptId: e.data.processorDeptList2[n].companyNo,
            })
            .then(function (t) {
              if (t.errMsg.indexOf("request:fail") >= 0)
                return (
                  r.setData({ searchLoading: !1 }),
                  void wx.showToast({
                    title: "网络环境异常，请稍后再试~",
                    icon: "none",
                    duration: 2e3,
                  })
                );
              var a = i,
                e = [],
                s = Math.ceil(t.data.data.total / parseInt(r.data.limit));
              s > 0 &&
                a <= s &&
                (e.push(a - 1),
                a < s && e.push(a),
                a + 1 < s &&
                  (e.push(a + 1),
                  a + 2 < s && (e.push(a + 2), a + 3 < s && e.push(a + 3)))),
                r.setData({
                  page_now: i,
                  page_list: e,
                  table_rows: t.data.data.items,
                  table: t.data.table,
                  page_total: Math.ceil(
                    t.data.data.total / parseInt(r.data.limit)
                  ),
                  pickyes2: !1,
                });
            });
      } else {
        var l = e.data.value;
        (i = (r = e).data.page_now),
          (o = s.globalData.service + "/v1/labs/steel/samples");
        r.data.depid &&
          a
            .get(o, {
              pageSize: parseInt(r.data.limit),
              pageNum: i,
              keyWord: r.data.keyword,
              deptId: e.data.processorDeptList[l].companyNo,
            })
            .then(function (t) {
              if (t.errMsg.indexOf("request:fail") >= 0)
                return (
                  r.setData({ searchLoading: !1 }),
                  void wx.showToast({
                    title: "网络环境异常，请稍后再试~",
                    icon: "none",
                    duration: 2e3,
                  })
                );
              var a = i,
                e = [],
                s = Math.ceil(t.data.data.total / parseInt(r.data.limit));
              s > 0 &&
                a <= s &&
                (e.push(a - 1),
                a < s && e.push(a),
                a + 1 < s &&
                  (e.push(a + 1),
                  a + 2 < s && (e.push(a + 2), a + 3 < s && e.push(a + 3)))),
                r.setData({
                  page_now: i,
                  page_list: e,
                  table_rows: t.data.data.items,
                  table: t.data.table,
                  page_total: Math.ceil(
                    t.data.data.total / parseInt(r.data.limit)
                  ),
                  pickyes: !1,
                });
            });
      }
    })(i);
  },
  contentInput: function (t) {
    console.log(t);
    var a = t.detail.value;
    this.setData({ page_now: a - 0 }),
      this.getManagementCommonData(this.data.chart_type, a);
  },
  pagesFn: function (t) {
    var a = 1;
    if (0 == t.currentTarget.dataset.num || -1 == t.currentTarget.dataset.num)
      if (0 == t.currentTarget.dataset.num) {
        if (1 == this.data.page_now) return;
        a = this.data.page_now - 1;
      } else {
        if (
          this.data.page_now ==
          this.data.page_list[this.data.page_list.length - 1]
        )
          return;
        a = this.data.page_now + 1;
      }
    else a = t.currentTarget.dataset.num;
    this.setData({ page_now: a }),
      this.getManagementCommonData(this.data.chart_type, a);
  },
  swichNav: function (t) {
    if (this.data.currentTab === t.target.dataset.type) return !1;
    if (
      (this.setData({ currentTab: t.target.dataset.type }),
      "map" == this.data.currentTab)
    )
      this.setData({ chart_type: "weather_chart" }), this.initDataToTable();
    else {
      var a = this.data.page_now,
        e = [],
        s = Math.ceil(res.data.data.total / parseInt(this.data.limit));
      s > 0 &&
        a <= s &&
        (e.push(a - 1),
        a < s && e.push(a),
        a + 1 < s &&
          (e.push(a + 1),
          a + 2 < s && (e.push(a + 2), a + 3 < s && e.push(a + 3)))),
        this.data.page_list.length > 0
          ? this.setData({
              page_now: this.data.page_now,
              page_list: e,
              table_name: this.data.table_name,
              headers: this.data.col_list,
              keys: this.data.col_name_list,
              table_rows: this.data.model_list,
            })
          : this.getManagementCommonData("weather", 1);
    }
  },
  getStrLength: function (t) {
    for (var a = 0, e = 0; e < t.length; e++)
      t.charCodeAt(e) > 127 || 94 == t.charCodeAt(e) ? (a += 2) : a++;
    return a;
  },
  processorDeptList: function () {
    var t = this,
      e = s.globalData.service + "/v1/labs/steel/lab/dept/list";
    a.get(e, { type: "steel" }).then(function (a) {
      if (a.errMsg.indexOf("request:fail") >= 0)
        return (
          t.setData({ searchLoading: !1 }),
          void wx.showToast({
            title: "网络环境异常，请稍后再试~",
            icon: "none",
            duration: 2e3,
          })
        );
      t.setData({ processorDeptList: a.data.data.items });
    });
  },
  getValue: function () {
    var t = this.data.value,
      e = this,
      i = e.data.page_now,
      r = s.globalData.service + "/v1/labs/steel/samples";
    a.get(r, {
      pageSize: parseInt(e.data.limit),
      pageNum: i,
      keyWord: e.data.keyword,
      deptId: this.data.processorDeptList[t].companyNo,
    }).then(function (a) {
      if (a.errMsg.indexOf("request:fail") >= 0)
        return (
          e.setData({ searchLoading: !1 }),
          void wx.showToast({
            title: "网络环境异常，请稍后再试~",
            icon: "none",
            duration: 2e3,
          })
        );
      var s = i,
        r = [],
        o = Math.ceil(a.data.data.total / parseInt(e.data.limit));
      o > 0 &&
        s <= o &&
        (r.push(s - 1),
        s < o && r.push(s),
        s + 1 < o &&
          (r.push(s + 1),
          s + 2 < o && (r.push(s + 2), s + 3 < o && r.push(s + 3)))),
        e.setData({
          page_now: i,
          page_list: r,
          table_rows: a.data.data.items,
          table: a.data.table,
          page_total: Math.ceil(a.data.data.total / parseInt(e.data.limit)),
          pickyes: !1,
          depid: e.data.processorDeptList[t].companyNo,
        });
    });
  },
  bindChange: function (t) {
    this.setData({ value: t.detail.value[0] });
  },
  processorDeptList2: function () {
    var t = this,
      e = s.globalData.service + "/v1/labs/steel/lab/dept/list";
    a.get(e, { type: "concert" }).then(function (a) {
      if (a.errMsg.indexOf("request:fail") >= 0)
        return (
          t.setData({ searchLoading: !1 }),
          void wx.showToast({
            title: "网络环境异常，请稍后再试~",
            icon: "none",
            duration: 2e3,
          })
        );
      t.setData({ processorDeptList2: a.data.data.items });
    });
  },
  getValue2: function () {
    var t = this.data.value2,
      e = this,
      i = e.data.page_now,
      r = s.globalData.service + "/v1/labs/concrete/samples";
    a.get(r, {
      pageSize: parseInt(e.data.limit),
      pageNum: i,
      keyWord: e.data.keyword,
      deptId: this.data.processorDeptList2[t].companyNo,
    }).then(function (a) {
      if (a.errMsg.indexOf("request:fail") >= 0)
        return (
          e.setData({ searchLoading: !1 }),
          void wx.showToast({
            title: "网络环境异常，请稍后再试~",
            icon: "none",
            duration: 2e3,
          })
        );
      var s = i,
        r = [],
        o = Math.ceil(a.data.data.total / parseInt(e.data.limit));
      o > 0 &&
        s <= o &&
        (r.push(s - 1),
        s < o && r.push(s),
        s + 1 < o &&
          (r.push(s + 1),
          s + 2 < o && (r.push(s + 2), s + 3 < o && r.push(s + 3)))),
        e.setData({
          page_now: i,
          page_list: r,
          table_rows: a.data.data.items,
          table: a.data.table,
          page_total: Math.ceil(a.data.data.total / parseInt(e.data.limit)),
          pickyes2: !1,
          depid2: e.data.processorDeptList2[t].companyNo,
        });
    });
  },
  bindChange2: function (t) {
    this.setData({ value2: t.detail.value[0] });
  },
});
