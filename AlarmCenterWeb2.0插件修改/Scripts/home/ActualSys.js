//存储事件
var evtName = new Array();
var userAdmin = null;
var tableGWSnapshotConfig = new Array();

var SnapshotDataSet, SysEvtCountsSet;
onloadContent();
function onloadContent() {
    $(".main").attr("value", "2");
    $(".inforbtnList").find("button").unbind();
    $(".inforbtnList").find("button").bind('click', onInforBtn);
    onSnapshotConfig();

    clearInterval(SysEvtCountsSet);
    SysEvtCounts();
    SysEvtCountsSet = setInterval("SysEvtCounts()", 4000);
    $("#tableAct tbody").html("");

    clearInterval(SnapshotDataSet);
    SnapshotData();
    SnapshotDataSet = setInterval("SnapshotData()", 4000);
    $('.tableAuto').mCustomScrollbar(scrollbarStyle);
}
//类型显示与隐藏
function onInforBtn() {
    if ($(this).attr("sw") == "true") {
        $(this).attr("sw", "false");
        $(this).attr("class", "btn btns-style-1");
    } else {
        $(this).attr("sw", "true");
        $(this).attr("class", "btn btns-style-5");
    }
    SnapshotData();
    $('.tableAuto ').mCustomScrollbar("update");
};

//GWSnapshotConfig(报警配置表)
function onSnapshotConfig() {
    var _urlSnapshot = service + "/GetAlarmConfig";
    var _dataSnapshot = "userName="+window.localStorage.userName;
    function _scuSnapshot(data) {
        var resultJs = $(data).children("string").text();
        if (resultJs != "false") {
            jsonToSnapshot(resultJs);
        }
    }
    JQajaxo("post", _urlSnapshot, false, _dataSnapshot, _scuSnapshot);
}
//报警配置表
function jsonToSnapshot(data) {
    tableGWSnapshotConfig = new Array();
    var usera = JSON.parse(data);
    for (var i = 0; i < usera.length; i++) {
        var userb = usera[i];
        var userc = new Array(userb.ID, userb.SnapshotName, userb.SnapshotLevelMin, userb.SnapshotLevelMax, userb.MaxCount, userb.IsShow, userb.IconRes);
        tableGWSnapshotConfig[i] = userc;
        if (tableGWSnapshotConfig[i][5] == "0") {
            $("#btnSnapshot_" + (i + 1)).css("display", "none");
        }
        else {
            var SnapshotLevels = "";
            for (var j = userb.SnapshotLevelMin; j <= userb.SnapshotLevelMax; j++) {
                SnapshotLevels += j + ",";
            }
            SnapshotLevels = SnapshotLevels.substring(0, SnapshotLevels.length - 1);
            $("#btnSnapshot_" + (i + 1)).attr("values", SnapshotLevels);
        }
    }
}

//获取实时系统数据的总数
function SysEvtCounts() {
    if ($(".main").attr("value") != "2") {
        clearInterval(SysEvtCountsSet);
        return;
    }
    var equipListGet = Browse_Equip_List_Get() + ',' + Browse_SpecialEquip_List();
    if (equipListGet == ',') {
        equipListGet = '';
    }
    var _url = service + "/GetRealTimeEventCount";
    var dataCounts = new Array();
    var _data = "equip_no_list=" + equipListGet + "&&event_Level_list=" + $("#btnSnapshot_1").attr("values") + ";" + $("#btnSnapshot_2").attr("values") + ";" + $("#btnSnapshot_3").attr("values") + ";" + $("#btnSnapshot_4").attr("values") + ";" + $("#btnSnapshot_5").attr("values");
    function _successf(data) {
        var resultJs = $(data).children("string").text();
        if (resultJs != "false") {
            dataCounts = resultJs.split(',');
            $('#btnSnapshot_1').find("b").html(dataCounts[0]);
            $('#btnSnapshot_2').find("b").html(dataCounts[1]);
            $('#btnSnapshot_3').find("b").html(dataCounts[2]);
            $('#btnSnapshot_4').find("b").html(dataCounts[3]);
            $('#btnSnapshot_5').find("b").html(dataCounts[4]);
        }
    }
    JQajaxo("post", _url, false, _data, _successf);
}

//将按钮组的布尔值转换为0,1
function btnTobool() {
    var btn_s = "";
    for (var i = 1; i < 6; i++) {
        if ($("#btnSnapshot_" + i).attr("sw") == "true" && $("#btnSnapshot_" + i).attr("values")) {
            btn_s += $("#btnSnapshot_" + i).attr("values") + ",";
        }
    }
    btn_s = btn_s.substring(0, btn_s.length - 1);
    return btn_s;
}

//获取数据
function SnapshotData() {
    if ($(".main").attr("value") != "2") {
        clearInterval(SnapshotDataSet);
        return;
    }
    $('#tableAct tbody').html("");
    var _url = service + "/GetRealTimeEvent";
    var btn_s = btnTobool();
    var _data = "";
    if (btn_s == "") {
        return;
    }
    else {
        var equipListGet = Browse_Equip_List_Get() + ',' + Browse_SpecialEquip_List();
        if (equipListGet == ',') {
            equipListGet = '';
        }
        _data = "event_Level_list=" + btn_s + "&&equip_no_list=" + equipListGet;
    }
    function _successf(data) {
        var resultJs = $(data).children("string").text();
        if (resultJs != "false" && resultJs != "]") {
            jsonToTable(resultJs);
            atorData();
        }
        resultJs = null;
    }
    JQajaxo("post", _url, false, _data, _successf);
}

//查询用户可查看设备2
function Browse_SpecialEquip_List() {
    var equipList = [];
    if (getWebUser.find("IsAdministrator").text() != "true") {
        getWebUser.find("RoleItem").each(function () {
            $(this).find("Browse_SpecialEquip_List").find("string").each(function () {
                equipList.push($(this).text().split('.')[0]);
            });
        });
    }
    else {
        equipList = [];
    }
    equipList = outRepeat(equipList);
    var s = '';
    for (var i = 0; i < equipList.length; i++) {
        s += equipList[i] + ',';
    }
    s = s.substring(0, s.length - 1);

    return s;
}

//去除重复
function outRepeat(a) {
    var hash = [], arr = [];
    for (var i = 0; i < a.length; i++) {
        hash[a[i]] != null;
        if (!hash[a[i]]) {
            arr.push(a[i]);
            hash[a[i]] = true;
        }
    }
    return arr;
}


//将json数据转换为table表格
function jsonToTable(resultJs) {
    evtName = new Array();
    var usera = JSON.parse(resultJs);
    for (var i = 0; i < usera.length; i++) {
        var userb = usera[i];
        var qr = "";
        if (userb.确认 == "False") {
            qr = "<button class=\"btn btns-style-4\" onclick=\"okDialog(" + i + ")\">请确认</button>";
        }
        else {
            qr = "<i class=\"iconfont icon-queren\"></i>";
        }
        var lxs = userb.类型;
        var lx = "";
        for (var j = 1; j <= tableGWSnapshotConfig.length; j++) {
            if ($("#btnSnapshot_" + j).css("display") != "none") {
                var btnvals = $("#btnSnapshot_" + j).attr("values").split(',');
                for (var k = 0; k < btnvals.length; k++) {
                    if (btnvals[k] == lxs) {
                        lx = "<img src=\"" + $("#btnSnapshot_" + j).find("img").attr("src") + "\" />";
                        break;
                    }
                }
            }
        }
        var userc = new Array(lx, userb.时间, userb.事件, qr, userb.处理意见);
        evtName[i] = new Array();
        evtName[i][0] = userc[1];
        evtName[i][1] = userc[2];
        appendRow();
    }

    function appendRow() {
        var newRow = $("<tr></tr>");
        for (var j = 0; j < userc.length; j++) {
            var struserc = userc[j];
            if (j == 2) {
                if (struserc.length > 40) {
                    struserc = struserc.substring(0, 40) + "...";
                }
            }
            if (j == 4) {
                if (struserc.length > 20) {
                    struserc = struserc.substring(0, 20) + "...";
                }
            }
            var strusercj = "";
            if (j == 2 || j == 4) {
                strusercj = userc[j];
            }
            newRow.append("<td title=\"" + strusercj + "\">" + struserc + "</td>");
        }
        $("#tableAct tbody:last").append(newRow);
    }
}

//短信号码名单
function atorData() {
    if (userAdmin != null) {
        return;
    }
    userAdmin = new Array();
    var _url = service + "/QueryTableData";
    var _data = "tableName=Administrator";
    function _success_1(data) {
        var resultJs = $(data).children("string").text();
        if (resultJs == "]") { return; }
        var usera = JSON.parse(resultJs);
        for (var i = 0; i < usera.length; i++) {
            var userb = usera[i];
            var userc = new Array(userb.Administrator, userb.MobileTel);
            userAdmin[i] = userc;
        }
    }
    JQajaxo("post", _url, true, _data, _success_1);
}

//请确认弹窗
function okDialog(numb) {
    var evns = evtName[numb][1];
    if (evtName[numb][1].length > 20) {
        evns = "";
        evns = evtName[numb][1].substr(0, 15);
        evns += "...";
    }
    var newDiv = document.createElement("div");
    newDiv.className = "fullScreenPopup";
    newDiv.id = "fullScreenPopup_ok";
    var newContainer = "<div class='fullScreenAll' onclick='onFullScreenAll(this)'></div><div class='fullScreenCenter bounceInDown animated mg-default' style='top:10%;" + $("html").attr("style") + "'>";
    newContainer += "<div class='MessageBox_top'><span>确认处理该事件吗？</span><button class='MessageBox_top_Exit btns-style-6' onclick='onCencel(\"" + newDiv.id + "\")'><i class='iconfont icon-guanbi'></i></button></div>";
    newContainer += "<p class='MessageBox_p1' title='" + evtName[numb][1] + "'>" + evns + "</p>";
    newContainer += "<p>请输入处理意见(100字以内)：</p>";
    newContainer += "<textarea id='actualMessage' class='input actualtext'></textarea>";
    newContainer += "<p><label><input id='procsCheckBox' type='checkbox' onchange='procs_click()'/> <span>是否发送短信？</span></label></p>";
    newContainer += "<div id='procsContent' class='procsContent listStyle'></div>";
    newContainer += "<p class='MessageBox_p3'><button class='btn btns-style-1' onclick='okMessages(\"" + numb + "\",\"" + newDiv.id + "\")'>确定</button><button  class='btn btns-style-1' onclick='onCencel(\"" + newDiv.id + "\")'>取消</button></p>";
    newContainer += "</div>";
    newDiv.innerHTML = newContainer;
    document.body.appendChild(newDiv);
}
//确定
function okMessages(numbs, dt) {
    var textMessage = $("#actualMessage").val();
    var isProcs = "false";
    var telStrs = "";
    if (document.getElementById("procsCheckBox").checked) {
        isProcs = "true";
        $("#procsContent ul li").each(function () {
            var liStr = $(this).find("span").text().split('(')[0];
            telStrs += liStr + ",";
        })
        telStrs = telStrs.substring(0, telStrs.length - 1);
    }
    var userNam = "";
    if (window.localStorage.userName != "" && window.localStorage.userName != null) {
        userNam = window.localStorage.userName;
    }
    else {
        userNam = window.sessionStorage.userName;
    }
    var _url = service + "/EventConfirm";
    var _data = "procMsg=" + textMessage + "&&isMsg=" + isProcs + "&&telStr=" + telStrs + "&&procName=" + evtName[numbs][1] + "&&procTime=" + evtName[numbs][0] + "&&userName=" + userNam;
    function _successf(data) {
        var resultJs = $(data).children("string").text();
    }
    JQajaxo("post", _url, true, _data, _successf);
    onCencel(dt);
}

//是否发短信
function procs_click() {
    if (document.getElementById("procsCheckBox").checked) {
        procsContentShow();
    }

    function procsContentShow() {
        if ($("#procsContent").html() == "") {
            var newRow = $('<ul></ul>');
            for (var i = 0; i < userAdmin.length; i++) {
                newRow.append("<li><lable><input id='procsList_" + i + "' type='checkbox'/> <span onclick='procsList_click(\"" + i + "\")'>" + userAdmin[i][1] + "(" + userAdmin[i][0] + ")</span></lable></li>");
            }
            $("#procsContent").html(newRow);
        }
    }
    $("#procsContent").slideToggle();
    $('.procsContent').mCustomScrollbar(scrollbarStyle);
}
function procsList_click(dt) {
    var porocsLists = document.getElementById("procsList_" + dt);
    if (porocsLists.checked) {
        porocsLists.checked = false;
    }
    else {
        porocsLists.checked = true;
    }
}
