//普通任务表
var proName = new Array();

//系统控制表
var xtTable = new Array();
//所有系统控制列表名
var epcTable = new Array();

//设备控制表
var sbTable = new Array();
//SetParm表
var spTable = new Array();

//当前选中任务列表项
var proNameSelect = "";

//是否阻止编辑状态
var mous = new Array(false, false);

//循环列表
var table_cir = new Array();
//执行方式
var execute = new Array("立即开始执行", "整点开始执行", "指定开始时间");
//详细循环列表
var detailed_table = new Array();

var weekx = new Array("Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun");
var weekTable = new Array();

//特殊日期表
var spec_table = new Array();

onloadContent();
function onloadContent() {
    $(".main").attr("value", "5");
    Alldata();
    $('.tableAuto').mCustomScrollbar(scrollbarStyle);
    $('.tree').mCustomScrollbar(scrollbarStyle);
}

//获取所有数据
function Alldata() {
    //------获取普通任务:列表---------
    var _url = service + "/QueryTableData";
    var _data = "tableName=GWProcTimeTList";
    function _success_1(data) {
        var resultJs = $(data).children("string").text();
        jsonToHtml_tab1(resultJs);
    }
    JQajaxo("post", _url, false, _data, _success_1);

    //------获取普通任务:系统控制---------
    var _data2 = "tableName=GWProcTimeSysTable";
    function _success_2(data) {
        var resultJs = $(data).children("string").text();
        jsonToHtml_tab2(resultJs);
    }
    JQajaxo("post", _url, false, _data2, _success_2);

    //------获取普通任务:系统控制（GWExProcCmd）---------
    var _data2_1 = "tableName=GWExProcCmd";
    function _success_2_1(data) {
        var resultJs = $(data).children("string").text();
        jsonToHtml_tab2_1(resultJs);
    }
    JQajaxo("post", _url, false, _data2_1, _success_2_1);

    //-------- 获取SetParm表数据 -----------
    var _data3_1 = "tableName=SetParm";
    function _success_3_1(data) {
        var resultJs = $(data).children("string").text();
        jsonToHtml_tab3_1(resultJs);
    }
    JQajaxo("post", _url, false, _data3_1, _success_3_1);

    //-------- 获取普通任务:设备控制 -----------
    var _data3 = "tableName=GWProcTimeEqpTable";
    function _success_3(data) {
        var resultJs = $(data).children("string").text();
        jsonToHtml_tab3(resultJs);
    }
    JQajaxo("post", _url, false, _data3, _success_3);

    //-------- 获取循环任务 -----------
    table_cirhtml();

    //-------- 获取循环任务(详细表) -----------
    table_cirhtmlx();
}
//-----------------普通任务-------------------------
//列表一==========================
//普通任务列表
function jsonToHtml_tab1(data) {
    proName = new Array();
    $("#alarmTab_table_1 tbody").html("");
    if (data == "]") { return; }
    var usera = JSON.parse(data);
    for (var i = 0; i < usera.length; i++) {
        var userb = usera[i];
        var userc = new Array(userb.TableID, userb.TableName, userb.Comment);
        proName[i] = userc;
        appendRow();
    }
    function appendRow() {
        var newRow = $("<tr onclick='table_1_Click(this)'></tr>");
        for (var j = 1; j < userc.length; j++) {
            newRow.append("<td>" + userc[j] + "</td>");
        }
        $("#alarmTab_table_1 tbody:last").append(newRow);
    }
}

//单击事件
function table_1_Click(data) {
    var tc = $(data);
    var g = 0;
    $(data).find("td").each(function () {
        if ($(this).find("input").attr("type") == "text") {
            g++;
        }
    })
    $("#alarmTab_table_1 tbody tr").each(function (m) {
        if ($(this).hasClass("active")) {
            if (tc.find("td").text() == $(this).find("td").text()) {
                g++;
                $(this).find("td").each(function (i) {
                    if ($(this).find("input").attr("type") != "text") {
                        var texts = $(this).text();
                        $(this).html("<input type=\"text\" class='input' value=\"" + texts + "\"/>");
                        if (i == 0) {
                            $(this).find("input:first").focus();
                        }
                    }
                });
            }
            else {
                $(this).removeClass("active");
            }
        }
        if ($(this).find("td").find("input").attr("type") == "text" && g == 0) {
            var j = 0;
            var proNames = new Array();
            $(this).find("td").each(function (i) {
                if (i == 0) {
                    if ($(this).find("input").val() == "") {
                        j++;
                    }
                }
                if (j == 0) {
                    var texts = $(this).find("input").val();
                    $(this).html(texts);
                    proNames[i + 1] = texts;
                }
            });
            if (proName[m] == null) {
                if (proName[0] == null) {
                    proNames[0] = 0;
                }
                else {
                    proNames[0] = parseInt(proName[m - 1][0]) + 1;
                }
            }
            else {
                proNames[0] = proName[m][0];
            }
            proName[m] = proNames;
        }
    });

    $(data).find("td").each(function (i) {
        if (i == 0) {
            if ($(this).find("input").attr("type") != "text") {
                $("#alarmTab_table_2 tbody").html("");
                $("#alarmTab_table_3 tbody").html("");
                $("#leftTime_b_1").html("");
                $("#leftTime_b_1").html($(this).text());
                $("#leftTime_b_2").html("");
                $("#leftTime_b_2").html($(this).text());
            }

            for (var j = 0; j < proName.length; j++) {
                if (proName[j] == null) { break; }
                if ($(this).text() == proName[j][1]) {
                    proNameSelect = proName[j][0];
                    for (var m = 0; m < xtTable.length; m++) {
                        if (xtTable[m][0] == proName[j][0]) {
                            var newRow = $("<tr onclick='table_2_Click(this)'></tr>");
                            for (var k = 2; k < xtTable[m].length; k++) {
                                newRow.append("<td>" + xtTable[m][k] + "</td>");
                            }
                            $("#alarmTab_table_2 tbody:last").append(newRow);
                        }
                    }
                    for (var m = 0; m < sbTable.length; m++) {
                        if (sbTable[m][0] == proName[j][0]) {
                            var newRow = $("<tr onclick='table_3_Click(this)'></tr>");
                            newRow.append("<td>" + sbTable[m][1] + "</td>");
                            for (var n = 0; n < spTable.length; n++) {
                                if (sbTable[m][3] == spTable[n][0] && sbTable[m][4] == spTable[n][1]) {
                                    newRow.append("<td>" + spTable[n][2] + "</td>");
                                }
                            }
                            newRow.append("<td>" + sbTable[m][2] + "</td>");
                            $("#alarmTab_table_3 tbody:last").append(newRow);
                        }
                    }
                }
            }
        }
    })
    $(data).addClass("active");
    $("#delete_pro_1").attr("disabled", false);
    $("#add_pro_2").attr("disabled", false);
    $("#add_pro_3").attr("disabled", false);
    $("#delete_pro_2").attr("disabled", true);
    $("#delete_pro_3").attr("disabled", true);
}

//添加
function add_pro_1() {
    var newRow = $("<tr onclick='table_1_Click(this)'></tr>");
    newRow.append("<td><input class='input' type=\"text\"/></td>");
    newRow.append("<td><input class='input' type=\"text\"/></td>");
    $("#alarmTab_table_1 tbody:last").append(newRow);
    $("#alarmTab_table_1 tbody:last").find("input:first").focus();
    if (proName.length == 0) {
        proName[0] = null;
    }
    else {
        proName[proName.length] = null;
    }

    $("#alarmTab_table_2 tbody").html("");
    $("#alarmTab_table_3 tbody").html("");
    $("#leftTime_b_1").html("");
    $("#leftTime_b_2").html("");

    $("#delete_pro_1").attr("disabled", false);
    $("#add_pro_2").attr("disabled", false);
    $("#add_pro_3").attr("disabled", false);
    $("#delete_pro_2").attr("disabled", true);
    $("#delete_pro_3").attr("disabled", true);
}

//删除
function delete_pro_1() {
    showDialog(0);
}

//去除编辑状态
function mouseout_pro_1(data) {
    if (!data.contains(event.toElement)) {
        $("#alarmTab_table_1 tbody tr").each(function (k) {
            if ($(this).find("td").find("input").attr("type") == "text") {
                var j = 0;
                var proNames = new Array();
                $(this).find("td").each(function (i) {
                    if (i == 0) {
                        if ($(this).find("input").val() == "") {
                            j++;
                        }
                    }
                    if (j == 0) {
                        var texts = $(this).find("input").val();
                        $(this).html(texts);
                        proNames[i + 1] = texts;
                    }
                });
                if (proName[k] == null) {
                    if (proName[0] == null) {
                        proNames[0] = 0;
                    }
                    else {
                        proNames[0] = parseInt(proName[k - 1][0]) + 1;
                    }
                }
                else {
                    proNames[0] = proName[k][0];
                }
                proName[k] = proNames;
                proNameSelect = proNames[0];
            }
        })

        $("#alarmTab_table_2 tbody").html("");
        $("#alarmTab_table_3 tbody").html("");
        $("#leftTime_b_1").html("");
        $("#leftTime_b_2").html("");

        for (var j = 0; j < proName.length; j++) {
            if (proNameSelect == proName[j][0]) {
                $("#leftTime_b_1").html(proName[j][1]);
                $("#leftTime_b_2").html(proName[j][1]);
                for (var m = 0; m < xtTable.length; m++) {
                    if (xtTable[m][0] == proName[j][0]) {
                        var newRow = $("<tr onclick='table_2_Click(this)'></tr>");
                        for (var k = 2; k < xtTable[m].length; k++) {
                            newRow.append("<td>" + xtTable[m][k] + "</td>");
                        }
                        $("#alarmTab_table_2 tbody:last").append(newRow);
                    }
                }
                for (var m = 0; m < sbTable.length; m++) {
                    if (sbTable[m][0] == proName[j][0]) {
                        var newRow = $("<tr onclick='table_3_Click(this)'></tr>");
                        newRow.append("<td>" + sbTable[m][1] + "</td>");
                        for (var n = 0; n < spTable.length; n++) {
                            if (sbTable[m][3] == spTable[n][0] && sbTable[m][4] == spTable[n][1]) {
                                newRow.append("<td>" + spTable[n][2] + "</td>");
                            }
                        }
                        newRow.append("<td>" + sbTable[m][2] + "</td>");
                        $("#alarmTab_table_3 tbody:last").append(newRow);
                    }
                }
            }
        }
    }
}

//保存
function save_pro() {
    var _url = service + "/ResetAlarmTab";
    var trueNum = 0;
    //普通任务列表
    var datafrom = "";
    for (var i = 0; i < proName.length; i++) {
        for (var j = 0; j < proName[i].length; j++) {
            datafrom += proName[i][j] + ",";
        }
        datafrom = datafrom.substring(0, datafrom.length - 1);
        datafrom += ";";
    }
    datafrom = datafrom.substring(0, datafrom.length - 1);
    var _data = "tabName=GWProcTimeTList&&data=" + datafrom;
    function _success_1(data) {
        var resultJs = $(data).children("string").text();
        if (resultJs == "true") {
            trueNum++;
        }
    }
    JQajaxo("post", _url, false, _data, _success_1);

    //系统控制列表
    var datafrom_xt = "";
    for (var i = 0; i < xtTable.length; i++) {
        for (var j = 0; j < xtTable[i].length; j++) {
            datafrom_xt += xtTable[i][j] + ",";
        }
        datafrom_xt = datafrom_xt.substring(0, datafrom_xt.length - 1);
        datafrom_xt += ";";
    }
    datafrom_xt = datafrom_xt.substring(0, datafrom_xt.length - 1);
    var _data_xt = "tabName=GWProcTimeSysTable&&data=" + datafrom_xt;
    function _success_xt(data) {
        var resultJs = $(data).children("string").text();
        if (resultJs == "true") {
            trueNum++;
        }
    }
    JQajaxo("post", _url, false, _data_xt, _success_xt);

    //设备控制列表
    var datafrom_sb = "";
    for (var i = 0; i < sbTable.length; i++) {
        for (var j = 0; j < sbTable[i].length; j++) {
            datafrom_sb += sbTable[i][j] + ",";
        }
        datafrom_sb = datafrom_sb.substring(0, datafrom_sb.length - 1);
        datafrom_sb += ";";
    }
    datafrom_sb = datafrom_sb.substring(0, datafrom_sb.length - 1);
    var _data_sb = "tabName=GWProcTimeEqpTable&&data=" + datafrom_sb;
    function _success_sb(data) {
        var resultJs = $(data).children("string").text();
        if (resultJs == "true") {
            trueNum++;
        }
    }
    JQajaxo("post", _url, false, _data_sb, _success_sb);
    if (trueNum == 3) {
        alert("保存成功！");
    }
    else if (trueNum == 0) {
        alert("保存失败！");
    }
    else {
        alert("部分保存成功！");
    }
}

//列表二==========================
//系统控制列表
function jsonToHtml_tab2(data) {
    if (data == "]" || data == "false") {
        return;
    }
    var usera = JSON.parse(data);
    for (var i = 0; i < usera.length; i++) {
        var userb = usera[i];
        var users = userb.Time.split(' ');

        var timer = users[1].split(':');
        if (parseInt(timer[0]) < 10) {
            users[1] = "0" + users[1];
        }

        var usert = userb.TimeDur.split(' ');

        var timem = usert[1].split(':');
        if (parseInt(timem[0]) < 10) {
            usert[1] = "0" + usert[1];
        }

        var userc = new Array(userb.TableID, userb.proc_code, users[1], userb.cmd_nm, usert[1]);
        xtTable[i] = userc;
    }
}

function table_2_Click(data) {
    var tc = $(data);
    var g = 0;
    $(data).find("td").each(function () {
        if ($(this).find("input").attr("type") == "text") {
            g++;
        }
    });
    var d = 0;
    $("#alarmTab_table_2 tbody tr").each(function (m) {
        if ($(this).hasClass("active")) {
            if (tc.find("td").text() == $(this).find("td").text()) {
                g++;
                $(this).find("td").each(function (i) {
                    if (i == 1) {
                        if (!$(this).find("select").hasClass("select")) {
                            var texts = $(this).text();
                            var newRow = "<select class='select' onchange='datajs(0)' onmouseout='mouseout_pro_2(this)'>";
                            for (var j = 0; j < epcTable.length; j++) {
                                if (texts == epcTable[j][1]) {
                                    newRow += "<option selected value='" + epcTable[j][1] + "'>" + epcTable[j][1] + "</option>";
                                }
                                else {
                                    newRow += "<option value='" + epcTable[j][1] + "'>" + epcTable[j][1] + "</option>";
                                }
                            }
                            newRow += "</select>";
                            mous[0] = true;
                            $(this).html(newRow);
                        }
                    }
                    else {
                        if ($(this).find("input").attr("type") != "text") {
                            var texts = $(this).text();
                            $(this).html("<input class='input' type=\"text\" value=\"" + texts + "\">");
                        }
                    }
                });
            }
            else {
                $(this).removeClass("active");
            }
        }
        if (($(this).find("input").attr("type") == "text" || $(this).find("select").hasClass("select")) && g == 0) {
            var j = 0;
            var xtTables = new Array();
            $(this).find("td").each(function (i) {
                if (i == 0 || i == 2) {
                    if ($(this).find("input").val() == "") {
                        j++;
                    }
                    var texts = $(this).find("input").val();
                    $(this).html(texts);
                    xtTables[i + 2] = texts;
                }
                else {
                    var texts = $(this).find("select").find("option:selected").text();
                    $(this).html(texts);
                    xtTables[i + 2] = texts;
                }
            });
            for (var k = 0; k < xtTable.length; k++) {
                if (xtTable[k][0] == proNameSelect) {
                    if (d == m) {
                        xtTables[0] = xtTable[k][0];
                        xtTables[1] = xtTable[k][1];
                        xtTable[k] = xtTables;
                        break;
                    }
                    d++;
                    if (xtTable)
                        if (xtTable[xtTable.length - 1][2] == null) {
                            xtTables[0] = xtTable[k][0];
                            xtTables[1] = xtTable[k][1];
                            xtTable[xtTable.length - 1] = xtTables;
                            break;
                        }
                }
            }

        }
    });
    $(data).addClass("active");
    $("#delete_pro_2").attr("disabled", false);
}

//获取所有系统控制列表名
function jsonToHtml_tab2_1(data) {
    if (data == "]") { return; }
    var usera = JSON.parse(data);
    for (var i = 0; i < usera.length; i++) {
        var userb = usera[i];
        var userc = new Array(userb.proc_code, userb.cmd_nm);
        epcTable[i] = userc;
    }
}

//添加
function add_pro_2() {
    var datatime = new Date();
    var dget = datatime.toString().split(' ');
    var dgets = "";
    for (var i = 0; i < dget.length; i++) {
        if (dget[i].indexOf(':') > 0) {
            dgets = dget[i];
        }
    }
    var newRow = $("<tr onclick='table_2_Click(this)'></tr>");
    newRow.append("<td><input class='input' value='" + dgets + "' type=\"text\"/></td>");
    newRow.append("<td></td>");
    newRow.append("<td><input class='input' value='00:00:04' type=\"text\"/></td>");
    $("#alarmTab_table_2 tbody:last").append(newRow);
    if (xtTable[0] == null) {
        xtTable = new Array();
        xtTable[0] = new Array();
        xtTable[0][0] = proNameSelect;
        xtTable[0][1] = epcTable[0][0];
    }
    else {
        xtTable[xtTable.length] = new Array();
        xtTable[xtTable.length - 1][0] = proNameSelect;
        xtTable[xtTable.length - 1][1] = epcTable[0][0];
    }
}

//删除
function delete_pro_2() {
    showDialog(1);
}

//去除编辑状态
function mouseout_pro_2(data) {
    if (!data.contains(event.toElement)) {
        if (!mous[0]) {
            datajs();
        }
    }
}

function datajs() {
    js_1();
    js_2();

    function js_1() {
        d = 0;
        $("#alarmTab_table_2 tbody tr").each(function (m) {
            if ($(this).find("td").find("input").attr("type") == "text" || $(this).find("select").hasClass("select")) {
                var j = 0;
                var xtTables = new Array();
                $(this).find("td").each(function (i) {
                    if (i == 0 || i == 2) {
                        if ($(this).find("input").val() == "") {
                            j++;
                        }
                        var texts = $(this).find("input").val();
                        $(this).html(texts);
                        xtTables[i + 2] = texts;
                    }
                    else {
                        var texts = $(this).find("select").find("option:selected").text();
                        $(this).html(texts);
                        xtTables[i + 2] = texts;
                    }
                });
                for (var k = 0; k < xtTable.length; k++) {
                    if (xtTable[k][0] == proNameSelect) {
                        if (d == m) {
                            xtTables[0] = xtTable[k][0];
                            xtTables[1] = xtTable[k][1];
                            xtTable[k] = xtTables;
                            break;
                        }
                        d++;
                        if (xtTable[xtTable.length - 1][2] == null) {
                            xtTables[0] = xtTable[k][0];
                            xtTables[1] = xtTable[k][1];
                            xtTable[xtTable.length - 1] = xtTables;
                            break;
                        }
                    }
                }
            }
        })
    }
    function js_2() {
        d = 0;
        $("#alarmTab_table_3 tbody tr").each(function (m) {
            if ($(this).find("td").find("input").attr("type") == "text" || $(this).find("select").hasClass("select")) {
                var sbTables = new Array();
                j = 1;
                $(this).find("td").each(function (i) {
                    if (i == 1) {
                        var texts = $(this).find("select").find("option:selected").text();
                        $(this).html(texts);
                        for (var s = 0; s < spTable.length; s++) {
                            if (texts == spTable[s][2]) {
                                sbTables[3] = spTable[s][0];
                                sbTables[4] = spTable[s][1];
                            }
                        }
                    }
                    else {
                        var texts = $(this).find("input").val();
                        $(this).html(texts);
                        sbTables[j++] = texts;
                    }
                });
                for (var k = 0; k < sbTable.length; k++) {
                    if (sbTable[k][0] == proNameSelect) {
                        if (d == m) {
                            sbTables[0] = sbTable[k][0];
                            sbTable[k] = sbTables;
                            break;
                        }
                        d++;
                        if (sbTable[sbTable.length - 1][2] == null) {
                            sbTables[0] = sbTable[k][0];
                            sbTables[1] = sbTable[k][1];
                            sbTable[sbTable.length - 1] = sbTables;
                            break;
                        }
                    }
                }
            }
        })
    }
}

//列表三==========================
//设备控制列表
function jsonToHtml_tab3(data) {
    if (data == "]" || data == "false") {
        return;
    }
    var usera = JSON.parse(data);
    for (var i = 0; i < usera.length; i++) {
        var userb = usera[i];
        var users = userb.Time.split(' ');

        var timer = users[1].split(':');
        if (parseInt(timer[0]) < 10) {
            users[1] = "0" + users[1];
        }

        var usert = userb.TimeDur.split(' ');

        var timem = usert[1].split(':');
        if (parseInt(timem[0]) < 10) {
            usert[1] = "0" + usert[1];
        }

        var userc = new Array(userb.TableID, users[1], usert[1], userb.equip_no, userb.set_no);
        sbTable[i] = userc;
    }
}

function table_3_Click(data) {
    var tc = $(data);
    var g = 0;
    $(data).find("td").each(function () {
        if ($(this).find("input").attr("type") == "text") {
            g++;
        }
    });
    var d = 0;
    $("#alarmTab_table_3 tbody tr").each(function (m) {
        if ($(this).hasClass("active")) {
            if (tc.find("td").text() == $(this).find("td").text()) {
                g++;
                $(this).find("td").each(function (i) {
                    if (i == 1) {
                        if (!$(this).find("select").hasClass("select")) {
                            var texts = $(this).text();
                            var newRow = "<select class='select' onchange='datajs(1)' onmouseout='mouseout_pro_3(this)'>";
                            for (var j = 0; j < spTable.length; j++) {
                                if (texts == spTable[j][2]) {
                                    newRow += "<option selected value='" + spTable[j][2] + "'>" + spTable[j][2] + "</option>";
                                }
                                else {
                                    newRow += "<option value='" + spTable[j][2] + "'>" + spTable[j][2] + "</option>";
                                }
                            }
                            newRow += "</select>";
                            mous[1] = true;
                            $(this).html(newRow);
                        }
                    }
                    else {
                        if ($(this).find("input").attr("type") != "text") {
                            var texts = $(this).text();
                            $(this).html("<input class='input' type=\"text\" value=\"" + texts + "\"/>");
                        }
                    }
                });
            }
            else {
                $(this).removeClass("active");
            }
        }
        if (($(this).find("input").attr("type") == "text" || $(this).find("select").hasClass("select")) && g == 0) {
            var sbTables = new Array();
            j = 1;
            $(this).find("td").each(function (i) {
                if (i == 1) {
                    var texts = $(this).find("select").find("option:selected").text();
                    $(this).html(texts);
                    for (var s = 0; s < spTable.length; s++) {
                        if (texts == spTable[s][2]) {
                            sbTables[3] = spTable[s][0];
                            sbTables[4] = spTable[s][1];
                        }
                    }
                }
                else {
                    if ($(this).find("input").val() != "") {
                        var texts = $(this).find("input").val();
                        $(this).html(texts);
                        sbTables[j++] = texts;
                    }
                }
            });
            for (var k = 0; k < sbTable.length; k++) {
                if (sbTable[k][0] == proNameSelect) {
                    if (d == m) {
                        sbTables[0] = sbTable[k][0];
                        sbTable[k] = sbTables;
                        break;
                    }
                    d++;
                    if (sbTable[sbTable.length - 1][2] == null) {
                        sbTables[0] = sbTable[k][0];
                        sbTables[1] = sbTable[k][1];
                        sbTable[sbTable.length - 1] = sbTables;
                        break;
                    }
                }
            }

        }
    });
    $(data).addClass("active");
    $("#delete_pro_3").attr("disabled", false);
}

//select单击事件
function table_uli(data) {
    var tables = $(data).parents().parents();
    $(tables).find("ul li").each(function () {
        if ($(this).hasClass("dropdownulib")) {
            $(this).removeClass("dropdownulib");
        }
    })
    $(data).addClass("dropdownulib");
    tables.find("button").find("b").html($(data).text());
}

//SetParm表
function jsonToHtml_tab3_1(data) {
    var usera = JSON.parse(data);
    for (var i = 0; i < usera.length; i++) {
        var userb = usera[i];
        var userc = new Array(userb.equip_no, userb.set_no, userb.set_nm, userb.set_type);
        spTable[i] = userc;
    }
}

//添加
function add_pro_3() {
    var datatime = new Date();
    var dget = datatime.toString().split(' ');
    var dgets = "";
    for (var i = 0; i < dget.length; i++) {
        if (dget[i].indexOf(':') > 0) {
            dgets = dget[i];
        }
    }
    var newRow = $("<tr onclick='table_3_Click(this)'></tr>");
    newRow.append("<td><input class='input' value='" + dgets + "' type=\"text\"/></td>");
    newRow.append("<td></td>");
    newRow.append("<td><input class='input' value='00:00:04' type=\"text\"/></td>");
    $("#alarmTab_table_3 tbody:last").append(newRow);
    sbTable[sbTable.length] = new Array();
    sbTable[sbTable.length - 1][0] = proNameSelect;
}

//删除
function delete_pro_3() {
    showDialog(2);
}

//去除编辑状态
function mouseout_pro_3(data) {
    if (!data.contains(event.toElement)) {
        if (!data.contains(event.toElement)) {
            if (!mous[1]) {
                datajs();
            }
        }
    }
}

//-----------------循环任务-------------------------
//循环任务列表
function jsonToHtml_cir(data) {
    if (data == "]") { return; }
    table_cir = new Array();
    $("#cir_table tbody").html("");
    var usera = JSON.parse(data);
    for (var i = 0; i < usera.length; i++) {
        var userb = usera[i];

        var timebe = userb.BeginTime.toString().split(' ');
        var timebes = timebe[1].split(':');
        if (parseInt(timebes[0]) < 10) {
            timebe[1] = "0" + timebe[1];
        }

        var timece = userb.EndTime.toString().split(' ');
        var timebces = timece[1].split(':');
        if (parseInt(timebces[0]) < 10) {
            timece[1] = "0" + timece[1];
        }

        var timede = userb.ZhidingTime.toString().split(' ');
        var timedes = timede[1].split(':');
        if (parseInt(timedes[0]) < 10) {
            timede[1] = "0" + timede[1];
        }

        var userc = new Array(userb.TableID, userb.TableName, timebe[1], timece[1], userb.ZhenDianDo, userb.ZhidingDo, userb.CycleMustFinish, timede[1], userb.MaxCycleNum);
        table_cir[i] = userc;
        appendRow();
    }
    function appendRow() {
        var newRow = $("<tr onclick='table_cir_Click(this)'></tr>");
        for (var j = 1; j < 4; j++) {
            newRow.append("<td>" + userc[j] + "</td>");
        }

        var zDo = userc[4] + "," + userc[5];
        if (zDo == "0,0") {
            newRow.append("<td>" + execute[0] + "</td>");
        }
        else if (zDo == "1,0") {
            newRow.append("<td>" + execute[1] + "</td>");
        }
        else {
            newRow.append("<td>" + execute[2] + "：" + userc[7] + "</td>");
        }

        if (userc[6] == "0") {
            newRow.append("<td>否</td>");
        }
        else {
            newRow.append("<td>是</td>");
        }

        if (userc[8] == "0") {
            newRow.append("<td>不受限制</td>");
        }
        else {
            newRow.append("<td>" + userc[8] + "</td>");
        }

        $("#cir_table tbody:last").append(newRow);
    }
}

//循环任务列表(详细列表)
function detailed_jsonTodata(data) {
    if (data == "]") { return; }
    detailed_table = new Array();
    var usera = JSON.parse(data);
    for (var i = 0; i < usera.length; i++) {
        var userb = usera[i];
        var userc = new Array(userb.TableID, userb.DoOrder, userb.Type, userb.equip_no, userb.set_no, userb.value, userb.proc_code, userb.cmd_nm, userb.SleepTime, userb.SleepUnit);
        detailed_table[i] = userc;
    }
}

function table_cir_Click(data) {
    $("#cir_table tbody tr").each(function () {
        if ($(this).hasClass("active") && $(data) != $(this)) {
            $(this).removeClass("active");
        }
    })
    $(data).addClass("active");
    $("#delete_cir").attr("disabled", false);
    $("#change_cir").attr("disabled", false);
}

//添加
function add_cir() {
    showDialog_cir(null);
}

//删除
function delete_cir() {
    showDialog(3);
}

//更改
function change_cir() {
    $("#cir_table tbody tr").each(function (i) {
        if ($(this).hasClass("active")) {
            showDialog_cir(table_cir[i][0]);
            return false;
        }
    })
}

//弹出对话框(更改循环定时任务)
function showDialog_cir(data) {
    var newDiv = document.createElement("div");
    newDiv.className = "fullScreenPopup";
    newDiv.id = "fullScreenPopup_Change";
    document.body.appendChild(newDiv);
    $(".fullScreenPopup").load("/Views/plug/Loop_task.html", function () {
        $(".fullScreenCenter").attr("style", "top:10%;" + window.localStorage.bgd);
        var dctl = new Array("", "00:00:00", "23:59:59", "00:00:00", 0, 0, false, false);
        if (data == null) {
            $("#content_cir").html("");
        }
        else {
            //获取数据
            var dataCTList = new Array();
            for (var i = 0; i < table_cir.length; i++) {
                if (data == table_cir[i][0]) {
                    dataCTList = table_cir[i];
                }
            }
            var zDo = dataCTList[4] + "," + dataCTList[5];
            var zDoi = 0;
            if (zDo == "0,0") {
                zDoi = 0;
            }
            else if (zDo == "1,0") {
                zDoi = 1;
            }
            else {
                zDoi = 2;
            }

            var cirNumber = false;
            if (dataCTList[8] != "0") {
                cirNumber = true;
            }

            var cirexe = false;
            if (dataCTList[6] != "0") {
                cirexe = true;
            }

            dctl[0] = dataCTList[1];//循环任务名称
            dctl[1] = dataCTList[2];//有效起始时间
            dctl[2] = dataCTList[3];//有效结束时间
            dctl[3] = dataCTList[7];//指定时间
            dctl[4] = dataCTList[8];//限制最大循环次数
            dctl[5] = zDoi;//执行方式
            dctl[6] = cirNumber;//是否限制最大循环次数
            dctl[7] = cirexe;//是否必须执行完整

            data_detai(data);
        }
        $("#text_NameCir").val(dctl[0]);
        $("#text_timerCira").val(dctl[1]);
        $("#text_timerCirb").val(dctl[2]);
        $("#text_timerCirc").val(dctl[3]);
        if (dctl[5] == 0) {
            document.getElementById("radio_1").checked = true;
        }
        else if (dctl[5] == 1) {
            document.getElementById("radio_2").checked = true;
        }
        else {
            document.getElementById("radio_3").checked = true;
        }
        if (!dctl[6]) {
            document.getElementById("checkbox_1").checked = false;
            $("#text_timerCird").val(0);
            $("#text_timerCird").attr("disabled", true);
        }
        else {
            document.getElementById("checkbox_1").checked = true;
            $("#text_timerCird").val(dctl[4]);
            $("#text_timerCird").attr("disabled", false);
        }
        document.getElementById("checkbox_2").checked = dctl[7];

        $("#dropdown_ul_1").html();
        var html_select_1 = "<option selected>" + spTable[0][2] + "</option>";
        for (var j = 1; j < spTable.length; j++) {
            html_select_1 += "<option>" + spTable[j][2] + "</option>";
        }
        $("#dropdown_ul_1").html(html_select_1);

        $("#dropdown_ul_2").html();
        var html_select_2 = "<option selected>" + epcTable[0][1] + "</option>";
        for (var j = 1; j < epcTable.length; j++) {
            html_select_2 += "<option>" + epcTable[j][1] + "</option>";
        }
        $("#dropdown_ul_2").html(html_select_2);
        $('#btnModalSave').unbind("click");
        $("#btnModalSave").bind("click", function () { onbtnsave2(data, newDiv.id) });
        $('.procsContent-timed').mCustomScrollbar(scrollbarStyle);
    });    
}
//关闭对话框（添加、修改）
function onbtnsave2(data, dt) {
    if ($("#text_NameCir").val() == "") {
        alert("任务名称不能为空！");
        return;
    }
    var index = null;
    if (data == null) {
        table_cir[table_cir.length] = new Array();
        index = table_cir.length - 1;
        if (table_cir[table_cir.length - 2] == null) {
            table_cir[index][0] = 1;
        }
        else {
            table_cir[index][0] = parseInt(table_cir[table_cir.length - 2][0]) + 1;
        }
    }
    else {
        for (var i = 0; i < table_cir.length; i++) {
            if (data == table_cir[i][0]) {
                index = i;
                break;
            }
        }
    }
    table_cir[index][1] = $("#text_NameCir").val();
    table_cir[index][2] = $("#text_timerCira").val();
    table_cir[index][3] = $("#text_timerCirb").val();

    if (document.getElementById("radio_1").checked) {
        table_cir[index][4] = 0;
        table_cir[index][5] = 0;
    }
    else if (document.getElementById("radio_2").checked) {
        table_cir[index][4] = 1;
        table_cir[index][5] = 0;
    }
    else {
        table_cir[index][4] = 0;
        table_cir[index][5] = 1;
    }

    if (document.getElementById("checkbox_2").checked) {
        table_cir[index][6] = 1;
    }
    else {
        table_cir[index][6] = 0;
    }

    table_cir[index][7] = $("#text_timerCirc").val();
    table_cir[index][8] = $("#text_timerCird").val();

    var actType = null;
    var dataRow = "";
    if (data == null) {
        actType = 0;
        for (var i = 0; i < table_cir[index].length; i++) {
            dataRow += table_cir[index][i] + ",";
        }
        dataRow = dataRow.substring(0, dataRow.length - 1);
    }
    else {
        actType = 2;
        dataRow += table_cir[index][0] + "|";
        var dataNma = new Array("", "TableName='" + table_cir[index][1] + "'", "BeginTime=#" + table_cir[index][2] + "#", "EndTime=#" + table_cir[index][3] + "#", "ZhenDianDo=" + table_cir[index][4], "ZhidingDo=" + table_cir[index][5], "CycleMustFinish=" + table_cir[index][6], "ZhidingTime=#" + table_cir[index][7] + "#", "MaxCycleNum=" + table_cir[index][8]);
        for (var i = 1; i < table_cir[index].length; i++) {
            dataRow += dataNma[i] + ",";
        }
        dataRow = dataRow.substring(0, dataRow.length - 1);
    }
    var _url = service + "/CommGWProcCycle";
    var _data = "tableName=GWProcCycleTList&&actType=" + actType + "&&data=" + dataRow;
    function success(data) {
        var resultJs = $(data).children("string").text();
        if (resultJs != "true") {
        }
    }
    JQajaxo("post", _url, false, _data, success);

    var _data_d = "tableName=GWProcCycleTable&&actType=1&&data=" + table_cir[index][0];
    function success_d(data) {
        var resultJs = $(data).children("string").text();
        if (resultJs != "true") {
        }
    }
    JQajaxo("post", _url, false, _data_d, success_d);

    updateContent_cir(table_cir[index][0]);//修改、添加循环列表（详细表）
    table_cirhtml();
    onCencel(dt);
}

//-------- 获取循环任务表 -----------
function table_cirhtml() {
    var _url_cir = service + "/QueryTableData";
    var _data_cir = "tableName=GWProcCycleTList";
    function success_cir(data) {
        var resultJs = $(data).children("string").text();
        jsonToHtml_cir(resultJs);
    }
    JQajaxo("post", _url_cir, false, _data_cir, success_cir);
}

//-------- 获取循环任务(详细表) -----------
function table_cirhtmlx() {
    var _url = service + "/QueryTableData";
    var _data_detai = "tableName=GWProcCycleTable";
    function success_detai(data) {
        var resultJs = $(data).children("string").text();
        detailed_jsonTodata(resultJs);
    }
    JQajaxo("post", _url, false, _data_detai, success_detai);
}

function updateContent_cir(data) {
    var contentData = new Array();
    var dataRow = "";
    $("#content_cir li").each(function (i) {
        contentData[i] = $(this).text();
    })
    var dataAct = new Array();
    for (var i = 0; i < contentData.length; i++) {
        dataAct[i] = new Array();
        dataAct[i][0] = data;
        dataAct[i][1] = i + 1;

        var da = contentData[i].split('：');
        if (da[0] == "设备控制") {
            dataAct[i][2] = "E";
            var db = da[1].split('，');
            for (var j = 0; j < spTable.length; j++) {
                if (db[0] == spTable[j][2]) {
                    dataAct[i][3] = spTable[j][0];
                    dataAct[i][4] = spTable[j][1];
                    if (da[2] != null) {
                        dataAct[i][5] = da[2];
                    }
                    else {
                        dataAct[i][5] = "";
                    }
                    dataAct[i][6] = null;
                    dataAct[i][7] = null;
                    dataAct[i][8] = null;
                    dataAct[i][9] = null;
                }
            }
        }
        else if (da[0] == "系统控制") {
            dataAct[i][2] = "S";
            for (var j = 0; j < epcTable.length; j++) {
                if (da[1] == epcTable[j][1]) {
                    dataAct[i][6] = epcTable[j][0];
                    dataAct[i][7] = epcTable[j][1];
                }
            }
            dataAct[i][3] = null;
            dataAct[i][4] = null;
            dataAct[i][5] = "";
            dataAct[i][8] = null;
            dataAct[i][9] = null;
        }
        else {
            dataAct[i][2] = "T";
            var dba = da[1].split(' ');
            dataAct[i][8] = dba[0];
            if (dba[1] == "小时") {
                dataAct[i][9] = "H";
            }
            else if (dba[1] == "分钟") {
                dataAct[i][9] = "M";
            }
            else {
                dataAct[i][9] = "S";
            }
            dataAct[i][3] = null;
            dataAct[i][4] = null;
            dataAct[i][5] = "";
            dataAct[i][6] = null;
            dataAct[i][7] = null;
        }
        for (var j = 0; j < dataAct[i].length; j++) {
            dataRow += dataAct[i][j] + ",";
        }
        dataRow = dataRow.substring(0, dataRow.length - 1);
        dataRow += ";";
    }
    dataRow = dataRow.substring(0, dataRow.length - 1);
    var _url = service + "/CommGWProcCycle";
    var _data = "tableName=GWProcCycleTable&&actType=0&&data=" + dataRow;
    function success(datas) {
        var resultJs = $(datas).children("string").text();
        if (resultJs != "true") {
        }
    }
    JQajaxo("post", _url, false, _data, success);

    table_cirhtmlx();
}

//单击获得焦点
function input_click(data) {
    var dats = $(data).val();
    $(data).val("").focus().val(dats);
}

//执行次序（立即、整点、指定）
function onExecuteChange(dt) {
    if (dt == 0) {
        $("#text_timerCirc").attr("disabled", true);
    }
    else {
        $("#text_timerCirc").attr("disabled", false);
    }
}

//限制最大循环次数
function lable_click(data) {
    document.getElementById("radio_" + data).checked = true;
    if (data == 3) {
        $("#text_timerCirc").attr("disabled", false);
    }
    else {
        $("#text_timerCirc").attr("disabled", true);
    }
    input_click(document.getElementById("radio_" + data));
}

function checkbox1_click(data) {
    if (data == 0) {
        if (document.getElementById("checkbox_1").checked) {
            $("#text_timerCird").attr("disabled", false);
        }
        else {
            $("#text_timerCird").attr("disabled", true);
        }
    }
    else {
        if (document.getElementById("checkbox_1").checked) {
            document.getElementById("checkbox_1").checked = false;
            $("#text_timerCird").attr("disabled", true);
        }
        else {
            document.getElementById("checkbox_1").checked = true;
            $("#text_timerCird").attr("disabled", false);
        }
    }
    input_click(document.getElementById("checkbox_1"));
}

//是否必须执行完整
function checkbox2_click() {
    if (document.getElementById("checkbox_2").checked) {
        document.getElementById("checkbox_2").checked = false;
    }
    else {
        document.getElementById("checkbox_2").checked = true;
    }
    input_click(document.getElementById("checkbox_2"));
}

//一个循环周期表
function data_detai(data) {
    if (data == null) {
        return;
    }
    $("#content_cir").html("");
    var detais = new Array();
    for (var i = 0, j = 0; i < detailed_table.length; i++) {
        if (detailed_table[i][0] == data) {
            detais[j++] = detailed_table[i];
        }
    }
    for (var i = 0; i < detais.length; i++) {
        for (var j = 0; j < detais.length; j++) {
            if (detais[j][1] == i + 1) {
                var newRow = $("<li onclick='table_detai_Click(this)'></li>");
                var text = "";

                if (detais[j][2] == "E") {
                    text += "设备控制：";
                    for (var k = 0; k < spTable.length; k++) {
                        if (spTable[k][0] == detais[j][3] && spTable[k][1] == detais[j][4]) {
                            text += spTable[k][2];
                            if (spTable[k][3] == "V") {
                                text += "，设置值：" + detais[j][5];
                            }
                        }
                    }
                }
                else if (detais[j][2] == "S") {
                    text += "系统控制：" + detais[j][7];
                }
                else {
                    text += "时间间隔：" + detais[j][8];
                    if (detais[j][9] == "S") {
                        text += " 秒";
                    }
                    else if (detais[j][9] == "M") {
                        text += " 分";
                    }
                    else {
                        text += " 小时";
                    }
                }

                newRow.append(text);
                $("#content_cir:last").append(newRow);
                break;
            }
        }
    }
}

//单击列表
function table_detai_Click(data) {
    $("#content_cir li").each(function () {
        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
        }
    })
    $(data).addClass("active");
    $("#btn_cir_dm_1").attr("disabled", false);
    $("#btn_cir_dm_2").attr("disabled", false);
    $("#btn_cir_dm_3").attr("disabled", false);

    input_click($("#btn_cir_dm_1"));
}

//三个按钮（删除1，上移2，下移3）
function cir_dlb(data, datas) {
    input_click(datas);
    if (data == 1) {
        $("#content_cir li").each(function (i) {
            if ($(this).hasClass("active")) {
                $(this).remove();
            }
        });
    }
    else if (data == 2) {
        var conttr = null;
        $("#content_cir li").each(function (i) {
            if (i != 0) {
                if ($(this).hasClass("active")) {
                    var cont = conttr.html();
                    conttr.html($(this).html());
                    conttr.addClass("active");
                    $(this).html(cont);
                    $(this).removeClass("active");
                }
            }
            conttr = $(this);
        });
    }
    else {
        var conttr = null;
        var im = new Array();
        $("#content_cir li").each(function (i) {
            im[i] = $(this);
        });
        for (var i = 0; i < im.length; i++) {
            if (im[i].hasClass("active") && i != im.length - 1) {
                var imr = im[i + 1].html();
                im[i + 1].html(im[i].html());
                im[i + 1].addClass("active");
                im[i].html(imr);
                im[i].removeClass("active");
                return;
            }
        }
    }
}

//设备控制、系统任务的列表
function dropdownLi(data_1, data_2) {
    $("#dropdown_ul_" + data_2 + " li").each(function () {
        if ($(this).hasClass("dropdownulib")) {
            $(this).removeClass("dropdownulib");
        }
    })
    $(data_1).addClass("dropdownulib");
    $("#btn_select_" + data_2).find("b").html($(data_1).text());
    if ($(data_1).text() == "普通空调1 温度设置" || $(data_1).text() == "普通空调2 温度设置") {
        var html_temeper = "<span style='margin-left:20px'>设置值：<span><input id='text_temperSet' type='text' style='width:80px;' value='21' onclick='input_click(this)' onkeyup=\"value=value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5\@\.]/g,'')\"/>";
        $("#temperSet").html(html_temeper);
    }
    else {
        $("#temperSet").html("");
    }
}

//任务动作类型 单选
function inputRadio_t(data, datas) {
    if (data == 0) {
        $("#dropdown_ul_1").attr("disabled", false);
        $("#dropdown_ul_2").attr("disabled", true);
        $("#text_time_1").attr("disabled", true);
        $("#text_time_2").attr("disabled", true);
        $("#text_time_3").attr("disabled", true);
        $("#text_time_4").attr("disabled", true);
    }
    else if (data == 1) {
        $("#dropdown_ul_1").attr("disabled", true);
        $("#dropdown_ul_2").attr("disabled", false);
        $("#text_time_1").attr("disabled", true);
        $("#text_time_2").attr("disabled", true);
        $("#text_time_3").attr("disabled", true);
        $("#text_time_4").attr("disabled", true);
    }
    else {
        $("#dropdown_ul_1").attr("disabled", true);
        $("#dropdown_ul_2").attr("disabled", true);
        $("#text_time_1").attr("disabled", false);
        $("#text_time_2").attr("disabled", false);
        $("#text_time_3").attr("disabled", false);
        $("#text_time_4").attr("disabled", false);
    }
}

//任务动作类型 单选(单击文字效果)
function lable_t(data) {
    document.getElementById("radio_t" + data).checked = true;
    var datas = data - 1;
    inputRadio_t(datas, document.getElementById("radio_t" + data));
}

//插入任务
function insert_btn(datad) {
    var html_th = "";
    input_click(datad);
    if (document.getElementById("radio_t1").checked) {
        html_th = "<li onclick='table_detai_Click(this)'>设备控制：" + $("#dropdown_ul_1 option:selected").text() + "</li>";
    }
    else if (document.getElementById("radio_t2").checked) {
        html_th = "<li onclick='table_detai_Click(this)'>系统控制：" + $("#dropdown_ul_2 option:selected").text() + "</li>";
    }
    else {
        var text_s = new Array();
        var text_t = "";
        if ($("#text_time_1").val() != "") {
            text_s[0] = $("#text_time_1").val();
            text_t = "天";
        }
        if ($("#text_time_2").val() != "") {
            text_s[1] = $("#text_time_2").val();
            text_t = "小时";
        }
        if ($("#text_time_3").val() != "") {
            text_s[2] = $("#text_time_3").val();
            text_t = "分钟";
        }
        if ($("#text_time_4").val() != "") {
            text_s[3] = $("#text_time_4").val();
            text_t = "秒";
        }
        var timer = 0;
        if (text_t == "天") {
            timer = text_s[0] * 24 + " 小时";
        }
        else if (text_t == "小时") {
            if (text_s[0] == null) {
                timer = text_s[1] + " 小时";
            }
            else {
                timer = parseInt(text_s[0]) * 24 + parseInt(text_s[1]) + " 小时";
            }
        }
        else if (text_t == "分钟") {
            var date = 0;
            if (text_s[0] != null) {
                date = parseInt(text_s[0]) * 24 * 60;
            }
            var hour = 0;
            if (text_s[1] != null) {
                hour = parseInt(text_s[1]) * 60;
            }
            timer = parseInt(text_s[2]) + date + hour + " 分钟";
        }
        else {
            var date = 0;
            if (text_s[0] != null) {
                date = parseInt(text_s[0]) * 24 * 60 * 60;
            }
            var hour = 0;
            if (text_s[1] != null) {
                hour = parseInt(text_s[1]) * 60 * 60;
            }
            var mintie = 0;
            if (text_s[2] != null) {
                mintie = parseInt(text_s[2]) * 60;
            }
            timer = parseInt(text_s[3]) + date + hour + mintie + " 秒";
        }

        if (timer != "") {
            html_th = "<li onclick='table_detai_Click(this)'><td>时间间隔：" + timer + "</li>";
        }
    }
    if (html_th != "") {
        $("#content_cir:last").append(html_th);
    }
}

//-----------------每周任务安排-------------------------
//初始化每周安排表
function initWeek() {
    weekTable = new Array();
    htmlWeekTable();
    for (var k = 0; k < weekx.length; k++) {
        var checka = new Array();
        var checkb = new Array();
        var weektablesp;
        if (weekTable != "]" && weekTable != "" && weekTable != null) {
            weektablesp = weekTable[k].split('+');
            for (var m = 0, n = 0, p = 0; m < weektablesp.length; m++) {
                if (weektablesp[m][0] == "T") {
                    weektablesp[m] = weektablesp[m].substr(1);
                    checka[n++] = weektablesp[m];
                }
                else {
                    weektablesp[m] = weektablesp[m].substr(1);
                    checkb[p++] = weektablesp[m];
                }
            }
        }
        $("#ttk_ul_" + weekx[k] + " tbody").html("");
        var newRow = "";
        for (var i = 0; i < proName.length; i++) {
            var ched = false;
            for (var j = 0; j < checka.length; j++) {
                if (checka[j] == proName[i][0]) {
                    newRow += "<tr><td><input type='checkbox' checked='checked' id='checkWeek_" + weekx[k] + "_a_" + proName[i][0] + "'/><lable onclick='week_lable(\"" + weekx[k] + "\",\"a\"," + proName[i][0] + ")' value='" + proName[i][0] + "'>" + proName[i][1] + "</lable></td></tr>";
                    ched = true;
                    break;
                }
            }
            if (!ched) {
                newRow += "<tr><td><input type='checkbox' id='checkWeek_" + weekx[k] + "_a_" + proName[i][0] + "'/><lable onclick='week_lable(\"" + weekx[k] + "\",\"a\"," + proName[i][0] + ")' value='" + proName[i][0] + "'>" + proName[i][1] + "</lable></td></tr>";
            }
        }
        $("#ttk_ul_" + weekx[k] + " tbody").append(newRow);

        //$("#ttk_ul_" + weekx[k] + "_b").html("");
        newRow = "";
        for (var i = 0; i < table_cir.length; i++) {
            var ched = false;
            for (var j = 0; j < checkb.length; j++) {
                if (checkb[j] == table_cir[i][0]) {
                    newRow += "<tr><td><input type='checkbox' checked='checked' id='checkWeek_" + weekx[k] + "_b_" + table_cir[i][0] + "'/><lable onclick='week_lable(\"" + weekx[k] + "\",\"b\"," + table_cir[i][0] + ")' value='" + table_cir[i][0] + "'>" + table_cir[i][1] + "</lable></td></tr>";
                    ched = true;
                    break;
                }
            }
            if (!ched) {
                newRow += "<tr><td><input type='checkbox' id='checkWeek_" + weekx[k] + "_b_" + table_cir[i][0] + "'/><lable onclick='week_lable(\"" + weekx[k] + "\",\"b\"," + table_cir[i][0] + ")' value='" + table_cir[i][0] + "'>" + table_cir[i][1] + "</lable></td></tr>";
            }
        }
        $("#ttk_ul_" + weekx[k] + " tbody").append(newRow);
    }

}

//获取每周任务安排表
function htmlWeekTable() {
    var _url = service + "/QueryTableData";
    var _data = "tableName=GWProcWeekTable";
    function succe(data) {
        var resultJs = $(data).children("string").text();
        if (resultJs == "]") { return; }
        var usera = JSON.parse(resultJs);
        var userb = new Array(usera[0].Mon, usera[0].Tues, usera[0].Wed, usera[0].Thurs, usera[0].Fri, usera[0].Sat, usera[0].Sun);
        weekTable = userb;
    }
    JQajaxo("post", _url, false, _data, succe);
}

//单击选中
function week_lable(data1, data2, data3) {
    var idx = "checkWeek_" + data1 + "_" + data2 + "_" + data3;
    if (document.getElementById(idx).checked) {
        document.getElementById(idx).checked = false;
    }
    else {
        document.getElementById(idx).checked = true;
    }
}

//保存
function save_ttsk() {
    var datavar = new Array();
    for (var i = 0; i < weekx.length; i++) {
        datavar[i] = "";
        $("#ttk_ul_" + weekx[i] + " tbody").find("tr").each(function (j) {
            var labletext = $(this).find("td").find("lable").attr("value");
            if (document.getElementById("checkWeek_" + weekx[i] + "_a_" + j)) {
                if (document.getElementById("checkWeek_" + weekx[i] + "_a_" + j).checked) {
                    for (var k = 0; k < proName.length; k++) {
                        if (labletext == proName[k][0]) {
                            datavar[i] += "T" + proName[k][0] + "+";
                            break;
                        }
                    }
                }
            }
        })

        $("#ttk_ul_" + weekx[i] + " tbody").find("tr").each(function (j) {
            var labletext = $(this).find("td").find("lable").attr("value");
            if (document.getElementById("checkWeek_" + weekx[i] + "_b_" + j)) {
                if (document.getElementById("checkWeek_" + weekx[i] + "_b_" + j).checked) {
                    for (var k = 0; k < table_cir.length; k++) {
                        if (labletext == table_cir[k][0]) {
                            datavar[i] += "C" + table_cir[k][0] + "+";
                            break;
                        }
                    }
                }
            }
        })
        datavar[i] = datavar[i].substring(0, datavar[i].length - 1);
    }
    var datafrom = "";
    for (var i = 0; i < datavar.length; i++) {
        datafrom += datavar[i] + ",";
    }
    datafrom = datafrom.substring(0, datafrom.length - 1);
    var _url = service + "/ResetAlarmTab";
    var _data = "tabName=GWProcWeekTable&&data=" + datafrom;
    function _success(data) {
        var resultJs = $(data).children("string").text();
        if (resultJs == "true") {
            alert("保存成功！");
        }
    }
    JQajaxo("post", _url, false, _data, _success);
}

//-----------------特殊日期任务安排---------------------
//获取特殊日期表数据
function specFordata() {
    var _url = service + "/QueryTableData";
    var _data = "tableName=GWProcSpecTable";
    function succe(data) {
        var resultJs = $(data).children("string").text();
        dataForHtml_spec(resultJs);
    }
    JQajaxo("post", _url, false, _data, succe);


    $("#spec_ul tbody").html("");
    var newRow = "";
    for (var i = 0; i < proName.length; i++) {
        newRow += "<tr><td><input type='checkbox' id='checkSpec_a_" + proName[i][0] + "'/><lable onclick='checkSpecClick(" + proName[i][0] + ",\"a\")' value='" + proName[i][0] + "'>" + proName[i][1] + "</lable></td></tr>";
    }
    $("#spec_ul tbody").append(newRow);

    newRow = "";
    for (var i = 0; i < table_cir.length; i++) {
        newRow += "<tr><td><input type='checkbox' id='checkSpec_b_" + table_cir[i][0] + "'/><lable onclick='checkSpecClick(" + table_cir[i][0] + ",\"b\")' value='" + table_cir[i][0] + "'>" + table_cir[i][1] + "</lable></td></tr>";
    }
    $("#spec_ul tbody").append(newRow);
}

//将数据转为html
function dataForHtml_spec(data) {
    if (data == "]") { return; }
    spec_table = new Array();
    $("#spec_table tbody").html("");
    var usera = JSON.parse(data);
    for (var i = 0; i < usera.length; i++) {
        var userb = usera[i];
        var userc = new Array(userb.DateName, userb.BeginDate.split(' ')[0], userb.EndDate.split(' ')[0], userb.TableID);
        spec_table[i] = new Array();
        spec_table[i] = userc;
        addHtml();
    }
    function addHtml() {
        var newRow = $("<tr onclick='spec_table_click(this," + i + ")'></tr>");
        for (var j = 0; j < userc.length - 1; j++) {
            newRow.append("<td>" + userc[j] + "</td>");
        }
        $("#spec_table tbody").append(newRow);
    }
}

//单击列表
function spec_table_click(data, data2) {
    $("#delete_speced").attr("disabled", false);
    var tc = $(data);
    var g = 0;
    $(data).find("td").each(function () {
        if ($(this).find("input").attr("type") == "text") {
            g++;
        }
    });

    $("#spec_table tbody tr").each(function () {
        if ($(this).hasClass("active")) {
            if (tc.find("td").text() == $(this).find("td").text()) {
                g++;
                $(this).find("td").each(function (i) {
                    if ($(this).find("input").attr("type") != "text") {
                        var texts = $(this).text();
                        $(this).html("<input class='input' id='datetimepicker_" + i + "' type=\"text\" value=\"" + texts + "\")\"/>");
                    }
                })
            }
            else {
                $(this).removeClass("active");
            }
        }
        if ($(this).find("input").attr("type") == "text" && g == 0) {
            var tableData = new Array();
            $(this).find("td").each(function (i) {
                if (i == 0) {
                    if ($(this).find("input").val() == "") {
                        return false;
                    }
                }
                var texts = $(this).find("input").val();
                $(this).html(texts);
                tableData[i] = texts;
            });
            tableData[3] = spec_table[data2][3];
            spec_table[data2] = new Array();
            spec_table[data2] = tableData;
        }
    });
    $('#datetimepicker_1').datepicker({ changeMonth: true, changeYear: true });
    $('#datetimepicker_2').datepicker({ changeMonth: true, changeYear: true });
    $("#spec_ul tbody tr").each(function (i) {
        if (document.getElementById("checkSpec_a_" + i)) {
            if (document.getElementById("checkSpec_a_" + i).checked) {
                document.getElementById("checkSpec_a_" + i).checked = false;
            }
        }
    })

    $("#spec_ul tbody tr").each(function (i) {
        if (document.getElementById("checkSpec_b_" + i)) {
            if (document.getElementById("checkSpec_b_" + i).checked) {
                document.getElementById("checkSpec_b_" + i).checked = false;
            }
        }
    })

    $(data).addClass("active");
    if (spec_table[data2][3] == null) {
        return;
    }
    var spec_tabid = spec_table[data2][3];
    var spec_tabida = spec_tabid.split('+');
    var specta = new Array();
    var spectb = new Array();
    for (var i = 0, m = 0, n = 0; i < spec_tabida.length; i++) {
        if (spec_tabida[i][0] == "T") {
            var spec_tabidb = spec_tabida[i].substr(1);
            for (var j = 0; j < proName.length; j++) {
                if (spec_tabidb == proName[j][0]) {
                    specta[m++] = proName[j][0];
                    break;
                }
            }
        }
        else {
            var spec_tabidb = spec_tabida[i].substr(1);
            for (var j = 0; j < table_cir.length; j++) {
                if (spec_tabidb == table_cir[j][0]) {
                    spectb[n++] = table_cir[j][0];
                    break;
                }
            }
        }
    }
    $("#spec_ul tbody tr").each(function (i) {
        for (var j = 0; j < specta.length; j++) {
            if ($(this).find("lable").attr("value") == specta[j]) {
                if (document.getElementById("checkSpec_a_" + i)) {
                    document.getElementById("checkSpec_a_" + i).checked = true;
                    break;
                }
            }
        }
    })

    $("#spec_ul tbody tr").each(function (i) {
        for (var j = 0; j < spectb.length; j++) {
            if ($(this).find("lable").attr("value") == spectb[j]) {
                if (document.getElementById("checkSpec_b_" + i)) {
                    document.getElementById("checkSpec_b_" + i).checked = true;
                    break;
                }
            }
        }
    })
}

//单击选中
function checkSpecClick(data1, data2) {
    if (document.getElementById("checkSpec_" + data2 + "_" + data1).checked) {
        document.getElementById("checkSpec_" + data2 + "_" + data1).checked = false;
    }
    else {
        document.getElementById("checkSpec_" + data2 + "_" + data1).checked = true;
    }
}

//离开多选框时
function checkOnmouse(data) {
    if (!data.contains(event.toElement)) {
        var _index = null;
        $("#spec_table tbody tr").each(function (i) {
            if ($(this).hasClass("active")) {
                _index = i;
                return false;
            }
        })
        if (_index == null) {
            return;
        }
        spec_table[_index][3] = "";
        $("#spec_ul tbody tr").each(function (i) {
            if (document.getElementById("checkSpec_a_" + i)) {
                if (document.getElementById("checkSpec_a_" + i).checked) {
                    for (var j = 0; j < proName.length; j++) {
                        if ($(this).find("lable").attr("value") == proName[j][0]) {
                            spec_table[_index][3] += "T" + proName[j][0] + "+";
                            break;
                        }
                    }
                }
            }
        })

        $("#spec_ul tbody tr").each(function (i) {
            if (document.getElementById("checkSpec_b_" + i)) {
                if (document.getElementById("checkSpec_b_" + i).checked) {
                    for (var j = 0; j < table_cir.length; j++) {
                        if ($(this).find("lable").attr("value") == table_cir[j][0]) {
                            spec_table[_index][3] += "C" + table_cir[j][0] + "+";
                            break;
                        }
                    }
                }
            }
        })
        spec_table[_index][3] = spec_table[_index][3].substring(0, spec_table[_index][3].length - 1);
    }
}

//去除编辑状态
function datajs_spec() {
    $("#spec_table tbody tr").each(function (i) {
        if ($(this).find("input").attr("type") == "text") {
            var tableData = new Array();
            $(this).find("td").each(function (j) {
                var texts = $(this).find("input").val();
                $(this).html(texts);
                tableData[j] = texts;
            })
            tableData[3] = spec_table[i][3];
            spec_table[i] = new Array();
            spec_table[i] = tableData;
            $(this).addClass("active");
        }
    })
}

//添加
function add_spec() {
    var newRow = $("<tr onclick='spec_table_click(this," + spec_table.length + ")'></tr>");
    newRow.append("<td><input type='text' class='input')\"/></td>");
    for (var i = 1; i < 3; i++) {
        newRow.append("<td><input type='text' id='datetimepicker_" + i + "' class='input')\"/></td>");
    }
    $("#spec_table tbody:last").append(newRow);
    $("#datetimepicker_1").attr("value", datetimefun());
    $("#datetimepicker_2").attr("value", datetimefun());
    spec_table[spec_table.length] = new Array();
}

//当前时间
function datetimefun() {
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
    //if (getHourVar < 10) {
    //    getHourVar = "0" + getHourVar.toString();
    //}
    //if (getMinuteVar < 10) {
    //    getMinuteVar = "0" + getMinuteVar.toString();
    //}
    var NowDateTimeVar = localeData.getFullYear() + "/" + getMonthVar + "/" + getDateVar;
    //var NowDateTimeVar_d = NowDateTimeVar + " 00:00";
    //var NowDateTimeVar_h = NowDateTimeVar + " " + getHourVar + ":" + getMinuteVar;
    return NowDateTimeVar;
}

//删除
function delete_spec() {
    showDialog(4);
}

//保存
function save_spec() {
    var datafrom = "";
    for (var i = 0; i < spec_table.length; i++) {
        for (var j = 0; j < spec_table[i].length; j++) {
            datafrom += spec_table[i][j] + ",";
        }
        datafrom = datafrom.substring(0, datafrom.length - 1);
        datafrom += ";";
    }
    datafrom = datafrom.substring(0, datafrom.length - 1);
    var _url = service + "/ResetAlarmTab";
    var _data = "tabName=GWProcSpecTable&&data=" + datafrom;
    function _success(data) {
        var resultJs = $(data).children("string").text();
        if (resultJs == "true") {
            alert("保存成功！");
        }
    }
    JQajaxo("post", _url, false, _data, _success);
}

//弹出对话框(是否删除)
function showDialog(data) {
    var newDiv = document.createElement("div");
    newDiv.className = "fullScreenPopup";
    newDiv.id = "fullScreenPopup_Delete";
    var newContainer = "<div class='fullScreenAll' onclick='onFullScreenAll(this)'></div><div class='fullScreenCenter bounceInDown animated mg-xs' style='" + $("html").attr("style") + "'>";
    newContainer += "<div class='MessageBox_top'><span>提示</span><button class='MessageBox_top_Exit btns-style-6' onclick='onCencel(\"" + newDiv.id + "\")'><i class='iconfont icon-guanbi'></i></button></div>";
    newContainer += "<p class='MessageBox_p1'>确定删除所选行吗？</p>";
    newContainer += "<p class='MessageBox_p3'><button class='btn btns-style-1' onclick='onbtnsave(" + data + ",\"" + newDiv.id + "\")'>确定</button><button  class='btn btns-style-1' onclick='onCencel(\"" + newDiv.id + "\")'>取消</button></p>";
    newContainer += "</div>";
    newDiv.innerHTML = newContainer;
    document.body.appendChild(newDiv);
}
function onbtnsave(data, dt) {
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
    else if (data == 5) {
        tab_6();
    }

    function tab_1() {
        var proNames = null;
        $("#alarmTab_table_1 tbody").find("tr").each(function (i) {
            if ($(this).hasClass("active")) {
                if (proName[i] != null) {
                    proNames = proName[i][0];
                    proName.splice(i, 1);
                }
                $(this).remove();
                return false;
            }
        });
        for (var i = 0; i < xtTable.length; i++) {
            if (xtTable[i][0] == proNames && proNames != null) {
                xtTable.splice(i, 1);
            }
        }
        for (var i = 0; i < sbTable.length; i++) {
            if (sbTable[i][0] == proNames && proNames != null) {
                sbTable.splice(i, 1);
            }
        }
        $("#alarmTab_table_2 tbody").html("");
        $("#alarmTab_table_3 tbody").html("");
        $("#leftTime_b_1").html("");
        $("#leftTime_b_2").html("");

        $("#delete_pro_1").attr("disabled", true);
        $("#add_pro_2").attr("disabled", true);
        $("#add_pro_3").attr("disabled", true);
        $("#delete_pro_2").attr("disabled", true);
        $("#delete_pro_3").attr("disabled", true);
    }

    function tab_2() {
        d = 0;
        $("#alarmTab_table_2 tbody").find("tr").each(function (i) {
            if ($(this).hasClass("active")) {
                for (var k = 0; k < xtTable.length; k++) {
                    if (xtTable[k][0] == proNameSelect && xtTable[k] != null) {
                        if (d == i) {
                            xtTable.splice(k, 1);
                            break;
                        }
                        d++;
                    }
                }

                $(this).remove();
                return false;
            }
        })
    }

    function tab_3() {
        d = 0;
        $("#alarmTab_table_3 tbody").find("tr").each(function (i) {
            if ($(this).hasClass("active")) {
                for (var k = 0; k < sbTable.length; k++) {
                    if (sbTable[k][0] == proNameSelect && sbTable[k] != null) {
                        if (d == i) {
                            sbTable.splice(k, 1);
                            break;
                        }
                        d++;
                    }
                }

                $(this).remove();
                return false;
            }
        })
    }

    function tab_4() {
        var tableId = null;
        $("#cir_table tbody").find("tr").each(function (i) {
            if ($(this).hasClass("active")) {
                for (var j = 0; j < table_cir.length; j++) {
                    if (i == j) {
                        tableId = table_cir[j][0];
                    }
                }
                $(this).remove();
                return false;
            }
        })
        var _url = service + "/CommGWProcCycle";
        var _data = "tableName=GWProcCycleTList&&actType=1&&data=" + tableId;
        function success(data) {
            var resultJs = $(data).children("string").text();
            if (resultJs != "true") {
            }
        }
        JQajaxo("post", _url, false, _data, success);

        table_cirhtml();
    }

    function tab_5() {
        $("#spec_table tbody tr").each(function (i) {
            if ($(this).hasClass("active")) {
                spec_table.splice(i, 1);
                $("#spec_table tbody").html("");
                for (var k = 0; k < spec_table.length; k++) {
                    var newRow = $("<tr onclick='spec_table_click(this," + k + ")'></tr>");
                    for (var j = 0; j < spec_table[k].length - 1; j++) {
                        newRow.append("<td>" + spec_table[k][j] + "</td>");
                    }
                    $("#spec_table tbody").append(newRow);
                }
                return false;
            }
        })
    }

    function tab_6() {
        resettingClick(1);
    }
    onCencel(dt);
}