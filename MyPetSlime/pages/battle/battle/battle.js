Page({
  data: {
    opponent: "",
    name: ""
  },
  onLoad: function (options) {
    this.setData({
      opponent: options.opponent,
      name: options.name
    })
  }
})