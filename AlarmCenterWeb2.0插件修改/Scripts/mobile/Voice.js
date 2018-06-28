
function Voice() {
    // 底部按住说话样式
    var heightWindow = $(".page-content").height();
    if (heightWindow < 500) {
        $(".voiceDivs").css("height", "100%");
        $(".voiceDivs").css("bottom", "40px");
        $(".voiceDivs").css("position", "relative");
    }
    else {
        $(".voiceDivs").css("height", "300px");
        $(".voiceDivs").css("bottom", "60px");
        $(".voiceDivs").css("position", "absolute");
    }
    //监听
    document.getElementById("voiceBtn").addEventListener('touchstart', onTouchStart);
    document.getElementById("voiceBtn").addEventListener('touchend', onTouchEnd);
    toolbarActive('VoiceTool');
    //记录选择
    if (!window.localStorage.voiceList) {
        window.localStorage.voiceList = "1";
    }
    //选择
    $("#voiceList").find("option").each(function () {
        if ($(this).attr("value") == window.localStorage.voiceList) {
            $(this).attr("selected", true);
             $("#voiceListName>.item-after").html($(this).html());
        } 
        else if(window.localStorage.voiceList == undefined)
        {
             $("#voiceList").find("option:eq(0)").attr("selected", true);
              $("#voiceListName>.item-after").html($(this).html());
        }
    });
   
    try {
        myJavaFun.VoiceOpen();
    }
    catch (ex) {

    }
}

function onVoiceList() {
    window.localStorage.voiceList = $("#voiceList").find("option:selected").attr("value");
}

var isVoices = false;

//按住开始说话
function onTouchStart() {
    $(this).addClass("voiceActive");
    $("#voiceMessage").hide();
    $("#waveAnim").show();
    //$(".voicetest").html("已按下");
    try {
        isVoices = true;
        if (window.localStorage.voiceList == "0") {
            myJavaFun.StartVice();
        }
        else {
            myJavaFun.StartVoice(window.localStorage.voiceList);
        }
    } catch (ex) {
        $("#voiceMessage").html("无法使用此功能，请下载最新app！");
    }
}

//释放手指并识别语音
function onTouchEnd() {
    if (!isVoices) {
        return;
    }
    if ($(this).hasClass("voiceActive")) {
        $(this).removeClass("voiceActive");
        $("#voiceMessage").show();
        $("#voiceMessage").html("正在识别…");
        $("#waveAnim").hide();
    }

    document.getElementById("voiceBtn").removeEventListener('touchstart', onTouchStart);
    document.getElementById("voiceBtn").removeEventListener('touchend', onTouchEnd);
    setTimeout(function () {
        try {
            if (window.localStorage.voiceList == "0") {
                myJavaFun.StopVice();
            }
            else {
                myJavaFun.StopVoice();
            }
        } catch (ex) {
            isVoices = false;
            $("#voiceMessage").html("无法使用此功能，请下载最新app！");
            document.getElementById("voiceBtn").addEventListener('touchstart', onTouchStart);
            document.getElementById("voiceBtn").addEventListener('touchend', onTouchEnd);
            setTimeout(function () {
                if (isVoices == false) {
                    $("#voiceMessage").html("按住说话");
                    document.getElementById("voiceBtn").addEventListener('touchstart', onTouchStart);
                    document.getElementById("voiceBtn").addEventListener('touchend', onTouchEnd);
                }
            }, 3000);
        }
    }, 50);
}

//接收回调数据并上传至服务器
function callbackVoiceBuffer(dt) {
    var _url = service + "/VoiceControlByte";
    var _data = "audioData=" + dt + "&&userName=" + window.localStorage.userName;
    ajaxService("post", _url, true, _data, _successf, _error);
    function _successf(data) {
        var rets = $(data).children("string").text();
        if (rets == "") {
            $("#voiceMessage").html("未识别！");
        }
        else {
            $("#voiceMessage").html(rets);
        }
        isVoices = false;
        document.getElementById("voiceBtn").addEventListener('touchstart', onTouchStart);
        document.getElementById("voiceBtn").addEventListener('touchend', onTouchEnd);
    }
    function _error(qXHR, textStatus, errorThrown) {
        $("#voiceMessage").html("服务器出错！");
        isVoices = false;
        document.getElementById("voiceBtn").addEventListener('touchstart', onTouchStart);
        document.getElementById("voiceBtn").addEventListener('touchend', onTouchEnd);
        setTimeout(function () {
            if (isVoices == false) {
                $("#voiceMessage").html("按住说话");
            }
        }, 3000);
    }
}

function StartVoiceXF() {
    try {
        $("#voiceBtn_xf").unbind();
        $("#voiceBtn_xf").addClass("disabled");
        $("#waveAnim_xf").show();
        $("#voiceMessage_xf1").hide();
        $("#voiceMessage_xf2").hide();
        myJavaFun.StartViceXF(parseInt(window.localStorage.XFOffline));
    }
    catch (ex) {
        $("#waveAnim_xf").hide();
        $("#voiceMessage_xf1").html("无法使用此功能！");
        $("#voiceBtn_xf").removeClass("disabled");
        $("#voiceMessage_xf1").show();
        $("#voiceMessage_xf2").html("");
        $("#voiceMessage_xf2").show();
    }
}
function callbackVoiceXFMessage(dt) {
    $("#voiceMessage").html(dt);
    $("#voiceMessage").show();
    $("#waveAnim").hide();
    isVoices = false;
    document.getElementById("voiceBtn").addEventListener('touchstart', onTouchStart);
    document.getElementById("voiceBtn").addEventListener('touchend', onTouchEnd);
}
function callbackVoiceXFData(dt) {
    var _url = service + "/VoiceControlString";
    var _data = "audioData=" + dt + "&&userName=" + window.localStorage.userName;
    ajaxService("post", _url, true, _data, _successf, _error);
    function _successf(data) {
        var rets = $(data).children("string").text();
        if (rets == "") {
            $("#voiceMessage").html("处理：未识别！");
        }
        else {
            $("#voiceMessage").html("处理：" + rets);
        }
        isVoices = false;
        document.getElementById("voiceBtn").addEventListener('touchstart', onTouchStart);
        document.getElementById("voiceBtn").addEventListener('touchend', onTouchEnd);
    }
    function _error(qXHR, textStatus, errorThrown) {
        $("#voiceMessage").html("服务器出错！");
        isVoices = false;
        document.getElementById("voiceBtn").addEventListener('touchstart', onTouchStart);
        document.getElementById("voiceBtn").addEventListener('touchend', onTouchEnd);
        setTimeout(function () {
            if (isVoices == false) {
                $("#voiceMessage").html("按住说话");
            }
        }, 3000);
    }
}