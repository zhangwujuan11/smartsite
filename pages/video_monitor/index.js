var t = getApp(),
  a = require("../../utils/http.js"),
  e = require("../../utils/util");
Page({
  data: {
    open_url:'',
    currentTab: 0,
    videoTab: 0,
    curId: "",
    condata: "",
    idata: "",
    contype: "",
    tabs: [
      { name: "设备监控", type: "monitor_dev", list: [] },
      { name: "航拍视频", type: "plane_dev", list: [] },
    ],
    touchDot: 0,
    touchMove: 0,
    muted: !0,
    horizontal_status: !0,
    minHeight: wx.getSystemInfoSync().windowHeight,
    service_url: t.globalData.service,
    monitor_list_height: 0,
    background_height: 0,
    image_height: 0,
    monitor_lists: {},
    accessToken: "",
    cur_video_info: { dev_id: 0, list_index: 0 },
    show_progress: !1,
    switch_model: !1,
    touchEnd: null,
    touchStart: null,
  },
  onLoad: function (t) {
    // e.getUrl(),
      this.set_monitor_list_height(),
      this.getExperienceDeviceLists(),
      this.getPlaneDeviceLists();
  },
  set_monitor_list_height: function () {
    var t = this,
      a = 0,
      e = 0;
    wx.getSystemInfo({
      success: function (i) {
        a = i.windowHeight;
        var s = i.windowWidth;
        e = 750 / s;
        t.setData({ background_height: 500 - (44 + i.statusBarHeight) * e }),
          t.setData({ image_height: 225 - (44 + i.statusBarHeight) * e });
      },
    }),
      wx
        .createSelectorQuery()
        .select("#monitor-tab")
        .boundingClientRect(function (i) {
          t.setData({ monitor_list_height: (a - i.bottom) * e - 10 });
        })
        .exec();
  },
  getExperienceDeviceLists: function () {
    var e = this,
      i = t.globalData.service + "/front/v1/camera/list/1";
    a.get(i).then(function (t) {
      if (200 === t.statusCode) {
        var a = t.data.items;
        (e.data.tabs[0].list = a),
          a.length > 0 && e.get_video_url(a[0].aySerNo, 0, a[0].cno, a[0].id),
          e.setData({
            monitor_lists: {
              type: e.data.tabs[e.data.currentTab].type,
              list: e.data.tabs[e.data.currentTab].list,
              name: e.data.tabs[e.data.currentTab].name,
            },
            contype: a[0].factoryType,
            tabledata: a,
            condata: a[0].cno,
            idata: a[0].id,
          }),
          e.isonline();
      } else wx.showToast({ title: "网络环境异常，请稍后再试~", icon: "none", duration: 2e3 });
    });
  },
  isonline: function () {
    for (
      var e = this,
        i = t.globalData.service + "/front/v1/camera/status",
        s = this.data.monitor_lists.list,
        o = function (t) {
          a.get(i, {
            cameraType: e.data.monitor_lists.list[t].factoryType,
            cno: e.data.monitor_lists.list[t].cno,
            driver: e.data.monitor_lists.list[t].aySerNo,
          }).then(function (a) {
            s[t].status = a.data.data.status;
          });
        },
        n = 0;
      n < this.data.monitor_lists.list.length;
      n++
    )
      o(n);
    this.setData({ "monitor_lists.list": s });
  },
  getPlaneDeviceLists: function () {
    var e = this,
      i = t.globalData.service + "/front/v1/videoList";
    a.get(i).then(function (t) {
      if (200 === t.statusCode) {
        var a = t.data.items,
          i = [];
        for (var s in a)
          i.push({
            id: a[s].id,
            cam_video_cover: a[s].ayVideoCover,
            cam_videos_addr: a[s].ayVideosAddr,
            cam_videos_note: a[s].ayVideosNote,
          });
        e.data.tabs[1].list = i;
      }
    });
  },
  swichNav: function (t) {
    if (this.data.currentTab === t.target.dataset.current) return !1;
    this.setData({
      currentTab: t.target.dataset.current,
      monitor_lists: this.data.tabs[t.target.dataset.current],
    }),
      console.log(this.data.monitor_lists),
      this.isonline();
  },
  get_video_url: function (e, i, s, o) {
    var n = this;
    n.setData({ curId: e });
    var d = t.globalData.service + "/front/v1/camera/getCameraForAPP/" + e;
    a.get(d, { cno: s, id: o }).then(function (t) {
      if (200 === t.data.code) {
        var a,
          s = 0;
        "" === (a = t.data.data.openUrl)
       
          ? (wx.showToast({
              title: "视频加载失败，请选择其他视频",
              icon: "none",
              duration: 2e3,
            }),
            (s = 1))
          : wx.hideLoading();
        for (
          var o = "", d = 0;
          d < n.data.tabs[n.data.currentTab].list.length;
          d++
        )
          n.data.tabs[n.data.currentTab].list[d].id == e &&
            (o =
              1 == n.data.currentTab
                ? n.data.tabs[n.data.currentTab].list[d].cam_videos_note.split(
                    "."
                  )[0]
                : n.data.tabs[n.data.currentTab].list[d].cam_name);
        var r = !1;
        (r = 1 == i),
          n.data.videoTab != n.data.currentTab
            ? ((n.data.videoTab = n.data.currentTab),
              console.log("设置为静音", o),
              n.setData({
                cur_video_url:a,
                video_title: o,
                muted: !0,
                show_mute_btn: r,
                cur_video_info: { dev_id: e, list_index: i, status: s },
              }))
            : n.setData({
                cur_video_url:a,
                video_title: o,
                show_mute_btn: r,
                cur_video_info: { dev_id: e, list_index: i, status: s },
              });
      } else wx.showToast({ title: t.data.message, icon: "none", duration: 2e3 });
    });
  },
  click_video: function (t) {
    for (
      var a = t.currentTarget.dataset.id, e = "", i = "", s = 0;
      s < this.data.tabledata.length;
      s++
    )
      a == this.data.tabledata[s].id &&
        ((e = this.data.tabledata[s].cno),
        (i = this.data.tabledata[s].aySerNo),
        this.setData({
          condata: e,
          idata: a,
          contype: this.data.tabledata[s].factoryType,
        }));
    this.get_video_url(i, this.data.currentTab, e, a),
      1 == this.data.currentTab
        ? this.setData({ switch_model: !0 })
        : this.setData({ switch_model: !1 });
  },
  click_video_direct: function (t) {
    wx.showLoading({ title: "视频加载中" });
    var a = t.currentTarget.dataset.url,
//     var urlList =  t.currentTarget.dataset.url.split('/')
//     urlList[urlList.length-1] ='11.hd.live'
//    var open_url = urlList.join('/')
//     console.log(open_url)

      e = t.currentTarget.dataset.id,
      i = 0;
    "" === a
      ? (wx.showToast({
          title: "视频加载失败，请选择其他视频",
          icon: "none",
          duration: 2e3,
        }),
        (i = 1))
      : wx.hideLoading();
    for (
      var s = "", o = 0;
      o < this.data.tabs[this.data.currentTab].list.length;
      o++
    )
      this.data.tabs[this.data.currentTab].list[o].id == e &&
        (s =
          1 == this.data.currentTab
            ? this.data.tabs[this.data.currentTab].list[
                o
              ].cam_videos_note.split(".")[0]
            : this.data.tabs[this.data.currentTab].list[o].cam_name);
    var n = !1;
    (n = !0),
      this.data.videoTab != this.data.currentTab
        ? ((this.data.videoTab = this.data.currentTab),
          console.log("设置为静音", s),
          this.setData({
            cur_video_url:a,
            video_title: s,
            muted: !0,
            show_mute_btn: n,
            cur_video_info: { dev_id: e, list_index: 1, status: i },
          }))
        : (console.log("默认", s),
          this.setData({
            cur_video_url:a,
            video_title: s,
            show_mute_btn: n,
            cur_video_info: { dev_id: e, list_index: 1, status: i },
          })),
      1 == this.data.currentTab
        ? this.setData({ switch_model: !0 })
        : this.setData({ switch_model: !1 });
  },
  end: function (e) {
    console.log(e), this.setData({ touchEnd: e.timeStamp });
    if (0 !== this.data.curId.length) {
      var i =
        t.globalData.service +
        "/front/v1/camera/ptz/" +
        this.data.curId +
        "/100?cameraType=" +
        this.data.contype +
        "&cno=" +
        this.data.condata;
      this.data.touchEnd - this.data.touchStart < 2e3
        ? setTimeout(function () {
            a.get(i).then(function (t) {
              200 === t.data.code ||
                wx.showToast({
                  title: t.data.message,
                  icon: "none",
                  duration: 2e3,
                });
            });
          }, 2e3)
        : a.get(i).then(function (t) {
            200 === t.data.code ||
              wx.showToast({
                title: t.data.message,
                icon: "none",
                duration: 2e3,
              });
          });
    } else
      wx.showToast({ title: "请先选择操作设备", icon: "none", duration: 2e3 });
  },
  Device_PTZ: function (e) {
    if (
      (this.setData({ touchStart: e.timeStamp }), 0 !== this.data.curId.length)
    ) {
      for (var i = "", s = "", o = 0; o < this.data.tabledata.length; o++)
        this.data.tabledata[o].aySerNo == this.data.curId &&
          (console.log(),
          (i = this.data.tabledata[o].factoryType),
          (s = this.data.tabledata[o].cno));
      var n =
        t.globalData.service +
        "/front/v1/camera/ptz/" +
        this.data.curId +
        "/" +
        e.currentTarget.dataset.dict +
        "?cameraType=" +
        i +
        "&cno=" +
        s;
      a.get(n).then(function (t) {
        200 === t.data.code ||
          wx.showToast({ title: t.data.message, icon: "none", duration: 2e3 });
      });
    } else
      wx.showToast({ title: "请先选择操作设备", icon: "none", duration: 2e3 });
  },
  bindhorizontal: function (t) {
    1 == t.detail.fullScreen
      ? this.setData({ horizontal_status: !1, show_progress: !0 })
      : this.setData({ horizontal_status: !0, show_progress: !1 }),
      "horizontal" == t.detail.direction
        ? this.setData({ show_mute_btn: !0 })
        : 1 != this.setData.currentTab && this.setData({ show_mute_btn: !1 });
  },
});
