/*
 * 连接服务器
 * 
 * 未登录和连接错误都将跳转到登录页
 * 登录之后将返回
 * 
 */
function auth_name(linkULR) {
    if (window.localStorage.ac_appkey != '' && window.localStorage.ac_appkey != undefined && window.localStorage.ac_appkey != null) {
        $.ajax({
            type: 'get',
            url: '/api/server/auth_name',
            headers: {
                Authorization: window.localStorage.ac_appkey + '-' + window.localStorage.ac_infokey
            },
            success: function (dt) {
                if (dt.HttpStatus == 200 && dt.HttpData.code == 200) {
                    console.log("成功连接");
                }
                else {
                    console.log(dt);
                    alert("错误代码：" + dt.HttpData.code + '\n' + dt.HttpData.message);
                    window.location.href = '/Views/login.html?' + linkULR;
                }
            },
            error: function () {
                alert("服务器连接错误!");
                window.location.href = '/Views/login.html?' + linkULR;
            }
        });
    }
    else {
        alert("未登录!");
        window.location.href = '/Views/login.html?' + linkULR;
    }
}