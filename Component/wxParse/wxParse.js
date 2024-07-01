var e = require("../../@babel/runtime/helpers/interopRequireDefault"),
  t = require("../../@babel/runtime/helpers/defineProperty"),
  i = require("../../@babel/runtime/helpers/createForOfIteratorHelper"),
  a = e(require("./showdown.js")),
  r = e(require("./html2json.js")),
  n = 0,
  o = 0;
function l(e) {
  var t = e.target.dataset.src,
    i = e.target.dataset.from;
  void 0 !== i &&
    i.length > 0 &&
    wx.previewImage({ current: t, urls: this.data[i].imageUrls });
}
function s(e) {
  var a = e.target.dataset.from,
    r = e.target.dataset.idx;
  void 0 !== a &&
    a.length > 0 &&
    (function (e, a, r, l) {
      var s,
        d = r.data[l];
      if (!d || 0 == d.images.length) return;
      var h,
        g = d.images,
        v = (function (e, t, i, a, r) {
          var l = r.attr.style,
            s = l.indexOf("width:");
          console.log(s);
          var d = "";
          if (-1 != s) {
            console.log(l);
            for (var h = l.split(";"), g = 0; g < h.length; ++g)
              -1 != h[g].indexOf("width") && (d = h[g].split(":")[1]);
            console.log(d);
          }
          var v = d.search("%"),
            m = d.search("px"),
            c = "",
            f = "",
            u = "";
          console.log(v),
            console.log(m),
            v > 0 && d.length == v + 2 && (c = d.slice(0, -2));
          if (m > 0 && d.length == m + 2) {
            f = d.slice(0, -2);
            var w = l.indexOf("height:"),
              p = "";
            if (-1 != w) {
              for (var x = l.split(";"), P = 0; P < x.length; ++P)
                -1 != x[P].indexOf("height") && (p = x[P].split(":")[1]);
              console.log(p);
            }
            var j = p.search("px");
            j > 0 && p.length == j + 2 && (u = p.slice(0, -2));
          }
          console.log(u);
          var y,
            I = 0,
            b = 0,
            q = {},
            O = i.data[a].view.imagePadding;
          (y = n - 2 * O),
            o,
            c
              ? ((b = ((I = (y * c) / 100) * t) / e),
                (q.imageWidth = I),
                (q.imageheight = b))
              : f && u && f <= y
              ? ((q.imageWidth = f), (q.imageheight = u))
              : e > y
              ? ((b = ((I = y) * t) / e),
                (q.imageWidth = I),
                (q.imageheight = b))
              : ((q.imageWidth = e), (q.imageheight = t));
          return q;
        })(e.detail.width, e.detail.height, r, l, g[a]),
        m = g[a].index,
        c = "".concat(l),
        f = i(m.split("."));
      try {
        for (f.s(); !(h = f.n()).done; ) {
          var u = h.value;
          c += ".nodes[".concat(u, "]");
        }
      } catch (e) {
        f.e(e);
      } finally {
        f.f();
      }
      var w = c + ".width",
        p = c + ".height";
      r.setData((t((s = {}), w, v.imageWidth), t(s, p, v.imageheight), s));
    })(e, r, this, a);
}
wx.getSystemInfo({
  success: function (e) {
    (n = e.windowWidth), (o = e.windowHeight);
  },
}),
  (module.exports = {
    wxParse: function () {
      var e =
          arguments.length > 0 && void 0 !== arguments[0]
            ? arguments[0]
            : "wxParseData",
        t =
          arguments.length > 1 && void 0 !== arguments[1]
            ? arguments[1]
            : "html",
        i =
          arguments.length > 2 && void 0 !== arguments[2]
            ? arguments[2]
            : '<div class="color:red;">数据不能为空</div>',
        n = arguments.length > 3 ? arguments[3] : void 0,
        o = arguments.length > 4 ? arguments[4] : void 0,
        d = n,
        h = {};
      if ("html" == t) h = r.default.html2json(i, e);
      else if ("md" == t || "markdown" == t) {
        var g = new a.default.Converter(),
          v = g.makeHtml(i);
        h = r.default.html2json(v, e);
      }
      (h.view = {}),
        (h.view.imagePadding = 0),
        void 0 !== o && (h.view.imagePadding = o);
      var m = {};
      (m[e] = h), d.setData(m), (d.wxParseImgLoad = s), (d.wxParseImgTap = l);
    },
    wxParseTemArray: function (e, t, i, a) {
      for (var r = [], n = a.data, o = null, l = 0; l < i; l++) {
        var s = n[t + l].nodes;
        r.push(s);
      }
      (e = e || "wxParseTemArray"),
        ((o = JSON.parse('{"' + e + '":""}'))[e] = r),
        a.setData(o);
    },
    emojisInit: function () {
      var e =
          arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
        t =
          arguments.length > 1 && void 0 !== arguments[1]
            ? arguments[1]
            : "/wxParse/emojis/",
        i = arguments.length > 2 ? arguments[2] : void 0;
      r.default.emojisInit(e, t, i);
    },
  });
