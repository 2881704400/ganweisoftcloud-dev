//当前tab页
var tabPage = 0;
//删除按钮的状态
var deleteState = new Array();
//人员列表
var userAdmin = new Array();

//分组名
var groupName = new Array();
//所选分组的设备列表号
var groupEquip = new Array();

//所有设备列表名
var confName = new Array();
//所有设备列表号
var confValue = new Array();

//是否阻止编辑状态
var mous = new Array(false, false, false);

var weeks = new Array("每天", "星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");

onloadContent();
function onloadContent() {
    $(".main").attr("value", "4");
    Alldata();
    $('.equipList').mCustomScrollbar(scrollbarStyle);
}

//获取所有数据
function Alldata() {

    //------获取人员信息表---------
    var _url = service + "/QueryTableData";
    var _data = "tableName=Administrator";
    function _success_1(data) {
        var resultJs = $(data).children("string").text();
        if (resultJs != "]") {
            jsonToHtml_tab1(resultJs);
        }
    }
    JQajaxo("post", _url, false, _data, _success_1);

    //------获取设备分组表---------
    var _data2 = "tableName=EquipGroup";
    function _success_2(data) {
        var resultJs = $(data).children("string").text();
        if (resultJs != "]") {
            jsonToHtml_tab2(resultJs);
        }
    }
    JQajaxo("post", _url, false, _data2, _success_2);
    allEquipList();//载入所有设备列表

    //-------- 获取管理范围表 -----------
    var _data3 = "tableName=AlmReport";
    function _success_3(data) {
        var resultJs = $(data).children("string").text();
        if (resultJs != "]") {
            jsonToHtml_tab3(resultJs);
        }
    }
    JQajaxo("post", _url, false, _data3, _success_3);

    //---------- 获取周排表 -------------
    var _data4 = "tableName=WeekAlmReport";
    function _success_4(data) {
        var resultJs = $(data).children("string").text();
        if (resultJs != "]") {
            jsonToHtml_tab4(resultJs);
        }
    }
    JQajaxo("post", _url, false, _data4, _success_4);

    //---------- 获取特定日期排表 -------------
    var _data5 = "tableName=SpeAlmReport";
    function _success_5(data) {
        var resultJs = $(data).children("string").text();
        if (resultJs != "]") {
            jsonToHtml_tab5(resultJs);
        }
    }
    JQajaxo("post", _url, false, _data5, _success_5);

    for (var i = 0; i < 5; i++) {
        deleteState[i] = true;
    }
}

//单击tab页事件
function tabClick(data) {
    tabPage = data;
    $("#btn_Delete").attr("disabled", deleteState[data]);
}

//--------------------------- 人员信息 ---------------------------
//创建人员信息表
function jsonToHtml_tab1(data) {
    $("#alarmTab_table_1 tbody").html("");
    userAdmin = new Array();
    var usera = JSON.parse(data);
    for (var i = 0; i < usera.length; i++) {
        var userb = usera[i];
        var userc = new Array(userb.Administrator, userb.Telphone, userb.MobileTel, userb.EMail, userb.AckLevel);
        userAdmin[i] = userc[0];
        appendRow();
    }
    function appendRow() {
        var newRow = $("<tr onclick='table_1_Click(this)'></tr>");
        for (var j = 0; j < userc.length; j++) {
            newRow.append("<td>" + userc[j] + "</td>");
        }
        $("#alarmTab_table_1 tbody:last").append(newRow);
    }
}
//单击修改事件
function table_1_Click(data) {
    var tc = $(data);
    var g = 0;
    $(data).find("td").each(function () {
        if ($(this).find("input").attr("type") == "text") {
            g++;
        }
    })
    $("#alarmTab_table_1 tbody tr").each(function (k) {
        if ($(this).hasClass("active")) {
            if (tc.find("td").text() == $(this).find("td").text()) {
                g++;
                $(this).find("td").each(function (i) {
                    if ($(this).find("input").attr("type") != "text") {
                        var texts = $(this).text();
                        $(this).html("<input type=\"text\" class='input' value=\"" + texts + "\" />");
                    }
                });
            }
            else {
                $(this).removeClass("active");

            }
        }

        if ($(this).find("td").find("input").attr("type") == "text" && g == 0) {
            var j = 0;
            $(this).find("td").each(function (i) {
                if (i == 0) {
                    if ($(this).find("input").val() == "") {
                        j++;
                    }
                    else {
                        var texts = $(this).find("input").val();
                        userAdmin[k] = texts;
                    }
                }
                if (j == 0) {
                    var texts = $(this).find("input").val();
                    $(this).html(texts);
                }
            });
        }
    });

    $(data).addClass("active");
    deleteState[0] = false;
    $("#btn_Delete").attr("disabled", deleteState[0]);
}

//------------------------- 监控设备分组 -------------------------
//创建监控设备分组
function jsonToHtml_tab2(data) {
    $("#alarmTab_table_2 tbody").html("");
    var usera = JSON.parse(data);
    for (var i = 0; i < usera.length; i++) {
        groupName[i] = usera[i].group_name;
        groupEquip[i] = usera[i].equipcomb;
        appendRow();
    }

    function appendRow() {
        var newRow = $("<tr onclick=\"table_2_Click(this)\"></tr>");
        newRow.append("<td>" + groupName[i] + "</td>");
        $("#alarmTab_table_2 tbody:last").append(newRow);
    }
}

//单击所选设备
function table_2_Click(data) {
    var tc = $(data);
    var g = 0;
    if ($(data).find("td").find("input").attr("type") == "text") {
        g++;
    }
    $("#alarmTab_table_2 tbody tr").each(function (i) {
        if ($(this).hasClass("active")) {
            if (tc.find("td").text() == $(this).find("td").text()) {
                g++;
                if ($(this).find("td").find("input").attr("type") != "text") {
                    var texts = $(this).find("td").text();
                    $(this).find("td").html("<input type=\"text\" class='input' value=\"" + texts + "\" />");
                }
            }
            else {
                $(this).removeClass("active");
            }
        }
        if ($(this).find("td").find("input").attr("type") == "text" && g == 0 && $(this).find("td").find("input").val() != "") {
            var texts = $(this).find("td").find("input").val();
            groupName[i] = texts;
            $(this).find("td").html(texts);
        }
    })
    onEmptyControl();
    tc.addClass("active");
    deleteState[1] = false;
    $("#btn_Delete").attr("disabled", deleteState[1]);
    $("#selectName").html(tc.find("td").text());
    for (var i = 0; i < groupName.length; i++) {
        if (tc.find("td").text() == groupName[i] && groupEquip[i] != null) {
            var equipcombs = groupEquip[i].slice(1);
            equipcombs = equipcombs.substring(0, equipcombs.length - 1);
            var equipcombt = equipcombs.split('#');
            for (j = 0; j < equipcombt.length; j++) {
                for (k = 0; k < confValue.length; k++) {
                    if (equipcombt[j] == confValue[k]) {
                        document.getElementById("checkConf_" + confValue[k].toString() + "").checked = true;
                        break;
                    }
                }
            }
            break;
        }
    }
}

//离开设备选择框
function equipOut(data) {
    if (!data.contains(event.toElement)) {
        var comb = "#";
        for (var j = 0; j < confValue.length; j++) {
            if (document.getElementById("checkConf_" + confValue[j].toString() + "").checked) {
                comb += confValue[j] + "#";
            }
        }
        $("#alarmTab_table_2 tbody tr").each(function () {
            if ($(this).hasClass("active")) {
                for (var i = 0; i < groupName.length; i++) {
                    if ($(this).find("td").text() == groupName[i]) {
                        groupEquip[i] = comb;
                        break;
                    }
                }
                return false;
            }
        })
    }
}

//载入所有设备列表
function allEquipList() {
    var equipList = $("#equipList").width();
    equipList = parseInt(equipList / 160);
    confName = new Array();
    confValue = new Array();
    var _url = service + "/EquipItemList";
    function _successf(data) {
        var resultJs = $(data).children("string").text();
        if (resultJs != "false") {
            var usera = JSON.parse(resultJs);
            for (var i = 1, j = 0; i < usera.length; i++, j++) {
                var userb = usera[i];
                var userc = new Array(userb.name, userb.value);
                confName[i - 1] = userc[0];
                confValue[i - 1] = userc[1];
                appendRow(j, userc);
            }
        }
    }

    function appendRow(j, userc) {
        if (j == equipList) {
            j == 0;
            $("#equipList").append("<div class=\"clearfix\"></div>");
        }
        var newRow = $("<div class='equipListContent'></div>");
        var textuserc = userc[0];
        if (textuserc.length > 10) {
            textuserc = textuserc.substring(0, 10) + "...";
        }
        newRow.append("<label><input type=\"checkbox\" id=\"checkConf_" + userc[1] + "\"/><span  title='" + userc[0] + "'>" + textuserc + "</span></label>");
        $("#equipList").append(newRow);
    }

    JQajaxo("post", _url, false, "", _successf);
    $("#clear_btn").attr("disabled", false);
    $("#checkall_btn").attr("disabled", false);
}

//清空
function onEmptyControl() {
    for (var i = 0; i < confValue.length; i++) {
        document.getElementById("checkConf_" + confValue[i].toString() + "").checked = false;
    }
    var comb = "#";
    for (var j = 0; j < confValue.length; j++) {
        if (document.getElementById("checkConf_" + confValue[j].toString() + "").checked) {
            comb += confValue[j] + "#";
        }
    }
    $("#alarmTab_table_2 tbody tr").each(function () {
        if ($(this).hasClass("active")) {
            for (var i = 0; i < groupName.length; i++) {
                if ($(this).find("td").text() == groupName[i]) {
                    groupEquip[i] = comb;
                    break;
                }
            }
            return false;
        }
    })
}

//全选
function onSelectControl() {
    for (var i = 0; i < confValue.length; i++) {
        document.getElementById("checkConf_" + confValue[i].toString() + "").checked = true;
    }
    var comb = "#";
    for (var j = 0; j < confValue.length; j++) {
        if (document.getElementById("checkConf_" + confValue[j].toString() + "").checked) {
            comb += confValue[j] + "#";
        }
    }
    $("#alarmTab_table_2 tbody tr").each(function () {
        if ($(this).hasClass("active")) {
            for (var i = 0; i < groupName.length; i++) {
                if ($(this).find("td").text() == groupName[i]) {
                    groupEquip[i] = comb;
                    break;
                }
            }
            return false;
        }
    })
}

//-------------------------- 管理范围 ----------------------------
//创建管理范围表
function jsonToHtml_tab3(data) {
    $("#alarmTab_table_3 tbody").html("");
    var usera = JSON.parse(data);
    for (var i = 0; i < usera.length; i++) {
        var userb = usera[i];
        var userc = new Array(userb.Administrator, userb.group_no);
        appendRow();
    }
    function appendRow() {
        var newRow = $("<tr></tr>");
        newRow.append("<td onclick=\"table_3_Click(this,0)\">" + userc[0] + "</td><td onclick=\"table_3_Click(this,1)\">" + groupName[userc[1] - 1] + "</td>");
        $("#alarmTab_table_3 tbody:last").append(newRow);
    }
}
//单击事件
function table_3_Click(data1, data2) {
    $("#alarmTab_table_3 tbody tr").each(function () {
        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
        }
        $(this).find("td").each(function () {
            if ($(this).html() != $(data1).html()) {
                if ($(this).find("select").hasClass("select")) {
                    $(this).html($(this).find("select").find("option:selected").text());
                }
            }
        })
    })
    var userAndna = new Array();
    if (data2 == 0) {
        userAndna = userAdmin;
    }
    else {
        userAndna = groupName;
    }
    if (!$(data1).find("select").hasClass("select")) {
        var newRow = "<select class='select' onchange='goEdit()' onmouseout='censeClick(this)'>";
        for (var i = 0; i < userAndna.length; i++) {
            if ($(data1).text() == userAndna[i]) {
                newRow += "<option selected value='" + userAndna[i] + "'>" + userAndna[i] + "</option>";
            }
            else {
                newRow += "<option value='" + userAndna[i] + "'>" + userAndna[i] + "</option>";
            }
        }
        newRow += "</select>";
        $(data1).html(newRow);
        mous[0] = true;
    }
    $(data1).parent().addClass("active");
    $("#btn_Delete").attr("disabled", false);
}

//--------------------------- 周排表 -----------------------------
//创建周排表
function jsonToHtml_tab4(data) {
    $("#alarmTab_table_4 tbody").html("");
    var usera = JSON.parse(data);
    for (var i = 0; i < usera.length; i++) {
        var userb = usera[i];
        var userc = new Array(userb.Administrator, userb.week_day, userb.begin_time, userb.end_time);
        appendRow();
    }

    function appendRow() {
        var userd = userc[2].split(' ');
        var usere = userc[3].split(' ');

        var datatime_1 = userd[1].split(':');
        if (parseInt(datatime_1[0]) < 10) {
            userd[1] = "0" + userd[1];
        }

        var datatime_2 = usere[1].split(':');
        if (parseInt(datatime_2[0]) < 10) {
            usere[1] = "0" + usere[1];
        }

        var newRow = $("<tr></tr>");
        newRow.append("<td onclick=\"table_4_Click(this,0)\">" + userc[0] + "</td>");
        newRow.append("<td onclick=\"table_4_Click(this,1)\">" + weeks[userc[1]] + "</td>");

        newRow.append("<td onclick=\"table_4_Click(this,2)\">" + userd[1] + "</td>");
        newRow.append("<td onclick=\"table_4_Click(this,3)\">" + usere[1] + "</td>");
        $("#alarmTab_table_4 tbody:last").append(newRow);
    }
}

//单击事件
function table_4_Click(data1, data2) {
    $("#alarmTab_table_4 tbody tr").each(function () {
        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
        }
        $(this).find("td").each(function () {
            if ($(this).html() != $(data1).html()) {
                if ($(this).find("select").hasClass("select")) {
                    $(this).html($(this).find("select").find("option:selected").text());
                }
                if ($(this).find("input").attr("type") == "text") {
                    $(this).html($(this).find("input").val());
                }
            }
        })
    })
    if (data2 == 0 || data2 == 1) {
        if (!$(data1).find("select").hasClass("select")) {
            var userAndna = new Array();
            if (data2 == 0) {
                userAndna = userAdmin;
            }
            else {
                userAndna = weeks;
            }
            var newRow = "<select class='select' onchange='goEdit()' onmouseout='censeClick(this)'>";
            for (var i = 0; i < userAndna.length; i++) {
                if ($(data1).text() == userAndna[i]) {
                    newRow += "<option selected value='" + userAndna[i] + "'>" + userAndna[i] + "</option>";
                }
                else {
                    newRow += "<option value='" + userAndna[i] + "'>" + userAndna[i] + "</option>";
                }
            }
            newRow += "</select>";
            $(data1).html(newRow);
            mous[1] = true;
        }
    }
    else {
        if ($(data1).find("input").attr("type") != "text") {
            $(data1).html("<input type='text' class='input' value='" + $(data1).text() + "'/ >");
        }
    }

    $(data1).parent().addClass("active");
    $("#btn_Delete").attr("disabled", false);
}

//------------------------ 特定日期排表 --------------------------
//创建特定日期排表
function jsonToHtml_tab5(data) {
    $("#alarmTab_table_5 tbody").html("");
    var usera = JSON.parse(data);
    for (var i = 0; i < usera.length; i++) {
        var userb = usera[i];
        var userc = new Array(userb.Administrator, userb.begin_time, userb.end_time);
        appendRow();
    }

    function appendRow() {
        var newRow = $("<tr></tr>");
        newRow.append("<td onclick=\"table_5_Click(this,0)\">" + userc[0] + "</td>");
        newRow.append("<td onclick=\"table_5_Click(this,1)\">" + userc[1] + "</td>");
        newRow.append("<td onclick=\"table_5_Click(this,2)\">" + userc[2] + "</td>");
        $("#alarmTab_table_5 tbody:last").append(newRow);
    }
}

//单击事件
function table_5_Click(data1, data2) {
    $("#alarmTab_table_5 tbody tr").each(function () {
        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
        }
        $(this).find("td").each(function () {
            if ($(this).html() != $(data1).html()) {
                if ($(this).find("select").hasClass("select")) {
                    $(this).html($(this).find("select").find("option:selected").text());
                }
                if ($(this).find("input").attr("type") == "text") {
                    $(this).html($(this).find("input").val());
                }
            }
        })
    })
    if (data2 == 0) {
        if (!$(data1).find("select").hasClass("select")) {
            var userAndna = userAdmin;
            var newRow = "<select class='select' onchange='goEdit()' onmouseout='censeClick(this)'>";
            for (var i = 0; i < userAndna.length; i++) {
                if ($(data1).text() == userAndna[i]) {
                    newRow += "<option selected value='" + userAndna[i] + "'>" + userAndna[i] + "</option>";
                }
                else {
                    newRow += "<option value='" + userAndna[i] + "'>" + userAndna[i] + "</option>";
                }
            }
            newRow += "</select>";
            $(data1).html(newRow);
            mous[2] = true;
        }
    }
    else {
        if ($(data1).find("input").attr("type") != "text") {
            $(data1).html("<input type='text' class='input' value='" + $(data1).text() + "' />");
        }
    }

    $(data1).parent().addClass("active");
    $("#btn_Delete").attr("disabled", false);
}

//转换日期时间格式
function datatimeStyle(data) {
    var data_a = data.split(' ');
    var data_b = data_a[0].split('/');
    if (parseInt(data_b[1]) < 10) {
        data_b[1] = "0" + data_b[1];
    }
    if (parseInt(data_b[2]) < 10) {
        data_b[2] = "0" + data_b[2];
    }

    var data_c = data_a[1].split(':');
    if (parseInt(data_c[0]) < 10) {
        data_c[0] = "0" + data_c[0];
    }
    data = data_b[0] + "/" + data_b[1] + "/" + data_b[2] + " " + data_c[0] + ":" + data_c[1] + ":" + data_c[2];
    return data;
}

//获取当前系统时间
function NowDataTimel() {
    var localeData = new Date();
    var dataMonth = parseInt(localeData.getMonth()) + 1;
    if (dataMonth < 10) {
        dataMonth = "0" + dataMonth;
    }

    var dataDate = parseInt(localeData.getDate());
    if (dataDate < 10) {
        dataDate = "0" + dataDate;
    }

    var dataHours = parseInt(localeData.getHours());
    if (dataHours < 10) {
        dataHours = "0" + dataHours;
    }

    var dataMinutes = parseInt(localeData.getMinutes());
    if (dataMinutes < 10) {
        dataMinutes = "0" + dataMinutes;
    }

    var NowDataTimels = localeData.getFullYear() + "/" + dataMonth + "/" + dataDate + " " + dataHours + ":" + dataMinutes + ":00";
    return NowDataTimels;
}

//----------- 增加、删除、保存、去除编辑状态、弹出对话框 ---------
//添加
function addData() {
    if (tabPage == 0) {
        tab_1();
    }
    else if (tabPage == 1) {
        tab_2();
    }
    else if (tabPage == 2) {
        tab_3();
    }
    else if (tabPage == 3) {
        tab_4();
    }
    else {
        tab_5();
    }

    function tab_1() {
        var newRow = $("<tr onclick='table_1_Click(this)'></tr>");
        for (var i = 0; i < 4; i++) {
            newRow.append("<td><input type=\"text\" class='input'/></td>");
        }
        newRow.append("<td><input type=\"text\" value='0' class='input'/></td>");
        $("#alarmTab_table_1 tbody:last").append(newRow);
        userAdmin[userAdmin.length] = "";
    }

    function tab_2() {
        var newRow = $("<tr onclick='table_2_Click(this)'></tr>");
        newRow.append("<td><input type=\"text\" class='input'/></td>");
        $("#alarmTab_table_2 tbody:last").append(newRow);
        groupName[groupName.length] = "";
        groupEquip[groupEquip.length] = "";
    }

    function tab_3() {
        var newRow = $("<tr></tr>");
        newRow.append("<td onclick='table_3_Click(this,0)'>0</td><td onclick='table_3_Click(this,1)'></td>");
        $("#alarmTab_table_3 tbody:last").append(newRow);
    }

    function tab_4() {
        var newRow = $("<tr></tr>");
        newRow.append("<td onclick='table_4_Click(this,0)'></td>");
        newRow.append("<td onclick='table_4_Click(this,1)'></td>");
        newRow.append("<td onclick='table_4_Click(this,2)'>00:00:00</td>");
        newRow.append("<td onclick='table_4_Click(this,3)'>23:59:00</td>");
        $("#alarmTab_table_4 tbody:last").append(newRow);
    }

    function tab_5() {
        var newRow = $("<tr></tr>");
        newRow.append("<td onclick='table_5_Click(this,0)'></td>");
        newRow.append("<td onclick='table_5_Click(this,1)'>" + NowDataTimel() + "</td>");
        newRow.append("<td onclick='table_5_Click(this,2)'>" + NowDataTimel() + "</td>");
        $("#alarmTab_table_5 tbody:last").append(newRow);
    }
}

//删除
function deleteData() {
    DeleteDialog(tabPage);
}

//保存
function saveData() {
    if (tabPage == 0) {
        tab_1();
    }
    else if (tabPage == 1) {
        tab_2();
    }
    else if (tabPage == 2) {
        tab_3();
    }
    else if (tabPage == 3) {
        tab_4();
    }
    else {
        tab_5();
    }

    function tab_1() {
        var dataVar = "";
        var isInput = false;
        $("#alarmTab_table_1 tbody tr").each(function () {
            $(this).find("td").each(function () {
                if ($(this).find("input").attr("type") == "text") {
                    alert("请输入人员姓名!");
                    isInput = true;
                    return false;
                }
                dataVar += $(this).text() + ",";
            });
            dataVar = dataVar.substring(0, dataVar.length - 1);
            dataVar += ";";
        });
        if (isInput) {
            return;
        }
        dataVar = dataVar.substring(0, dataVar.length - 1);
        var _url = service + "/ResetAlarmTab";
        var _data = "tabName=Administrator&&data=" + dataVar;
        function _successf(data) {
            var resultJs = $(data).children("string").text();
            if (resultJs == "true") {
                alert("保存成功！");
            }
            else {
            }
        }
        JQajaxo("post", _url, false, _data, _successf);
    }

    function tab_2() {
        var dataVar = "";
        var isInput = false;
        $("#alarmTab_table_2 tbody tr").each(function (i) {
            $(this).find("td").each(function () {
                if ($(this).find("input").attr("type") == "text") {
                    alert("请输入人员姓名!");
                    isInput = true;
                    return false;
                }
                dataVar += i + 1 + "," + $(this).text() + "," + groupEquip[i];
            });
            dataVar += ";";
        })
        dataVar = dataVar.substring(0, dataVar.length - 1);
        if (isInput) {
            return;
        }

        var _url = service + "/ResetAlarmTab";
        var _data = "data=" + dataVar + "&&tabName=EquipGroup";
        function _successf(data) {
            var resultJs = $(data).children("string").text();
            if (resultJs == "true") {
                alert("保存成功！");
            }
            else {
            }
        }
        JQajaxo("post", _url, false, _data, _successf);
    }

    function tab_3() {
        var dataVar = "";
        $("#alarmTab_table_3 tbody tr").each(function () {
            $(this).find("td").each(function (i) {
                if (i == 0) {
                    dataVar += $(this).text() + ",";
                }
                else {
                    for (var j = 0; j < groupName.length; j++) {
                        if ($(this).text() == groupName[j]) {
                            dataVar += j + 1 + ";";
                            break;
                        }
                    }
                }
            });
        });
        dataVar = dataVar.substring(0, dataVar.length - 1);
        var _url = service + "/ResetAlarmTab";
        var _data = "data=" + dataVar + "&&tabName=AlmReport";
        function _successf(data) {
            var resultJs = $(data).children("string").text();
            if (resultJs == "true") {
                alert("保存成功！");
            }
            else {
            }
        }
        JQajaxo("post", _url, false, _data, _successf);
    }

    function tab_4() {
        var dataVar = "";
        $("#alarmTab_table_4 tbody tr").each(function () {
            $(this).find("td").each(function (i) {
                if (i == 1) {
                    for (var j = 0; j < weeks.length; j++) {
                        if ($(this).text() == weeks[j]) {
                            dataVar += j + ",";
                            break;
                        }
                    }
                }
                else {
                    dataVar += $(this).text() + ",";
                }
            });
            dataVar = dataVar.substring(0, dataVar.length - 1);
            dataVar += ";";
        });
        dataVar = dataVar.substring(0, dataVar.length - 1);
        var _url = service + "/ResetAlarmTab";
        var _data = "data=" + dataVar + "&&tabName=WeekAlmReport";
        function _successf(data) {
            var resultJs = $(data).children("string").text();
            if (resultJs == "true") {
                alert("保存成功！");
            }
            else {
            }
        }
        JQajaxo("post", _url, false, _data, _successf);
    }

    function tab_5() {
        var dataVar = "";
        $("#alarmTab_table_5 tbody tr").each(function () {
            $(this).find("td").each(function () {
                dataVar += $(this).text() + ",";
            });
            dataVar = dataVar.substring(0, dataVar.length - 1);
            dataVar += ";";
        });
        dataVar = dataVar.substring(0, dataVar.length - 1);
        var _url = service + "/ResetAlarmTab";
        var _data = "data=" + dataVar + "&&tabName=SpeAlmReport";
        function _successf(data) {
            var resultJs = $(data).children("string").text();
            if (resultJs == "true") {
                alert("保存成功！");
            }
            else {
            }
        }
        JQajaxo("post", _url, false, _data, _successf);
    }
}

//select选中时发生
function selectCheng(data) {
    if (tabPage == 2) {
        mous[0] = false;
    }
    else if (tabPage == 3) {
        mous[1] = false;
    }
    else {
        mous[2] = false;
    }
    censeClick(data);
}

//执行去编辑状态
function goEdit() {
    if (tabPage == 0) {
        $("#alarmTab_table_1 tbody tr td").each(function () {
            if ($(this).find("input").attr("type") == "text") {
                $(this).html($(this).find("input").val());
            }
        })
    }
    else if (tabPage == 2) {
        $("#alarmTab_table_3 tbody tr td").each(function () {
            if ($(this).find("select").hasClass("select")) {
                $(this).html($(this).find("select").find("option:selected").text());
            }
        })
    }
    else if (tabPage == 3) {
        $("#alarmTab_table_4 tbody tr td").each(function () {
            if ($(this).find("select").hasClass("select")) {
                $(this).html($(this).find("select").find("option:selected").text());
            }
            if ($(this).find("input").attr("type") == "text") {
                $(this).html($(this).find("input").val());
            }
        })
    }
    else {
        $("#alarmTab_table_5 tbody tr td").each(function () {
            if ($(this).find("select").hasClass("select")) {
                $(this).html($(this).find("select").find("option:selected").text());
            }
            if ($(this).find("input").attr("type") == "text") {
                $(this).html($(this).find("input").val());
            }
        })
    }

}

//去除编辑状态
function censeClick(data) {
    if (tabPage == 0) {
        tab_1();
    }
    else if (tabPage == 1) {
        tab_2();
    }
    else {
        tabRest();
    }

    function tab_1() {
        if (!data.contains(event.toElement)) {
            userAdmin = new Array();
            $("#alarmTab_table_1 tbody tr").each(function (i) {
                $(this).find("td").each(function (j) {
                    if (j == 0) {
                        if ($(this).find("input").attr("type") == "text") {
                            userAdmin[i] = $(this).find("input").val();
                        }
                        else {
                            userAdmin[i] = $(this).text();
                        }
                    }
                    if ($(this).find("input").attr("type") == "text") {
                        $(this).html($(this).find("input").val());
                    }
                })
            })
        }
    }

    function tab_2() {
        if (!data.contains(event.toElement)) {
            $("#alarmTab_table_2 tbody tr").each(function (i) {
                if ($(this).find("td").find("input").attr("type") == "text" && $(this).find("td").find("input").val() != "") {
                    var texts = $(this).find("td").find("input").val();
                    groupName[i] = texts;
                    $(this).find("td").html(texts);
                    $("#b_1").html(texts);

                    var equipcombs = groupEquip[i].slice(1);
                    equipcombs = equipcombs.substring(0, equipcombs.length - 1);
                    var equipcombt = equipcombs.split('#');
                    for (j = 0; j < equipcombt.length; j++) {
                        for (k = 0; k < confValue.length; k++) {
                            if (equipcombt[j] == confValue[k]) {
                                document.getElementById("checkConf_" + confValue[k].toString() + "").checked = true;
                                break;
                            }
                        }
                    }
                }
            })
        }
    }

    function tabRest() {
        if (!data.contains(event.toElement)) {
            if (mous) {
                return;
            }
            goEdit();
        }
    }
}

//弹出删除对话框
function DeleteDialog(data) {
    var newDiv = document.createElement("div");
    newDiv.className = "fullScreenPopup";
    newDiv.id = "fullScreenPopup_Delete";
    var newContainer = "<div class='fullScreenAll' onclick='onFullScreenAll(this)'></div><div class='fullScreenCenter bounceInDown animated mg-xs' style='" + $("html").attr("style") + "'>";
    newContainer += "<div class='MessageBox_top'><span>提示</span><button class='MessageBox_top_Exit btns-style-6' onclick='onCencel(\"" + newDiv.id + "\")'><i class='iconfont icon-guanbi'></i></button></div>";
    newContainer += "<p class='MessageBox_p1'>确定删除所选行吗？</p>";
    newContainer += "<p class='MessageBox_p3'><button class='btn btns-style-1' onclick='onDeleteCommand(\"" + data + "\",\"" + newDiv.id + "\")'>确定</button><button  class='btn btns-style-1' onclick='onCencel(\"" + newDiv.id + "\")'>取消</button></p>";
    newContainer += "</div>";
    newDiv.innerHTML = newContainer;
    document.body.appendChild(newDiv);
}
function onDeleteCommand(data, dt) {
    if (data == 0) {
        tab_1();
    }
    else if (data == 1) {
        tab_2();
    }
    else if (data == 2) {
        tab_3();
    }
    else if (data == 3) {
        tab_4();
    }
    else if (data == 4) {
        tab_5();
    }
    else {
        return;
    }

    function tab_1() {
        $("#alarmTab_table_1 tbody tr").each(function (i) {
            if ($(this).hasClass("active")) {
                $(this).remove();
                deleteState[0] = true;
                $("#btn_Delete").attr("disabled", deleteState[0]);

                var useradmins = "";
                for (var j = 0; j < userAdmin.length; j++) {
                    if (j != i) {
                        useradmins += userAdmin[j] + ",";
                    }
                }
                useradmins = useradmins.substring(0, useradmins.length - 1);
                var useradmint = useradmins.split(',');
                userAdmin.length = 0;
                userAdmin = useradmint;
                return false;
            }
        })

    }

    function tab_2() {
        $("#alarmTab_table_2 tbody tr").each(function (i) {
            if ($(this).hasClass("active")) {

                $(this).remove();
                deleteState[1] = true;
                $("#btn_Delete").attr("disabled", deleteState[1]);
                var groupNa = new Array("", "");
                for (var j = 0; j < groupName.length; j++) {
                    if (j != i) {
                        groupNa[0] += groupName[j] + ",";
                        groupNa[1] += groupEquip[j] + ",";
                    }
                }
                groupNa[0] = groupNa[0].substring(0, groupNa[0].length - 1);
                groupNa[1] = groupNa[1].substring(0, groupNa[1].length - 1);
                var groupNas = groupNa[0].split(',');
                groupName.length = 0;
                groupName = groupNas;

                var groupNat = groupNa[1].split(',');
                groupEquip = new Array();
                groupEquip = groupNat;
                return false;
            }
        });
    }

    function tab_3() {
        $("#alarmTab_table_3 tbody tr").each(function () {
            if ($(this).hasClass("active")) {
                $(this).remove();
                deleteState[2] = true;
                $("#btn_Delete").attr("disabled", deleteState[2]);
                return false;
            }
        });
    }

    function tab_4() {
        $("#alarmTab_table_4 tbody tr").each(function () {
            if ($(this).hasClass("active")) {
                $(this).remove();
                deleteState[3] = true;
                $("#btn_Delete").attr("disabled", deleteState[3]);
                return false;
            }
        });
    }

    function tab_5() {
        $("#alarmTab_table_5 tbody tr").each(function () {
            if ($(this).hasClass("active")) {
                $(this).remove();
                deleteState[4] = true;
                $("#btn_Delete").attr("disabled", deleteState[4]);
                return false;
            }
        });
    }
    onCencel(dt);
}