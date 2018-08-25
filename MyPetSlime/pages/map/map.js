Page({
  data: {
    town: true,
    forest: false,
    sea: false,
    volcano: false,
    sky: false
  },
  goToPlace: function(e) {
    if (this.data[e.currentTarget.dataset.name]) {
      wx.navigateTo({
        url: e.currentTarget.dataset.name + '/' + e.currentTarget.dataset.name,
      })
    }
  }
})