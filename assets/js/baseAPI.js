//options：参数的请求对象
$.ajaxPrefilter(function(options){
options.url='http://ajax.frontend.itheima.net'+options.url
})