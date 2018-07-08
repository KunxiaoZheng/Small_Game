// pages/training/training.js

let bodyAnimation = require('../../animation/body_idle.js')
let eyesAnimation = require('../../animation/eyes_happy.js')
let actionAnimation = require('../../animation/mining.js')
Page({
  data: {
    selected: 'gold',
    hp: 100,
    str: 50,
    def: 20,
    gold: 500
  },

  select: function(e) {
    this.setData({
      selected: e.currentTarget.dataset.type
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
    let pixelSize = this.width / 80
    this.setData({
      pixelSize: pixelSize,
      startLeft: 8*pixelSize,
      startTop: 3*pixelSize,
      bodyAnimationFrameMax: bodyAnimation.animation.length,
      eyesAnimationFrameMax: eyesAnimation.animationLeft.length,
      actionAnimationFrameMax: actionAnimation.animation.length
    })
    let bodyFrame = 0
    let eyesFrame = 0
    let actionFrame = 0
    const ctx = wx.createCanvasContext('myCanvas')
    ctx.setFillStyle('black')
    ctx.clearRect(0, 0, 500, 500)
    let _this = this
    setInterval(function () {
      bodyFrame = bodyFrame % _this.data.bodyAnimationFrameMax
      eyesFrame = eyesFrame % _this.data.eyesAnimationFrameMax
      actionFrame = actionFrame % _this.data.actionAnimationFrameMax
      // draw body
      _this.drawBody(ctx, bodyFrame)

      // draw eyes
      _this.drawEyes(ctx, eyesFrame, bodyFrame)

      // draw action
      _this.drawAction(ctx, actionFrame)

      ctx.draw()
      bodyFrame = bodyFrame + 1
      eyesFrame = eyesFrame + 1
      actionFrame = actionFrame + 1
    }, 600)
  },
  drawBody: function (ctx, bodyFrame) {
    let body = bodyAnimation.animation[bodyFrame]
    let pixelSize = this.data.pixelSize
    for (let i = 0; i < body.length; i++) {
      ctx.fillRect((this.data.startLeft + body[i][0]) * pixelSize, (this.data.startTop + body[i][1]) * pixelSize, pixelSize, pixelSize)
    }
  },
  // left+right eye
  drawEyes: function (ctx, eyesFrame, bodyFrame) {
    let eyesPos = bodyAnimation.eyes[bodyFrame]
    let eyeLeft = eyesAnimation.animationLeft[eyesFrame]
    let eyeRight = eyesAnimation.animationRight[eyesFrame]
    let pixelSize = this.data.pixelSize
    for (let j = 0; j < eyeLeft.length; j++) {
      ctx.fillRect((this.data.startLeft + (eyesPos[0][0] + eyeLeft[j][0])) * pixelSize, (this.data.startTop + (eyesPos[0][1] + eyeLeft[j][1])) * pixelSize, pixelSize, pixelSize)
    }
    for (let j = 0; j < eyeRight.length; j++) {
      ctx.fillRect((this.data.startLeft + (eyesPos[1][0] + eyeRight[j][0])) * pixelSize, (this.data.startTop + (eyesPos[1][1] + eyeRight[j][1])) * pixelSize, pixelSize, pixelSize)
    }
  },
  drawAction: function (ctx, actionFrame) {
    let action = actionAnimation.animation[actionFrame]
    let pixelSize = this.data.pixelSize
    for (let i = 0; i < action.length; i++) {
      ctx.fillRect((this.data.startLeft + action[i][0]) * pixelSize, (this.data.startTop + action[i][1]) * pixelSize, pixelSize, pixelSize)
    }
  }
})