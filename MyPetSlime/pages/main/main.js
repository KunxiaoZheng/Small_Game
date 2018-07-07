//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    width: 0,
    height: 0,
    isExpand: false,
    idle1: [[13, 0], [14, 0], [15, 0], [16, 0], [17, 0], [18, 0], [19, 0], [20, 0], [21, 0],
    [11, 1], [12, 1], [22, 1], [23, 1],
    [9, 2], [10, 2], [24, 2], [25, 2],
    [8, 3], [26, 3],
    [7, 4], [27, 4],
    [6, 5], [28, 5],
    [6, 6], [28, 6],
    [5, 7], [29, 7],
    [5, 8], [29, 8],
    [4, 9], [30, 9],
    [4, 10], [30, 10],
    [4, 11], [30, 11],
    [4, 12], [30, 12],
    [4, 13], [30, 13],
    [4, 14], [30, 14],
    [4, 15], [30, 15],
    [5, 16], [29, 16],
    [6, 17], [28, 17],
    [7, 18], [8, 18], [27, 18], [26, 18],
    [9, 19], [10, 19], [25, 19], [24, 19],
    [11, 20], [12, 20], [13, 20], [14, 20], [15, 20], [16, 20], [17, 20],     [18, 20], [19, 20], [20, 20], [21, 20], [22, 20], [23, 20]],
    idle2: [[12, 1], [13, 1], [14, 1], [15, 1], [16, 1], [17, 1], [18, 1], [19, 1], [20, 1], [21, 1], [22, 1],
    [10, 2], [11, 2], [23, 2], [24, 2],
    [9, 3], [25, 3],
    [8, 4], [26, 4],
    [7, 5], [27, 5],
    [6, 6], [28, 6],
    [5, 7], [29, 7],
    [4, 8], [30, 8],
    [4, 9], [30, 9],
    [3, 10], [31, 10],
    [3, 11], [31, 11],
    [3, 12], [31, 12],
    [3, 13], [31, 13],
    [3, 14], [31, 14],
    [3, 15], [31, 15],
    [4, 16], [30, 16],
    [5, 17], [29, 17],
    [6, 18], [7, 18], [27, 18], [28, 18],
    [8, 19], [9, 19], [25, 19], [26, 19],
    [10, 20], [11, 20], [12, 20], [13, 20], [14, 20], [15, 20], [16, 20], [17, 20], [18, 20], [19, 20], [20, 20], [21, 20], [22, 20], [23, 20], [24, 20]],
    eyes1: [[9, 11], [21, 11]],
    eyes2: [[9, 12], [21, 12]]
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
    let frame = true;
    const ctx = wx.createCanvasContext('myCanvas')
    ctx.setFillStyle('black')
    ctx.clearRect(0, 0, 500, 500);
    let img = [];
    let eyes = [];
    let pixelSize = this.width/50;
    let startLeft = pixelSize;
    let startTop = pixelSize;
    let _this = this;
    setInterval(function() {
      if (frame) {
        img = _this.data.idle1;
        eyes = _this.data.eyes1;
      } else {
        img = _this.data.idle2;
        eyes = _this.data.eyes2;
      }
      // body
      for (var i = 0; i < img.length; i++) {
        ctx.fillRect((startLeft + img[i][0]) * pixelSize, (startTop + img[i][1]) * pixelSize, pixelSize, pixelSize);
      }

      for (var i = 0; i < eyes.length; i++) {
        ctx.fillRect((startLeft + (eyes[i][0] - 2)) * pixelSize, (startTop + eyes[i][1]) * pixelSize, pixelSize, pixelSize);
        ctx.fillRect((startLeft + (eyes[i][0] - 1)) * pixelSize, (startTop + (eyes[i][1] + 1)) * pixelSize, pixelSize, pixelSize);
        ctx.fillRect((startLeft + eyes[i][0]) * pixelSize, (startTop + (eyes[i][1] + 1)) * pixelSize, pixelSize, pixelSize);
        ctx.fillRect((startLeft + (eyes[i][0] + 1)) * pixelSize, (startTop + eyes[i][1]) * pixelSize, pixelSize, pixelSize);
      }
      ctx.draw();
      frame = !frame;
    }, 900);
  }
})
