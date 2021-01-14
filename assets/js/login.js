$(function () {
    // 点击“去注册账号”的链接
    $("#link_reg").on('click', function () {
        $(".login-box").hide()
        $(".reg-box").show()
    })

    // 点击“去登陆”的来链接
    $("#link_login").on('click', function () {
        $(".reg-box").hide()
        $(".login-box").show()
    })

    // 从 layui 中获取 form 对象
    var form = layui.form
    // 从 layui 中获取 layer 方法
    var layer = layui.layer

    // 通过 form.verify() 函数自定义校验规则
    form.verify({
        // 自定义一个 pwd 的校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 校验两次密码是否一致
        repwd: function (value) {
            // 通过形参拿到的是确认密码框的值
            // 还需要拿到注册密码框的值
            // 然后进行等号判断
            // 如果判断失败，则 return 一个提示消息即可
            var pwd = $(".reg-box [name=password]").val()
            // console.log(pwd);
            if (pwd !== value) {
                return '两次输入的密码不一致！'
            }
        }

    })


    // 监听注册表单的提交事件
    $("#form_reg").on('submit', function (e) {
        // 阻止默认提交行为
        e.preventDefault()
        //代码优化：定义一个 data 对象接收 post 请求中的参数对象
        var data = {
            username: $("#form_reg [name=username]").val(),
            password: $("#form_reg [name=password]").val(),
        }
        // 发起 ajax 的 post 请求
        $.post('/api/reguser', data, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg('注册成功，请登录！');
            // 用户注册成功后，跳转到登录页面
            $('#link_login').click()
        })
    })


    // 监听登录表单的提交事件
    $("#form_login").submit(function (e) {
        // 阻止默认提交行为，后期使用 ajax 提交
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            // 快速获取登录表单数据
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功')
                // 将登录成功的 token 值，保存到 localStorage 中
                // console.log(res.token);
                localStorage.setItem('token', res.token)
                // 跳转到后台主页
                location.href = '/index.html'
            }

        })
    })








































})