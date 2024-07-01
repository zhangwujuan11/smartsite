var e = getApp();
module.exports = {
  get: function (o) {
    var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
      t = e.getTocken();
    return new Promise(function (e, i) {
      wx.request({
        url: o,
        method: "GET",
        data: n,
        header: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + t,
        },
        success: function (o) {
          599 === o.statusCode
            ? (wx.redirectTo({ url: "/pages/login/index" }),
              wx.showToast({
                title: "登入过期,请重新登入",
                icon: "none",
                duration: 2e3,
              }))
            : e(o);
        },
        fail: function (n) {
          console.log(o, n),
            600009 == n.errno && wx.redirectTo({ url: "/pages/home/index" }),
            e(n);
        },
      });
    });
  },
  post: function (o, n) {
    var t = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
      i = t,
      r = e.getTocken();
    return (
      void 0 !== t
        ? (t.Authorization = "Bearer " + r)
        : (i = {
            "Content-Type": "application/json",
            Authorization: "Bearer " + r,
          }),
      new Promise(function (e, t) {
        wx.request({
          url: o,
          method: "POST",
          data: n,
          header: i,
          success: function (o) {
            599 === o.statusCode
              ? (wx.redirectTo({ url: "/pages/login/index" }),
                wx.showToast({
                  title: "登入过期,请重新登入",
                  icon: "none",
                  duration: 2e3,
                }))
              : e(o);
          },
          fail: function (n) {
            console.log(o, n), e(n);
          },
        });
      })
    );
  },
  put: function (o, n) {
    var t = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
      i = t,
      r = e.getTocken();
    return (
      void 0 !== t
        ? (t.Authorization = "Bearer " + r)
        : (i = {
            "Content-Type": "application/json",
            Authorization: "Bearer " + r,
          }),
      new Promise(function (e, t) {
        wx.request({
          url: o,
          method: "PUT",
          data: n,
          header: i,
          success: function (o) {
            599 === o.statusCode
              ? (wx.redirectTo({ url: "/pages/login/index" }),
                wx.showToast({
                  title: "登入过期,请重新登入",
                  icon: "none",
                  duration: 2e3,
                }))
              : e(o);
          },
          fail: function (n) {
            console.log(o, n), e(n);
          },
        });
      })
    );
  },
  delete: function (o, n) {
    var t = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
      i = t,
      r = e.getTocken();
    return (
      void 0 !== t
        ? (t.Authorization = "Bearer " + r)
        : (i = {
            "Content-Type": "application/json",
            Authorization: "Bearer " + r,
          }),
      new Promise(function (e, t) {
        wx.request({
          url: o,
          method: "delete",
          data: n,
          header: i,
          success: function (o) {
            599 === o.statusCode
              ? (wx.redirectTo({ url: "/pages/login/index" }),
                wx.showToast({
                  title: "登入过期,请重新登入",
                  icon: "none",
                  duration: 2e3,
                }))
              : e(o);
          },
          fail: function (n) {
            console.log(o, n), e(n);
          },
        });
      })
    );
  },
  convertJson: function (e) {
    var o = JSON.stringify(e);
    return JSON.parse(JSON.parse(o));
  },
  networkCheck: function (e) {
    return (
      !(e.errMsg.indexOf("request:fail") >= 0) ||
      (wx.showToast({
        title: "网络环境异常，请稍后再试~",
        icon: "none",
        duration: 2e3,
      }),
      !1)
    );
  },
};
