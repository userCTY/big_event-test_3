$(function () {
    //资源导出
    let layer = layui.layer
    let form = layui.form

    //功能1 实现登录与注册的切换
    $('#go_reg').on('click', function () {
        $('.login_box').hide()
        $('.reg_box').show()
    })

    $('#go_login').on('click', function () {
        $('.login_box').show()
        $('.reg_box').hide()
    })

    //功能2 实现注册功能
    //2.1 添加验证规则
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        rePwd: function (value) {
            let pwd = $('.reg_box [name=password]').val()
            if (value !== pwd) {
                return '两次输入密码不一致!'
            }
        }
    })
    //2.2 发起ajax请求
    $('#reg_form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    console.log(res);
                    return layer.msg(res.message)
                }
                layer.msg('注册成功,请登录', { timer: 1000 }, function () {
                    $('#go_login').click()
                })
            }
        })
    })

    //3. 实现登录功能
    $('#login_form').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function(res){
                if(res.status !== 0){
                    return layer.msg('登录失败!')
                }
                layer.msg('')
                localStorage.setItem('token',res.token)
                location.href = '/index.html'
            }
        })
    })

})