// pages/myorder/detail/detail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        orderid:'',
        takeoutinfo:'',
        liquid:'',
        time1: '',
        time2:'',
        placefrom:'',
        name:'',
        address:'',
        phone:'',
        status:'',
        who:'',
        hidden:true,
        content:'',
        cancel:0,
        hidden2:true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        var that=this
        console.log(options)
        this.setData({
            orderid:options.orderid,
            who:options.who
        })
        wx.request({
            url: 'http://192.168.43.246:8080/order/getbyid',// 服务器后端的地址
            data:{
                id:this.data.orderid,
            },
            method:"Get", // 请求的方式有Get和Post两种
            success(res){
                that.setData({
                    name:res.data.name,
                    address:res.data.address,
                    phone:res.data.phone,
                    time1:res.data.time1,
                    time2:res.data.time2,
                    takeoutinfo:res.data.takeoutinfo,
                    placefrom:res.data.placefrom,
                    status:res.data.status,
                })
                if(res.data.liquid==1){
                    that.setData({
                        liquid:"是"
                    })
                }
                else{
                    that.setData({
                        liquid:"否"
                    })
                }
                if((that.data.who==0)&&(that.data.status=='待接收'))
                {
                    that.setData({
                        hidden2:true,
                        hidden:false,
                        content:'取消订单',
                        who:2
                    })
                }
                else if((that.data.who==0)&&(that.data.status=='已送达'))
                {
                    that.setData({
                        hidden2:true,
                        hidden:false,
                        content:'完成订单',
                        who:0,
                    })
                }
                else if((that.data.who==0)&&(that.data.status=='派送中'))
                {
                    that.setData({
                        hidden2:true,
                        hidden:false,
                        content:'完成订单',
                        who:0,
                    })
                }
                else if((that.data.who==1)&&(that.data.status=='派送中'))
                {
                    that.setData({
                        hidden2:false,
                        hidden:false,
                        content:'完成订单',
                        who:1,
                    })
                }
                else if(that.data.status=='已完成')
                {
                    that.setData({
                        hidden2:true,
                        hidden:true,
                        content:'完成订单',
                        who:0,
                    })
                }
            }
            })
            console.log("who:"+this.data.who)
            console.log("hidden:"+this.data.hidden)
            console.log("hidden2:"+this.data.hidden2)
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    },
    finish(e){
        wx.showModal({
          cancelColor: 'cancelColor',
          content:this.data.content+'?',
          success:(res)=>{
              if(res.confirm){
                wx.request({
                    url: 'http://192.168.43.246:8080/order/change',// 服务器后端的地址
                    data:{
                        id:this.data.orderid,
                        who:this.data.who
                    },
                    method:"Get", // 请求的方式有Get和Post两种
                    success(res){
                        wx.switchTab({
                          url: '../../index/index',
                        })
                    }
                    })
              }
          }
        })
        
    },
    cancel2(e){
        wx.showModal({
            cancelColor: 'cancelColor',
            content:'取消订单？',
            success:(res)=>{
                if(res.confirm){
                  wx.request({
                      url: 'http://192.168.43.246:8080/order/change',// 服务器后端的地址
                      data:{
                          id:this.data.orderid,
                          who:3
                      },
                      method:"Get", // 请求的方式有Get和Post两种
                      success(res){
                          wx.switchTab({
                            url: '../../index/index',
                          })
                      }
                      })
                }
            }
          })
    }

})