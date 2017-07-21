//index.js
//获取应用实例
var app = getApp()
Page({
  //当前页面的数据
  data: {
    motto: 'Welcome to demo',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    //跳转到某个页面
    wx.navigateTo({
      // url: '../logs/logs'
    })
  },
  changeAvatar(){
    var that = this;
    wx.showActionSheet({
      itemList: ["从相册选择","拍照"],
      success:function(res){
        console.log(res.tapIndex);
        that.chooseImg(res.tapIndex,that.userInfo);
        
      },
      //点击取消的回调
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },

  //选取照片
  chooseImg(index,userInfo){
    var imgsrc;
    var that = this;
    //相册
    var source=[];
    if(index == 0){
      source = ['album']
    }else{
      source = ['camera']
    }
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: source, // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        imgsrc = res.tempFilePaths[0]
        // console.log(imgsrc)
        console.log(userInfo)
        let info = that.data.userInfo
        info.avatarUrl = imgsrc
        // that.data.userInfo.avatarUrl=imgsrc
        // console.log(userInfo)
        that.setData({
          userInfo: info
        })
      }
    })
    
  },




  //页面加载完成事件
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      console.log(userInfo)
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
