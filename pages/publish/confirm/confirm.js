// pages/publish/confirm/confirm.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        takeoutinfo:'',
        liquid:false,
        time1: '',
        time2:'',
        placefrom:'',
        name:'',
        address:'',
        phone:'',
        orderID:'',
        status:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        var that=this
        console.log(options)
        this.setData({
            orderID:options.orderID
        })
          wx.request({
                url: "http://192.168.43.246:8080/order/get_id",// 服务器后端的地址
                data: {
                
                    id:this.data.orderID
                },
              
                header: {
                  "Content-Type": "application/json"
                },
                method:"GET", // 请求的方式有Get和Post两种
             
                success(res){
                    console.log(res)  
                    
                    // 这里写请求成功后会执行的代码
                    that.setData({
                        name:res.data.name,
                        address:res.data.address,
                        phone:res.data.phone,
                        time1:res.data.time1,
                        time2:res.data.time2,
                        takeoutinfo:res.data.takeoutinfo,
                        placefrom:res.data.placefrom,
                        orderID:res.data.id,
                        status:res.data.status
                    })
                    if(res.data.liquid==1){
                        that.setData({
                            liquid:'是',
                        })
                    }
                    else{
                        that.setData({
                            liquid:'否'
                        })
                    }
                }
             })
        
    },

    confirm(e){
        wx.switchTab({
          url: '../../index/index',
        })
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

    }
})