// pages/record/record.js
Page({
  data:{
      array:[]
  },
  onLoad:function(){
      console.log("1")
      var that=this
        wx.request({
            url: 'http://192.168.43.246:8080/goods/getrecord',// 服务器后端的地址
            method:"Get", // 请求的方式有Get和Post两种
            data:{
                openid: wx.getStorageSync("openid")
            },
            success(res){
                console.log(res.data);
                that.setData({
                 array:res.data
                })}
            })
  }
})
