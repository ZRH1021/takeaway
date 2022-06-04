// pages/goods_list/gooddetail/gooddetail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        goodid:'',
        goodname:'',
        goodimg:'',
        goodcredit:'',
        temp:false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        console.log(options.goodid)
        this.setData({
            goodid:options.goodid
        })
        var that = this;
        wx.request({
            url: 'http://192.168.43.246:8080/goods/getbyid',// 服务器后端的地址
            data:{
                id:that.data.goodid
            },
            method:"Get", // 请求的方式有Get和Post两种
            success(res){
                console.log(res.data);
                that.setData({
                    goodname:res.data.name,
                    goodcredit:res.data.credit,
                    goodimg:res.data.img,
                })}
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

    },

    buy(e){
        var that = this;
        wx.showModal({
          cancelColor: 'cancelColor',
          content:'确认购买商品：'+this.data.goodname+'?',
          success:(res)=>{
              if(res.confirm)
              {
                  wx.showLoading({
                    title: '正在购买',
                  })
                wx.request({
                    url: 'http://192.168.43.246:8080/credit/buy',// 服务器后端的地址
                    data:{
                        id:that.data.goodid,
                        openid: wx.getStorageSync("openid"),
                    },
                    method:"Get", // 请求的方式有Get和Post两种
                    success(res){
                        console.log(res.data)
                        if(res.data==1)
                        {
                            wx.hideLoading({
                                success: (res) => {
                                    wx.showModal({
                                      cancelColor: 'cancelColor',
                                      content:'购买成功',
                                      showCancel:false,
                                      confirmText:'返回',
                                      success:(res)=>{
                                          if(res.confirm){
                                            wx.navigateBack({
                                              delta: 1,
                                            })
                                          }
                                      }
                                    })
                                },
                              })
                        }
                        else if(res.data==0)
                        {
                            wx.hideLoading({
                                success: (res) => {
                                    wx.showModal({
                                      cancelColor: 'cancelColor',
                                      content:'购买失败（积分不够）',
                                      showCancel:false,
                                      confirmText:'返回',
                                      success:(res)=>{
                                          if(res.confirm){
                                            wx.navigateBack({
                                                delta: 1,
                                              })
                                          }
                                      }
                                    })
                                },
                              })
                        }
                    }
                    
                    })
                    // if(this.data.temp==true)
                    //     {
                    //         wx.hideLoading({
                    //             success: (res) => {
                    //                 wx.showModal({
                    //                   cancelColor: 'cancelColor',
                    //                   content:'购买成功',
                    //                   showCancel:false,
                    //                   confirmText:'返回',
                    //                   success:(res)=>{
                    //                       if(res.confirm){
                    //                           wx.navigateTo({
                    //                             url: '../../goods_list/goods_list',
                    //                           })
                    //                       }
                    //                   }
                    //                 })
                    //             },
                    //           })
                    //     }
                    //     else if(this.data.temp==false)
                    //     {
                    //         wx.hideLoading({
                    //             success: (res) => {
                    //                 wx.showModal({
                    //                   cancelColor: 'cancelColor',
                    //                   content:'购买失败（积分不够）',
                    //                   showCancel:false,
                    //                   confirmText:'返回',
                    //                   success:(res)=>{
                    //                       if(res.confirm){
                    //                           wx.navigateTo({
                    //                             url: '../../goods_list/goods_list',
                    //                           })
                    //                       }
                    //                   }
                    //                 })
                    //             },
                    //           })
                    //     }
              }
          }
        })
    }
})