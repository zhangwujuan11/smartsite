require("../../@babel/runtime/helpers/interopRequireWildcard")(
  require("../../ec-canvas/echarts")
);
var e = getApp(),
  t = require("../../utils/http"),
  a = require("../../utils/util");
Page({
  data: {
    fullDay: "",
    pm25: [],
    pm10: [],
    noise: [],
    tem: [],
    hum: [],
    io: [],
    project_url: e.globalData.service + "/webfiles/img/wechat/main.gif",
    project1_url: e.globalData.service + "/webfiles/img/wechat/project1.gif",
    table_list: [
      "weather",
      "employee",
      "pro-employee",
      "salary",
      "pro-salary",
      "equipment",
    ],
    wea_dict: [],
    userName: "",
  },
  onLoad: function (e) {
    this.setData({ userName: wx.getStorageSync("username") }),
      console.log(this.data.userName),
      a.getUrl(),
      this.getDataCenter(),
      this.set_monitor_list_height();
  },
  getChart: function (e, t, a) {
    (this.chart = this.selectComponent(e)),
      wxCharts(this.chart, getLineChart(t, a));
  },
  getDataCenter: function () {
    var a = this,
      u =
        (e.globalData.service,
        {
          data: {
            wea_dict:
              '[{"model": "data_center.weatherapi", "pk": 23674, "fields": {"wind_dir": "东风", "wind": "1级", "tem": "27~36", "weather_str": "多云", "week": "星期六", "date": "30日", "aqi": null, "hum": null, "stp": null, "prcp": null, "prcp_24": null, "record_date": "2022-07-30T18:10:24.842", "yesterday_wind_dir": "东风", "yesterday_wind": "1级", "yesterday_tem": "28~36", "yesterday_weather_str": "晴", "yesterday_date": "29日", "yesterday_week": "星期五", "late1_wind_dir": "东风", "late1_wind": "1级", "late1_tem": "18~26", "late1_weather_str": "多云", "late1_date": "31日", "late1_week": "星期天", "late2_wind_dir": "东风", "late2_wind": "1级", "late2_tem": "28~36", "late2_weather_str": "小雨", "late2_date": "1日", "late2_week": "星期一", "late3_wind_dir": "东北风", "late3_wind": "1级", "late3_tem": "27~36", "late3_weather_str": "小雨", "late3_date": "2日", "late3_week": "星期二", "late4_wind_dir": "东风", "late4_wind": "2级", "late4_tem": "27~36", "late4_weather_str": "中雨", "late4_date": "3日", "late4_week": "星期三"}}]',
            summart_dicy:
              '[{"model": "data_center.panelsummary", "pk": 130154, "fields": {"salary_rate": 100.0, "team_salary_rate": "{\\"\\\\u4e0a\\\\u6d77\\\\u8c6a\\\\u6c5f\\\\u8def\\\\u6865\\\\u5efa\\\\u8bbe\\\\u6709\\\\u9650\\\\u516c\\\\u53f8\\": \\"100.0\\", \\"\\\\u9ad8\\\\u7891\\\\u5e97\\\\u5e02\\\\u591a\\\\u8f89\\\\u5efa\\\\u7b51\\\\u5de5\\\\u7a0b\\\\u6709\\\\u9650\\\\u516c\\\\u53f8-\\\\uff08\\\\u62cc\\\\u5408\\\\u7ad9\\\\uff09\\": \\"100.0\\", \\"\\\\u798f\\\\u5efa\\\\u5b9d\\\\u5b8f\\\\u5efa\\\\u8bbe\\\\u5de5\\\\u7a0b\\\\u6709\\\\u9650\\\\u516c\\\\u53f8-\\\\uff08\\\\u8def\\\\u57fa\\\\u4e09\\\\u961f\\\\uff09\\": \\"100.0\\", \\"\\\\u798f\\\\u5efa\\\\u7701\\\\u878d\\\\u65ed\\\\u5efa\\\\u7b51\\\\u5de5\\\\u7a0b\\\\u52b3\\\\u52a1\\\\u6709\\\\u9650\\\\u516c\\\\u53f8-(\\\\u8def\\\\u57fa\\\\u4e8c\\\\u961f)\\": \\"100.0\\", \\"\\\\u6c5f\\\\u897f\\\\u5e86\\\\u826f\\\\u5efa\\\\u8bbe\\\\u5de5\\\\u7a0b\\\\u6709\\\\u9650\\\\u516c\\\\u53f8-\\\\uff08\\\\u8def\\\\u57fa\\\\u4e00\\\\u961f\\\\uff09\\": \\"100.0\\", \\"\\\\u6e56\\\\u5317\\\\u665f\\\\u5b87\\\\u8054\\\\u8f89\\\\u5efa\\\\u8bbe\\\\u5de5\\\\u7a0b\\\\u6709\\\\u9650\\\\u516c\\\\u53f8-\\\\uff08\\\\u6869\\\\u57fa\\\\u961f\\\\uff09\\": \\"100.0\\"}", "entrance_count": 0, "employee_count": 15, "progress_rate": 38, "progress_part_rate": "{\\"\\\\u603b\\": [0, 0, 0, 0]}", "fund_rate": 48, "record_date": "2022-07-30T18:20:24.712"}}]',
            pm25: [
              1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0,
            ],
            pm10: [
              28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 21, 21, 21, 21, 25,
              25, 25, 26, 26, 26, 24, 24, 24, 23,
            ],
            noise: [
              51.8, 46.6, 50.3, 44.7, 49.6, 55.4, 47.9, 47.9, 44, 44.3, 50.9,
              44, 45.5, 45.5, 45.5, 52.8, 43.9, 44.4, 45.1, 43, 43.1, 43.7,
              43.1, 43.5, 43.1,
            ],
            tem: [
              18.6, 19.7, 19.8, 30.6, 30.1, 30.5, 30.5, 30.5, 31.4, 33.1, 32.6,
              31.8, 32.1, 32, 32, 31.9, 31.6, 11.3, 11.4, 31.5, 30.7, 30.9,
              12.9, 32.6, 31.7,
            ],
            hum: [
              70.9, 67.1, 68.2, 59.4, 64.2, 69.2, 68.3, 68.3, 67, 63.2, 65.7,
              64.7, 68, 66.8, 66.8, 67.1, 67.5, 67.5, 67.2, 64.6, 66.6, 65.8,
              59.5, 58.5, 60.5,
            ],
            location_pro: "岐头鼻大桥",
            location_city: "宁德",
            team_list:
              '["\\u4e0a\\u6d77\\u8c6a\\u6c5f\\u8def\\u6865\\u5efa\\u8bbe\\u6709\\u9650\\u516c\\u53f8", "\\u9ad8\\u7891\\u5e97\\u5e02\\u591a\\u8f89\\u5efa\\u7b51\\u5de5\\u7a0b\\u6709\\u9650\\u516c\\u53f8-\\uff08\\u62cc\\u5408\\u7ad9\\uff09", "\\u798f\\u5efa\\u5b9d\\u5b8f\\u5efa\\u8bbe\\u5de5\\u7a0b\\u6709\\u9650\\u516c\\u53f8-\\uff08\\u8def\\u57fa\\u4e09\\u961f\\uff09", "\\u798f\\u5efa\\u7701\\u878d\\u65ed\\u5efa\\u7b51\\u5de5\\u7a0b\\u52b3\\u52a1\\u6709\\u9650\\u516c\\u53f8-(\\u8def\\u57fa\\u4e8c\\u961f)", "\\u6c5f\\u897f\\u5e86\\u826f\\u5efa\\u8bbe\\u5de5\\u7a0b\\u6709\\u9650\\u516c\\u53f8-\\uff08\\u8def\\u57fa\\u4e00\\u961f\\uff09", "\\u6e56\\u5317\\u665f\\u5b87\\u8054\\u8f89\\u5efa\\u8bbe\\u5de5\\u7a0b\\u6709\\u9650\\u516c\\u53f8-\\uff08\\u6869\\u57fa\\u961f\\uff09"]',
          },
        }),
      r = t.convertJson(u.data.wea_dict),
      i = t.convertJson(u.data.summart_dicy),
      d = u.data.pm25,
      f = u.data.pm10,
      l = u.data.noise,
      _ = u.data.tem,
      s = u.data.hum,
      n = t.convertJson(u.data.team_list),
      c = [],
      o = new Date().getTime(),
      w = o - 864e5,
      h = o + 864e5,
      m = this.formatime(o),
      p = this.formatime(w),
      g = this.formatime(h),
      y = m.fullDay;
    a.setData({ fullDay: y }),
      c.push({
        late_date: p.date,
        late_tem: r[0].fields.yesterday_tem,
        late_weather_str: r[0].fields.yesterday_weather_str,
        late_week: p.day,
        late_wind: r[0].fields.yesterday_wind,
        late_wind_dir: r[0].fields.yesterday_wind_dir,
        late_weather_icon:
          "../../images/weather_icon/" +
          r[0].fields.yesterday_weather_str +
          ".png",
      }),
      c.push({
        late_date: m.date,
        late_tem: r[0].fields.tem,
        late_weather_str: r[0].fields.weather_str,
        late_week: m.day + "(今天)",
        late_wind: r[0].fields.wind,
        late_wind_dir: r[0].fields.wind_dir,
        late_weather_icon:
          "../../images/weather_icon/" + r[0].fields.weather_str + ".png",
      }),
      c.push({
        late_date: g.date,
        late_tem: r[0].fields.late1_tem,
        late_weather_str: r[0].fields.late1_weather_str,
        late_week: g.day,
        late_wind: r[0].fields.late1_wind,
        late_wind_dir: r[0].fields.late1_wind_dir,
        late_weather_icon:
          "../../images/weather_icon/" + r[0].fields.late1_weather_str + ".png",
      }),
      (r[0].fields.record_date = r[0].fields.record_date.split("T")[0]),
      a.setData({
        wea_dict: {
          pk: r[0].pk,
          field: r[0].fields,
          wea_list: c,
          location_pro: u.data.location_pro,
          location_city: u.data.location_city,
          cur_tep: parseInt(_),
          weather_icon:
            "../../images/weather_icon/" + r[0].fields.weather_str + ".png",
        },
        summart_dicy: { pk: i[0].pk, field: i[0].fields },
        pm25: d,
        pm10: f,
        noise: l,
        tem: _,
        hum: s,
        team_list: n,
      }),
      wx
        .createSelectorQuery()
        .select("#weather")
        .boundingClientRect(function (e) {
          var t = e.height;
          a.setData({ image_height: t });
        })
        .exec();
  },
  open: function (e) {
    var t = e.currentTarget.dataset.name,
      a = JSON.stringify(this.data);
    wx.navigateTo({
      url:
        "../../pages_data_center/data_center_chart/index?chart_type=" +
        t +
        "&params=" +
        a,
    });
  },
  formatime: function (e) {
    var t = new Date(e),
      a = t.getFullYear(),
      u = t.getMonth() + 1,
      r = t.getDate(),
      i = t.getDay(),
      d = "";
    return (
      0 == i
        ? (d = "天")
        : 1 == i
        ? (d = "一")
        : 2 == i
        ? (d = "二")
        : 3 == i
        ? (d = "三")
        : 40 == i
        ? (d = "四")
        : 5 == i
        ? (d = "五")
        : 6 == i && (d = "六"),
      { date: r + "日", day: "星期" + d, fullDay: a + "-" + u + "-" + r }
    );
  },
  set_monitor_list_height: function () {
    var e = this;
    wx.getSystemInfo({
      success: function (t) {
        t.windowHeight;
        var a = t.windowWidth;
        750 / a, e.setData({ top_height: 60 });
      },
    });
  },
  logout: function () {
    var e =
      "https://ruoyi.starhope.net/front/loginOut/" +
      wx.getStorageSync("tocken", "");
    t.get(e).then(function (e) {
      console.log(e),
        wx.clearStorageSync(),
        wx.redirectTo({ url: "/pages/login/index" });
    });
  },
});
