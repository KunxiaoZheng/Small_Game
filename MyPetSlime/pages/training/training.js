// pages/training/training.js

let bodyAnimation = require('../../animation/body_idle.js')
let eyesAnimation = require('../../animation/eyes_happy.js')
let actionAnimation = require('../../animation/mining.js')
let interval = null
Page({
  data: {
    selected: 'gold',
    idle: true,
    seconds: 5,
    time: "",
    action: "gold",
    goldEarned: 120,
    hp: 100,
    str: 50,
    def: 20,
    gold: 500
  },

  select: function(e) {
    this.setData({
      selected: e.currentTarget.dataset.type
    })
    switch(this.data.selected) {
      case 'gold': 
        bodyAnimation = require('../../animation/body_idle.js')
        eyesAnimation = require('../../animation/eyes_happy.js')
        actionAnimation = require('../../animation/mining.js')
        this.setData({
          bodyAnimationFrameMax: bodyAnimation.animation.length,
          eyesAnimationFrameMax: eyesAnimation.animationLeft.length,
          actionAnimationFrameMax: actionAnimation.animation.length
        })
        break
      case 'stat':
        bodyAnimation = require('../../animation/body_attack.js')
        eyesAnimation = require('../../animation/eyes_idle.js')
        actionAnimation = null

        this.setData({
          bodyAnimationFrameMax: bodyAnimation.animation.length,
          eyesAnimationFrameMax: eyesAnimation.animationLeft.length
        })
        break
    }
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
    if (!this.data.idle) {
      if (this.data.action == "stat") {
        interval = setInterval(function () {
          if (that.data.seconds === 0) clearInterval(interval)
          that.setData({
            time: that.dateformat(that.data.seconds),
            seconds: that.data.seconds - 1
          })
        }, 1000)
      } else if (this.data.action == "gold") {
        console.log(1)
        interval = setInterval(function () {
          that.setData({
            goldEarned: that.data.goldEarned + 2,
          })
        }, 250)
      }
    }
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
    if (actionAnimation == null) return
    let action = actionAnimation.animation[actionFrame]
    let pixelSize = this.data.pixelSize
    for (let i = 0; i < action.length; i++) {
      ctx.fillRect((this.data.startLeft + action[i][0]) * pixelSize, (this.data.startTop + action[i][1]) * pixelSize, pixelSize, pixelSize)
    }
  },
  dateformat: function (second) {
    // 小时位
    var hr = Math.floor(second / 3600);
    // 分钟位
    var min = Math.floor((second - hr * 3600) / 60);
    // 秒位
    var sec = (second - hr * 3600 - min * 60);// equal to => var sec = second % 60;
    return hr + "小时" + min + "分钟" + sec + "秒";
  },
  train: function () {
    if (this.data.selected == "stat") {
      this.setData({
        idle: false,
        seconds: 5,
        time: this.dateformat(5),
        action: this.data.selected
      })
      var that = this;
      interval = setInterval(function () {
        if (that.data.seconds === 0) clearInterval(interval)
        that.setData({
          time: that.dateformat(that.data.seconds),
          seconds: that.data.seconds - 1
        })
      }, 1000)
    } else if (this.data.selected == "gold") {
      this.setData({
        idle: false,
        action: this.data.selected
      })
      var that = this;
      interval = setInterval(function () {
        that.setData({
          goldEarned: that.data.goldEarned + 2
        })
      }, 250)
    }
  },
  close: function () {
    this.setData({
      idle: true
    })
    clearInterval(interval)
  }
})