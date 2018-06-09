// pages/training/training.js

var rainFlag=false;

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
