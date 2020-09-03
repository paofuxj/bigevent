//options：参数的请求对象
$.ajaxPrefilter(function(options){
    //发起真正的ajax请求之前统一拼接请求的根路径
options.url='http://ajax.frontend.itheima.net'+options.url
//统一为有权限的接口设置headers请求头
if(options.url.indexOf('/my/')!==-1){
    options.headers={
        Authorization:localStorage.getItem('token') || ''
    }
}
// 当请求结束后判断用户的设置访问权限
options.complete=function(res){
    if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！'){
        // 清空token
        localStorage.removeItem('token')
        // 强制跳转到登录页面
        location.href='/login.html'
    }
}
})
