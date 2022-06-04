Page({
    data:{
        hid:false,
        show:"",
        array:[]
    },

    onLoad:function(){
        var that = this;
        console.log(wx.getStorageSync("openid"))
        wx.request({
            url: 'http://192.168.43.246:8080/receipt/get',// 服务器后端的地址
            data:{
                userid: wx.getStorageSync("openid")
            },
            method:"Get", // 请求的方式有Get和Post两种
            success(res){
                console.log(res.data);
                that.setData({
                 array:res.data
                })
                if(array.length==0){
                    that.setData({
                        hid:true
                    })
                }
            }
            })
        },

    choose:function(e){
       console.log(e)
        let pages = getCurrentPages();
        let prevPage = pages[pages.length - 2];// prevPage为上个page信息
        prevPage.setData({
            name:e.target.dataset.item.name,
            phone:e.target.dataset.item.phone,
            loc:e.target.dataset.item.address,
        })
        console.log(prevPage)
        wx.navigateBack({
	        delta:1 //返回上一级页面
        })
    }
}
)