// pages/contect/contect.js

const app = getApp();
var inputVal = '';
var msgList = [];
var windowWidth = wx.getSystemInfoSync().windowWidth;
var windowHeight = wx.getSystemInfoSync().windowHeight;
var keyHeight = 0;

/**
 * 初始化数据
 */
function initData(that) {
  inputVal = '';
  

  msgList = [
    {
      speaker: 'server',
      contentType: 'text',
      content: 'halo~'
    },
    {
      speaker: 'customer',
      contentType: 'text',
      content: '你好呀！~'
    }
  ]
  that.setData({
    msgList,
    inputVal
  })
}

/**
 * 计算msg总高度
 */
// function calScrollHeight(that, keyHeight) {
//   var query = wx.createSelectorQuery();
//   query.select('.scrollMsg').boundingClientRect(function(rect) {
//   }).exec();
// }

Page({

  /**
   * 页面的初始数据
   */
  data: {
      msgList:[],
    send: [],
    receive: [],
    userid:'',
    touserid:'',
    userimg:'',
    touserimg:'',
    ordername:'test',
    orderid:'',

    
    //发送内容 
    fasong:[],

    //模拟touserid，
    touserid:'dfefe',

    scrollHeight: '100vh',
    inputBottom: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    var that=this
    this.setData({
      userid:options.userid,
      touserid:options.touserid,
      userimg:options.userimg,
      touserimg:options.touserimg,
      orderid:options.orderid
    })
    wx.request({
      url: "http://192.168.43.246:8080/chatdetail/select",
      method: "GET",
      header: {
        'content-type':'application/json',
      },
      data:{
        orderid:that.data.orderid,
        userid:that.data.userid,
        touserid:that.data.touserid,
      },
      success: function (res) {
          console.log(res.data)
        // msgList.JSON.parse(res.data.msgList)
        that.setData({
          msgList:res.data
        })
        console.log(that.data.msgList)
       }
     })
     console.log(that.data.orderid)
     wx.request({
        url: "http://192.168.43.246:8080/order/getbyid",
        // url: "http://192.168.43.231:8080/fishing/chatdetail",
        method: "GET",
        header: {
          'content-type':'application/json',
        },
        data:{
            id:that.data.orderid,
        },
        success: function (res) {
            console.log(res.data)
          // msgList.JSON.parse(res.data.msgList)
          that.setData({
              ordername:res.data.takeoutinfo,
          })
          console.log(that.data.ordername)
         }
       })
    // console.log(this);
    var receivetemp = this.data.receive;
     //建立连接
    wx.connectSocket({
      url: "ws://192.168.43.246:8080/websocket",
        //  url: "wss://192.168.43.231:8080/fishing/websocket",
    }),

        //连接成功
        wx.onSocketOpen(function () {
          console.log('websocket连接成功！');
        })
    
        //接收数据
        wx.onSocketMessage(function (data) {
          var c=JSON.parse(data.data)          
          var msgl = that.data.msgList    
          console.log("c.userid:"+c.userid)
          console.log("userid:"+that.data.userid)
          if(c.userid==that.data.userid&&c.touserid==that.data.touserid){
              msgl.push(c);
          }
          else if(c.userid==that.data.touserid&&c.touserid==that.data.userid){
            c.speaker='server'
            msgl.push(c);
        }
        console.log(msgl)
          that.setData({
              msgList:msgl
          })
          console.log(that.data.msgList)
        })
    
        //连接失败
        wx.onSocketError(function () {
          console.log('websocket连接失败！');
        })

    // this.setData({
    //   cusHeadIcon: app.globalData.userInfo.avatarUrl,
    // });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 获取聚焦
   */
  focus: function(e) {
    keyHeight = e.detail.height;
    this.setData({
      scrollHeight: (windowHeight - keyHeight) + 'px'
    });
    this.setData({
      toView: 'msg-' + (msgList.length - 1),
      inputBottom: keyHeight + 'px'
    })
    //计算msg高度
    // calScrollHeight(this, keyHeight);

  },

  //失去聚焦(软键盘消失)
  blur: function(e) {
    this.setData({
      scrollHeight: '100vh',
      inputBottom: 0
    })
    this.setData({
      toView: 'msg-' + (msgList.length - 1)
    })

  },

  /**
   * 发送点击监听
   */
  sendClick: function(e) {
var that=this
//获取当前时间戳  
var timestamp = Date.parse(new Date());  
timestamp = timestamp / 1000;  
console.log("当前时间戳为：" + timestamp);  
//获取当前时间  
var n = timestamp * 1000;  
var date = new Date(n);  
//年  
var Y = date.getFullYear();  
//月  
var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);  
//日  
var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();  
//时  
var h = date.getHours();  
//分  
var m = date.getMinutes();  
//秒  
var s = date.getSeconds();  




    this.setData({
      fasong:{
       // userid:wx.getStorageSync('userid'),

       //模拟，到时候需要删除


        touserid:this.data.touserid,  
        userid:this.data.userid,
        speaker: 'customer',
        contentType: 'text',
        content: e.detail.value,
        timetoint:timestamp,
        lasttime:M+'-'+D,
        orderid:this.data.orderid
      }
    })
    var b=JSON.stringify(this.data.fasong);
    console.log(b),
    console.log(that.data.msgList)
    // that.data.msgList.push({
    //   userid:this.data.userid,
    //   touserid:this.data.touserid,
    //   speaker: 'customer',
    //   contentType: 'text',
    //   content: e.detail.value
    // })
    // console.log(that.data.msgList)
    inputVal = '';//刷新填写框
    this.setData({
        inputVal,
    })
    // var sendtemp=this.data.send;
    // sendtemp.push(' 发送的消息：'+e.detail.value.message);
    // this.setData({
    //   send: sendtemp
    // })
    // console.info(this.data.receive);
    console.log(b)
    wx.sendSocketMessage({
      data: b
    })

  },

  /**
   * 退回上一页
   */
  toBackClick: function() {
    wx.navigateBack({})
  },
    /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // wx.request({
    //   url: "https://huisheng.link/fishing/chatdetailexit",
    //   // url: "http://192.168.43.231:8080/fishing/chatdetailexit",
    //   method: "POST",
    //   header: {
    //     'content-type':'application/json',
    //   },
    //   data:{
    //     userid:this.data.userid,
    //     touserid:this.data.touserid,
    //     tiaoshu:this.data.msgList.length
    //   },
    //   success: function (res) {
    //       console.log('退出成功')
    //    }
    //  })
  },
  onUnload(){
      console.log('1')
      wx.closeSocket({
      })
    // wx.request({
    //   url: "https://huisheng.link/fishing/chatdetailexit",
    //   // url: "http://192.168.43.231:8080/fishing/chatdetailexit",
    //   method: "POST",
    //   header: {
    //     'content-type':'application/json',
    //   },
    //   data:{
    //     userid:this.data.userid,
    //     touserid:this.data.touserid,
    //     tiaoshu:this.data.msgList.length
    //   },
    //   success: function (res) {
    //       console.log('退出成功')
    //    }
    // })
  },

})
