//登录
var terminal = null;
var urlSearch = '';
window.onload = function () {
    var hg = ($(document).height() / 2 - $(".signin-content").height() / 2) - 50;
    $(".signin-content").css("top", hg + "px");

    var wd = ($(document).width() / 2 - 70 / 2);

    // $("#loading-center-absolute").css("left", wd + "px");
    //$(".loading-text").css("left", (wd + 6) + "px");

    if ('addEventListener' in document) {
        document.addEventListener('DOMContentLoaded', function () {
            FastClick.attach(document.body);
        }, false);
    }

    document.getElementsByTagName("form")[0].onsubmit = function () {
        return false;
    }

    document.querySelectorAll('[data-action="loginSumit"]').item(0).onclick = onSumitLogining;

    onUserAgent();

    if (window.localStorage.userName) {
        $('#inputName').val(window.localStorage.userName);
    }
    //getKeyUser();
    urlSearch = location.search.split('?')[1];

    $.ajax({
        type: "post",
        url: "/api/server/version_adapt",
        data: "fromPath=",
        success: function (dt) {
            if (dt.HttpStatus == 200 && dt.HttpData.code == 200) {
                if (dt.HttpData.data != '适配成功') {
                    $('#message').html('当前服务无法与AlarmCenter服务匹配!');
                    $('.btn').unbind();
                    $('.btn').bind('click', function () {
                        alert('无法登陆，未匹配AlarmCenter服务！');
                    });
                }
            }
        }
    });
}

function getKeyUser() {
    if (window.localStorage.ac_appkey && window.localStorage.ac_infokey) {
        $.ajax({
            type: 'post',
            url: '/api/server/',
            dataType: "json",
            data: {
                appkey: window.localStorage.ac_appkey,
                infokey: window.localStorage.ac_infokey
            },
            success: function (dt) {
                if (dt.HttpStatus == 200) {
                    var dts = dt.HttpData;
                    if (dts.code == 200) {
                        var getUserInfor = dts.data;
                        $('#inputName').val(getUserInfor[0]);
                        $('#inputPassword').val(getUserInfor[1]);
                    }
                }
            }
        });
    }
}

window.onresize = function () {
    var hg = ($(document).height() / 2 - $(".signin-content").height() / 2) - 50;
    $(".signin-content").css("top", hg + "px");
}

//判断访问终端
function onUserAgent() {
    var sUserAgent = navigator.userAgent.toLowerCase();
    //var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    //var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    if (bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsWM) {
        terminal = "Mobile";
    } else {
        terminal = "Home";
    }
}

var strServiceURLs = '';
function onSumitLogining() {
    $('.loading-text').html('正在连接…');
    var strName = document.getElementById("inputName").value;
    var strPWD = document.getElementById("inputPassword").value;
    if (strName == "") {
        document.getElementById("message").innerHTML = "用户名不能为空！";
    }
    else if (strPWD == "") {
        document.getElementById("message").innerHTML = "密码不能为空！";
    }
    else {
        //window.localStorage.userPWD = Encrypt(strPWD);
        getServerKey();
        document.getElementsByTagName("form")[0].className = "flipOutX animated";
        setTimeout(function () {
            document.getElementsByTagName("form")[0].style.display = "none";
            document.getElementById("loading-center").style.display = "block";
            setTimeout(function () {
                document.getElementById("loading-center-absolute").style.transform = "rotate(720deg)";
            }, 1000);
        }, 1000);
    }
}

//回车事件
function onkeyiptEvent(event) {
    if (event.keyCode == 13) {
        onSumitLogining();
    }
}

//加密与解密
function Encrypt(Text) {
    output = new String;
    alterText = new Array();
    varCost = new Array();
    TextSize = Text.length;
    for (i = 0; i < TextSize; i++) {
        idea = Math.round(Math.random() * 111) + 77;
        alterText[i] = Text.charCodeAt(i) + idea;
        varCost[i] = idea;
    }
    for (i = 0; i < TextSize; i++) {
        output += String.fromCharCode(alterText[i], varCost[i]);
    }
    return output;
}
function unEncrypt(Text) {
    output = new String;
    alterText = new Array();
    varCost = new Array();
    TextSize = Text.length;
    for (i = 0; i < TextSize; i++) {
        alterText[i] = Text.charCodeAt(i);
        varCost[i] = Text.charCodeAt(i + 1);
    }
    for (i = 0; i < TextSize; i = i + 2) {
        output += String.fromCharCode(alterText[i] - varCost[i]);
    }
    return output;
}

//获取key
function getServerKey() {
    $.ajax({
        type: 'post',
        url: '/api/server/getkey',
        dataType: "json",
        data: {
            username: $('#inputName').val(),
            userpwd: $('#inputPassword').val()
        },
        success: function (dt) {
            $('.loading-text').html('获取登录结果…');
            if (dt.HttpStatus == 200) {
                var dts = dt.HttpData;
                if (dts.code == 200) {
                    var getkeys = dts.data;
                    window.localStorage.userName = $('#inputName').val();
                    //window.localStorage.userPwd = Encrypt($('#inputPassword').val());
                    window.localStorage.ac_appkey = getkeys.appkey;
                    window.localStorage.ac_infokey = getkeys.infokey;
                    window.localStorage.terminal = terminal + ".Web";
                    setTimeout(function () {
                        if (urlSearch == '' || urlSearch == undefined || urlSearch == null) {  
                            window.location.href = "/Views/" + terminal + "/home.html";
                        }
                        else {
                            window.location.href = urlSearch;
                        }
                    }, 1500);
                }
                else {
                    $('.loading-text').html(dts.message);
                    setTimeout(function () {
                        document.getElementsByTagName("form")[0].className = "";
                        document.getElementsByTagName("form")[0].style.display = "block";
                        document.getElementById("loading-center").style.display = "none";
                        document.getElementById("loading-center-absolute").style.transform = "";
                        document.getElementById("message").innerHTML = "code:" + dts.code;
                    }, 2500);
                }
            }
            else {
                $('.loading-text').html('HttpStatus:' + dt.HttpStatus);
                setTimeout(function () {
                    document.getElementsByTagName("form")[0].className = "";
                    document.getElementsByTagName("form")[0].style.display = "block";
                    document.getElementById("loading-center").style.display = "none";
                    document.getElementById("loading-center-absolute").style.transform = "";
                    document.getElementById("message").innerHTML = "code:" + dt.HttpStatus;
                }, 2500);
            }
        }
    });
}