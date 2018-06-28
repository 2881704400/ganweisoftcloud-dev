init();
function init() {
    var pagejs = document.createElement("script");
    pagejs.setAttribute("src", "/Scripts/isLogin.js");
    document.body.appendChild(pagejs);
    pagejs.onload = function () {
        evil("auth_name('/swagger/ui/index')");
        console.log(window.localStorage.ac_appkey + '-' + window.localStorage.ac_infokey);
    }
}

function evil(fn) {
    var Fn = Function;  //一个变量指向Function，防止有些前端编译工具报错
    return new Fn('return ' + fn)();
}