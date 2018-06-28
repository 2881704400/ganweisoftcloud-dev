//Equip表数据
var equipTable = new Array();
//SetParm表数据
var SetParmTable = new Array();
//ycp表数据
var ycpTable = new Array();
//yxp表数据
var yxpTable = new Array();
//AutoProc表数据
var autoTable = new Array();
//触发类型
var detonate = new Array("状态量报警", "状态量恢复", "模拟量越线", "模拟量恢复", "设备通讯故障", "设备通讯恢复", "设备状态故障", "设备状态恢复");
var mous = false;
//当前选择标号
var selectSet = 0;

onloadContent();
function onloadContent() {
    $(".main").attr("value", "6");
    allData();
    $('.tableAuto').mCustomScrollbar(scrollbarStyle); 
    $('.equip-cj-1-list').mCustomScrollbar(scrollbarStyle)
}

//初始化数据
function allData() {
    var _url = service + "/QueryMultiTable";
    var _dataAll = "tableNames=Equip,SetParm,ycp,yxp,AutoProc";
    var tableAllvars = new Array();
    function successAll(data) {
        $(data).children("ArrayOfString").find("string").each(function (i) {
            tableAllvars[i] = $(this).text();
        })
        jsonEquipTable(tableAllvars[0]);
        jsonSetParmTable(tableAllvars[1]);
        jsonYcpTable(tableAllvars[2]);
        jsonYxpTable(tableAllvars[3]);
        jsonToHtml_tab1(tableAllvars[4]);
    }
    JQajaxo("post", _url, false, _dataAll, successAll);
}

//------------------联动设置------------------------
//Equip表数据获取
function jsonEquipTable(data) {
    equipTable = new Array();
    if (data == "]") { return; }
    var usera = JSON.parse(data);
    for (var i = 0; i < usera.length; i++) {
        var userb = usera[i];
        var userc = new Array(userb.equip_no, userb.equip_nm, userb.equip_detail, userb.communication_drv);
        equipTable[i] = userc;
    }
}

//SetParm表数据获取
function jsonSetParmTable(data) {
    SetParmTable = new Array();
    if (data == "]") { return; }
    var usera = JSON.parse(data);
    for (var i = 0; i < usera.length; i++) {
        var userb = usera[i];
        var userc = new Array(userb.equip_no, userb.set_no, userb.set_nm, userb.set_type, userb.value);
        SetParmTable[i] = userc;
    }
}

//ycp表数据获取
function jsonYcpTable(data) {
    ycpTable = new Array();
    if (data == "]") { return; }
    var usera = JSON.parse(data);
    for (var i = 0; i < usera.length; i++) {
        var userb = usera[i];
        var userc = new Array(userb.equip_no, userb.yc_no, userb.yc_nm);
        ycpTable[i] = userc;
    }
}

//yxp表数据获取
function jsonYxpTable(data) {
    yxpTable = new Array();
    if (data == "]") { return; }
    var usera = JSON.parse(data);
    for (var i = 0; i < usera.length; i++) {
        var userb = usera[i];
        var userc = new Array(userb.equip_no, userb.yx_no, userb.yx_nm);
        yxpTable[i] = userc;
    }
}

//数据写入html
function jsonToHtml_tab1(data) {
    autoTable = new Array();
    if (data == "]") { return; }
    $("#equip_table_1 tbody").html("");
    var usera = JSON.parse(data);
    for (var i = 0; i < usera.length; i++) {
        var userb = usera[i];
        var userc = new Array(userb.iequip_no, userb.iycyx_no, userb.iycyx_type, userb.delay, userb.oequip_no, userb.oset_no, userb.value, userb.ProcDesc, userb.Enable);
        autoTable[i] = userc;
        appendRow();
    }
    function appendRow() {
        var newRow;
        if (userc[8] == "1") {
            newRow = $("<tr></tr>");
            newRow.append("<td><input id='check_equip_" + userc[0] + "' onclick='check_click_eq(" + userc[0] + ")' type='checkbox' checked='checked'/></td>");
        }
        else {
            newRow = $("<tr style='color:#929292'></tr>");
            newRow.append("<td><input id='check_equip_" + userc[0] + "' onclick='check_click_eq(" + userc[0] + ")' type='checkbox'/></td>");
        }

        for (var j = 0; j < equipTable.length; j++) {
            if (equipTable[j][0] == userc[0]) {
                newRow.append("<td onclick='click_tabletd(this,0)'>" + equipTable[j][1] + "</td>");
                break;
            }
        }
        if (userc[2] == "X" || userc[2] == "x") {
            if (userc[2] == "X") {
                newRow.append("<td onclick='click_tabletd(this,1)'>" + detonate[0] + "</td>");
            }
            else {
                newRow.append("<td onclick='click_tabletd(this,1)'>" + detonate[1] + "</td>");
            }
            for (var j = 0; j < yxpTable.length; j++) {
                if (userc[0] == yxpTable[j][0]) {
                    if (userc[1] == yxpTable[j][1]) {
                        newRow.append("<td onclick='click_tabletd(this,2)'>" + yxpTable[j][2] + "</td>");
                        break;
                    }
                }
            }
        }
        else if (userc[2] == "C" || userc[2] == "c") {
            if (userc[2] == "C") {
                newRow.append("<td onclick='click_tabletd(this,1)'>" + detonate[2] + "</td>");
            }
            else {
                newRow.append("<td onclick='click_tabletd(this,1)'>" + detonate[3] + "</td>");
            }
            for (var j = 0; j < ycpTable.length; j++) {
                if (userc[0] == ycpTable[j][0] && userc[1] == ycpTable[j][1]) {
                    newRow.append("<td onclick='click_tabletd(this,2)'>" + ycpTable[j][2] + "</td>");
                    break;
                }
            }
        }
        else {
            var numbs = 4;
            if (userc[2] == "E") {
                numbs = 4;
            }
            else if (userc[2] == "e") {
                numbs = 5;
            }
            else if (userc[2] == "S") {
                numbs = 6;
            }
            else if (userc[2] == "s") {
                numbs = 7;
            }
            newRow.append("<td onclick='click_tabletd(this,1)'>" + detonate[numbs] + "</td>");
            newRow.append("<td onclick='click_tabletd(this,2)'>无</td>");
        }

        newRow.append("<td onclick='click_tabletd(this,3)'>" + userc[3] + "</td>");

        for (var j = 0; j < equipTable.length; j++) {
            if (userc[4] == equipTable[j][0]) {
                newRow.append("<td onclick='click_tabletd(this,4)'>" + equipTable[j][1] + "</td>");
                break;
            }
        }

        for (var j = 0; j < SetParmTable.length; j++) {
            if (userc[4] == SetParmTable[j][0] && userc[5] == SetParmTable[j][1]) {
                newRow.append("<td onclick='click_tabletd(this,5)'>" + SetParmTable[j][2] + "</td>");
            }
        }

        if (userc[6] == null || userc[6] == "") {
            newRow.append("<td onclick='click_tabletd(this,6)'></td>");
        }
        else {
            newRow.append("<td onclick='click_tabletd(this,6)'>" + userc[6] + "</td>");
        }

        if (userc[7] == null || userc[7] == "") {
            newRow.append("<td onclick='click_tabletd(this,7)'></td>");
        }
        else {
            newRow.append("<td onclick='click_tabletd(this,7)'>" + userc[7] + "</td>");
        }

        $("#equip_table_1 tbody:last").append(newRow);
    }
}

//使能事件
function check_click_eq(data) {
    var num = null;
    for (var i = 0; i < autoTable.length; i++) {
        if (data == autoTable[i][0]) {
            num = i;
        }
    }
    var ceqp = $("#check_equip_" + data).parent().parent();
    if (document.getElementById("check_equip_" + data).checked) {
        autoTable[num][8] = 1;
        ceqp.css("color", "#333");
    }
    else {
        ceqp.css("color", "#fff");
        autoTable[num][8] = 0;
    }
}

//单击事件
function click_tabletd(data1, data2) {
    var thisRow = 0;
    $("#equip_table_1 tbody tr").each(function (i) {
        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
        }
        $(this).find("td").each(function (j) {
            if ($(this).html() != $(data1).html()) {
                if (j != 0 && j != 4 && j != 7 && j != 8) {
                    if ($(this).find("select").hasClass("select")) {
                        var values = $(this).find("select").find("option:selected").attr("value");
                        $(this).html($(this).find("select").find("option:selected").text());
                        if (j == 1) {
                            autoTable[i][0] = values;
                        }
                        else if (j == 2) {
                            autoTable[i][2] = values;
                        }
                        else if (j == 3) {
                            autoTable[i][1] = values;
                        }
                        else if (j == 5) {
                            autoTable[i][4] = values;
                        }
                        else {
                            autoTable[i][5] = values;
                        }
                    }
                }
                if (j == 4 || j == 7 || j == 8) {
                    if ($(this).find("input").attr("type") == "text") {
                        var texts = $(this).find("input").val();
                        $(this).html(texts);
                        if (j == 4) {
                            autoTable[i][3] = texts;
                        }
                        else if (j == 7) {
                            autoTable[i][6] = texts;

                        }
                        else {
                            autoTable[i][7] = texts;
                        }
                    }
                }
            }
        })
        if ($(this).html() == $(data1).parent().html()) {
            thisRow = i;
        }
    })

    if (data2 == 0) {
        if (!$(data1).find("select").hasClass("select")) {
            var newRow = "<select class='select' onchange='selectCheng(this)' onmouseout='mouseout_equip_1(this)'>";
            for (var j = 0; j < equipTable.length; j++) {
                if (equipTable[j][0] == autoTable[thisRow][0]) {
                    newRow += "<option selected value='" + equipTable[j][0] + "'>" + equipTable[j][1] + "</option>";
                }
                else {
                    newRow += "<option value='" + equipTable[j][0] + "'>" + equipTable[j][1] + "</option>";
                }
            }
            newRow += "</select>";
            $(data1).html(newRow);
            mous = true;
        }

    }
    else if (data2 == 1) {
        if (!$(data1).find("select").hasClass("select")) {
            var newRow = "<select class='select' onchange='selectCheng(this)'>";
            var zs = false;
            for (var k = 0; k < ycpTable.length; k++) {
                if (autoTable[thisRow][0] == ycpTable[k][0]) {
                    zs = true;
                }
            }
            var zt = false;
            for (var k = 0; k < yxpTable.length; k++) {
                if (autoTable[thisRow][0] == yxpTable[k][0]) {
                    zt = true;
                }
            }
            if (zs) {
                if (detonate[2] == $(data1).text()) {
                    newRow += "<option selected value='C'>" + detonate[2] + "</option>";
                }
                else {
                    newRow += "<option value='C'>" + detonate[2] + "</option>";
                }
                if (detonate[3] == $(data1).text()) {
                    newRow += "<option selected value='c'>" + detonate[3] + "</option>";
                }
                else {
                    newRow += "<option value='c'>" + detonate[3] + "</option>";
                }
            }
            if (zt) {
                if (detonate[0] == $(data1).text()) {
                    newRow += "<option selected value='X'>" + detonate[0] + "</option>";
                }
                else {
                    newRow += "<option value='X'>" + detonate[0] + "</option>";
                }
                if (detonate[1] == $(data1).text()) {
                    newRow += "<option selected value='x'>" + detonate[1] + "</option>";
                }
                else {
                    newRow += "<option value='x'>" + detonate[1] + "</option>";
                }
            }
            for (var j = 4; j < detonate.length; j++) {
                if (j == 4) {
                    val = "E";
                }
                else if (j == 5) {
                    val = "e";
                }
                else if (j == 6) {
                    val = "S";
                }
                else {
                    val = "s";
                }
                if (detonate[j] == $(data1).text()) {
                    newRow += "<option selected value='" + val + "'>" + detonate[j] + "</option>";
                }
                else {
                    newRow += "<option value='" + val + "'>" + detonate[j] + "</option>";
                }
            }
            newRow += "</select>";
            $(data1).html(newRow);
            mous = true;
        }
    }
    else if (data2 == 2) {
        if (!$(data1).find("select").hasClass("select")) {
            var newRow = "<select class='select' onchange='selectCheng(this)'>";
            if (autoTable[thisRow][2] == "X" || autoTable[thisRow][2] == "x") {
                for (var k = 0; k < yxpTable.length; k++) {
                    if (yxpTable[k][0] == autoTable[thisRow][0]) {
                        if (yxpTable[k][1] == autoTable[thisRow][1]) {
                            newRow += "<option selected value='" + yxpTable[k][1] + "'>" + yxpTable[k][2] + "</option>";
                        }
                        else {
                            newRow += "<option value='" + yxpTable[k][1] + "'>" + yxpTable[k][2] + "</option>";
                        }
                    }
                }
            }
            else if (autoTable[thisRow][2] == "C" || autoTable[thisRow][2] == "c") {
                for (var k = 0; k < ycpTable.length; k++) {
                    if (ycpTable[k][0] == autoTable[thisRow][0]) {
                        if (ycpTable[k][1] == autoTable[thisRow][1]) {
                            newRow += "<option selected value='" + ycpTable[k][1] + "'>" + ycpTable[k][2] + "</option>";
                        }
                        else {
                            newRow += "<option value='" + ycpTable[k][1] + "'>" + ycpTable[k][2] + "</option>";
                        }
                    }
                }
            }
            else {
                newRow += "<option selected value='0'>无</option>";
            }
            newRow += "</select>";
            $(data1).html(newRow);
            mous = true;
        }
    }
    else if (data2 == 3) {
        if ($(data1).find("input").attr("type") != "text") {
            var texts = $(data1).text();
            $(data1).html("<input type=\"text\" class='input' value=\"" + texts + "\"/>");
            mous = false;
        }
    }
    else if (data2 == 4) {
        if (!$(data1).find("select").hasClass("select")) {
            var setParmNO = new Array();
            for (var i = 0, j = 0; i < SetParmTable.length; i++) {
                if (SetParmTable[i + 1] != null) {
                    if (SetParmTable[i][0] != SetParmTable[i + 1][0]) {
                        setParmNO[j++] = SetParmTable[i][0];
                    }
                }
                else {
                    setParmNO[j] = SetParmTable[i][0];
                }
            }
            var newRow = "<select class='select' onchange='selectCheng(this)'>";
            for (var i = 0; i < setParmNO.length; i++) {
                for (var j = 0; j < equipTable.length; j++) {
                    if (setParmNO[i] == equipTable[j][0]) {
                        for (var k = 0; k < autoTable.length; k++) {
                            if (thisRow == k) {
                                if (autoTable[k][4] == setParmNO[i]) {
                                    newRow += "<option selected value='" + equipTable[j][0] + "'>" + equipTable[j][1] + "</option>";
                                }
                                else {
                                    newRow += "<option value='" + equipTable[j][0] + "'>" + equipTable[j][1] + "</option>";
                                }
                            }
                        }
                    }
                }
            }
            newRow += "</select>";
            $(data1).html(newRow);
            mous = true;
        }
    }
    else if (data2 == 5) {
        if (!$(data1).find("select").hasClass("select")) {
            var newRow = "<select class='select' onchange='selectCheng(this)'>";
            for (var j = 0; j < SetParmTable.length; j++) {
                if (SetParmTable[j][0] == autoTable[thisRow][4]) {
                    if (SetParmTable[j][1] == autoTable[thisRow][5]) {
                        newRow += "<option selected value='" + SetParmTable[j][1] + "'>" + SetParmTable[j][2] + "</option>";
                    }
                    else {
                        newRow += "<option value='" + SetParmTable[j][1] + "'>" + SetParmTable[j][2] + "</option>";
                    }
                }
            }
            newRow += "</select>";
            $(data1).html(newRow);
            mous = true;
        }
    }
    else if (data2 == 6) {
        if ($(data1).find("input").attr("type") != "text") {
            for (var j = 0; j < SetParmTable.length; j++) {
                if (SetParmTable[j][0] == autoTable[thisRow][4] && SetParmTable[j][1] == autoTable[thisRow][5]) {
                    if (SetParmTable[j][3] == "V") {
                        var texts = $(data1).text();
                        $(data1).html("<input type=\"text\" class='input' value=\"" + texts + "\" />");
                        mous = false;
                    }
                }
            }
        }
    }
    else {
        if ($(data1).find("input").attr("type") != "text") {
            var texts = $(data1).text();
            $(data1).html("<input type=\"text\" class='input' value=\"" + texts + "\" />");
            mous = false;
        }
    }

    $(data1).parent().addClass("active");
    $("#delete_equip").attr("disabled", false);
    $("#save_equip").attr("disabled", false);
}

function selectCheng(data) {
    mous = false;
    mouseout_equip_1(data);
}

function btn_mouse() {
    datajs();
}

//离开事件
function mouseout_equip_1(data) {
    if (!data.contains(event.toElement)) {
        if (mous) {
            return;
        }
        datajs();
    }
}

function datajs() {
    $("#equip_table_1 tbody tr").each(function (i) {
        var chens = false;
        $(this).find("td").each(function (j) {
            if ($(this).find("select").hasClass("select")) {
                var values = $(this).find("select").find("option:selected").attr("value");
                $(this).html($(this).find("select").find("option:selected").text());
                if (j == 1) {
                    autoTable[i][0] = values;
                    chens = true;
                    var zs = 0;
                    var zt = 0;
                    for (var k = 0; k < ycpTable.length; k++) {
                        if (autoTable[i][0] == ycpTable[k][0]) {
                            zs = 1;
                        }
                    }
                    for (var k = 0; k < yxpTable.length; k++) {
                        if (autoTable[i][0] == yxpTable[k][0]) {
                            zt = 1;
                        }
                    }
                    if (zs == 1) {
                        autoTable[i][2] = "C";
                        autoTable[i][1] = ycpTable[0][1];
                    }
                    if (zt == 1) {
                        autoTable[i][2] = "X";
                        autoTable[i][1] = yxpTable[0][1];
                    }
                    if (zs != 1 && zt != 1) {
                        autoTable[i][2] = "E";
                        autoTable[i][1] = "0";
                    }
                }
                else if (j == 2) {
                    chens = true;
                    autoTable[i][2] = values;
                    if (values == "C" || values == "c") {
                        autoTable[i][1] = ycpTable[0][1];
                    }
                    else if (values == "X" || values == "x") {
                        autoTable[i][1] = yxpTable[0][1];
                    }
                    else {
                        autoTable[i][1] = "0";
                    }
                }
                else if (j == 3) {
                    autoTable[i][1] = values;
                }
                else if (j == 5) {
                    chens = true;
                    autoTable[i][4] = values;
                    for (var j = 0; j < SetParmTable.length; j++) {
                        if (SetParmTable[j][0] == values) {
                            autoTable[i][5] = SetParmTable[j][2];
                        }
                    }
                }
                else if (j == 6) {
                    autoTable[i][5] = values;
                }
            }
            else {
                if (j == 2) {
                    if (chens) {
                        if (autoTable[i][2] == "C" || autoTable[i][2] == "c") {
                            $(this).html(detonate[2]);
                        }
                        else if (autoTable[i][2] == "X" || autoTable[i][2] == "x") {
                            $(this).html(detonate[0]);
                        }
                        else {
                            $(this).html(detonate[4]);
                        }
                    }
                }
                if (j == 3) {
                    if (chens) {
                        if (autoTable[i][2] == "C" || autoTable[i][2] == "c") {
                            for (var k = 0; k < ycpTable.length; k++) {
                                if (ycpTable[k][0] == autoTable[i][0]) {
                                    $(this).html(ycpTable[k][2]);
                                }
                            }
                        }
                        else if (autoTable[i][2] == "X" || autoTable[i][2] == "x") {
                            for (var k = 0; k < yxpTable.length; k++) {
                                if (yxpTable[k][0] == autoTable[i][0]) {
                                    $(this).html(yxpTable[k][2]);
                                }
                            }
                        }
                        else {
                            $(this).html("无");
                        }
                    }
                }
                else if (j == 4) {
                    autoTable[i][3] = $(this).text();
                }
                if (j == 6) {
                    if (chens) {
                        //$(this).html(autoTable[i][5]);
                    }
                }
            }
            if ($(this).find("input").attr("type") == "text") {
                var texts = $(this).find("input").val();
                $(this).html(texts);
                if (j == 4) {
                    autoTable[i][3] = texts;
                }
                else if (j == 7) {
                    autoTable[i][6] = texts;

                }
                else if (j == 8) {
                    autoTable[i][7] = texts;
                }
            }
        })
    })
}

//增加
function add_equip() {
    var newRow = $("<tr></tr>");
    newRow.append("<td><input id='check_equip_" + autoTable.length + "' onclick='check_click_eq(" + autoTable.length + ")' type='checkbox' checked='checked'/></td>");

    for (var i = 0; i < 8; i++) {
        if (i == 3) {
            newRow.append("<td onclick='click_tabletd(this," + i + ")'>0</td>");
        }
        else {
            newRow.append("<td onclick='click_tabletd(this," + i + ")'></td>");
        }
    }

    $("#equip_table_1 tbody:last").append(newRow);
    autoTable[autoTable.length] = new Array();
    autoTable[autoTable.length - 1][6] = "";
    autoTable[autoTable.length - 1][7] = "";
    autoTable[autoTable.length - 1][8] = "1";
}

//删除
function delete_equip() {
    showDialog(3);
}

//保存
function save_equip() {
    var _url = service + "/ResetAlarmTab";
    var trueNum = 0;
    //普通任务列表
    var datafrom = "";
    for (var i = 0; i < autoTable.length; i++) {
        for (var j = 0; j < autoTable[i].length; j++) {
            datafrom += autoTable[i][j] + ",";
        }
        datafrom = datafrom.substring(0, datafrom.length - 1);
        datafrom += ";";
    }
    datafrom = datafrom.substring(0, datafrom.length - 1);
    var _data = "tabName=AutoProc&&data=" + datafrom;
    function _success_1(data) {
        var resultJs = $(data).children("string").text();
        if (resultJs == "true") {
            alert("保存成功！");
        }
    }
    JQajaxo("post", _url, false, _data, _success_1);
}

//-----------------场景编辑-----------------------
//场景编辑初始化
function scene_edi() {
    var newRow = "";
    for (var i = 0; i < SetParmTable.length; i++) {
        if (SetParmTable[i][3] == "J") {
            newRow += "<li onclick='sceneulClick(this)'>" + SetParmTable[i][2] + "</li>";
        }
    }
    $("#sceneul").html(newRow);
    $("#equip_sceneul").attr("disabled", false);
    newRow = "<option select value='" + SetParmTable[0][0] + "," + SetParmTable[0][1] + "," + SetParmTable[0][2] + "," + SetParmTable[0][3] + "," + SetParmTable[0][4] + "'>" + SetParmTable[0][2] + "</option>";
    for (var i = 1; i < SetParmTable.length; i++) {
        newRow += "<option value='" + SetParmTable[i][0] + "," + SetParmTable[i][1] + "," + SetParmTable[i][2] + "," + SetParmTable[i][3] + "," + SetParmTable[i][4] + "'>" + SetParmTable[i][2] + "</option>";
    }
    $("#equip_sceneul").html(newRow);
}

//单击列表
function sceneulClick(data) {
    $("#sceneul").find("li").each(function (i) {
        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
        }
    })
    $(data).addClass("active");
    $("#sceneipt").val($(data).text());
    var valuelist = new Array();
    for (var i = 0; i < SetParmTable.length; i++) {
        if (SetParmTable[i][2] == $(data).text()) {
            selectSet = i;
            if (SetParmTable[i][4] != "") {
                valuelist = SetParmTable[i][4].split('+');
            }
            break;
        }
    }
    var newRow = "";
    if (valuelist[0] != null) {
        for (var i = 0; i < valuelist.length; i++) {
            var values = valuelist[i].split(',');
            if (values.length == 1) {
                newRow += "<li onclick='valusClick(this)'>延时间隔" + values[0] + "毫秒</li>";
            }
            else {
                var newRows = "";
                for (var j = 0; j < SetParmTable.length; j++) {
                    if (values[0] == SetParmTable[j][0] && values[1] == SetParmTable[j][1]) {
                        newRows += SetParmTable[j][2];
                    }
                }
                for (var j = 0; j < equipTable.length; j++) {
                    if (values[0] == equipTable[j][0]) {
                        newRow += "<li onclick='valusClick(this)'>" + equipTable[j][1] + " " + newRows;
                    }
                }
            }
        }
    }
    $("#scene_listul").html(newRow);

    $("#delete_scene").attr("disabled", false);
    $("#save_scene").attr("disabled", false);
}

//设备控制与延时间隔
function equipAndtime(data) {
    if (data == 0) {
        $("#equip_sceneul").attr("disabled", false);
        $("#text_scene_1").attr("disabled", true);
        $("#text_scene_2").attr("disabled", true);
        $("#text_scene_3").attr("disabled", true);
        $("#text_scene_4").attr("disabled", true);
    }
    else {
        $("#equip_sceneul").attr("disabled", true);
        $("#text_scene_1").attr("disabled", false);
        $("#text_scene_2").attr("disabled", false);
        $("#text_scene_3").attr("disabled", false);
        $("#text_scene_4").attr("disabled", false);
    }
}

//设备控制是否选中温度设置
function change_clicks() {
    var values = $("#equip_sceneul").find("option:selected").attr("value");
    var valuesp = values.split(',');
    if (valuesp[3] == "V") {
        $("#text_value").html("<span style='float:left;line-height:34px;'>温度设置：</span><input style='float:left;width:60%' class='form-control' type='text' value='" + valuesp[4] + "'/>");
    }
    else {
        $("#text_value").html("");
    }
}

//插入
function insert_sceneList() {
    if (selectSet == null) {
        return;
    }
    var m = "";
    if (SetParmTable[selectSet][4] != "") {
        m = "+";
    }
    if (document.getElementById("scene_rd_1").checked) {
        var values = $("#equip_sceneul").find("option:selected").attr("value");
        var valuesp = values.split(',');
        for (var i = 0; i < equipTable.length; i++) {
            if (valuesp[0] == equipTable[i][0]) {
                $("#scene_listul:last").append("<li onclick='valusClick(this)'>" + equipTable[i][1] + " " + valuesp[2] + "</li>");
                if (valuesp[2] == "V") {
                    SetParmTable[selectSet][4] += m + valuesp[0] + "," + valuesp[1] + "," + valuesp[4];
                }
                else {
                    SetParmTable[selectSet][4] += m + valuesp[0] + "," + valuesp[1];
                }
                break;
            }
        }
    }
    else {
        var num = 0;
        var numb = 0;
        if ($("#text_scene_1").val() != "") {
            num += parseInt($("#text_scene_1").val()) * 60 * 60 * 1000;
        }
        else {
            numb++;
        }

        if ($("#text_scene_2").val() != "") {
            num += parseInt($("#text_scene_2").val()) * 60 * 1000;
        }
        else {
            numb++;
        }

        if ($("#text_scene_3").val() != "") {
            num += parseInt($("#text_scene_3").val()) * 1000;
        }
        else {
            numb++;
        }

        if ($("#text_scene_4").val() != "") {
            num += parseInt($("#text_scene_4").val());
        }
        else {
            numb++;
        }
        if (numb != 4) {
            $("#scene_listul:last").append("<li onclick='valusClick(this)'>延时间隔" + num + "毫秒</li>");
            SetParmTable[selectSet][4] += m + num;
        }
    }
}

//单击场景内容编辑
function valusClick(data) {
    $("#scene_listul").find("li").each(function (i) {
        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
        }
    })
    $(data).addClass("active");
}

//删除场景内容
function delete_scenelist() {
    $("#scene_listul li").each(function (i) {
        if ($(this).hasClass("active")) {
            $(this).remove();
            var valuesp = SetParmTable[selectSet][4].split('+');
            SetParmTable[selectSet][4] = "";
            for (var j = 0; j < valuesp.length; j++) {
                if (i != j) {
                    SetParmTable[selectSet][4] += valuesp[j] + "+";
                }
            }
            SetParmTable[selectSet][4] = SetParmTable[selectSet][4].substring(0, SetParmTable[selectSet][4].length - 1);
            return false;
        }
    })
}

//上移或下移场景内容
function move_scene(data) {
    if (selectSet == null) {
        return;
    }
    if (data == 0) {
        var conttr = null;
        var num = 0;
        $("#scene_listul li").each(function (i) {
            if (i != 0) {
                if ($(this).hasClass("active")) {
                    num = i;
                    var cont = conttr.html();
                    conttr.html($(this).html());
                    conttr.addClass("active");
                    $(this).html(cont);
                    $(this).removeClass("active");
                }
            }
            conttr = $(this);
        });
        var values = SetParmTable[selectSet][4].split('+');
        if (values[num - 1] != null) {
            var valust = values[num - 1];
            values[num - 1] = values[num];
            values[num] = valust;
        }
        SetParmTable[selectSet][4] = "";
        for (var i = 0; i < values.length; i++) {
            SetParmTable[selectSet][4] += values[i] + "+";
        }
        SetParmTable[selectSet][4] = SetParmTable[selectSet][4].substring(0, SetParmTable[selectSet][4].length - 1);
    }
    else {
        var conttr = null;
        var im = new Array();
        var num = 0;
        $("#scene_listul li").each(function (i) {
            im[i] = $(this);
        });
        for (var i = 0; i < im.length; i++) {
            if (im[i].hasClass("active") && i != im.length - 1) {
                num = i;
                var imr = im[i + 1].html();
                im[i + 1].html(im[i].html());
                im[i + 1].addClass("active");
                im[i].html(imr);
                im[i].removeClass("active");
                break;
            }
        }

        var values = SetParmTable[selectSet][4].split('+');
        if (values[num + 1] != null) {
            var valust = values[num + 1];
            values[num + 1] = values[num];
            values[num] = valust;
        }

        SetParmTable[selectSet][4] = "";
        for (var i = 0; i < values.length; i++) {
            SetParmTable[selectSet][4] += values[i] + "+";
        }
        SetParmTable[selectSet][4] = SetParmTable[selectSet][4].substring(0, SetParmTable[selectSet][4].length - 1);
    }
}

//修改场景名称
function sceneMouseout() {
    if (selectSet == null) {
        return;
    }
    SetParmTable[selectSet][2] = $("#sceneipt").val();
    $("#sceneul li").each(function (i) {
        if ($(this).hasClass("active")) {
            $(this).html(SetParmTable[selectSet][2]);
            return false;
        }
    })
}

//添加场景列表
function add_scene() {
    showDialog(0);
}

//删除场景列表
function delete_scene() {
    showDialog(1);
}

//保存场景列表
function save_scene() {
    var _url = service + "/SceneEditor";
    //普通任务列表
    var datafrom = "";
    for (var i = 0; i < SetParmTable.length; i++) {
        if (SetParmTable[i][3] == "J") {
            for (var j = 0; j < SetParmTable[i].length; j++) {
                datafrom += SetParmTable[i][j] + ".";
            }
            datafrom = datafrom.substring(0, datafrom.length - 1);
            datafrom += ";";
        }
    }
    datafrom = datafrom.substring(0, datafrom.length - 1);
    if (datafrom == "") {
        datafrom = "|";
    }
    var _data = "data=" + datafrom;
    function _success_1(data) {
        var resultJs = $(data).children("string").text();
        if (resultJs == "true") {
            alert("保存成功！");
        }
    }
    JQajaxo("post", _url, false, _data, _success_1);
}

function reset_equip() {
    showDialog(2);
}

function showDialog(data) {
    var messages = '';
    if (data == 2) {
        messages = '确定重置设备联动，让当前配置生效吗？';
    }
    else if (data == 0) {
        messages = '场景名称<input type=\'text\' class=\'input\' id=\'sceneipt_add\'/>';
    }
    else {
        messages = '确认删除所选行吗？';
    }
    var newDiv = document.createElement("div");
    newDiv.className = "fullScreenPopup";
    newDiv.id = "fullScreenPopup_Delete";
    var newContainer = "<div class='fullScreenAll' onclick='onFullScreenAll(this)'></div><div class='fullScreenCenter bounceInDown animated  mg-xs' style='" + $("html").attr("style") + "'>";
    newContainer += "<div class='MessageBox_top'><span>提示</span><button class='MessageBox_top_Exit btns-style-6' onclick='onCencel(\"" + newDiv.id + "\")'><i class='iconfont icon-guanbi'></i></button></div>";
    newContainer += "<p class='MessageBox_p1'>" + messages + "</p>";
    newContainer += "<p class='MessageBox_p3'><button class='btn btns-style-1' onclick='onbtnsave(" + data + ",\"" + newDiv.id + "\")'>确定</button><button  class='btn btns-style-1' onclick='onCencel(\"" + newDiv.id + "\")'>取消</button></p>";
    newContainer += "</div>";
    newDiv.innerHTML = newContainer;
    document.body.appendChild(newDiv);
}

function onbtnsave(data, dt) {
    if (data == 0) {
        data_1();
    }
    else if (data == 1) {
        data_2();
    }
    else if (data == 2) {
        resettingClick(2);
    }
    else if (data == 3) {
        data_3();
    }

    function data_1() {
        var setpar = new Array();
        for (var i = 0, j = 0; i < SetParmTable.length; i++) {
            if (SetParmTable[i][3] == "J") {
                setpar[j] = new Array()
                setpar[j] = SetParmTable[i];
                j++;
            }
        }
        if (setpar.length == 0) {
            setpar[0] = new Array();
            for (var i = 0; i < equipTable.length; i++) {
                if (equipTable[i][3] == "GWChangJing.NET.dll") {
                    setpar[0][0] = equipTable[i][0];
                    setpar[0][1] = 0;
                }
            }
        }
        SetParmTable[SetParmTable.length] = new Array();
        SetParmTable[SetParmTable.length - 1][0] = setpar[0][0];
        SetParmTable[SetParmTable.length - 1][1] = parseInt(setpar[setpar.length - 1][1]) + 1;
        SetParmTable[SetParmTable.length - 1][2] = $("#sceneipt_add").val();
        SetParmTable[SetParmTable.length - 1][3] = "J";
        SetParmTable[SetParmTable.length - 1][4] = "";
        $("#sceneul:last").append("<li onclick='sceneulClick(this)'>" + $("#sceneipt_add").val() + "</li>");
    }

    function data_2() {
        $("#sceneul li").each(function () {
            if ($(this).hasClass("active")) {
                $(this).remove();
                SetParmTable.splice(selectSet, 1);
                selectSet = null;
                $("#sceneipt").val("");
                $("#scene_listul").html("");
                return false;
            }
        })
    }

    function data_3() {
        $("#equip_table_1 tbody tr").each(function (i) {
            if ($(this).hasClass("active")) {
                $(this).remove();
                autoTable.splice(i, 1);
            }
        })
    }
    onCencel(dt);
}