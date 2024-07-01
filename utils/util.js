var t = function (t) {
  return (t = t.toString())[1] ? t : "0".concat(t);
};
module.exports = {
  formatTime: function (t) {
    var e = new Date(parseInt(t)),
      r = e.getFullYear(),
      n = e.getMonth() + 1,
      o = e.getDate(),
      a = e.getHours(),
      g = e.getMinutes();
    e.getSeconds();
    return r + "-" + n + "-" + o + " " + a + ":" + g;
  },
  getUrl: function () {
    var t = getCurrentPages(),
      e = t[t.length - 1],
      r = e.route;
    wx.setStorageSync("Router", "/".concat(r));
    var n = e.options,
      o = r + "?";
    for (var a in n) {
      o += a + "=" + n[a] + "&";
    }
    (o = o.substring(0, o.length - 1)), wx.setStorageSync("Url", "/".concat(o));
  },
  getRouter: function () {
    var t = getCurrentPages(),
      e = t[t.length - 1].route;
    wx.setStorageSync("Router", "/".concat(e));
  },
  getTimeLast25Days: function (e) {
    var r = e.getFullYear(),
      n = e.getDate() - 24;
    if (n <= 0)
      for (
        var o = e.getMonth(),
          a = new Date(r, o, 0).getDate(),
          g = a + n,
          u = [],
          s = 0;
        s < 25;
        s++
      )
        u.push([o, g].map(t).join("-")), (g += 1) > a && ((g = 1), (o += 1));
    else {
      var c = e.getMonth() + 1;
      for (u = [], s = 0; s < 25; s++) u.push([c, n].map(t).join("-")), n++;
    }
    return u;
  },
  formatDate: function (e) {
    return [e.getFullYear(), e.getMonth() + 1, e.getDate()].map(t).join("-");
  },
};
