// pages/training/training.js
Page({
  data: {
    trainFlag:false
  },
  

  switchClicked: function (e) {
    this.setData ({
      trainFlag: e.detail.value
    })
  }
})