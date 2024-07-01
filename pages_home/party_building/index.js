var t = require("../../@babel/runtime/helpers/defineProperty"),
  e = require("../../utils/http"),
  i = require("../../utils/util"),
  a = getApp();
Page({
  data: {
    currentTab: 0,
    tabs: [
      { name: "党建活动", type: "list_0" },
      { name: "工作动态", type: "list_1" },
      { name: "经验交流", type: "list_2" },
    ],
    list_0: [],
    list_1: [],
    list_2: [],
    list_3: [],
    recommendArticle: [],
    touchDot: 0,
    time: 0,
    interval: "none",
    touchMove: 0,
    minHeight: wx.getSystemInfoSync().windowHeight,
    service_url: a.globalData.service,
  },
  onShow: function () {},
  onLoad: function (t) {
    i.getUrl(), this.get_party_lists();
  },
  data_handler: function (t) {
    var e = "../../images/image_none.png",
      i = [],
      s = t;
    for (var r in s) {
      var l = s[r].fields.MFTE_cover,
        n = [];
      if ("[]" != l)
        for (var _ in (l = l.split(", ")))
          (l[_] = l[_].replace("[", "")
            .replace("]", "")
            .replace("'", "")
            .replace("'", "")),
            0 != l[_].length && n.push(a.globalData.service + l[_]);
      0 != n.length && (e = n[0]),
        i.push({
          id: s[r].pk,
          MFTE_cover: e,
          MFTE_create_time: s[r].fields.MFTE_create_time,
          MFTE_edit_user: s[r].fields.MFTE_edit_user,
          MFTE_entry_into_force_time: s[r].fields.MFTE_entry_into_force_time,
          MFTE_files: s[r].fields.MFTE_files,
          MFTE_hide: s[r].fields.MFTE_hide,
          MFTE_last_edit_time: s[r].fields.MFTE_entry_into_force_time,
          MFTE_other: s[r].fields.MFTE_other,
          MFTE_title: s[r].fields.MFTE_title,
          MFTE_top: s[r].fields.MFTE_top,
          MFTE_type: s[r].fields.MFTE_type,
          MFTE_weight: s[r].fields.MFTE_weight,
        });
    }
    return i;
  },
  get_party_lists: function () {
    this.get_party_build_lists(1, "list_0"),
      this.get_party_build_lists(2, "list_1"),
      this.get_party_build_lists(3, "list_2");
  },
  get_party_build_lists: function (i, s) {
    var r = this,
      l = a.globalData.service + "/front/v1/siteinfo/list/" + i,
      n = {};
    3 === i && (n = { orderByColumn: "id", isAsc: "desc" }),
      e.get(l, n).then(function (e) {
        r.setData(t({}, s, e.data.items)),
          1 == i && r.setData({ recommendArticle: e.data.items });
      });
  },
  swichNav: function (t) {
    if (this.data.currentTab === t.target.dataset.current) return !1;
    this.setData({ currentTab: t.target.dataset.current }),
      "list_0" === this.data.tabs[this.data.currentTab].type
        ? this.setData({ recommendArticle: this.data.list_0 })
        : "list_1" === this.data.tabs[this.data.currentTab].type
        ? this.setData({ recommendArticle: this.data.list_1 })
        : "list_2" === this.data.tabs[this.data.currentTab].type
        ? this.setData({ recommendArticle: this.data.list_2 })
        : "list_3" === this.data.tabs[this.data.currentTab].type &&
          this.setData({ recommendArticle: this.data.list_3 });
         
  },
  swiperChange: function (t) {
    this.setData({ currentTab: t.detail.current });
  },
  recommendToLower: function () {
    this.selectComponent("#recommend").onReachBottom();
  },
  touchStart: function (t) {},
  touchMove: function (t) {},
  touchEnd: function (t) {},
  eventhandle: function (t) {
    var e = [];
    "list_0" === this.data.tabs[this.data.currentTab].type
      ? (e = this.data.list_0)
      : "list_1" === this.data.tabs[this.data.currentTab].type
      ? (e = this.data.list_1)
      : "list_2" === this.data.tabs[this.data.currentTab].type
      ? (e = this.data.list_2)
      : "list_3" === this.data.tabs[this.data.currentTab].type &&
        (e = this.data.list_3);
    for (var i = 0; i < e.length; i++)
      e[i].MFTE_cover === t.detail.errMsg.split(" ")[1] &&
        (e[i].MFTE_cover = "../../images/image_load_fail.png");
    "list_0" === this.data.tabs[this.data.currentTab].type
      ? ((this.data.list_0 = e),
        this.setData({ recommendArticle: this.data.list_0 }))
      : "list_1" === this.data.tabs[this.data.currentTab].type
      ? ((this.data.list_1 = e),
        this.setData({ recommendArticle: this.data.list_1 }))
      : "list_2" === this.data.tabs[this.data.currentTab].type
      ? ((this.data.list_2 = e),
        this.setData({ recommendArticle: this.data.list_2 }))
      : "list_3" === this.data.tabs[this.data.currentTab].type &&
        ((this.data.list_3 = e),
        this.setData({ recommendArticle: this.data.list_3 }));
  },
});
