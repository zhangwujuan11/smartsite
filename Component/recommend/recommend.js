Component({
  properties: { recommendArticle: Object },
  data: {
    currentPage: "recommend",
    maxLength: 50,
    params: { type: getApp().globalData.currentType, p: 1, pn: 10 },
    isIpx: getApp().globalData.isIpx,
  },
  ready: function () {},
  methods: {
    errImg: function (t) {
      var e = {};
      (e["recommendArticle[" + t.target.dataset.index + "].thumb_image[0]"] =
        getApp().globalData.placeholder_img),
        this.setData(e);
    },
    getRecommend: function () {
      var e = this,
        a = this.data.params;
      t.getRecommend(a).then(function (t) {
        0 === t.code && e.setData({ recommendArticle: t.data }),
          wx.hideLoading();
      });
    },
    goDetail: function (t) {
      var e = t.target.dataset.id;
      wx.navigateTo({ url: "/pages/articledetail/articledetail?id=" + e });
    },
    onReachBottom: function () {
      var e = this;
      if (this.data.recommendArticle.length < this.data.maxLength) {
        this.setData({
          params: {
            type: getApp().globalData.currentType,
            p: this.data.params.p + 1,
            pn: 10,
          },
        });
        var a = this.data.params;
        t.getRecommend(a).then(function (t) {
          if (0 != t.data.length) {
            var a = e.data.recommendArticle.concat(t.data);
            e.setData({ recommendArticle: a });
          } else wx.showToast({ title: "没有更多内容了", icon: "none" });
        });
      }
    },
  },
});
