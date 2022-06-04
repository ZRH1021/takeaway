// pages/goods_list/goods_list.js
Page({

    /**
     * 页面的初始数据
     */

    data: {
        point:'',
        goodsList:[]
    }, 
    //接口参数
    // QueryParams:{
    //     query:"",
    //     cid:"",
    //     pagenum:1,
    //     pagesiza:10,
    // },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad:function(){
        var that=this
        wx.request({
            url: 'http://192.168.43.246:8080/goods/get',// 服务器后端的地址
            data:{
            },
            method:"Get", // 请求的方式有Get和Post两种
            success(res){
                console.log(res.data);
                that.setData({
                    goodsList:res.data
                })}
            })

            wx.request({
                url: 'http://192.168.43.246:8080/credit/getcredit',// 服务器后端的地址
                data:{
                    openid:wx.getStorageSync('openid')
                },
                method:"Get", // 请求的方式有Get和Post两种
                success(res){
                    console.log(res.data);
                    that.setData({
                        point:res.data
                    })}
                })
    },
    exchange:function(){
      wx.navigateTo({
        url: '../record/record',
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
        var that=this
        wx.request({
            url: 'http://192.168.43.246:8080/goods/get',// 服务器后端的地址
            data:{
            },
            method:"Get", // 请求的方式有Get和Post两种
            success(res){
                console.log(res.data);
                that.setData({
                    goodsList:res.data
                })}
            })

            wx.request({
                url: 'http://192.168.43.246:8080/credit/getcredit',// 服务器后端的地址
                data:{
                    openid:wx.getStorageSync('openid')
                },
                method:"Get", // 请求的方式有Get和Post两种
                success(res){
                    console.log(res.data);
                    that.setData({
                        point:res.data
                    })}
                })
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
    totalPages:1,
    //获取商品列表数据
    async GetGoodsList(){
        const res=await request({url:"",data:this.QueryParams});//后端地址
        const total=res.total;//获取商品总数
        this.totalPages=Math.ceil(total/this.QueryParams.pagesize);
        this.setData({
        goodsList:[...this.data.goodsList,...res.goods]//数组拼接
        })
    },

    // 页面上滑 滚动条触底事件
  onReachBottom(){
    //  1 判断还有没有下一页数据
      if(this.QueryParams.pagenum>=this.totalPages){
        // 没有下一页数据
        wx.showToast({ title: '没有下一页数据' });
          
      }else{
        // 还有下一页数据
        this.QueryParams.pagenum++;
        this.getGoodsList();
      }
    },
    ToGoodDetail(e){
        console.log(e)
        wx.navigateTo({
          url: './gooddetail/gooddetail?goodid='+e.currentTarget.dataset.item.id,
        })
    }
})