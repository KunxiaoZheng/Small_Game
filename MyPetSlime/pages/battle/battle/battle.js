let bodyAnimation = require('../../../animation/body_attack.js')
let eyesAnimation = require('../../../animation/eyes_idle.js')
Page({
  data: {
    opponent: "",
    name: "",
    enemyHp: 10,
    enemyMaxHp: 10,
    hp: 20,
    maxHp: 20
  },
  onLoad: function (options) {
    this.setData({
      opponent: options.opponent,
      name: options.name
    })
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
      startLeft: 9 * pixelSize,
      startTop: 200 / pixelSize,
      bodyAnimationFrameMax: bodyAnimation.animation.length,
      eyesAnimationFrameMax: eyesAnimation.animationLeft.length,
    })
    let bodyFrame = 0
    let eyesFrame = 0
    const ctx = wx.createCanvasContext('myCanvas')
    ctx.setFillStyle('black')
    ctx.clearRect(0, 0, 500, 500)
    let _this = this
    setInterval(function () {
      ctx.drawImage('../choose/images/slime_green.png', 0, 200, 150, 110)
      bodyFrame = bodyFrame % _this.data.bodyAnimationFrameMax
      eyesFrame = eyesFrame % _this.data.eyesAnimationFrameMax
      // draw body
      _this.drawBody(ctx, bodyFrame)

      // draw eyes
      _this.drawEyes(ctx, eyesFrame, bodyFrame)

      ctx.draw()
      if (bodyFrame === 3) {
        _this.setData({
          enemyHp: Math.max(_this.data.enemyHp - 1, 0),
          hp: Math.max(_this.data.hp -1, 0)
        })
        if (_this.data.enemyHp <= 0) {
          console.log("战斗结束 赢")
        } else if (_this.data.hp <= 0) {
          console.log("战斗结束 输")
        }
      }
      bodyFrame = bodyFrame + 1
      eyesFrame = eyesFrame + 1
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
  }
})