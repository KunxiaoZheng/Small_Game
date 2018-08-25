Page({
  data: {
    opponents: [
      {
        icon: 'images/slime_green.png',
        name: '小绿史莱姆',
        battlePoint: '10',
        id: 'slime_green_small'
      }, {
        icon: 'images/slime_red.png',
        name: '小红史莱姆',
        battlePoint: '20',
        id: 'slime_red_small'
      }, {
        icon: 'images/slime_green.png',
        name: '中绿史莱姆',
        battlePoint: '50',
        id: 'slime_green_middle'
      }, {
        icon: 'images/slime_red.png',
        name: '中红史莱姆',
        battlePoint: '100',
        id: 'slime_red_middle'
      }, {
        icon: 'images/slime_green.png',
        name: '大绿史莱姆',
        battlePoint: '100',
        id: 'slime_green_large'
      }, {
        icon: 'images/slime_red.png',
        name: '大红史莱姆',
        battlePoint: '200',
        id: 'slime_red_large'
      }, {
        icon: 'images/slime_green.png',
        name: '巨大绿史莱姆',
        battlePoint: '200',
        id: 'slime_green_huge'
      }, {
        icon: 'images/slime_red.png',
        name: '巨大红史莱姆',
        battlePoint: '400',
        id: 'slime_red_huge'
      }, {
        icon: 'images/slime_red.png',
        name: '史莱姆王',
        battlePoint: '2000',
        id: 'slime_king'
      },
    ]
  },
  battle: function(e) {
    wx.navigateTo({
      url: '../battle/battle?opponent=' + e.currentTarget.dataset.type + "&name=" + e.currentTarget.dataset.name,
    })
  }
})