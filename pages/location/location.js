// pages/location/location.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden:true,
    dataList:[]
  },
  sumbit:function(e){
    console.log(e)
    var name = e.detail.value.name
    var phone = e.detail.value.phone
    var address = e.detail.value.address
    var that=this;
    if(name==""||phone==""||address==""){
    //提醒用户填写信息不完整
      wx.showModal({
        title: '提示',
        content: '请填写完整信息',
        showCancel:false,
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
      //如果填写信息完整，则将信息传给后端
    }else{
      wx.request({
        url: "http://192.168.43.246:8080/receipt/add",
        data: {
          name: name,
          phone: phone,
          address: address,
          userid: wx.getStorageSync("openid")
        },
        header: {
          "Content-Type": "application/json"
        },
        method: 'GET',
        //服务端的回掉
        success: function (result) {
          wx.showToast({
            title: '保存成功',
            icon: 'success',
            duration: 2000
          })
          that.setData({
            hidden:true
            })
            that.init()
        }
      })
    }
  },

  //如果点击“新增”按钮，则将按钮隐藏，将填写信息页面显示。
  add:function(){
    this.setData({
      hidden:false
    })
  },

  //将信息传给后端
  init:function(){
    var that=this;

    //删除目标信息
    wx.request({
      url: "http://192.168.43.246:8080/receipt/getList",
      header: {
        "Content-Type": "application/json"
      },
      data:{
        userid:wx.getStorageSync("openid")
      },
      method: 'GET',
      //服务端的回掉
      success: function (result) {
        
        console.log(result)
        that.setData({
          dataList: result.data
        })
      }
    })
  },
  del:function(e){
    var id = e.currentTarget.dataset.id
    var that=this
    wx.request({
      url: "http://192.168.43.246:8080/receipt/del",
      header: {
        "Content-Type": "application/json"
      },
      data: {
        id:id
      },
      method: 'GET',
      //服务端的回掉
      success: function (result) {
        wx.showToast({
          title: '删除成功',
          icon: 'success',
          duration: 2000
        })
        that.init()
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
    this.init();
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
  
  }
})