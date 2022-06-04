//index.js
//获取应用实例
const app = getApp()
 
Page({
    data: {
        motto: 'Hello World',
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        navData:[
            {
                text: '我发起的订单'
            },
            {
                text: '我接受的订单'
            }
            
        ],
        currentTab: 0,
        navScrollLeft: 0,
        yxlistt:[[{takeoutinfo:"222",liquid:"1"},{takeoutinfo:"333"}],[{takeoutinfo:"222",liquid:"2"},{takeoutinfo:"333"}]],
        yxlist:[[]],
    
       
    },
    // onLoad:function()
    // {var that=this;
    //     console.log(that.data.yxlist)
    // },
    
    onLoad: function () {
      var that = this;
      //向后端服务器发起请求数据
      wx.request({
        //URL
        url: 'http://192.168.43.246:8080/order/getmyorder',
        //发送的数据
        data: {
            openid:wx.getStorageSync('openid')
        },
        //请求的数据时JSON格式
        header: {
          'Content-Type':'application/json'
        },
        //请求成功
        success: function (res) {
          //控制台打印（开发调试用）
          console.log(res.data)
          //把所有结果存进一个名为yxlist的数组
          that.setData
          ({
              'yxlist[0]':res.data,
          })
          
        
         
      
        }
      })
      wx.request({
        //URL
        url: 'http://192.168.43.246:8080/order/getmyreceiveorder',
        //发送的数据
        data: {
            openid:wx.getStorageSync('openid')
        },
        //请求的数据时JSON格式
        header: {
          'Content-Type':'application/json'
        },
        //请求成功
        success: function (res) {
          //控制台打印（开发调试用）
          
          //把所有结果存进一个名为yxlist的数组
         that.setData({
             'yxlist[1]':res.data
         })
        }
      })



      wx.getSystemInfo({
          success: (res) => {
              this.setData({
                  pixelRatio: res.pixelRatio,
                  windowHeight: res.windowHeight,
                  windowWidth: res.windowWidth
              })
          },
      })       
    },
    switchNav(event){
        var cur = event.currentTarget.dataset.current; 
        //每个tab选项宽度占1/5
        var singleNavWidth = this.data.windowWidth/2 ;
        //tab选项居中                            
        // this.setData({
        //     navScrollLeft: (cur - 1) * singleNavWidth
        // })      
        if (this.data.currentTab == cur) {
            return false;
        } else {
            this.setData({
                currentTab: cur
            })
        }
    },
    switchTab(event){
        var cur = event.detail.current;
        var singleNavWidth = this.data.windowWidth / 2;
        this.setData({
            currentTab: cur,
            navScrollLeft: (cur - 1) * singleNavWidth
        });
    },
    clicktoswitch(e){
        console.log(e)
        console.log(this.data.currentTab)
        wx.navigateTo({
          url: './detail/detail?orderid='+e.currentTarget.dataset.item.id+'&who='+this.data.currentTab,
        })
    }
})