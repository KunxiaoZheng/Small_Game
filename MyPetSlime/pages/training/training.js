// pages/training/training.js

var rainFlag = false;

Page({
  data: {
    trainFlag: false
  },


  switchClicked: function (e) {
    this.setData({
      'trainFlag': !this.data.trainFlag
    })
  },

  onLoad: function (options) {
    var that = this
    //获取系统信息  
    wx.getSystemInfo({
      //获取系统信息成功，将系统窗口的宽高赋给页面的宽高  
      success: function (res) {
        that.width = res.windowWidth
        that.height = res.windowHeight
      }
    })
  },
  onReady: function () {
    const ctx = wx.createCanvasContext('myCanvas')
    ctx.beginPath()

    ctx.moveTo(this.width / 4, this.height / 4)
    ctx.bezierCurveTo(this.width / 4 - 10, this.height / 4 + 70, 3 * this.width / 4 - 10, this.height / 4 + 70, 3 * this.width / 4, this.height / 4)

    ctx.moveTo(this.width / 4, this.height / 4)
    ctx.bezierCurveTo(this.width / 4 + 10, this.height / 4 - 110, 3 * this.width / 4 + 20, this.height / 4 - 110, 3 * this.width / 4, this.height / 4)

    ctx.setStrokeStyle('black')
    ctx.stroke()

    ctx.beginPath()
    ctx.arc(this.width / 2 - 40, this.height / 4 - 10, 20, 0, Math.PI)
    ctx.stroke()

    ctx.beginPath()
    ctx.arc(this.width / 2 + 25, this.height / 4 - 10, 20, 0, Math.PI)
    ctx.stroke()

    ctx.draw()

  }
})