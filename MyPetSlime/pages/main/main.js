//index.js
//获取应用实例
const app = getApp()
let bodyAnimation = require('../../animation/body_idle.js')
let eyesAnimation = require('../../animation/eyes_sleep.js')

Page({
  data: {
    width: 0,
    height: 0,
    pixelSize: 0,
    startTop: 0,
    startLeft: 0
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
    let pixelSize = this.width/50
    this.setData({
      pixelSize: pixelSize,
      startLeft: pixelSize,
      startTop: pixelSize
    })
    let bodyFrame = 0
    let bodyAnimationFrameMax = bodyAnimation.animation.length
    let eyesFrame = 0
    let eyesAnimationFrameMax = eyesAnimation.animation.length
    const ctx = wx.createCanvasContext('myCanvas')
    ctx.setFillStyle('black')
    ctx.clearRect(0, 0, 500, 500)
    let _this = this
    setInterval(function() {
      // draw body
      _this.drawBody(ctx, bodyFrame)

      // draw eyes
      _this.drawEyes(ctx, eyesFrame, bodyFrame)
      
      ctx.draw()
      bodyFrame = (bodyFrame + 1) % bodyAnimationFrameMax
      eyesFrame = (eyesFrame + 1) % eyesAnimationFrameMax
    }, 900)
  },
  drawBody: function (ctx, bodyFrame) {
    let body = bodyAnimation.animation[bodyFrame]
    let pixelSize = this.data.pixelSize
    for (let i = 0; i < body.length; i++) {
      ctx.fillRect((this.data.startLeft + body[i][0]) * pixelSize, (this.data.startTop + body[i][1]) * pixelSize, pixelSize, pixelSize)
    }
  },
  drawEyes: function (ctx, eyesFrame, bodyFrame) {
    let eyesPos = bodyAnimation.eyes[bodyFrame]
    let eyes = eyesAnimation.animation[eyesFrame]
    let pixelSize = this.data.pixelSize
    for (let i = 0; i < eyesPos.length; i++) {
      for (let j = 0; j < eyes.length; j++) {
        ctx.fillRect((this.data.startLeft + (eyesPos[i][0] + eyes[j][0])) * pixelSize, (this.data.startTop + (eyesPos[i][1] + eyes[j][1])) * pixelSize, pixelSize, pixelSize)
      }
    }
  }
})
