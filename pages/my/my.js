// pages/my/my.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: "",
    nickName: "",
    gender:"",
    hidden:true,
    openid:""
  },

  //获取用户信息接口
  getUserProfile: function(e) {
    var that=this;
    wx.getUserProfile({
      
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (file) => {
        console.log(file)
        console.log(file.userInfo.nickname)
        wx.setStorageSync("userInfo", file.userInfo);//从后端获取用户昵称与头像
        that.setData({
          avatarUrl: file.userInfo.avatarUrl,
          nickName: file.userInfo.nickName,
          gender:file.userInfo.gender,
          hidden: true
        })
        wx.login({
          success: (res) => {
            console.log(res);
            wx.request({
              url: `https://api.weixin.qq.com/sns/jscode2session?appid=wx90c4f6a585ec8f71&secret=7e9b1223d8591da626254649e8f12e1a&js_code=${res.code}&grant_type=authorization_code`,
              success:(res)=>{
                console.log(res);
                wx.setStorageSync("openid", res.data.openid);

                wx.request({
                  url: 'http://192.168.43.246:8080/user/insert',
                  data:{
                    openid:wx.getStorageSync("openid"),
                    nickname:file.userInfo.nickName,
                    avatarurl:wx.getStorageSync("userInfo").avatarUrl,
                    gender:wx.getStorageSync("userInfo").gender,

                  },
                  header: {
                    'content-type': 'application/json'
                  },
                  success(e){
                    console.log(e)
                  }
                })
                wx.switchTab({
                  url: '/pages/my/my'
                })
                //获取到你的openid
               
              }
            })

          }
        })
      }
    })

  },


  
  //获取用户信息接口
  queryUsreInfo: function() {
    var that = this;
    wx.request({
      // url: 'http://x248565o63.zicp.vip/user/userInfo',
      url: 'http://10.128.11.103:8080/order/get',
      data: {
        openid: wx.getStorageSync("userInfo").openId
      },
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        var data = wx.getStorageSync("userInfo")
        that.setData({
          avatarUrl: data.avatarUrl,
          nickName: data.nickName,
          hidden: true
        })
      }
    })
  },
  
  onShow: function() {
    var that = this;
    that.setData({
      hidden: false
    })
    // 查看是否授权
    wx.getSetting({
      success: function(res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function(res) {
              //从数据库获取用户信息
              that.queryUsreInfo();
              //用户已经授权过
              wx.switchTab({
                url: '/pages/my/my'
              })
            }
          });
        }
      }
    })
    that.setData({
      hidden: true
    })
  },

  
  onShareAppMessage: function() {

  },

  //退出登录
  dropOut: function() {
    var that = this;
    var openId = wx.getStorageSync("userInfo").openId
    that.setData({
      hidden: false
    })
    wx.request({
      url: 'http://x248565o63.zicp.vip/user/del',
      data: {
        openId: openId
      },
      header: {
        'content-type': 'application/json'
      },

      //将用户昵称和头像置为空
      success: function(res) {
        wx.removeStorageSync("userInfo");
        that.setData({
          avatarUrl: "",
          nickName: "",
          hidden: true
        })
      }
    })
  },

  //跳转至我的收货地址
  aaaaaaa() {
    wx.navigateTo({
      url: '../location/location'
    })
  },

   //跳转至我的订单
  bbbbbbb() {
    wx.navigateTo({
      url: '../myorder/myorder'
    })
  },

  //跳转至积分商城
  gotoPage: function (options) {
    wx.navigateTo({
          url: '../goods_list/goods_list',
 })  
 },
})