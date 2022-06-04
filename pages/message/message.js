// pages/mess/mess.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      mess: [ 
        //   信息
        //   { id: "1", userid:"222",touserid:"ddd",userimg:'../../Images/heat1.png',touserimg: "../../images/logoshow.png",lastcontent:"加油",lasttime: "5-7",tousernickname:"Fishing",orderid:'10',ordername:'贾晨的屎'}
    ],
  
    },
  
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      var that=this
      wx.request({
        url: "http://192.168.43.246:8080/chatroom/selectbyuserid",
        method: "GET",
        header: {
          'content-type':'application/json',
        },
        data:{
          userid:wx.getStorageSync('openid')
        },
        success: function (res) {
            console.log(res.data)
          that.setData({
            mess:res.data
          })
          console.log(that.data.mess.length)
         }

       })
    },
  
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
  
    },
  
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        var that=this
      wx.request({
        url: "http://192.168.43.246:8080/chatroom/selectbyuserid",
        method: "GET",
        header: {
          'content-type':'application/json',
        },
        data:{
          userid:wx.getStorageSync('openid')
        },
        success: function (res) {
            console.log(res.data)
          that.setData({
            mess:res.data
          })
         }
       })
    //    wx.request({
    //     url: "https://huisheng.link/fishing/tuisong",
    //     method: "POST",
    //     header: {
    //       'content-type':'application/json',
    //     },
    //     data:{
    //       userid:wx.getStorageSync('userid')
    //     },
    //     success: function (res) {
    //       if(res.data.tuisong=="yes"){
    //         wx.setTabBarBadge({
    //           index: 2,
    //           text: 'new'
    //         })
    //       }
    //      }
    //    })
    },
  
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
  
    },
  
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
  
    },
  
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
  
    },
  
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
  
    },
  
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
  
    },
    contact:function(e){
      console.log()
      console.log(this.data.mess[e.currentTarget.dataset.index])
      console.log(this.data.mess[e.currentTarget.dataset.index].orderid)
      wx.navigateTo({
        url: '../contact/contact?userid='+this.data.mess[e.currentTarget.dataset.index].userid+'&touserid='+this.data.mess[e.currentTarget.dataset.index].touserid+'&touserimg='+this.data.mess[e.currentTarget.dataset.index].touserimg+'&userimg='+this.data.mess[e.currentTarget.dataset.index].userimg+'&orderid='+this.data.mess[e.currentTarget.dataset.index].orderid,
      })
    },
    // k(){
    //   wx.setTabBarBadge({
    //     index: 2,
    //     text: 'new'
    //   })
    // }
    
  })