Page({
    data: {
        id:"",
        id1:"0",
        id2:"0",
        array:[],
        tabTxt:['取货地点','是否含有液体'],
        tab: [true,  true],
        placeList: [{ 'id': '1', 'title': '珞珈门' }, { 'id': '2', 'title': '南二门' },{ 'id': '3', 'title': '南大门' },{ 'id': '4', 'title': '茶港门' }],
        liquidList: [{ 'id': '1', 'title': '是' }, { 'id': '2', 'title': '否' }],
        placeList1: [{ 'id': '0', 'title': '不限' },{ 'id': '1', 'title': '珞珈门' }, { 'id': '2', 'title': '南二门' },{ 'id': '3', 'title': '南大门' },{ 'id': '4', 'title': '茶港门' }],
        liquidList1: [{ 'id': '0', 'title': '2' },{ 'id': '1', 'title': '1' }, { 'id': '2', 'title': '0' }],
          place_id: 0,//品牌
          place_txt: '',
          liquid_id: 0,//销量
          liquid_txt: '',
        hidden:false
      },

  onLoad:function(){
    var that = this;
    //从后端获取订单信息
    wx.request({
        url: 'http://192.168.43.246:8080/order/get',// 服务器后端的地址
        method:"Get", // 请求的方式有Get和Post两种
        success(res){
            console.log(res.data);
            that.setData({
             array:res.data  
            })
            var len = that.data.array.length
            var i=0
            for(i=0;i<len;i++){
                var item = 'array['+i+'].liquid'
                if(that.data.array[i].liquid==1)
                {
                    that.setData({
                    [item]:'是'
                    })
                }
                else{
                    that.setData({
                        [item]:'否'
                    })
                }
            }
            console.log(that.data.array)
        }
        })
    },

    //实现下拉刷新
    onPullDownRefresh: function () {
      // 1. 重置关键数据
      var that = this;
      wx.request({
        url: 'http://192.168.43.246:8080/order/select',
       method:"GET",
       data:{
          placefrom:that.data.placeList1[that.data.id1].title,
          liquid:that.data.liquidList1[that.data.id2].title
       },
       success(res){
           console.log(res.data);
           that.setData({array:res.data})
           var len = that.data.array.length
            var i=0
            for(i=0;i<len;i++){
                var item = 'array['+i+'].liquid'
                if(that.data.array[i].liquid==1)
                {
                    that.setData({
                    [item]:'是'
                    })
                }
                else{
                    that.setData({
                        [item]:'否'
                    })
                }
            }
           }
       })
      // 2. 重新发起请求 并关闭下拉窗口
    wx.stopPullDownRefresh()
    },

    //显示筛选框
    filterTab: function (e) {
        var data = [true,  true], index = e.currentTarget.dataset.index;
        data[index] = !this.data.tab[index];
        this.setData({
          tab: data
        })
      },
      filter: function (e) {
        var that = this, id = e.currentTarget.dataset.id, txt = e.currentTarget.dataset.txt, tabTxt =that.data.tabTxt,placeList1=that.data.placeList1,liquidList1=that.data.liquidList1,array=that.data.array,id1=that.data.id1,id2=that.data.id2;
        switch (e.currentTarget.dataset.index) {
          case '0':
            tabTxt[0] = txt;
            that.setData({
              tab: [true,  true],
              tabTxt: tabTxt,
              id1:id,
              place_id: id,
              place_txt: txt
            });           
            break;
          case '1':
            tabTxt[1] = txt;
            that.setData({
              tab: [true,  true],
              tabTxt: tabTxt,
              id2:id,
              liquid_id: id,
              liquid_txt: txt
            });
            break;
        }
        //点击筛选框后显示下拉框
        console.log(placeList1[that.data.id1].title)
        console.log(liquidList1[that.data.id2].title)
        wx.request({
            url: 'http://192.168.43.246:8080/order/select',
           method:"GET",
           data:{
              placefrom:that.data.placeList1[that.data.id1].title,
              liquid:that.data.liquidList1[that.data.id2].title
           },
           success(res){
               console.log(res.data);
               that.setData({array:res.data})
               var len = that.data.array.length
            var i=0
            for(i=0;i<len;i++){
                var item = 'array['+i+'].liquid'
                if(that.data.array[i].liquid==1)
                {
                    that.setData({
                    [item]:'是'
                    })
                }
                else{
                    that.setData({
                        [item]:'否'
                    })
                }
            }
               }
           })
        //筛选订单信息
        // self.getDataList();
      },

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
      this.onLoad()
    },
  
  
    // var array = this.iniData();
    // this.setData({array:array});

//   iniData:function(){
//     var array=[];
//     // var order = new Object();
//     order.takeoutinfo="香辣鸡腿堡";
//     order.time1="8:00";
//     order.time2="8:30";
//     order.liquid = "有"

//     array[0] =order;
//     array[1] =order;
//     array[2] = order;
//     array[3] = order;
//     array[4] =order;
//     array[5] =order;
//     array[6] = order;
//     array[7] = order;
//     return array;
//   },

//点击订单信息跳转至详细信息页面
  seeDetail:function(e){
  //  let id=e.currentTarget.dataset.id
  //   console.log(id)
  console.log(e.currentTarget.id)
  // this.setData({index:e.target.id})
    wx.setStorageSync("index", e.currentTarget.id);
    wx.navigateTo({
      url: "../detail/detail",
    })


  },

  //登录
  login:function(){
    wx.switchTab({
      url: '/pages/my/my',
    })
  },
    })

 



// Page({
//   data: {
//     Info: {
//       TakeoutInfo:"111",
//       Time:"222",
//       Liquid:"333"
//     },
//     list:[
//       {
//         name:"张弛",
//         takeoutPosition:"南二门",
//         destination:"梅园四舍",
//         haveLiquid:true,
//         phoneNum:"18686670530",
//         time:"15:00-15:30"
//       },
//       {
//         name:"张驰",
//         takeoutPosition:"珞珈门",
//         destination:"梅园六舍",
//         haveLiquid:false,
//         phoneNum:"18686670531",
//         time:"8:00-8:30"
//       }
//     ]
    
//   },
//   onLoad: function () {
//     var that = this;
//     wx.getStorage({
//       key: 'orderInfo',
//       success: function (res) {
//         that.setData({
//           orderInfo: res.data
//         })
//       }
//     })
 
//   },
//   Navigator:function(){
//     wx.reLaunch({
//       url: '../publish/publish',
//     })
//   }

// })


// Page({
//   data: {
//     orderInfo: {}
//   },
//   onLoad: function () {
//     var that = this;
//     wx.getStorage({
//       key: 'orderInfo',
//       success: function (res) {
//         that.setData({
//           orderInfo: res.data
//         })
//       }
//     })
//   }
// })

