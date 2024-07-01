var e = getApp(),
  t = require("../../Component/wxParse/wxParse.js"),
  a = require("../../utils/http.js");
Page({
  data: {
    title: "",
    loading: !0,
    news_id: 1,
    movie: {},
    news_url: e.globalData.service,
    news_dict: {},
    type: "party_build",
    htmlSnip: "",
    modalHidden: !0,
  },
  onLoad: function (e) {
    var t = "党建";
    "party_build" === e.type
      ? (t = "党建")
      : "news" === e.type
      ? (t = "新闻")
      : "rectify" === e.type
      ? (t = "检查整改")
      : "quality_main" === e.type && (t = "质量管理"),
      this.setData({ type: e.type, id: e.id }),
      wx.setNavigationBarTitle({ title: t }),
      this.getNewsDetailByID(e.id, e.type);
  },
  getNewsDetailByID: function (i, n) {
    var r = this,
      m = "",
      l = [];
    "party_build" === n
      ? (m = e.globalData.service + "/front/v1/siteinfo/" + i)
      : "news" === n
      ? (m = e.globalData.service + "/news_details/?id=" + i)
      : "rectify" === n
      ? (m = e.globalData.service + "/v1/rectifies/" + i)
      : "quality_main" === n &&
        (m = e.globalData.service + "/quality_details/?id=" + i),
      a.get(m).then(function (i) {
        if (200 != i.statusCode)
          return (
            r.setData({ loading: !1 }),
            void wx.showToast({
              title: "网络环境异常，请稍后再试~",
              icon: "none",
              duration: 2e3,
            })
          );
        if ("rectify" === n) {
          t.wxParse("article", "html", i.data.data.context, r, 5);
          var m = {
              mfteTitle: i.data.data.title,
              mfteCreateTime: i.data.data.createTime,
            },
            s = i.data.data.cover,
            o = [];
          s && (o = s.split(",")),
            r.setData({ news_dict: m, loading: !1, img_list: o });
        } else if ("quality_main" === n) {
          var c = i.data.MFTE_cover,
            d = a.convertJson(i.data.MFTE_content_comment),
            _ = i.data.MFTE_comment_cover,
            g = [];
          if ("[]" != c)
            for (var f in (c = c.split(", ")))
              (c[f] = c[f]
                .replace("[", "")
                .replace("]", "")
                .replace("'", "")
                .replace("'", "")
                .replace("\\\\", "/")
                .replace("\\\\", "/")),
                0 != c[f].length && l.push(e.globalData.service + c[f]);
          if ('"[]"' != d) {
            for (var u in d) {
              var p = [];
              if ("[]" != d[u].fields.Comment_images)
                for (var v in ((d[u].fields.Comment_images =
                  d[u].fields.Comment_images.split(", ")),
                d[u].fields.Comment_images))
                  (d[u].fields.Comment_images[v] = d[u].fields.Comment_images[v]
                    .replace("[", "")
                    .replace("]", "")
                    .replace("'", "")
                    .replace("'", "")),
                    0 != d[u].fields.Comment_images[v].length &&
                      p.push(
                        e.globalData.service + d[u].fields.Comment_images[v]
                      );
              g.push({
                MFTE_title: i.data.title,
                MFTE_comment_cover: e.globalData.service + _,
                Comment_content: d[u].fields.Comment_content,
                Comment_create_time: d[u].fields.Comment_create_time,
                Comment_images: p,
                Comment_other: d[u].fields.Comment_other,
                Comment_type: d[u].fields.Comment_type,
                Comment_user: d[u].fields.Comment_user,
                Rectify_ID: d[u].fields.Rectify_ID,
              });
            }
            r.setData({ comment_list: g });
          }
        } else
          t.wxParse("article", "html", i.data.mfte, r, 5),
            r.setData({ news_dict: i.data, loading: !1, img_list: l });
      });
  },
  toComment: function (e) {
    var t = e.currentTarget.dataset.type,
      a = e.currentTarget.dataset.id,
      i = e.currentTarget.dataset.title;
    "rectify" === t
      ? wx.redirectTo({
          url:
            "../../pages_rectification/comment/comment?id=" + a + "&title=" + i,
        })
      : "quality_main" === t &&
        wx.redirectTo({
          url:
            "../../pages_quality_main/comment/comment?id=" + a + "&title=" + i,
        });
  },
  previewImage: function (e) {
    var t = e.target.dataset.index,
      a = this.data.img_list;
    wx.previewImage({ current: a[t], urls: a });
  },
  commentDetail: function (e) {
    debugger;
    var t = e.currentTarget.dataset.index,
      a = e.currentTarget.dataset.type,
      i = JSON.stringify(this.data.comment_list[t]);
    "rectify" === a
      ? wx.navigateTo({
          url:
            "../../pages_rectification/CommentDetail/commentDetail?data=" + i,
        })
      : "quality_main" === a &&
        wx.navigateTo({
          url: "../../pages_quality_main/CommentDetail/commentDetail?data=" + i,
        });
  },
  onReady: function () {},
});
