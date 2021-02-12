$(function () {
    //功能1 实现退出功能
    $('#getout').on('click', function () {
        layer.confirm('确认退出当前账号?', { icon: 3, title: '提示' }, function (index) {
            //删除身份标志
            localStorage.removeItem('token')
            //跳转页面
            location.href = '/login.html'
            layer.close(index);
        });
    })

    //功能2 实现获取用户信息并渲染
    getUserInfo()
})


let layer = layui.layer
let form = layui.form
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg('获取用户信息失败!')
            }
            renderAvatar(res.data)
        }
    })
}

//渲染头像函数
function renderAvatar(user) {
    let name = user.nickname || user.username
    $('#wc_name').html('欢迎 &nbsp;' + name)
    if (user.user_pic !== null) {
        $('.header').prop('src', user.user_pic).show()
        $('.layui-nav-img').hide()
    } else {
        let header_pic = name[0].toUpperCase()
        $('.header').html(header_pic).show()
        $('.layui-nav-img').hide()
    }
}