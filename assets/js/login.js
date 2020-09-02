$(function () {
    //点击去注册账号的链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    //点击去登录的链接
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })
})
var form = layui.form
var layer = layui.layer//导入弹出模块
//添加自定义规则
form.verify({
    pwd: [/^[\S]{6,12}$/, '密码必须是6到12位，且不能出现空格'],
    //通过形参那到底是确认密码框中的内容
    //还需要拿到密码框中的内容
    // 然后进行一次等于的判断
    // 如果失败就retrun一个失败的提示
    repwd: function (value) {
        var pwd = $('.reg-box [name=password]').val()
        if (pwd !== value) {
            return '两次密码不一致'
        }
    }
})

// 监听注册表单的提交事件
$('#form_reg').on('submit', function (e) {
    // 1阻止默认行为
    e.preventDefault()
    // 发起ajax请求
    var data = {
        username: $('#form_reg [name=username]').val(),
        password: $('#form_reg [name=password]').val()
    }
    $.post('/api/reguser', data, function (res) {
        if (res.status != 0) {
            return layer.msg(res.message);
        }
        layer.msg('注册成功');
        $('#link_login').click()
    })
})
$('#form_login').submit(function (e) {
    //阻止默认行为
    e.preventDefault()
    $.ajax({
        url: '/api/login',
        method: 'POST',
        //快速获取表单中的数据
        data: $(this).serialize(),
        success: function (res) {
            console.log(res);
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg(res.message)
            //将服务器返回的用户唯一标识保存到本地存储
            localStorage.setItem('token', res.token)
            //跳转到后台
            location.href = '/index.html'
        }
    })
})