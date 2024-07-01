Page({
  data: {},
  onLoad: function (n) {
    var a = JSON.parse(n.data);
    this.setData({ data: a });
  },
  previewImage: function (n) {
    var a = n.target.dataset.index,
      t = this.data.data.Comment_images;
    wx.previewImage({ current: t[a], urls: t });
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {},
});
