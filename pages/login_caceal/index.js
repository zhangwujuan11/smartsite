getApp();
Page({
  data: { currentIndex: 0 },
  pagechange: function (t) {
    if ("touch" === t.detail.source) {
      var e = this.data.currentIndex;
      (e = (e + 1) % 2), this.setData({ currentIndex: e });
    }
  },
  titleClick: function (t) {
    this.setData({ currentIndex: t.currentTarget.dataset.idx });
  },
  onLoad: function (t) {
    this.setData({ currentIndex: t.id }), console.log(t.id);
  },
});
