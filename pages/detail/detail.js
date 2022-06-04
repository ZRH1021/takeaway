// pages/detail/detail.js
const app = getApp()
const util = require('../../utils/util.js')
Page({
    data: {
        array:[],
      
        clockShow:false,
        clockHeight:0,
        time:'1',
        mTime:300000,
        timeStr:'05:00',
        rate:'',
        timer:null,
        cateActive:'0',
        okShow:false,
        cancelShow:true,
        continueCancelShow:false,
        myimg:'',
        toimg:'',
        myid:'',
        touserid:'',
        status:''
    },
    onLoad:function(){
    var that = this;
    var res = wx.getSystemInfoSync();
    var rate = 750 / res.windowWidth;
    console.log(rate);
    that.setData({
      rate:rate,
      clockHeight:rate * res.windowHeight
    })
    wx.request({
        url: 'http://192.168.43.246:8080/order/getbyid',// 服务器后端的地址
        method:"Get", // 请求的方式有Get和Post两种
        data:{
        id:wx.getStorageSync('index')
        },
        success(res){
            console.log(res.data);
            that.setData({
             array:res.data,
            })
            console.log(that.data.array)
        }
        })

    },
    slideChange:function(e){
        this.setData({
          time:e.detail.value
        })
      },
      clickCate:function(e){
        this.setData({
          cateActive:e.currentTarget.dataset.index
        })
      },
      start:function(e){
          var that=this

          wx.request({
            url: 'http://192.168.43.246:8080/order/getbyid',// 服务器后端的地址
            method:"Get", // 请求的方式有Get和Post两种
            data:{
            id:wx.getStorageSync('index')
            },
            success(res){
                console.log(res.data);
                that.setData({
                 status:res.data.status
                })
                if(that.data.array.openid==wx.getStorageSync("openid"))
        {
            wx.showModal({
              cancelColor: 'cancelColor',
              content:'您不能接收自己发布的订单！',
              success:(res)=>{
                  wx.switchTab({
                    url: '../index/index',
                  })
              }
            })
        }

        else if(that.data.status!='待接收')
        {
            wx.showModal({
                cancelColor: 'cancelColor',
                content:'此订单已经被接收！',
                success:(res)=>{
                    wx.switchTab({
                      url: '../index/index',
                    })
                }
              })
        }

        else{
        console.log(e)
        that.setData({
          clockShow:true,
          mTime:that.data.time*60*1000,
          timeStr:parseInt(that.data.time) >= 10 ? that.data.time+':00' : 
          '0' + that.data.time+':00'
        })
        that.drawBg();
        that.drawActivve();
        console.log(wx.getStorageSync("openid"))
        wx.request({
            url: 'http://192.168.43.246:8080/order/receive',
           method:"GET",
           data:{
            receiver_openid: wx.getStorageSync("openid"),
            id:wx.getStorageSync('index')
           },
           success(res){
               console.log(res.data);
               }
           })
        }
            }
            })
            console.log(that.data.status)


      },
      drawBg:function(){
        var lineWidth = 6 / this.data.rate;//px
        var ctx = wx.createCanvasContext('progress_bg');
        ctx.setLineWidth(lineWidth);
        ctx.setStrokeStyle('#000000');
        ctx.setLineCap('round');
        ctx.beginPath();
        ctx.arc(400/this.data.rate/2,400/this.data.rate/2,400/this.data.rate/2-2*lineWidth,0,2*Math.PI,false);
        ctx.stroke();
        ctx.draw();
      },
      // 动态画圆
      drawActivve:function(){
        var _this = this;
        var timer = setInterval(function(){
          //1.5-3.5
          var angle = 1.5 + 2*(_this.data.time*60*1000 - _this.data.mTime)/
          (_this.data.time*60*1000);
          var currentTime = _this.data.mTime - 100;
          _this.setData({
            mTime:currentTime
          });
          if(angle < 3.5){
            if(currentTime % 1000 == 0){
              var timeStr1 = currentTime / 1000;// s
              var timeStr2 = parseInt(timeStr1 / 60);// m
              var timeStr3 = (timeStr1 - timeStr2*60) >= 10 ? (timeStr1 - timeStr2*60) :
              '0'+(timeStr1 - timeStr2*60);
              var timeStr2 = timeStr2 >= 10 ? timeStr2 : '0'+timeStr2;
              _this.setData({
                timeStr:timeStr2+':'+timeStr3
              })
            }
            var lineWidth = 6 / _this.data.rate;//px
            var ctx = wx.createCanvasContext('progress_active');
            ctx.setLineWidth(lineWidth);
            ctx.setStrokeStyle('#ffffff');
            ctx.setLineCap('round');
            ctx.beginPath();
            ctx.arc(400/_this.data.rate/2,400/_this.data.rate/2,400/_this.data.rate/2-2*lineWidth,
              1.5*Math.PI,angle*Math.PI,false);
            ctx.stroke();
            ctx.draw();
          }else{
            var logs = wx.getStorageSync('logs') || [];
            logs.unshift({
              date:util.formatTime(new Date),
              cate:_this.data.cateActive,
              time:_this.data.time
            });
            wx.setStorageSync('logs', logs);
            _this.setData({
              timeStr:'00:00',
              okShow:true,
              pauseShow:false,
              continueCancelShow:false
            });
            wx.reLaunch({
                url: '../index/index',
              });
            clearInterval(timer);
          }
        },100)
        _this.setData({
          timer:timer
        })
      },
      cancel:function(){
          var that=this;
        wx.showModal({
            title: '取消订单确认',
            content: '您确定要取消订单吗？',
            confirmText:"是",
            cancelText:"否",
            success (res) {
              if (res.confirm) {
                console.log('用户点击是')
                console.log(wx.getStorageSync('index'))
                wx.request({
                    url: 'http://192.168.43.246:8080/order/cancel',
                   method:"GET", 
                   data:{
                    id:wx.getStorageSync('index')
                   },
                   success(res){
                       that.setData({
                        array:res.data
                       })}
                   })
                wx.reLaunch({
                    url: '../index/index',
                  })
              } else if (res.cancel) {
                console.log('用户点击否')
          
              }
            }
          })
      },
  AcceptOrder:function(){
  //   wx.request({
  //     url: 'http:192.168.43.246:8080',// 服务器后端的地址
  //     data: {
  //       UserId:"V1ctor"
  //       // 传给后端的数据
  //     },
  //     method:"Post", // 请求的方式有Get和Post两种
  //     success(res){
  //         console.log(res.data)  
  //         // 这里写请求成功后会执行的代码
  //     }
  //  })
  console.log(wx.getStorageSync("index")),
   wx.showToast({
     title: "接收成功！",
     duration:2000,
   })

  
  },
  Return:function(){
      var that = this
    wx.request({
        url: "http://192.168.43.246:8080/chatroom/add",
        method: "GET",
        header: {
          'content-type':'application/json',
        },
        data:{
            id:that.data.array.id,
        },
        success: function (res) {
            console.log(that.data.array.id)
            wx.switchTab({
              url: '../message/message',
            })
         }
         
        })
  }
})
