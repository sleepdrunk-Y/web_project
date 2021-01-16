$(function () {
    // 调用 getUserInfo 获取用户基本信息
    getUserInfo()
    var layer = layui.layer


    // 获取用户的基本信息
    function getUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            // headers 就是请求头配置对象
            // headers: {
            //     Authorization: localStorage.getItem('token') || ''
            // },
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('获取用户信息失败！')
                }
                // console.log(res);
                // 调用 renderAvatar 渲染用户的头像
                renderAvatar(res.data)
            }
        })
    }


    // 渲染用户的头像
    function renderAvatar(user) {
        // 1. 获取用户的昵称 (首先渲染用户昵称，如果没有昵称，使用用户的登录名)
        var name = user.nickname || user.username
        // 2. 设置欢迎的文本
        $("#welcome").html('欢迎&nbsp;&nbsp;' + name)
        // 3. 按需渲染用户的头像
        if (user.user_pic !== null) {
            // 3.1 渲染图片头像
            $(".layui-nav-img").attr('src', user.user_pic).show()
            $(".text-avatar").hide()
        } else {
            $(".layui-nav-img").hide()
            var first = name[0].toUpperCase()
            $(".text-avatar").html(first).show()

        }
    }


    // 点击退出按钮，实现退出功能
    $("#btnLogout").on('click', function () {
        // 提示用户是否确认退出
        layer.confirm('确定退出登录？',
            { icon: 8, title: '提示' },
            function (index) {
                // console.log(index);
                //do something
                // 1. 清空本地存储中的 token
                localStorage.removeItem('token')

                // 2. 重新跳转到登录页面
                location.href = '/login.html'

                // 关闭 confirm 询问框
                layer.close(index)

            }
        )
    })
})










