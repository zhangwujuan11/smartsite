getApp();
Page({
  data: { bim_url: "" },
  onLoad: function (t) {
    var e = new Date(new Date().setHours(0, 0, 0, 0)).getTime();
    if( wx.getStorageSync("username").indexOf("admin") >= 0){
        this.setData({
            bim_url: "https://pc.starhope.net/#/bim/wxindex?time=" + e,
          })
    }else if( wx.getStorageSync("username").indexOf("sh_") >= 0){
        this.setData({
            bim_url: "https://sh.starhope.net/#/bim/wxindex?time=" + e,
          })
    }else if(wx.getStorageSync("username").indexOf("gt_") >= 0){
        this.setData({
            bim_url: "https://gt.starhope.net/#/bim/wxindex?time=" + e,
          });
    }
    console.log(this.data.bim_url)    
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {},
});
