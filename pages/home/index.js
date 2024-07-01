var e = require("../../@babel/runtime/helpers/interopRequireWildcard")(
    require("../../ec-canvas/echarts")
  ),
  t = getApp(),
  a = require("../../utils/http"),
  i = require("../../utils/util");
Page({
  data: {
    project_url: t.globalData.service + "/webfiles/img/wechat/main1.gif",
    project1_url: t.globalData.service + "/webfiles/img/wechat/project1.gif",
    ec: {
      onInit: function (i, o, n, r) {
        var s = e.init(i, null, { width: o, height: n, devicePixelRatio: r });
        i.setChart(s);
        var l = t.globalData.service + "/v1/home/invest/search/list";
        return (
          a.get(l, { status: "1" }).then(function (e) {
            if (200 === e.data.code) {
              var t = e.data.data.items[0],
                a = {
                  tooltip: {
                    trigger: "item",
                    confine: !0,
                    extraCssText: "width:50%;height:100px;",
                    textStyle: { fontSize: 10 },
                  },
                  legend: { show: !1, top: "5%", left: "center" },
                  color: ["#5763f9", "#efefef"],
                  series: [
                    {
                      name: "Access From",
                      type: "pie",
                      center: ["50%", "55%"],
                      radius: ["60%", "80%"],
                      avoidLabelOverlap: !1,
                      label: { show: !1, position: "center" },
                      labelLine: { show: !1 },
                      data: [
                        {
                          value: t.investDone / 1e4 / 100,
                          name: "已完成投资额",
                        },
                        { value: t.investSum / 1e4 / 100, name: "总投资额" },
                      ],
                    },
                    {
                      type: "pie",
                      center: ["50%", "55%"],
                      radius: [0, "40%"],
                      avoidLabelOverlap: !1,
                      color: ["#30c70f"],
                      data: [
                        {
                          hoverOffset: 1,
                          value: t.doneRate,
                          position: "center",
                          name: "",
                          itemStyle: { color: "#fff" },
                          label: {
                            normal: {
                              formatter: "{c}%\n投资比例",
                              textStyle: {
                                fontWeight: "normal",
                                fontSize: 12,
                                lineHeight: 20,
                              },
                              show: !0,
                              position: "center",
                              color: "#000",
                            },
                          },
                        },
                      ],
                    },
                  ],
                };
              s.setOption(a);
            } else wx.showToast({ title: "网络环境异常，请稍后再试~", icon: "none", duration: 2e3 });
          }),
          s
        );
      },
    },
    sum: "",
    done: "",
    imagesdata: "",
  },
  onLoad: function () {
    i.getUrl(), this.echartHomedata();
  },
  getConstructRate: function () {
    t.globalData.service;
    var e = "2.16%",
      a = "2.16%";
    this.setData({ fund_rate: e, progress_rate: a });
  },
  open: function (e) {
    var t = e.currentTarget.dataset.name;
    "monitor" === t
      ? wx.navigateTo({ url: "../video_monitor/index" })
      : "rectification" === t
      ? wx.navigateTo({ url: "../../pages_rectification/main/index" })
      : "quality_main" === t
      ? wx.navigateTo({ url: "../../pages_quality_main/main/index" })
      : "profile" === t
      ? wx.navigateTo({ url: "../../pages_home/profile/index" })
      : "bridge" === t
      ? wx.navigateTo({ url: "../../pages_home/brige/index" })
      : "reserve" === t
      ? wx.showToast({
          icon: "none",
          title: "此接口为预留接口，无实际功能",
          duration: 2e3,
        })
      : wx.navigateTo({ url: "../../pages_home/" + t + "/index" });
  },
  onShow: function (e) {
    this.getConstructRate();
  },
  echartHomedata: function (e) {
    var i = this,
      o = t.globalData.service + "/v1/home/invest/search/list";
    a.get(o, { status: "1" }).then(function (e) {
      if (600009 == e.errno) {
        var t = wx.getStorageSync("username");
        t.indexOf("admin") >= 0
          ? ((getApp().globalData.service = "https://zhgd.starhope.net/"),
            i.onLoad())
          : t.indexOf("gt_") >= 0
          ? ((getApp().globalData.service = "https://zhgd3.starhope.net/"),
            i.onLoad())
          : t.indexOf("sh_") >= 0 &&
            ((getApp().globalData.service = "https://zhgd2.starhope.net/"),
            i.onLoad());
      }
      if (200 === e.data.code) {
        var a = e.data.data.items[0];
        i.setData({
          sum: a.investSum / 1e4 / 100,
          done: a.investDone / 1e4 / 100,
          imagesdata: a.homeImg,
        });
      } else wx.showToast({ title: "网络环境异常，请稍后再试~", icon: "none", duration: 2e3 });
    });
  },
});
