var e,
  t = require("../../@babel/runtime/helpers/defineProperty"),
  a = getApp(),
  n = require("../../utils/http.js"),
  o = require("../../utils/util");
Page(
  (t(
    (e = {
      data: {
        page_now: 1,
        news_list: [],
        page_list: [],
        searchLoading: !0,
        searchLoadingComplete: !1,
        page_num: 1,
      },
      onLoad: function (e) {
        o.getUrl(), this.get_new_lists(this.data.page_now);
      },
      onReady: function () {},
      onShow: function () {},
      onHide: function () {},
      onUnload: function () {},
      onPullDownRefresh: function () {},
      onReachBottom: function () {},
      onShareAppMessage: function () {},
    }),
    "onReachBottom",
    function () {
      this.setData({ page_now: this.data.page_now + 1 }), this.get_new_lists();
    }
  ),
  t(e, "get_new_lists", function () {
    var e = this,
      t = a.globalData.service + "/news/";
    n.get(t, { url_type: 1, page_now: e.data.page_now }).then(function (t) {
      if (n.networkCheck(t)) {
        var o = JSON.parse(t.data.MFTE_list);
        console.log(o);
        var i = [];
        for (var s in o)
          i.push({
            MFTE_cover: a.globalData.service + o[s].fields.MFTE_cover,
            MFTE_entry_into_force_time: o[s].fields.MFTE_entry_into_force_time,
            MFTE_title: o[s].fields.MFTE_title,
            id: o[s].pk,
          });
        0 !== i.length
          ? e.setData({
              searchLoading: !0,
              news_list: e.data.news_list.concat(i),
              page_list: t.data.page_list,
              loading: !1,
            })
          : e.setData({ searchLoadingComplete: !0, searchLoading: !1 });
      } else e.setData({ searchLoadingComplete: !1, searchLoading: !1 });
    });
  }),
  e)
);
