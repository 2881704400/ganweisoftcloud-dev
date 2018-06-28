//tree设备号
var numTree = new Array();
var nowPage = new Array(1, 1, 1);

onloadContent();
function onloadContent() {
    $(".main").attr("value", "3");
    $('.tree').mCustomScrollbar(scrollbarStyle);
    $('.tableAuto').mCustomScrollbar(scrollbarStyle);
    treeList();
    localDateTime(0);//获取系统当前时间
}

//获取设备列表
function treeList() {
    var _url = service + "/EquipList";
    var _data = "userName=" + window.localStorage.userName;
    function _successf(data) {
        var resultJs = $(data).children("string").text();
        if (resultJs != "false") {
            jsonToConf(resultJs);
            onloadTree("#treelist");
        }
    }
    JQajaxo("post", _url, false, _data, _successf);
}
//配置列表转换为html
function jsonToConf(data) {
    $("#treelist ul").html("");
    var usera = JSON.parse(data);
    for (var i = 0; i < usera.length; i++) {
        var userb = usera[i];
        var userc = new Array(userb.m_EquipNm, userb.m_iEquipNo);
        var newRow = $("<li></li>");
        newRow.append("<span><label><input type=\"checkbox\" id=\"checkConf_" + userc[1] + "\"/>" + userc[0] + "</label></span>");
        $("#treelist ul").append(newRow);
        numTree[i] = userc[1] + "";
    }
}
//全选
function treelistAll(event) {
    if (document.getElementById("treelistAll").checked) {
        for (var i = 0; i < numTree.length; i++) {
            document.getElementById("checkConf_" + numTree[i]).checked = true;
        }
    }
    else {
        for (var i = 0; i < numTree.length; i++) {
            document.getElementById("checkConf_" + numTree[i]).checked = false;
        }
    }
    event.stopPropagation();
}

//日期控件更改事件
function onSelectDate(dt) {
    if ($(dt).find("option:selected").attr("value") == "appointDate") {
        $("#datetimepicker_1").attr("disabled", false);
        $("#datetimepicker_2").attr("disabled", false);
    }
    else {
        $("#datetimepicker_1").attr("disabled", true);
        $("#datetimepicker_2").attr("disabled", true);
    }
}

//获取系统当前时间
function localDateTime(numb) {
    var localeData = new Date();
    var getMonthVar = localeData.getMonth() + 1;
    var getDateVar = localeData.getDate();
    var getHourVar = localeData.getHours();
    var getMinuteVar = localeData.getMinutes();

    if (localeData.getMonth() + 1 < 10) {
        getMonthVar = "0" + getMonthVar;
    }
    if (getDateVar < 10) {
        getDateVar = "0" + getDateVar;
    }
    if (getHourVar < 10) {
        getHourVar = "0" + getHourVar.toString();
    }
    if (getMinuteVar < 10) {
        getMinuteVar = "0" + getMinuteVar.toString();
    }
    var NowDateTimeVar = localeData.getFullYear() + "/" + getMonthVar + "/" + getDateVar;
    var NowDateTimeVar_d = NowDateTimeVar + " 00:00";
    var NowDateTimeVar_h = NowDateTimeVar + " " + getHourVar + ":" + getMinuteVar;
    if (numb == 0) {
        $("#datetimepicker_1").attr("value", NowDateTimeVar_d);
        $("#datetimepicker_2").attr("value", NowDateTimeVar_h);
        $("#input_1").attr("checked", "checked");
        $('#datetimepicker_1').datepicker({ changeMonth: true, changeYear: true });
        $('#datetimepicker_2').datepicker({ changeMonth: true, changeYear: true });
    }
    else if (numb == 1) {
        return NowDateTimeVar_d;
    }
    else {
        return NowDateTimeVar_h;
    }
}

//返回当前时间格式
function nowDate() {
    var datetime = "";
    var selectOptionVal = $("#selectDate").find("option:selected").attr("value");
    if (selectOptionVal == "nowDate") {
        datetime = localDateTime(1) + ":00," + localDateTime(1).split(' ')[0] + " 23:59:59";
    }
    if (selectOptionVal == "weekDate") {
        var localdate = new Date();
        var getMonthc = localdate.getMonth() + 1;
        if (localdate.getMonth() + 1 < 10) {
            getMonthc = "0" + getMonthc;
        }
        var weekNum = "1234567";
        var days = 0 - weekNum.indexOf(localdate.getDay());
        var daysMon = new Date();
        daysMon.setDate(daysMon.getDate() + days);
        var dtFormat = new Date(daysMon).format("yyyy-MM-dd hh:mm:ss");
        datetime = dtFormat.toLocaleString().split(' ')[0] + " 00:00:00";
    }
    if (selectOptionVal == "monthDate") {
        var localdate = new Date();
        var getMonthc = localdate.getMonth() + 1;
        if (localdate.getMonth() + 1 < 10) {
            getMonthc = "0" + getMonthc;
        }
        datetime = localdate.getFullYear() + "/" + getMonthc + "/01 00:00:00";
    }
    if (selectOptionVal == "appointDate") {
        datetime = $("#datetimepicker_1").val().toString() + ":00" + "," + $("#datetimepicker_2").val().toString() + ":00";
    }
    return datetime;
}
//获取当前选中的设备号
function SelectCheckedEquip() {
    var checkedEquip = "";
    for (var i = 0; i < numTree.length; i++) {
        if (document.getElementById("checkConf_" + numTree[i]).checked) {
            checkedEquip += numTree[i] + ",";
        }
    }
    if (checkedEquip == "") {
    }
    else {
        checkedEquip = checkedEquip.substring(0, checkedEquip.length - 1);
    }
    return checkedEquip;
}

//单击查询事件
function selectData() {
    nowPage = new Array(1, 1, 1);
    tableData("EqpEvt");
    tableData("SetEvt");
    tableData("SysEvt");
    for (var i = 1; i < 4; i++) {
        for (var j = 1; j < 5; j++) {
            $("#btnPages_" + i + "_" + j).attr("disabled", false);
        }
    }
    $("#btnPages_1_1").attr("disabled", true);
    $("#btnPages_1_2").attr("disabled", true);

    $("#btnPages_2_1").attr("disabled", true);
    $("#btnPages_2_2").attr("disabled", true);

    $("#btnPages_3_1").attr("disabled", true);
    $("#btnPages_3_2").attr("disabled", true);
    $("#btn_Save").attr("disabled", false);
    $("#nowPage_goPage_1").attr("disabled", false);
    $("#nowPage_goPage_2").attr("disabled", false);
    $("#nowPage_goPage_3").attr("disabled", false);
    $("#nowPage_goPageBtn_1").attr("disabled", false);
    $("#nowPage_goPageBtn_2").attr("disabled", false);
    $("#nowPage_goPageBtn_3").attr("disabled", false);
}
//获取表数据
function tableData(tableName) {
    var _url = "";
    var datatime = nowDate();
    var _data = "";
    var selectNums = SelectCheckedEquip();
    if (tableName == "EqpEvt") {
        $('#tableEqu tbody').html("");
        if (selectNums == "") {
            return;
        }
        _url = service + "/QueryEquipEvt";
        _data = "times=" + datatime + "&&equip_no_list=" + selectNums;
        function _successEqp(data) {
            var resultJs = $(data).children("string").text();
            if (resultJs != "false") {
                jsonToTable(resultJs, "tableEqu");
            }
            else {
                SelectCount("tableEqu", 0);
            }
        }
        var nowPageGet = document.getElementById("nowPage_now_1");
        nowPageGet.innerHTML = nowPage[0];
        JQajaxo("post", _url, false, _data, _successEqp);
    }
    else if (tableName == "SetEvt") {
        $('#tableSet tbody').html("");
        _url = service + "/QuerySetupsEvt";
        _data = "times=" + datatime + "&&equip_no_list=" + selectNums;
        if (selectNums == "") {
            return;
        }
        function _successSet(data) {
            var resultJs = $(data).children("string").text();
            if (resultJs != "false") {
                jsonToTable(resultJs, "tableSet");
            }
            else {
                SelectCount("tableSet", 0);
            }
        }
        var nowPageGet = document.getElementById("nowPage_now_2");
        nowPageGet.innerHTML = nowPage[1];
        JQajaxo("post", _url, false, _data, _successSet);
    }
    else {
        $('#tableSys tbody').html("");
        _url = service + "/QuerySystemEvt";
        _data = "times=" + datatime;
        function _successSys(data) {
            var resultJs = $(data).children("string").text();
            if (resultJs != "false") {
                jsonToTable(resultJs, "tableSys");
            }
            else {
                SelectCount("tableSys", 0);
            }
        }
        var nowPageGet = document.getElementById("nowPage_now_3");
        nowPageGet.innerHTML = nowPage[2];
        JQajaxo("post", _url, false, _data, _successSys);
    }
}
//获取总行数
function SelectCount(tablen, useraLen) {
    if (tablen == "tableEqu") {
        var p1 = useraLen;
        $("#nowPage_item_1").html(p1);
        var s = (p1 / 10 + "").split('.');
        if (s.length == 2) {
            p1 = parseInt(s[0]) + 1;
        }
        else {
            p1 = p1 / 10;
        }
        $("#nowPage_count_1").html(p1);
    }
    else if (tablen == "tableSet") {
        var p2 = useraLen;
        $("#nowPage_item_2").html(p2);
        var s = (p2 / 10 + "").split('.');
        if (s.length == 2) {
            p2 = parseInt(s[0]) + 1;
        }
        else {
            p2 = p2 / 10;
        }
        $("#nowPage_count_2").html(p2);
    }
    else {
        var p3 = useraLen;
        $("#nowPage_item_3").html(p3);
        var s = (p3 / 10 + "").split('.');
        if (s.length == 2) {
            p3 = parseInt(s[0]) + 1;
        }
        else {
            p3 = p3 / 10;
        }
        $("#nowPage_count_3").html(p3);
    }
}
//将json数据转换为table表格
function jsonToTable(resultJs, tablen) {
    var usera = JSON.parse(resultJs);
    SelectCount(tablen, usera.length);
    for (var i = 0; i < usera.length; i++) {
        var userb = usera[i];
        var userc = "";
        if (tablen == "tableEqu") {
            userc = new Array(userb.equip_nm, userb.event, userb.time);
            if (i >= nowPage[0] * 10 - 10 && i < nowPage[0] * 10) {
                var newRow = $("<tr></tr>");
                for (var j = 0; j < userc.length; j++) {
                    newRow.append("<td>" + userc[j] + "</td>");
                }

                $("#" + tablen + " tbody:last").append(newRow);
            }
        }
        else if (tablen == "tableSet") {
            userc = new Array(userb.equip_nm, userb.event, userb.operator, userb.time);
            if (i >= nowPage[1] * 10 - 10 && i < nowPage[1] * 10) {
                var newRow = $("<tr></tr>");
                for (var j = 0; j < userc.length; j++) {
                    newRow.append("<td>" + userc[j] + "</td>");
                }

                $("#" + tablen + " tbody:last").append(newRow);
            }
        }
        else {
            userc = new Array(userb.event, userb.time);
            if (i >= nowPage[2] * 10 - 10 && i < nowPage[2] * 10) {
                var newRow = $("<tr></tr>");
                for (var j = 0; j < userc.length; j++) {
                    newRow.append("<td>" + userc[j] + "</td>");
                }

                $("#" + tablen + " tbody:last").append(newRow);
            }
        }
    }
}

//下一页
function pagRarclick(number) {
    if (number == 1) {
        if (parseInt($("#nowPage_count_1").text()) == 1 || parseInt($("#nowPage_count_1").text()) == 0) {
            $("#btnPages_1_3").attr("disabled", true);
            $('#btnPages_1_4').attr("disabled", true);
            return;
        }
        if (nowPage[0] == 1) {
            $("#btnPages_1_1").attr("disabled", false);
            $('#btnPages_1_2').attr("disabled", false);
        }
        if (nowPage[0] == parseInt($("#nowPage_count_1").text()) - 1) {
            $("#btnPages_1_3").attr("disabled", true);
            $('#btnPages_1_4').attr("disabled", true);
        }
        nowPage[0]++;
        tableData("EqpEvt");
    }
    else if (number == 2) {
        if (parseInt($("#nowPage_count_2").text()) == 1 || parseInt($("#nowPage_count_2").text()) == 0) {
            $("#btnPages_2_3").attr("disabled", true);
            $('#btnPages_2_4').attr("disabled", true);
            return;
        }
        if (nowPage[1] == 1) {
            $("#btnPages_2_1").attr("disabled", false);
            $('#btnPages_2_2').attr("disabled", false);
        }
        if (nowPage[1] == parseInt($("#nowPage_count_2").text()) - 1) {
            $("#btnPages_2_3").attr("disabled", true);
            $('#btnPages_2_4').attr("disabled", true);
        }
        nowPage[1]++;
        tableData("SetEvt");
    }
    else {
        if (parseInt($("#nowPage_count_3").text()) == 1 || parseInt($("#nowPage_count_3").text()) == 0) {
            $("#btnPages_3_3").attr("disabled", true);
            $('#btnPages_3_4').attr("disabled", true);
            return;
        }
        if (nowPage[2] == 1) {
            $('#btnPages_3_1').attr("disabled", false);
            $('#btnPages_3_2').attr("disabled", false);
        }
        if (nowPage[2] == parseInt($("#nowPage_count_3").text()) - 1) {
            $("#btnPages_3_3").attr("disabled", true);
            $('#btnPages_3_4').attr("disabled", true);
        }
        nowPage[2]++;
        tableData("SysEvt");
    }
}

//上一页
function pagLarclick(number) {
    if (number == 1) {
        if (parseInt($("#nowPage_count_1").text()) == 1) {
            $("#btnPages_1_1").attr("disabled", true);
            $('#btnPages_1_2').attr("disabled", true);
            return;
        }
        if (nowPage[0] == 2) {
            $('#btnPages_1_1').attr("disabled", true);
            $('#btnPages_1_2').attr("disabled", true);
            $("#btnPages_1_3").attr("disabled", false);
            $('#btnPages_1_4').attr("disabled", false);
        }
        else {
            $('#btnPages_1_1').attr("disabled", false);
            $('#btnPages_1_2').attr("disabled", false);
            $("#btnPages_1_3").attr("disabled", false);
            $('#btnPages_1_4').attr("disabled", false);
        }
        nowPage[0]--;
        tableData("EqpEvt");
    }
    else if (number == 2) {
        if (parseInt($("#nowPage_count_2").text()) == 1) {
            $("#btnPages_2_1").attr("disabled", true);
            $('#btnPages_2_2').attr("disabled", true);
            return;
        }
        if (nowPage[1] == 2) {
            $('#btnPages_2_1').attr("disabled", true);
            $('#btnPages_2_2').attr("disabled", true);
            $("#btnPages_2_3").attr("disabled", false);
            $('#btnPages_2_4').attr("disabled", false);
        }
        else {
            $('#btnPages_2_1').attr("disabled", false);
            $('#btnPages_2_2').attr("disabled", false);
            $("#btnPages_2_3").attr("disabled", false);
            $('#btnPages_2_4').attr("disabled", false);
        }
        nowPage[1]--;
        tableData("SetEvt");
    }
    else {
        if (parseInt($("#nowPage_count_3").text()) == 1) {
            $("#btnPages_3_1").attr("disabled", true);
            $('#btnPages_3_2').attr("disabled", true);
            return;
        }
        if (nowPage[2] == 2) {
            $('#btnPages_3_1').attr("disabled", true);
            $('#btnPages_3_2').attr("disabled", true);
            $("#btnPages_3_3").attr("disabled", false);
            $('#btnPages_3_4').attr("disabled", false);
        }
        else {
            $('#btnPages_3_1').attr("disabled", false);
            $('#btnPages_3_2').attr("disabled", false);
            $("#btnPages_3_3").attr("disabled", false);
            $('#btnPages_3_4').attr("disabled", false);
        }
        nowPage[2]--;
        tableData("SysEvt");
    }
}

//首页
function pagHome(number) {
    if (number == 1) {
        $('#btnPages_1_1').attr("disabled", true);
        $('#btnPages_1_2').attr("disabled", true);
        $("#btnPages_1_3").attr("disabled", false);
        $('#btnPages_1_4').attr("disabled", false);
        nowPage[0] = 1;
        tableData("EqpEvt");
    }
    else if (number == 2) {
        $('#btnPages_2_1').attr("disabled", true);
        $('#btnPages_2_2').attr("disabled", true);
        $("#btnPages_2_3").attr("disabled", false);
        $('#btnPages_2_4').attr("disabled", false);
        nowPage[1] = 1;
        tableData("SetEvt");
    }
    else {
        $('#btnPages_3_1').attr("disabled", true);
        $('#btnPages_3_2').attr("disabled", true);
        $("#btnPages_3_3").attr("disabled", false);
        $('#btnPages_3_4').attr("disabled", false);
        nowPage[2] = 1;
        tableData("SysEvt");
    }
}

//尾页
function pagEnd(number) {
    if (number == 1) {
        $('#btnPages_1_1').attr("disabled", false);
        $('#btnPages_1_2').attr("disabled", false);
        $("#btnPages_1_3").attr("disabled", true);
        $('#btnPages_1_4').attr("disabled", true);
        nowPage[0] = parseInt($("#nowPage_count_1").text());
        tableData("EqpEvt");
    }
    else if (number == 2) {
        $('#btnPages_2_1').attr("disabled", false);
        $('#btnPages_2_2').attr("disabled", false);
        $("#btnPages_2_3").attr("disabled", true);
        $('#btnPages_2_4').attr("disabled", true);
        nowPage[1] = parseInt($("#nowPage_count_2").text());
        tableData("SetEvt");
    }
    else {
        $('#btnPages_3_1').attr("disabled", false);
        $('#btnPages_3_2').attr("disabled", false);
        $("#btnPages_3_3").attr("disabled", true);
        $('#btnPages_3_4').attr("disabled", true);
        nowPage[2] = parseInt($("#nowPage_count_3").text());
        tableData("SysEvt");
    }
}

//跳页
function nowPage_goPageBtn(data) {
    if (data == 1) {
        if (parseInt($("#nowPage_goPage_" + data).val()) > parseInt($("#nowPage_count_1").text())) {
            $("#nowPage_goPage_" + data).val(parseInt($("#nowPage_count_1").text()));
        }
        var value_tz = $("#nowPage_goPage_" + data).val();
        if (value_tz == "0") {
            value_tz = 1;
            $("#nowPage_goPage_" + data).val(value_tz);
        }
        nowPage[0] = value_tz;
        if (nowPage[0] == '1') {
            $("#btnPages_1_1").attr("disabled", true);
            $('#btnPages_1_2').attr("disabled", true);
            $("#btnPages_1_3").attr("disabled", false);
            $('#btnPages_1_4').attr("disabled", false);
        }
        else if (nowPage[0] == parseInt($("#B3").text())) {
            $("#btnPages_1_1").attr("disabled", false);
            $('#btnPages_1_2').attr("disabled", false);
            $("#btnPages_1_3").attr("disabled", true);
            $('#btnPages_1_4').attr("disabled", true);
        }
        else {
            $("#btnPages_1_1").attr("disabled", false);
            $('#btnPages_1_2').attr("disabled", false);
            $("#btnPages_1_3").attr("disabled", false);
            $('#btnPages_1_4').attr("disabled", false);
        }
        tableData("EqpEvt");
    }
    else if (data == 2) {
        if (parseInt($("#nowPage_goPage_" + data).val()) > parseInt($("#nowPage_count_2").text())) {
            $("#nowPage_goPage_" + data).val(parseInt($("#nowPage_count_2").text()));
        }
        var value_tz = $("#nowPage_goPage_" + data).val();
        if (value_tz == "0") {
            value_tz = 1;
            $("#nowPage_goPage_" + data).val(value_tz);
        }
        nowPage[1] = value_tz;
        if (nowPage[1] == '1') {
            $("#btnPages_2_1").attr("disabled", true);
            $('#btnPages_2_2').attr("disabled", true);
            $("#btnPages_2_3").attr("disabled", false);
            $('#btnPages_2_4').attr("disabled", false);
        }
        else if (nowPage[1] == parseInt($("#B5").text())) {
            $("#btnPages_2_1").attr("disabled", false);
            $('#btnPages_2_2').attr("disabled", false);
            $("#btnPages_2_3").attr("disabled", true);
            $('#btnPages_2_4').attr("disabled", true);
        }
        else {
            $("#btnPages_2_1").attr("disabled", false);
            $('#btnPages_2_2').attr("disabled", false);
            $("#btnPages_2_3").attr("disabled", false);
            $('#btnPages_2_4').attr("disabled", false);
        }
        tableData("SetEvt");
    }
    else {
        if (parseInt($("#nowPage_goPage_" + data).val()) > parseInt($("#nowPage_count_3").text())) {
            $("#nowPage_goPage_" + data).val(parseInt($("#nowPage_count_3").text()));
        }
        var value_tz = $("#nowPage_goPage_" + data).val();
        if (value_tz == "0") {
            value_tz = 1;
            $("#inp_tz_" + data).val(value_tz);
        }
        nowPage[2] = value_tz;
        if (nowPage[2] == '1') {
            $("#btnPages_3_1").attr("disabled", true);
            $('#btnPages_3_2').attr("disabled", true);
            $("#btnPages_3_3").attr("disabled", false);
            $('#btnPages_3_4').attr("disabled", false);
        }
        else if (nowPage[2] == parseInt($("#B7").text())) {
            $("#btnPages_3_1").attr("disabled", false);
            $('#btnPages_3_2').attr("disabled", false);
            $("#btnPages_3_3").attr("disabled", true);
            $('#btnPages_3_4').attr("disabled", true);
        }
        else {
            $("#btnPages_3_1").attr("disabled", false);
            $('#btnPages_3_2').attr("disabled", false);
            $("#btnPages_3_3").attr("disabled", false);
            $('#btnPages_3_4').attr("disabled", false);
        }
        tableData("SysEvt");
    }
}