//PC端js主入口
//web接口地址
var service = "/GWService.asmx";

function JQajaxo(_type, _url, _asycn, _data, _success) {
    $.ajax({
        type: _type,
        url: _url,
        timeout: 10000,
        async: _asycn,
        data: _data,
        success: _success,
        error: function (qXHR, textStatus, errorThrown) {
            if (textStatus == "timeout") {
                console.log("加载超时，请重试");
            } else {
                error_callback();
            }
        },
        complete: function (XHR, TS) {
            if ($(".loading").length > 0) {
                $(".loading").hide();
            }
            XHR = null;
        },
        beforeSend: function () {
            //console.log(343)
        }
    });
}
function JQajaxo2(_type, _url, _asycn, _data, _success) {
    $.ajax({
        type: _type,
        url: _url,
        timeout: 10000,
        async: _asycn,
        data: _data,
        beforeSend: function () {
            $(".loading").show();
        },
        success: _success,
        error: function (qXHR, textStatus, errorThrown) {
            if (textStatus == "timeout") {
                console.log("加载超时，请重试");
            } else {
                console.log(textStatus);
            }
        },
        complete: function (XHR, TS) {
            //$(".loading").hide();
            XHR = null;
        }
    });
}
function ajaxService(_type, _url, _asycn, _data, _success, _error) {
    $.ajax({
        type: _type,
        url: _url,
        timeout: 10000,
        async: _asycn,
        data: _data,
        success: _success,
        error: _error,
        complete: function (XHR, TS) {
            //$(".loading").hide();
            XHR = null;
        }
    });
}

//载入界面
function loadName(hr) {
    try{
        if (window.localStorage.userName != "" && window.localStorage.userName != null) {
            $("#userName").html(window.localStorage.userName);
            InitEnsure(hr);
        
        }
        else if (window.sessionStorage.userName != "" && window.sessionStorage.userName != null) {
            $("#userName").html(window.sessionStorage.userName);
            InitEnsure(hr);
        }
        else {
            window.location.href = "/Views/login.html";
        }
    }
    catch (ex) {
        window.location.href = "/Views/login.html";
    }
}

window.onbeforeunload = function () {
    //window.localStorage.userName = "";
    //window.localStorage.userPWD = "";
    return;
}

var scrollbarStyle = {
    theme: "light-3",
}

var getWebUser, GWAddinModule;

//连接服务器
function InitEnsure(hr) {
    $.ajax({
        type: "post",
        url: service + "/ConnectService",
        data: "user_name=" + window.localStorage.userName,
        success: function (dt) {
            $('#fullScreenPopup_ajaxShow').remove();
            var analyze = $(dt).children("string").text();
            try{
                $("footer").html(analyze);
            }
            catch (ex) {
                window.location.href = "/Views/login.html";
            }
            $.ajax({
                type: "post",
                url: service + "/UserPermissions",
                async: false,
                data: "userName=" + window.localStorage.userName,
                success: function (dtUserPermissions) {
                    getWebUser = $(dtUserPermissions).children("UserItem");
                    //console.log(getWebUser.find("UserName").text());
                }
            });
            $.ajax({
                type: "post",
                url: service + "/QueryTableData",
                async: false,
                data: "tableName=GWAddinModule",
                success: function (dtGWAddinModule) {
                    GWAddinModule = new Array();
                    var data = $(dtGWAddinModule).children("string").text();
                    var usera = JSON.parse(data);
                    for (var i = 0, j = 0; i < usera.length; i++) {
                        var userb = usera[i];
                        if (userb.WebPage[0] == "1") {
                            var userc = new Array(userb.ID, userb.Name, userb.ClassName, userb.HelpPath, userb.MultiScreens, userb.WebPage);
                            GWAddinModule[j++] = userc;
                        }
                    }
                }
            });
            loadings(hr);
        },
        beforeSend: function () {
            var newDiv = document.createElement("div");
            newDiv.className = "fullScreenPopup";
            newDiv.id = "fullScreenPopup_ajaxShow";
            var newContainer = "<div class='fullScreenCenter animated fadeIn mg-xs' style='" + $("html").attr("style") + "'>";
            newContainer += '<div id="loading" class="loadingStyle"></div>';
            newContainer += "<p class='loadingText'>正在读取数据，请稍后…</p>";
            newContainer += "</div></div>";
            newDiv.innerHTML = newContainer;
            document.body.appendChild(newDiv);

            var opts = {

                lines: 9, // The number of lines to draw

                length: 0, // The length of each line

                width: 10, // The line thickness

                radius: 15, // The radius of the inner circle

                corners: 1, // Corner roundness (0..1)

                rotate: 0, // The rotation offset

                color: '#000', // #rgb or #rrggbb

                speed: 1, // Rounds per second

                trail: 60, // Afterglow percentage

                shadow: false, // Whether to render a shadow

                hwaccel: false, // Whether to use hardware acceleration

                className: 'spinner', // The CSS class to assign to the spinner

                zIndex: 2e9, // The z-index (defaults to 2000000000)

                top: '0', // Top position relative to parent in px

                left: '0' // Left position relative to parent in px

            };

            var target = document.getElementById('loading');

            var spinner = new Spinner(opts).spin(target)
        },
        complete: function () {
            $('#fullScreenPopup_ajaxShow').remove();
        }
    });
}
function loadings(hr) {
    var isAd = isAddinModule_List(hr);
    if (isAd) {
        $(".navList ul li").removeClass("active");
        $(".navList ul li").each(function () {
            if ($(this).find("a").attr("href") == "#" + hr) {
                $(this).addClass("active");
                return false;
            }
        });
        $.ajax({
            url: "/Views/Home/" + hr + ".html",
            beforeSend: function () {
                //加载
            },
            success: function (data) {
                $(".main").html(data);
                document.title = $("#ribbonNow").text();
            },
            error: function () {
                //错误
            },
        });
    }
    else {
        alert(window.localStorage.userName + "：没有权限打开页面！");
    }
}

//重连服务器
function initEnsureChonglian(fun) {
    var _url = service + "/GetName2SFService";
    var _data = "userName=" + window.localStorage.userName;
    function _success(data) {
        var analyze = $(data).children("string").text();
        if (analyze != "" || analyze != "false") {
            //console.log("重连成功！");
            if (fun != null) {
                fun();
            }
        }
    }
    JQajaxo("post", _url, true, _data, _success);
}

function isAddinModule_List(hr) {
    var views = false;
    if (getWebUser.find("IsAdministrator").text() != "true") {
        getWebUser.find("RoleItem").each(function () {
            $(this).find("AddinModule_List").find("int").each(function () {
                for (var i = 0; i < GWAddinModule.length; i++) {
                    if (GWAddinModule[i][0] == $(this).text()) {
                        if (hr == GWAddinModule[i][2].split('.')[1]) {
                            views = true;
                        }
                    }
                }
            });
        });
    }
    else {
        views = true;
    }
    if (hr == "index") {
        views = true;
    }
    return views;
}

//查询用户可查看设备
function Browse_Equip_List_Get() {
    var equipList = '';
    if (getWebUser.find("IsAdministrator").text() != "true") {
        getWebUser.find("RoleItem").each(function () {
            $(this).find("Browse_Equip_List").find("int").each(function () {
                equipList += $(this).text() + ',';
            });
        });
        equipList = equipList.substring(0, equipList.length - 1);
    }
    else {
        equipList = '';
    }

    return equipList;
}

//全屏事件
$(document).on('click', '[data-action="launchFullscreen"]', function () {
    if ($("body").hasClass("full-screen")) {
        var de = document;
        if (de.exitFullscreen) {
            de.exitFullscreen();
        } else if (de.mozCancelFullScreen) {
            de.mozCancelFullScreen();
        } else if (de.webkitCancelFullScreen) {
            de.webkitCancelFullScreen();
        }
        $("body").removeClass("full-screen");
    }
    else {
        var de = document.documentElement;
        if (de.requestFullscreen) {
            de.requestFullscreen();
        } else if (de.mozRequestFullScreen) {
            de.mozRequestFullScreen();
        } else if (de.webkitRequestFullScreen) {
            de.webkitRequestFullScreen();
        } else if (de.msRequestFullscreen) {
            de.msRequestFullscreen();
        }
        $("body").addClass("full-screen");
    }
});

//注销事件
$(document).on('click', '[data-action="userLogout"]', function () {
    var bgd = window.localStorage.bgd;
    var newDiv = document.createElement("div");
    newDiv.className = "fullScreenPopup";
    newDiv.id = "fullScreenPopup_Logout";
    var newContainer = "<div class='fullScreenCenter animated fadeIn' style='" + bgd + "'>";
    newContainer += "<div class='mg-default-center'><p class='MessageBox_p1'><i class=\"iconfont icon-logout\"></i> 注销 <b>" + window.localStorage.userName + "</b>？</p>";
    newContainer += "<p class='MessageBox_p2'>这将重新登录。</p>";
    newContainer += "<p class='MessageBox_p3'><button class='btn btns-style-1' onclick='onConfirmMessage()'>确定</button><button  class='btn btns-style-1' onclick='onCencel(\"" + newDiv.id + "\")'>取消</button></p>";
    newContainer += "</div></div>";
    newDiv.innerHTML = newContainer;
    document.body.appendChild(newDiv);
});
//确定
function onConfirmMessage() {
    window.localStorage.userName = "";
    window.localStorage.userPWD = "";
    try{
        if (window.localStorage.terminal.split('.')[1] == "App") {
            myJavaFun.OpenLocalUrl("login");
        }
        else {
            window.location.href = "/Views/login.html";
        }
    }
    catch (ex) {
        window.location.href = "/Views/login.html";
    }
}
//取消
function onCencel(dt) {
    if (supportCss3('animation-duration')) {
        $("#" + dt).addClass("fadeOut animated");
        setTimeout(function () {
            $("#" + dt).remove();
        }, 800);
    }
    else {
        $("#" + dt).remove();
    }
}
function onFullScreenAll(dt) {
    if (supportCss3('animation-duration')) {
        $(dt).parent().addClass("fadeOut animated");
        setTimeout(function () {
            $(dt).parent().remove();
        }, 800);
    }
    else {
        $(dt).parent().remove();
    }
}

//判断是否支持css3
function supportCss3(style) {
    var prefix = ['webkit', 'Moz', 'ms', 'o'],
    i,
    humpString = [],
    htmlStyle = document.documentElement.style,
    _toHumb = function (string) {
        return string.replace(/-(\w)/g, function ($0, $1) {
            return $1.toUpperCase();
        });
    };

    for (i in prefix)
        humpString.push(_toHumb(prefix[i] + '-' + style));

    humpString.push(_toHumb(style));

    for (i in humpString)
        if (humpString[i] in htmlStyle) return true;

    return false;
}

//选择皮肤
$(".popupSkin-menu img").on('click', function () {
    $("html").attr("style", "background:url(" + $(this).attr("src") + ")");
    $("body").attr("style", "background:url(" + $(this).attr("src") + ")");
    window.localStorage.bgd = "background:url(" + $(this).attr("src") + ")";
});

//选择皮肤
$(".popupSkin-menu span").on('click', function () {
    var value = $(this).attr('value');
    var style = $(this).attr("style");
    skinDoc(value, style);
});
function skinDoc(value, style) {
    if (value == '0') {
        $('#style2').attr('href', "/Styles/Home/style1/puplicStyle.css");
        $('#style3').attr('href', "/Styles/Home/style1/homeStyle.css");
        $('#style4').attr('href', "/Styles/Home/style1/viewStyle.css");
        $("html").attr("style", style);
        $("body").attr("style", style);
        window.localStorage.bgd = style;
        window.localStorage.style = "style1";
    }
    else {
        $('#style2').attr('href', "/Styles/Home/style2/puplicStyle.css");
        $('#style3').attr('href', "/Styles/Home/style2/homeStyle.css");
        $('#style4').attr('href', "/Styles/Home/style2/viewStyle.css");
        $("html").attr("style", style);
        $("body").attr("style", style);
        window.localStorage.bgd = style;
        window.localStorage.style = "style2";
    }
}

//折叠菜单
$(document).on('click', '[data-action="toggleMenu"]', function () {
    $(this).find('i').toggleClass('icon-shouqi_2');
    if (!$("nav").find("ul").hasClass("minifieds")) {
        $("nav").animate({ width: '50px', speed: 300 }, function () {
            $(".navUser").children("span").find('span').hide();
            $("nav").find("span").addClass("menu-item-parents");
            $("nav").find("ul").addClass("minifieds");
        });
        $(".main").animate({ left: '50px', speed: 300 });
        $("footer").animate({ padding: '0 0 0 70px' });
        $(".navList ul").find("li").hover(function () {
            $(this).find("span").show();
        }, function () {
            $(this).find("span").attr("style", "");
        });

        $('.headerLeft').animate({ width: '50px', speed: 300 }, function () {
            $('.headerLeft img').attr('src', "/Image/ic_launcher.png");
            $('.headerLeft img').css('height', "38px");
        });
    }
    else {
        $(".navUser").children("span").find('span').show();
        $("nav").find("ul").removeClass("minifieds");
        $("nav").find("span").removeClass("menu-item-parents");
        $("nav").animate({ width: '180px',speed:300 });
        $(".main").animate({ left: '180px', speed: 300 });
        $("footer").animate({ padding: '0 0 0 200px' });
        $(".navList ul").find("li").unbind();

        $('.headerLeft').animate({ width: '180px', speed: 300 });
        $('.headerLeft img').attr('src', "/Image/logos4.png");
        $('.headerLeft img').css('height', "42px");
    }
});

//刷新界面
$(document).on('click', '[data-action="refreshAgain"]', function () {
    var bgd = window.localStorage.bgd;
    var newDiv = document.createElement("div");
    newDiv.className = "fullScreenPopup";
    newDiv.id = "fullScreenPopup_Refresh";
    var newContainer = "<div class='fullScreenCenter animated fadeIn' style='" + bgd + "'><div class='mg-default-center'>";
    newContainer += "<p class='MessageBox_p1'><i class=\"iconfont icon-shuaxin\"></i> 刷新？</p>";
    newContainer += "<p class='MessageBox_p2'>这将重新载入界面。</p>";
    newContainer += "<p class='MessageBox_p3'><button class='btn btns-style-1' onclick='onConfirmRefresh(\"" + newDiv.id + "\")'>确定</button><button  class='btn btns-style-1' onclick='onCencel(\"" + newDiv.id + "\")'>取消</button></p>";
    newContainer += "</div></div>";
    newDiv.innerHTML = newContainer;
    document.body.appendChild(newDiv);
});
//确定
function onConfirmRefresh(dt) {
    if (supportCss3('animation-duration')) {
        $("#" + dt).addClass("fadeOut animated");
        setTimeout(function () {
            $("#" + dt).remove();
            var hs = window.location.hash.split('#')[1];
            location.reload();
        }, 800);
    }
    else {
        $("#" + dt).remove();
        var hs = window.location.hash.split('#')[1];
        if (hs == null) {
            loadings("index");
        }
        else {
            loadings(hs);
        }
    }
}

//导航链接
$(document).on('click', '[data-action="navLists"]', function (d) {
    if (!$(this).hasClass("active")) {
        var hr = $(this).children('a').attr("href").split('#')[1];
        loadings(hr);
    }
});

//tab页
$(document).on('click', '[data-action="tabList"]', function (d) {
    if ($(this).hasClass("active")) { return; }
    $(this).siblings().removeClass("active");
    var hr = $(this).attr("href").split('#')[1];
    var $td;
    $("#" + hr).parent().find("article").each(function () {
        if ($(this).hasClass("active")) {
            $(this).removeClass("active fadeIn");
            return false;
        }
    });
    $("#" + hr).addClass("active fadeIn");
    $(this).addClass("active");
});

//关于JavaScriptSerializer在序列化时会将DateTime的数据序列化成类似\/Date(626543800000)\/这样的值
function TimeJSONToString(dt) {
    var timeJSON = parseInt(dt.replace(/\D/igm, ""));
    var timeDate = new Date(timeJSON).format("yyyy-MM-dd hh:mm:ss");
    return timeDate.toLocaleString();
}
//日期格式化
Date.prototype.format = function (fmt) { //author: meizz   
    var o = {
        "M+": this.getMonth() + 1,                 //月份   
        "d+": this.getDate(),                    //日   
        "h+": this.getHours(),                   //小时   
        "m+": this.getMinutes(),                 //分   
        "s+": this.getSeconds(),                 //秒   
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度   
        "S": this.getMilliseconds()             //毫秒   
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
