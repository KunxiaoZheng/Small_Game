Page({
  data: {
    opponent: ''
  },
  onLoad: function (options) {
    this.setData({
      opponent: options.opponent
    })
  }
})