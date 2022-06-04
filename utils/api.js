/**
 * 请求方法,这里就写两种最常用的
 * 其他的请求方式同理(微信官网提供了OPTIONS,HEAD,PUT,DELETE,TRACE,CONNECT)
 */
function request_post(url, data) {
    let param = packagingParam(url, data, "POST", "application/x-www-form-urlencoded");
    return WXRequest(param);
  }
  function request_get(url, data) {
    let param = packagingParam(url, data, "GET", "application/x-www-form-urlencoded");
    return WXRequest(param);
  }
  function request_json_post(url, data) {
    let param = packagingParam(url, data, "POST", "application/json");
    return WXRequest(param);
  }
  function request_json_get(url, data) {
    let param = packagingParam(url, data, "GET", "application/json");
    return WXRequest(param);
  }
   
  /**
   * 封装参数
   */
  function packagingParam(url, data, method, contentType) {
    var param = {};
    param.url = url;
    param.data = data;
    param.method = method;
    param.contentType = contentType;
    return param;
  }
   
  /**
   * 发送请求
   * 这里的header只写了一种，一般都需要传输token，用户前后接口的调用的校验
   * 还有的加入了Cookie，加入到header中即可
   */
  function WXRequest(param) {
    //用于请求的计时
    console.time('请求用时：');
    //遮罩提示，这个可以写成公用的调用，这里就简单说明
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    return new Promise((resolv, reject) => {
      wx.request({
        url: param.url,
        data: param.data,
        method: param.method,
        header: {
          'Content-Type': contentType
        },
        success: function (res) {
          if(res.data == '服务器异常'){
            wx.showModal({
              title: '提示',
              content: '网络错误或服务器繁忙!',
            })	
          }else{
             resolv(res.data);
          }
        },
        fail: function (err) {
          reject(err)
          wx.showModal({
            title: '提示',
            content: '网络错误或服务器繁忙!',
          })
        },
        complete:function(com){
          wx.hideLoading();
          console.timeEnd('请求用时：' + param.url); 
        }
      })
    })
  }
  //最后把方法暴露出去
  module.exports = {
      request_post,request_get,request_json_post,request_json_get
  }
