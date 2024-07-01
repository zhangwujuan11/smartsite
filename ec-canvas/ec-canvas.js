var e,
  t = require("../@babel/runtime/helpers/interopRequireWildcard"),
  a = require("../@babel/runtime/helpers/interopRequireDefault"),
  n = require("../@babel/runtime/helpers/typeof"),
  r = a(require("./wx-canvas")),
  s = t(require("./echarts"));
function i(e, t) {
  (e = e.split(".")), (t = t.split("."));
  for (var a = Math.max(e.length, t.length); e.length < a; ) e.push("0");
  for (; t.length < a; ) t.push("0");
  for (var n = 0; n < a; n++) {
    var r = parseInt(e[n]),
      s = parseInt(t[n]);
    if (r > s) return 1;
    if (r < s) return -1;
  }
  return 0;
}
function c(e) {
  for (var t = 0; t < e.touches.length; ++t) {
    var a = e.touches[t];
    (a.offsetX = a.x), (a.offsetY = a.y);
  }
  return e;
}
Component({
  properties: {
    canvasId: { type: String, value: "ec-canvas" },
    ec: { type: Object },
    forceUseOldCanvas: { type: Boolean, value: !1 },
  },
  data: { isUseNewCanvas: !1 },
  ready: function () {
    s.registerPreprocessor(function (e) {
      e &&
        e.series &&
        (e.series.length > 0
          ? e.series.forEach(function (e) {
              e.progressive = 0;
            })
          : "object" === n(e.series) && (e.series.progressive = 0));
    }),
      this.data.ec
        ? this.data.ec.lazyLoad || this.init()
        : console.warn(
            '组件需绑定 ec 变量，例：<ec-canvas id="mychart-dom-bar" canvas-id="mychart-bar" ec="{{ ec }}"></ec-canvas>'
          );
  },
  methods: {
    init: function (e) {
      var t = wx.getSystemInfoSync().SDKVersion,
        a = i(t, "2.9.0") >= 0,
        n = this.data.forceUseOldCanvas,
        r = a && !n;
      if (
        (this.setData({ isUseNewCanvas: r }),
        n && a && console.warn("开发者强制使用旧canvas,建议关闭"),
        r)
      )
        this.initByNewWay(e);
      else {
        if (!(i(t, "1.9.91") >= 0))
          return void console.error(
            "微信基础库版本过低，需大于等于 1.9.91。参见：https://github.com/ecomfe/echarts-for-weixin#%E5%BE%AE%E4%BF%A1%E7%89%88%E6%9C%AC%E8%A6%81%E6%B1%82"
          );
        console.warn(
          "建议将微信基础库调整大于等于2.9.0版本。升级后绘图将有更好性能"
        ),
          this.initByOldWay(e);
      }
    },
    initByOldWay: function (t) {
      var a = this;
      e = wx.createCanvasContext(this.data.canvasId, this);
      var n = new r.default(e, this.data.canvasId, !1);
      s.setCanvasCreator(function () {
        return n;
      });
      wx.createSelectorQuery()
        .in(this)
        .select(".ec-canvas")
        .boundingClientRect(function (e) {
          "function" == typeof t
            ? (a.chart = t(n, e.width, e.height, 1))
            : a.data.ec && "function" == typeof a.data.ec.onInit
            ? (a.chart = a.data.ec.onInit(n, e.width, e.height, 1))
            : a.triggerEvent("init", {
                canvas: n,
                width: e.width,
                height: e.height,
                canvasDpr: 1,
              });
        })
        .exec();
    },
    initByNewWay: function (e) {
      var t = this;
      wx.createSelectorQuery()
        .in(this)
        .select(".ec-canvas")
        .fields({ node: !0, size: !0 })
        .exec(function (a) {
          var n = a[0].node;
          t.canvasNode = n;
          var i = wx.getSystemInfoSync().pixelRatio,
            c = a[0].width,
            o = a[0].height,
            h = n.getContext("2d"),
            u = new r.default(h, t.data.canvasId, !0, n);
          s.setCanvasCreator(function () {
            return u;
          }),
            "function" == typeof e
              ? (t.chart = e(u, c, o, i))
              : t.data.ec && "function" == typeof t.data.ec.onInit
              ? (t.chart = t.data.ec.onInit(u, c, o, i))
              : t.triggerEvent("init", {
                  canvas: u,
                  width: c,
                  height: o,
                  dpr: i,
                });
        });
    },
    canvasToTempFilePath: function (t) {
      var a = this;
      this.data.isUseNewCanvas
        ? wx
            .createSelectorQuery()
            .in(this)
            .select(".ec-canvas")
            .fields({ node: !0, size: !0 })
            .exec(function (e) {
              var a = e[0].node;
              (t.canvas = a), wx.canvasToTempFilePath(t);
            })
        : (t.canvasId || (t.canvasId = this.data.canvasId),
          e.draw(!0, function () {
            wx.canvasToTempFilePath(t, a);
          }));
    },
    touchStart: function (e) {
      if (this.chart && e.touches.length > 0) {
        var t = e.touches[0],
          a = this.chart.getZr().handler;
        a.dispatch("mousedown", { zrX: t.x, zrY: t.y }),
          a.dispatch("mousemove", { zrX: t.x, zrY: t.y }),
          a.processGesture(c(e), "start");
      }
    },
    touchMove: function (e) {
      if (this.chart && e.touches.length > 0) {
        var t = e.touches[0],
          a = this.chart.getZr().handler;
        a.dispatch("mousemove", { zrX: t.x, zrY: t.y }),
          a.processGesture(c(e), "change");
      }
    },
    touchEnd: function (e) {
      if (this.chart) {
        var t = e.changedTouches ? e.changedTouches[0] : {},
          a = this.chart.getZr().handler;
        a.dispatch("mouseup", { zrX: t.x, zrY: t.y }),
          a.dispatch("click", { zrX: t.x, zrY: t.y }),
          a.processGesture(c(e), "end");
      }
    },
  },
});
