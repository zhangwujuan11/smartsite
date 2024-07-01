Component({
  properties: {
    rows: { type: Array, value: [] },
    headers: { type: Array, value: [] },
    keys: { type: Array, value: [] },
    config: {
      type: Object,
      value: {
        columnWidths: { type: Array, value: [] },
        border: { type: Boolean, value: !0 },
        scroll: { type: Boolean, value: !0 },
        stripe: { type: Boolean, value: !0 },
        headbgcolor: { type: String, value: "#f3f0f0" },
      },
    },
    table: "",
  },
  data: {},
  methods: {
    previewImage: function (e) {
      console.log(e.target.dataset.src);
      var t = e.target.dataset.src;
      wx.previewImage({ current: t, urls: [t] });
    },
    getDetail: function (e) {
        console.log( e.currentTarget.dataset.obj.constructionId)
      wx.setStorageSync("dataitem", e.currentTarget.dataset.obj),
        ("SteelLab" != e.currentTarget.dataset.table &&
          "CementLab" != e.currentTarget.dataset.table &&
          "concrete" != e.currentTarget.dataset.table) ||
          wx.navigateTo({
            url:
              "/pages_data_center/data_center_detail/index?table=" +
              e.currentTarget.dataset.table +
              "&id=" +
              e.currentTarget.dataset.pk + 
              "&depid=" +
              e.currentTarget.dataset.obj.constructionId
              ,
          });
    },
  },
  pageLifetimes: {},
});
