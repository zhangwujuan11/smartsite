var a = require("../../utils/http"),
  e = (require("../../utils/util"), getApp());
Page({
  data: {
    tableConfig: {
      columnWidths: ["80rpx", "300rpx"],
      border: !1,
      scroll: !0,
      headbgcolor: "#DCDCDC",
      stripe: !0,
    },
    tableConfig_head: {
      columnWidths: ["80rpx", "300rpx"],
      border: !1,
      scroll: !0,
      headbgcolor: "#DCDCDC",
      stripe: !0,
    },
    dataContent: {},
    labelFormSleeb: {
      sampleNo: "报告编号",
      position: "工程部位",
      variety: "钢筋类别",
      diameters: "直径",
      samplingDate: "生产产家",
      batchNo: "批号",
      amount: "代表数量(t)",
      construction: "施工单位",
      supervision: "监理单位",
      remark: "备注",
    },
    labelFormConcret: {
      sampleNo: "报告编号",
      position: "工程部位",
      variety: "设计强度等级",
      approachDate: "成型日期",
      samplingDate: "抗压日期",
      batchNo: "配合比报告编号",
      amount: "塌落度（mm)",
      construction: "施工单位",
      supervision: "监理单位",
      remark: "备注",
    },
    labelFormCementlab: {
      propNo: "配料通知单号",
      recordTime: "时间",
      engineeringName: "工程名称",
      constructionPart: "施工地点",
      proportionCode: "配比编号",
      stirringTime: "搅拌时间",
      strengthGrade: "强度",
      tagWeight: "目标重量",
      actWeight: "实际重量",
    },
    tableType: "",
    labelValueObj: null,
  },
  onLoad: function (a) {
    var e = a.table;
    a.id;
   
      this.setData({
        tableType: e,
        dataContent: wx.getStorageSync("dataitem"),
        labelValueObj:
          "SteelLab" == e
            ? this.data.labelFormSleeb
            : "CementLab" == e
            ? this.data.labelFormCementlab
            : this.data.labelFormConcret,
      }),
      console.log(this.data.dataContent);
  },
  jumptbind: function (a) {
    console.log(a,"aaaaa");
    var e = a.currentTarget.dataset.item;
    var dep = a.currentTarget.dataset.depid
    wx.navigateTo({
      url:
        "/pages_data_center/data_center_detail_bind/index?id=" + e +  "&chart_type=" + this.data.tableType + "&depid=" + dep,
    });
  },
  get_detail_data: function (t, l) {
    var r = this,
      d = e.globalData.service + "/management_getExpDetail/";
    a.get(d, { url_type: 1, table: t, id: l }).then(function (a) {
      a.errMsg.indexOf("request:fail") >= 0 &&
        (r.setData({ searchLoading: !1 }),
        wx.showToast({
          title: "网络环境异常，请稍后再试~",
          icon: "none",
          duration: 2e3,
        }));
      for (
        var e = [], t = [], l = {}, d = 0;
        d < a.data.detail_header_col.length;
        d++
      )
        l[a.data.detail_header_col[d]] = a.data.model_header_list[d];
      e.push(l),
        r.setData({
          headers_head: a.data.detail_header_col,
          keys_head: a.data.detail_header_col,
          table_rows_head: e,
        });
      for (var o = {}, n = 0; n < a.data.detail_header_col.length; n++)
        o[a.data.detail_header_col[n]] = {
          key: a.data.detail_header_col[n],
          lens: r.getStrLength(a.data.detail_header_col[n]),
        };
      for (n = 0; n < e.length; n++)
        for (var i = 0; i < a.data.detail_header_col.length; i++) {
          var s = e[n][a.data.detail_header_col[i]];
          null == s && (s = 0);
          var c = r.getStrLength(s.toString());
          o[a.data.detail_header_col[i]].lens < c &&
            (o[a.data.detail_header_col[i]] = { key: s, lens: c });
        }
      var h = r.copyArr(o),
        _ = [];
      for (n = 0; n < a.data.detail_header_col.length; n++) {
        var g = 12 * r.data.ratio * h[a.data.detail_header_col[n]].lens;
        _.push(g.toString() + "rpx");
      }
      r.setData({ "tableConfig_head.columnWidths": _ });
      for (var u = [], b = 0; b < a.data.model_tbody_list.length; b++) {
        t = {};
        for (var p = 0; p < a.data.detail_table_header.length; p++)
          t[a.data.detail_table_header[p]] = a.data.model_tbody_list[b][p];
        u.push(t);
      }
      r.setData({
        headers: a.data.detail_table_header,
        keys: a.data.detail_table_header,
        table_rows: u,
      });
      for (o = {}, n = 0; n < a.data.detail_table_header.length; n++)
        o[a.data.detail_table_header[n]] = {
          key: a.data.detail_table_header[n],
          lens: r.getStrLength(a.data.detail_table_header[n]),
        };
      for (n = 0; n < u.length; n++)
        for (i = 0; i < a.data.detail_table_header.length; i++) {
          var m = u[n][a.data.detail_table_header[i]];
          null == m && (m = 0);
          var f = r.getStrLength(m.toString());
          o[a.data.detail_table_header[i]].lens < f &&
            (o[a.data.detail_table_header[i]] = { key: m, lens: f });
        }
      for (
        h = r.copyArr(o), _ = [], n = 0;
        n < a.data.detail_table_header.length;
        n++
      ) {
        var v = 12 * r.data.ratio * h[a.data.detail_table_header[n]].lens;
        _.push(v.toString() + "rpx");
      }
      r.setData({ "tableConfig.columnWidths": _ });
    });
  },
  changeValue: function (a) {
    var e = a.currentTarget.dataset.key,
      t = a.detail.value,
      l = this.data.dataContent;
    (l[e] = t), this.setData({ dataContent: l });
  },
  getStrLength: function (a) {
    for (var e = 0, t = 0; t < a.length; t++)
      a.charCodeAt(t) > 127 || 94 == a.charCodeAt(t) ? (e += 2) : e++;
    return e;
  },
  copyArr: function (a) {
    return JSON.parse(JSON.stringify(a));
  },
  deleteBtnClickcg: function () {
    var t = this,
      l = e.globalData.service;
    (l =
      "SteelLab" == this.data.tableType
        ? l + "/v1/labs/steel/samples/delete/" + this.data.dataContent.sampleNo
        : l +
          "/v1/labs/concrete/samples/delete/" +
          this.data.dataContent.sampleNo),
      wx.showModal({
        title: "提示",
        content: "确定要删除此条数据吗？",
        success: function (e) {
          if (e.confirm)
            a.post(l).then(function (a) {
              console.log(a),
                200 === a.statusCode
                  ? wx.showToast({
                      title: "删除成功",
                      icon: "success",
                      duration: 1500,
                      mask: !1,
                      success: function () {
                        wx.redirectTo({
                          url:
                            "../../pages_data_center/data_center_chart/index?chart_type=" +
                            t.data.tableType,
                        });
                      },
                    })
                  : wx.showToast({
                      title: "网络环境异常，请稍后再试~",
                      icon: "none",
                      duration: 2e3,
                    });
            });
          else if (e.cancel) return !1;
        },
      });
  },
  submitBtnClickcg: function () {
    var t = this,
      l = e.globalData.service;
    l =
      "SteelLab" == this.data.tableType
        ? l + "/v1/labs/steel/samples/update/" + this.data.dataContent.sampleNo
        : l +
          "/v1/labs/concrete/samples/update/" +
          this.data.dataContent.sampleNo;
    var r = Object.assign({}, this.data.dataContent);
    a.post(l, r).then(function (a) {
      console.log(a),
        200 === a.statusCode
          ? wx.showToast({
              title: "修改成功",
              icon: "success",
              duration: 1500,
              mask: !1,
              success: function () {
                wx.redirectTo({
                  url:
                    "../../pages_data_center/data_center_chart/index?chart_type=" +
                    t.data.tableType,
                });
              },
            })
          : wx.showToast({
              title: "网络环境异常，请稍后再试~",
              icon: "none",
              duration: 2e3,
            });
    });
  },
});
