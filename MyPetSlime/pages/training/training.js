// pages/training/training.js

Page({
  data: {
    selected: 'gold',
    hp: 100,
    str: 50,
    def: 20,
    gold: 500
  },

  switchClicked: function (e) {
    
  },

  onLoad: function (options) {

  },

  onReady: function () {
    
  },

  select: function(e) {
    this.setData({
      selected: e.currentTarget.dataset.type
    })
  }
})