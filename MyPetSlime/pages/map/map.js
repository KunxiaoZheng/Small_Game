Page({
  data: {
    town: true,
    forest: true,
    sea: false,
    volcano: false,
    sky: false
  },
  goToPlace: function(e) {
    if (this.data[e.currentTarget.dataset.name]) {
      console.log(e.currentTarget.dataset.name)
    }
  }
})