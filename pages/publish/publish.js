// pages/publish/publish.js
const app=getApp()
Page({
  data:{
    // text:"这是一个页面"
    array1:['否','是'],
    index1: 0,
    array2:['选择地点','珞珈门','茶港门','南大门','南二门'],
    index2:0,
    time1: '00:00',
    time2:'00:00',
    select:false,
    placefrom:'选择地点',
    name:'',
    loc:'',
    phone:'',
    orderID:'',
    status:'待接收',
  },
//   bindShowMsg(){
//     this.setData({
//         select:!this.data.select
//     })
//   },

//   mySelect(e){
//       var name=e.currentTarget.dataset.name
//       this.setData({
//           placefrom: name,
//           select:false
//       })
//     //   console.log(name)
//   },

//按下“选择”按钮后跳转至“我的收货地址”页面进行选择
  gotochoose:function(){
      console.log(this.data.show)
// this.setData({
//     show:false
// })
      wx.navigateTo({
        url: "./getplace/getplace"
      })
  },
    


  /**
   * 监听liquidpicker选择器
   */
  listenerliquidPickerSelected: function(e) {
      this.setData({
        index1: e.detail.value
      });
  }, 


  /**
   * 监听timepicker选择器1
   */
  listenerTimePickerSelected1: function(e) {
      this.setData({
          time1: e.detail.value,
      });
  },
    /**
   * 监听timepicker选择器2
   */
  listenerTimePickerSelected2: function(e) {
    this.setData({
        time2: e.detail.value,
    });
},


  /**
   * 监听placefrompicker选择器
   */
  listenerplacefromPickerSelected:function(e) {
    this.setData({
      index2: e.detail.value
    });
  },
//点击“提交按钮”按钮后，如果有未填信息会有相应提醒
  submitform:function(e){
    if(e.detail.value.takeoutinfo=='')
    {
        wx.showModal({
          cancelColor: 'cancelColor',
          content:'请输入外卖信息！',
          title:'提示'
        })
        return
    }

    if(this.data.index2==0)
    {wx.showModal({
      cancelColor: 'cancelColor',
      content:'请选择取货地点！',
      title:'提示',
    })
    return
}

    if(this.data.name=='')
    {
        wx.showModal({
          cancelColor: 'cancelColor',
          content:'请选择接收地址！',
          title:'提示'
        })
        return
    }


    var time=new Date()
    var hour = time.getHours();
    var min = time.getMinutes();
    var time2 = this.data.time2;
    var hour2 = time2[0]+time2[1];
    var min2 = time2[3]+time2[4];
    var time1 = this.data.time1;
    var hour1 = time1[0]+time1[1];
    var min1 = time1[3]+time1[4];
    console.log("hour2:",hour2)
    console.log("hour:",hour)
    console.log("min2:",min2)
    console.log("min:",min)
    if((hour2<hour)||((hour2==hour)&&(min2<min)))
    {
        wx.showModal({
            cancelColor: 'cancelColor',
            content:'当前时间大于送达最大时间！',
            title:'提示',
          })
          return
    }

    if((hour2<hour1)||((hour2==hour1)&&(min2<min1)))
    {
        wx.showModal({
            cancelColor: 'cancelColor',
            content:'送达最大时间小于送达最小时间！',
            title:'提示',
          })
          return
    }

    var that=this
    console.log(e),
//若无未填信息，则将信息提交给后端
    wx.showModal({
      cancelColor: 'cancelColor',
      content:'是否发布外卖：'+e.detail.value.takeoutinfo,
      success:(res)=>{
          if(res.confirm)
          {
              console.log("确认")
              console.log(wx.getStorageSync("openid"))
              console.log(this.data.status)
              wx.request({
                url: "http://192.168.43.246:8080/order/insert",// 服务器后端的地址
                data: {
                  takeoutinfo:e.detail.value.takeoutinfo,
                  time1:e.detail.value.time1,
                  time2:this.data.time2,
                  liquid:e.detail.value.liquid,
                  placefrom:that.data.array2[that.data.index2],
                  name:this.data.name,
                  address:this.data.loc,
                  phone:this.data.phone,
                  openid: wx.getStorageSync("openid"),
                  status:this.data.status
                  // 传给后端的数据
                },
              
                header: {
                  "Content-Type": "application/json"
                },
                method:"Post", 
             
                success(res){
                    console.log(res.data)  
                    
                    // 这里写请求成功后会执行的代码
                    // that.setData({
                    //     orderID:res.data
                    // })
                }
             })
            // console.log(this.data.orderID)
            wx.navigateTo({
              url: './confirm/confirm?orderID=-1',
            })

          }
          else {
              console.log("取消")
          }   
      }
    })
     
    },
    // 页面初始化 options为页面跳转所带来的参数
  onReady:function(){
    // 页面渲染完成
  },
  //判断是否登录
  onShow: function() {
    var that = this;
    try {
      var userInfo = wx.getStorageSync("userInfo");
      if (userInfo) {
        
        that.setData({
          hidden: false
        })
      } else {
        that.setData({
          hidden: true
        })
      }
    } catch (e) {
      console.log(e)
    }
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  login:function(){
    wx.switchTab({
      url: '/pages/my/my',
    })
  },
})
