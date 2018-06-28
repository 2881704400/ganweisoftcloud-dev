//获取配置列表的设备号
var confArry = new Array();
//当前选中设备
var selectEquip_Now = "";
//设备列表
var AlarmProcTable = new Array();

//当前页
var nowPage = new Array(1, 1, 1, 1);
//详细项，列名
var tdName = new Array();

//关联视频表
var GW_VideoInfoData = new Array();
//资产表
var GWZiChanData = new Array();
//模板预案
var GWPlanData = new Array();

var equipTable = new Array();
var ycpTable = new Array();
var yxpTable = new Array();
var SetParmTable = new Array();

onloadContent();
function onloadContent() {
    $(".main").attr("value", "3");
    treeConf();
    GW_VideoInfoTable();
    GWZiChanTable();
    GWPlanTable();

    $("#Equip").attr("thNum", $("#Equip thead tr").find("th").length);
    $("#ycp").attr("thNum", $("#ycp thead tr").find("th").length);
    $("#yxp").attr("thNum", $("#yxp thead tr").find("th").length);

    tdName[0] = new Array("设备属性", "通讯刷新周期", "通故障处理意见", "故障提示", "故障恢复提示", "报警声音文件", "驱动文件", "通讯端口", "设备地址", "通讯参数", "通讯时间参数", "报警升级周期（分钟）", "模板设备号", "附表名称", "属性", "安全时段");
    tdName[1] = new Array("比例变换", "曲线记录阈值", "实测最小值", "实测最大值", "最小值", "最大值", "属性值", "操作命令", "操作参数", "越线滞纳时间（秒）", "恢复滞纳时间（秒）", "重复报警时间（分钟）", "处理意见", "报警级别", "报警升级周期", "越下限事件", "越上限事件", "声音文件", "报警屏蔽", "安全时段");
    tdName[2] = new Array("取反", "处理意见0-1", "处理意见1-0", "0-1级别", "1-0级别", "初始状态", "属性值", "操作命令", "操作参数", "越线滞纳时间（秒）", "恢复滞纳时间（秒）", "重复报警时间（分钟）", "声音文件", "报警屏蔽", "报警升级周期（分钟）", "安全时段");
    $('.tree').mCustomScrollbar(scrollbarStyle);
}

//获取设备列表（系统配置）
function treeConf() {
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

    AlarmProcTable = new Array();
    var _urlAlarm = service + "/QueryTableData";
    var _dataAlarm = "tableName=AlarmProc";
    function _successAlarm(data) {
        var resultJs = $(data).children("string").text();
        if (resultJs != "false") {
            if (resultJs == "]") { return }
            var usera = JSON.parse(resultJs);
            for (var i = 0; i < usera.length; i++) {
                var userb = usera[i];
                var userc = new Array(userb.Proc_Code, userb.Proc_name);
                $("#eqpConf").find("table").find("thead").find("tr:last").append("<th class='thAlarmProc'> " + userc[1] + "</th>");
                $("#ycpConf").find("table").find("thead").find("tr:last").append("<th class='thAlarmProc'> " + userc[1] + "</th>");
                $("#yxpConf").find("table").find("thead").find("tr:last").append("<th class='thAlarmProc'> " + userc[1] + "</th>");
                AlarmProcTable[i] = userc;
            }
        }
    }
    JQajaxo("post", _urlAlarm, false, _dataAlarm, _successAlarm);
}
//配置列表转换为html
function jsonToConf(data) {
    $("#treelist ul").html("");
    var usera = JSON.parse(data);
    for (var i = 0; i < usera.length; i++) {
        var userb = usera[i];
        var userc = new Array(userb.m_EquipNm, userb.m_iEquipNo, false);
        var newRow = $("<li></li>");
        newRow.append("<span><label><input type=\"checkbox\" id=\"checkConf_" + userc[1] + "\"/>" + userc[0] + "</label></span>");
        $("#treelist ul").append(newRow);
        confArry[i] = userc;
    }
}

//关联视频表
function GW_VideoInfoTable() {
    GW_VideoInfoData = new Array();
    var _url = service + "/QueryTableData";
    var _data = "tableName=GW_VideoInfo";
    function _success_VideoInfo(data) {
        var resultJs = $(data).children("string").text();
        if (resultJs == "]") { return; }
        var usera = JSON.parse(resultJs);
        for (var i = 0; i < usera.length; i++) {
            var userb = usera[i];
            var userc = new Array(userb.EquipNum + "," + userb.ID, userb.ChannelName);
            GW_VideoInfoData[i] = userc;
        }
    }
    JQajaxo("post", _url, false, _data, _success_VideoInfo);
}
//资产表
function GWZiChanTable() {
    GWZiChanData = new Array();
    var _url = service + "/QueryTableData";
    var _data = "tableName=GWZiChanTable";
    function _success_GWZiChan(data) {
        var resultJs = $(data).children("string").text();
        if (resultJs == "]") { return; }
        var usera = JSON.parse(resultJs);
        for (var i = 0; i < usera.length; i++) {
            var userb = usera[i];
            var userc = new Array(userb.ZiChanID, userb.ZiChanName);
            GWZiChanData[i] = userc;
        }
    }
    JQajaxo("post", _url, false, _data, _success_GWZiChan);
}
//模板预案
function GWPlanTable() {
    GWPlanData = new Array();
    var _url = service + "/QueryTableData";
    var _data = "tableName=GWPlan";
    function _success_GWPlan(data) {
        var resultJs = $(data).children("string").text();
        if (resultJs == "]") { return; }
        var usera = JSON.parse(resultJs);
        for (var i = 0; i < usera.length; i++) {
            var userb = usera[i];
            var userc = new Array(userb.PlanNo);
            GWPlanData[i] = userc;
        }
    }
    JQajaxo("post", _url, false, _data, _success_GWPlan);
}

//全选
function treelistAll(event) {
    if (document.getElementById("treelistAll").checked) {
        for (var i = 0; i < confArry.length; i++) {
            document.getElementById("checkConf_" + confArry[i][1]).checked = true;
        }
    }
    else {
        for (var i = 0; i < confArry.length; i++) {
            document.getElementById("checkConf_" + confArry[i][1]).checked = false;
        }
    }
    event.stopPropagation();
}

//获取当前选中的设备号
function SelectCheckedEquip() {
    var checkedEquip = "";
    for (var i = 0; i < confArry.length; i++) {
        if (document.getElementById("checkConf_" + confArry[i][1]).checked) {
            confArry[i][2] = true;
            checkedEquip += confArry[i][1] + ",";
        }
        else {
            confArry[i][2] = false;
        }
    }
    if (checkedEquip == "") {
    }
    else {
        checkedEquip = checkedEquip.substring(0, checkedEquip.length - 1);
    }
    selectEquip_Now = checkedEquip;
}
//查询选中列表的数据
function selectData() {
    nowPage = new Array(1, 1, 1, 1);
    SelectCheckedEquip();//获取当前选中的设备号
    if (selectEquip_Now == "") {
        return;
    }
    $("#Equip tbody").html("");
    $("#ycp tbody").html("");
    $("#yxp tbody").html("");
    $("#SetParm tbody").html("");
    SelectEquipData("Equip", "select");
    SelectEquipData("ycp", "select");
    SelectEquipData("yxp", "select");
    SelectEquipData("SetParm", "select");

    for (var i = 1; i < 5; i++) {
        for (var j = 1; j < 6; j++) {
            $("#btnPages_" + i + "_" + j).attr("disabled", false);
        }
    }
    $("#btnPages_1_1").attr("disabled", true);
    $("#btnPages_1_2").attr("disabled", true);

    $("#btnPages_2_1").attr("disabled", true);
    $("#btnPages_2_2").attr("disabled", true);

    $("#btnPages_3_1").attr("disabled", true);
    $("#btnPages_3_2").attr("disabled", true);

    $("#btnPages_4_1").attr("disabled", true);
    $("#btnPages_4_2").attr("disabled", true);

    $("#btn_Save").attr("disabled", false);
    $("#nowPage_goPage_1").attr("disabled", false);
    $("#nowPage_goPage_2").attr("disabled", false);
    $("#nowPage_goPage_3").attr("disabled", false);
    $("#nowPage_goPage_4").attr("disabled", false);
    $("#nowPage_goPageBtn_1").attr("disabled", false);
    $("#nowPage_goPageBtn_2").attr("disabled", false);
    $("#nowPage_goPageBtn_3").attr("disabled", false);
    $("#nowPage_goPageBtn_4").attr("disabled", false);
    $('.tableAuto').mCustomScrollbar(scrollbarStyle);
}

//获取总行数
function SelectCount(tableName) {
    var pageCount = parseInt($("#" + tableName).attr("pageCount"));
    var nowPageCount = 0;
    if (tableName == "Equip") {
        var nowPageGet = document.getElementById("nowPage_count_1");
        var s = (pageCount / 10 + "").split('.');
        if (s.length == 2) {
            nowPageCount = parseInt(s[0]) + 1;
        }
        else {
            nowPageCount = pageCount / 10;
        }
        nowPageGet.innerHTML = nowPageCount;
    }
    else if (tableName == "ycp") {
        var nowPageGet = document.getElementById("nowPage_count_2");
        var s = (pageCount / 10 + "").split('.');
        if (s.length == 2) {
            nowPageCount = parseInt(s[0]) + 1;
        }
        else {
            nowPageCount = pageCount / 10;
        }
        nowPageGet.innerHTML = nowPageCount;
    }
    else if (tableName == "yxp") {
        var nowPageGet = document.getElementById("nowPage_count_3");
        var s = (pageCount / 10 + "").split('.');
        if (s.length == 2) {
            nowPageCount = parseInt(s[0]) + 1;
        }
        else {
            nowPageCount = pageCount / 10;
        }
        nowPageGet.innerHTML = nowPageCount;
    }
    else {
        var nowPageGet = document.getElementById("nowPage_count_4");
        var s = (pageCount / 10 + "").split('.');
        if (s.length == 2) {
            nowPageCount = parseInt(s[0]) + 1;
        }
        else {
            nowPageCount = pageCount / 10;
        }
        nowPageGet.innerHTML = nowPageCount;
    }
}
//获取数据
function SelectEquipData(tableName, opertions) {
    var _url = service + "/GetSystemConfig";
    var _data = "";
    if (tableName == "Equip") {
        _data = "table_name=" + tableName + "&&equip_no_list=" + selectEquip_Now;
        var nowPageGet = document.getElementById("nowPage_now_1");
        nowPageGet.innerHTML = nowPage[0];
        equipTable = new Array();
    }
    else if (tableName == "ycp") {
        _data = "table_name=" + tableName + "&&equip_no_list=" + selectEquip_Now;
        var nowPageGet = document.getElementById("nowPage_now_2");
        nowPageGet.innerHTML = nowPage[1];
        ycpTable = new Array();
    }
    else if (tableName == "yxp") {
        _data = "table_name=" + tableName + "&&equip_no_list=" + selectEquip_Now;
        var nowPageGet = document.getElementById("nowPage_now_3");
        nowPageGet.innerHTML = nowPage[2];
        yxpTable = new Array();
    }
    else {
        _data = "table_name=" + tableName + "&&equip_no_list=" + selectEquip_Now;
        var nowPageGet = document.getElementById("nowPage_now_4");
        nowPageGet.innerHTML = nowPage[3];
        SetParmTable = new Array();
    }
    function _success(dt) {
        var resultJs = $(dt).children("string").text();
        if (resultJs != "false") {
            if (resultJs == "]") {
                return;
            }
            jsonToHtml(resultJs, tableName, opertions);
            SelectCount(tableName);
        }
        else {
            SelectCount(tableName);
        }
    }
    JQajaxo("post", _url, false, _data, _success);
}
//填充数据到html
function jsonToHtml(data, tableName, opertions) {
    var usera = JSON.parse(data);
    for (var i = 0; i < usera.length; i++) {
        var userb = usera[i];
        if (tableName == "Equip") {
            equipToHtml(userb, i, opertions);
        }
        else if (tableName == "ycp") {
            ycpToHtml(userb, i, opertions);
        }
        else if (tableName == "yxp") {
            yxpToHtml(userb, i, opertions);
        }
        else {
            SetParmToHtml(userb, i, opertions);
        }
    }
    $("#" + tableName).attr("pageCount", usera.length);
}
//是否报警
function alarmSchemes(alay, tableName, guids) {
    var alarm_schemeVar = new Array();
    if ((alay & 1) > 0) {
        alarm_schemeVar[0] = "<input id=\"alarm_" + tableName + "_a_" + guids + "\" type=\"checkbox\" style=\"cursor:pointer;\" checked=\"checked\" />";
    }
    else {
        alarm_schemeVar[0] = "<input id=\"alarm_" + tableName + "_a_" + guids + "\" type=\"checkbox\" style=\"cursor:pointer;\" />";
    }
    if ((alay & 2) > 0) {
        alarm_schemeVar[1] = "<input id=\"alarm_" + tableName + "_b_" + guids + "\" type=\"checkbox\" style=\"cursor:pointer;\" checked=\"checked\" />";
    }
    else {
        alarm_schemeVar[1] = "<input id=\"alarm_" + tableName + "_b_" + guids + "\" type=\"checkbox\" style=\"cursor:pointer;\" />";
    }
    for (var j = 0; j < AlarmProcTable.length; j++) {
        var alays = parseInt(AlarmProcTable[j][0]);
        if ((alay & alays) > 0) {
            var k = j + 2;
            alarm_schemeVar[k] = "<input id=\"alarm_" + tableName + "_" + j + "_" + guids + "\" type=\"checkbox\" style=\"cursor:pointer;\" checked=\"checked\" />";
        }
        else {
            var k = j + 2;
            alarm_schemeVar[k] = "<input id=\"alarm_" + tableName + "_" + j + "_" + guids + "\" type=\"checkbox\" style=\"cursor:pointer;\" />";
        }
    }
    return alarm_schemeVar;
}

function equipToHtml(userb, i, opertions) {
    var userc = new Array(userb.equip_no, userb.equip_nm, userb.related_pic, userb.related_video, userb.ZiChanID, userb.PlanNo, userb.equip_detail, userb.acc_cyc, userb.proc_advice, userb.out_of_contact, userb.contacted, userb.event_wav, userb.communication_drv, userb.local_addr, userb.equip_addr, userb.communication_param, userb.communication_time_param, userb.AlarmRiseCycle, userb.raw_equip_no, userb.tabname, userb.attrib, userb.SafeTime, userb.alarm_scheme);
    equipTable[i] = userc;
    if (opertions != "select") {
        return;
    }
    for (var j = 0; j < GW_VideoInfoData.length; j++) {
        if (userc[3] == GW_VideoInfoData[j][0]) {
            userc[3] = GW_VideoInfoData[j][1];
            break;
        }
    }
    for (var j = 0; j < GWZiChanData.length; j++) {
        if (userc[4] == GWZiChanData[j][0]) {
            userc[4] = GWZiChanData[j][1];
            break;
        }
    }
    var alarm_schemeVar = alarmSchemes(userc[userc.length - 1], "Equip", userc[0]);
    if (i >= nowPage[0] * 10 - 10 && i < nowPage[0] * 10) {
        var newRowClass = "";
        if (i % 2) {
            newRowClass = "even";
        }
        else {
            newRowClass = "odd";
        }
        var newRow = $("<tr class=\"" + newRowClass + "\"></tr>");
        newRow.append("<td disabled=\"disabled\" onclick='toggleParticular(this,0)' style='cursor:pointer'><i class=\"iconfont icon-jia\"> </i>" + userc[0] + "</td>");
        var thNum = parseInt($("#Equip").attr("thNum"));
        for (var j = 1; j < thNum - alarm_schemeVar.length; j++) {
            newRow.append("<td>" + userc[j] + "</td>");
        }
        for (var j = 0; j < alarm_schemeVar.length; j++) {
            newRow.append("<td>" + alarm_schemeVar[j] + "</td>");
        }
        var trHidden = "";
        for (var j = thNum - alarm_schemeVar.length; j < userc.length - 1; j++) {
            trHidden += userc[j] + "~";
        }
        trHidden = trHidden.substring(0, trHidden.length - 1);
        newRow.attr("hiddentd", trHidden);
        $("#Equip tbody:last").append(newRow);
    }
}
function ycpToHtml(userb, i, opertions) {
    userc = new Array(userb.equip_no, userb.yc_no, userb.yc_nm, userb.val_min, userb.restore_min, userb.restore_max, userb.val_max, userb.unit, userb.related_pic, userb.related_video, userb.ZiChanID, userb.PlanNo, userb.curve_rcd, userb.mapping, userb.curve_limit, userb.yc_min, userb.yc_max, userb.physic_min, userb.physic_max, userb.val_trait, userb.main_instruction, userb.minor_instruction, userb.alarm_acceptable_time, userb.restore_acceptable_time, userb.alarm_repeat_time, userb.proc_advice, userb.lvl_level, userb.AlarmRiseCycle, userb.outmin_evt, userb.outmax_evt, userb.wave_file, userb.alarm_shield, userb.SafeTime, userb.alarm_scheme);
    ycpTable[i] = userc;
    if (opertions != "select") {
        return;
    }
    for (var j = 0; j < GW_VideoInfoData.length; j++) {
        if (userc[9] == GW_VideoInfoData[j][0]) {
            userc[9] = GW_VideoInfoData[j][1];
            break;
        }
    }
    for (var j = 0; j < GWZiChanData.length; j++) {
        if (userc[10] == GWZiChanData[j][0]) {
            userc[10] = GWZiChanData[j][1];
            break;
        }
    }
    var alarm_schemeVar = alarmSchemes(userc[userc.length - 1], "ycp", userc[0] + "_" + userc[1]);
    var mappstr = new Array();
    if (userb.mapping.toString() == "true" || userb.mapping.toString() == "True") {
        mappstr[0] = "<input id=\"itYcp_a_" + userb.equip_no + "_" + userb.yc_no + "\" type=\"checkbox\" style=\"cursor:pointer;\" checked=\"checked\" />";
    }
    else {
        mappstr[0] = "<input id=\"itYcp_a_" + userb.equip_no + "_" + userb.yc_no + "\" type=\"checkbox\" style=\"cursor:pointer;\" />";
    }
    userc[12] = mappstr[0];
    if (userb.curve_rcd.toString() == "true" || userb.curve_rcd.toString() == "True") {
        mappstr[1] = "<input id=\"itYcp_b_" + userb.equip_no + "_" + userb.yc_no + "\" type=\"checkbox\" style=\"cursor:pointer;\" checked=\"checked\" />";
    }
    else {
        mappstr[1] = "<input id=\"itYcp_b_" + userb.equip_no + "_" + userb.yc_no + "\" type=\"checkbox\" style=\"cursor:pointer;\" />";
    }
    userc[13] = mappstr[1];
    if (i >= nowPage[1] * 10 - 10 && i < nowPage[1] * 10) {
        var newRowClass = "";
        if (i % 2) {
            newRowClass = "even";
        }
        else {
            newRowClass = "odd";
        }
        var newRow = $("<tr class='newRowClass'></tr>");
        newRow.append("<td disabled=\"disabled\" onclick='toggleParticular(this,1)' style='cursor:pointer'><i class=\"iconfont icon-jia\"></i> " + userc[0] + "</td>");
        newRow.append("<td disabled=\"disabled\">" + userc[1] + "</td>");
        var thNum = parseInt($("#ycp").attr("thNum"));
        for (var j = 2; j < thNum - alarm_schemeVar.length; j++) {
            newRow.append("<td>" + userc[j] + "</td>");
        }
        for (var j = 0; j < alarm_schemeVar.length; j++) {
            newRow.append("<td>" + alarm_schemeVar[j] + "</td>");
        }
        var trHidden = "";
        for (var j = thNum - alarm_schemeVar.length; j < userc.length - 1; j++) {
            trHidden += userc[j] + "~";
        }
        trHidden = trHidden.substring(0, trHidden.length - 1);
        newRow.attr("hiddentd", trHidden);
        $("#ycp tbody:last").append(newRow);
    }
}
function yxpToHtml(userb, i, opertions) {
    userc = new Array(userb.equip_no, userb.yx_no, userb.yx_nm, userb.evt_01, userb.evt_10, userb.related_pic, userb.related_video, userb.ZiChanID, userb.PlanNo, userb.inversion, userb.proc_advice_r, userb.proc_advice_d, userb.level_r, userb.level_d, userb.initval, userb.val_trait, userb.main_instruction, userb.minor_instruction, userb.alarm_acceptable_time, userb.restore_acceptable_time, userb.alarm_repeat_time, userb.wave_file, userb.alarm_shield, userb.AlarmRiseCycle, userb.SafeTime, userb.alarm_scheme);
    yxpTable[i] = userc;
    if (opertions != "select") {
        return;
    }
    for (var j = 0; j < GW_VideoInfoData.length; j++) {
        if (userc[6] == GW_VideoInfoData[j][0]) {
            userc[6] = GW_VideoInfoData[j][1];
            break;
        }
    }
    for (var j = 0; j < GWZiChanData.length; j++) {
        if (userc[7] == GWZiChanData[j][0]) {
            userc[7] = GWZiChanData[j][1];
            break;
        }
    }
    var alarm_schemeVar = alarmSchemes(userc[userc.length - 1], "yxp", userc[0] + "_" + userc[1]);
    var inversionVar = new Array();
    if (userb.inversion.toString() == "true" || userb.inversion.toString() == "True") {
        inversionVar[0] = "<input id=\"itYxp_a_" + userb.equip_no + "_" + userb.yx_no + "\" type=\"checkbox\" style=\"cursor:pointer;\" checked=\"checked\" />";
    }
    else {
        inversionVar[0] = "<input id=\"itYxp_a_" + userb.equip_no + "_" + userb.yx_no + "\" type=\"checkbox\" style=\"cursor:pointer;\" />";
    }
    userc[9] = inversionVar[0];
    if (i >= nowPage[2] * 10 - 10 && i < nowPage[2] * 10) {
        var newRowClass = "";
        if (i % 2) {
            newRowClass = "even";
        }
        else {
            newRowClass = "odd";
        }
        var newRow = $("<tr class='newRowClass'></tr>");
        newRow.append("<td disabled=\"disabled\" onclick='toggleParticular(this,2)' style='cursor:pointer'><i class=\"iconfont icon-jia\"></i> " + userc[0] + "</td>");
        newRow.append("<td disabled=\"disabled\">" + userc[1] + "</td>");
        var thNum = parseInt($("#yxp").attr("thNum"));
        for (var j = 2; j < thNum - alarm_schemeVar.length; j++) {
            newRow.append("<td>" + userc[j] + "</td>");
        }
        for (var j = 0; j < alarm_schemeVar.length; j++) {
            newRow.append("<td>" + alarm_schemeVar[j] + "</td>");
        }
        var trHidden = "";
        for (var j = thNum - alarm_schemeVar.length; j < userc.length - 1; j++) {
            trHidden += userc[j] + "~";
        }
        trHidden = trHidden.substring(0, trHidden.length - 1);
        newRow.attr("hiddentd", trHidden);
        $("#yxp tbody:last").append(newRow);
    }
}
function SetParmToHtml(userb, i, opertions) {
    userc = new Array(userb.equip_no, userb.set_no, userb.set_nm, userb.set_type, userb.main_instruction, userb.minor_instruction, userb.record, userb.action, userb.value, userb.canexecution);
    SetParmTable[i] = userc;
    if (opertions != "select") {
        return;
    }
    var ipts = new Array();
    if (userb.record.toString() == "true" || userb.record.toString() == "True") {
        ipts[0] = "<input id=\"itSetParm_a_" + userb.equip_no + "_" + userb.set_no + "\" type=\"checkbox\" style=\"cursor:pointer;\" checked=\"checked\" />";
    }
    else {
        ipts[0] = "<input id=\"itSetParm_a_" + userb.equip_no + "_" + userb.set_no + "\" type=\"checkbox\" style=\"cursor:pointer;\" />";
    }
    if (userb.canexecution.toString() == "true" || userb.canexecution.toString() == "True") {
        ipts[1] = "<input id=\"itSetParm_b_" + userb.equip_no + "_" + userb.set_no + "\" type=\"checkbox\" style=\"cursor:pointer;\" checked=\"checked\" />";
    }
    else {
        ipts[1] = "<input id=\"itSetParm_b_" + userb.equip_no + "_" + userb.set_no + "\" type=\"checkbox\" style=\"cursor:pointer;\" />";
    }
    userc[6] = ipts[0];
    userc[9] = ipts[1];
    if (i >= nowPage[3] * 10 - 10 && i < nowPage[3] * 10) {
        var newRow = $("<tr></tr>");
        newRow.append("<td disabled=\"disabled\">" + userc[0] + "</td>");
        newRow.append("<td disabled=\"disabled\">" + userc[1] + "</td>");
        var thNum = parseInt($("#SetParm").attr("thNum"));
        for (var j = 2; j < userc.length; j++) {
            newRow.append("<td>" + userc[j] + "</td>");
        }
        $("#SetParm tbody:last").append(newRow);
    }
}

//切换详细行信息
function toggleParticular(dt, numb) {
    if ($(dt).find("i").hasClass("icon-jia")) {
        if (!$(dt).parent().next().hasClass("hiddentd")) {
            var hiddenTD = $(dt).parent().attr("hiddentd").split('~');
            var cospans = $(dt).parent().parent().parent().attr("thNum");
            var newRow = $("<tr class='hiddentd'><td colspan=\"" + cospans + "\"><div class='listStyle' style='display:none'><ul></ul></div></td></tr>");
            for (var i = 0; i < hiddenTD.length; i++) {
                newRow.find("ul").append("<li><b>" + tdName[numb][i] + "</b>：" + hiddenTD[i] + "</li>");
            }
            $(dt).parent().after(newRow);
        }
        $(dt).parent().next().show();
        $(dt).find("i").removeClass("icon-jia");
        $(dt).find("i").addClass("icon-jian");
    }
    else {
        $(dt).find("i").removeClass("icon-jian");
        $(dt).find("i").addClass("icon-jia");
    }
    $(dt).parent().next().find("td").find("div").slideToggle("slow");
    if (!$(dt).find("i").hasClass("icon-jian")) {
        setTimeout(function () {
            $(dt).parent().next().hide();
        }, 500);
    }
}

//下一页
function pagRarclick(number) {
    if (number == 1) {
        var nowPageGet = parseInt(document.getElementById("nowPage_count_1").innerHTML);
        if (nowPageGet == 1 || nowPageGet == 0) {
            $("#btnPages_1_3").attr("disabled", true);
            $('#btnPages_1_4').attr("disabled", true);
            return;
        }
        if (nowPage[0] == 1) {
            $("#btnPages_1_1").attr("disabled", false);
            $('#btnPages_1_2').attr("disabled", false);
        }
        if (nowPage[0] == nowPageGet - 1) {
            $("#btnPages_1_3").attr("disabled", true);
            $('#btnPages_1_4').attr("disabled", true);
        }
        nowPage[0]++;
        $("#Equip tbody").html("");
        SelectEquipData("Equip", "select");
    }
    else if (number == 2) {
        var nowPageGet = parseInt(document.getElementById("nowPage_count_2").innerHTML);
        if (nowPageGet == 1 || nowPageGet == 0) {
            $("#btnPages_2_3").attr("disabled", true);
            $('#btnPages_2_4').attr("disabled", true);
            return;
        }
        if (nowPage[1] == 1) {
            $("#btnPages_2_1").attr("disabled", false);
            $('#btnPages_2_2').attr("disabled", false);
        }
        if (nowPage[1] == nowPageGet - 1) {
            $("#btnPages_2_3").attr("disabled", true);
            $('#btnPages_2_4').attr("disabled", true);
        }
        nowPage[1]++;
        $("#ycp tbody").html("");
        SelectEquipData("ycp", "select");
    }
    else if (number == 3) {
        var nowPageGet = parseInt(document.getElementById("nowPage_count_3").innerHTML);
        if (nowPageGet == 1 || nowPageGet == 0) {
            $("#btnPages_3_3").attr("disabled", true);
            $('#btnPages_3_4').attr("disabled", true);
            return;
        }
        if (nowPage[2] == 1) {
            $('#btnPages_3_1').attr("disabled", false);
            $('#btnPages_3_2').attr("disabled", false);
        }
        if (nowPage[2] == nowPageGet - 1) {
            $("#btnPages_3_3").attr("disabled", true);
            $('#btnPages_3_4').attr("disabled", true);
        }
        nowPage[2]++;
        $("#yxp tbody").html("");
        SelectEquipData("yxp", "select");
    }
    else {
        var nowPageGet = parseInt(document.getElementById("nowPage_count_4").innerHTML);
        if (nowPageGet == 1 || nowPageGet == 0) {
            $("#btnPages_4_3").attr("disabled", true);
            $('#btnPages_4_4').attr("disabled", true);
            return;
        }
        if (nowPage[3] == 1) {
            $('#btnPages_4_1').attr("disabled", false);
            $('#btnPages_4_2').attr("disabled", false);
        }
        if (nowPage[3] == nowPageGet - 1) {
            $("#btnPages_4_3").attr("disabled", true);
            $('#btnPages_4_4').attr("disabled", true);
        }
        nowPage[3]++;
        $("#SetParm tbody").html("");
        SelectEquipData("SetParm", "select");
    }
}
//上一页
function pagLarclick(number) {
    if (number == 1) {
        var nowPageGet = parseInt(document.getElementById("nowPage_count_1").innerHTML);
        if (nowPageGet == 1) {
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
        $("#Equip tbody").html("");
        SelectEquipData("Equip", "select");
    }
    else if (number == 2) {
        var nowPageGet = parseInt(document.getElementById("nowPage_count_2").innerHTML);
        if (nowPageGet == 1) {
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
        $("#ycp tbody").html("");
        SelectEquipData("ycp", "select");
    }
    else if (number == 3) {
        var nowPageGet = parseInt(document.getElementById("nowPage_count_3").innerHTML);
        if (nowPageGet == 1) {
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
        $("#yxp tbody").html("");
        SelectEquipData("yxp", "select");
    }
    else {
        var nowPageGet = parseInt(document.getElementById("nowPage_count_4").innerHTML);
        if (nowPageGet == 1) {
            $("#btnPages_4_1").attr("disabled", true);
            $('#btnPages_4_2').attr("disabled", true);
            return;
        }
        if (nowPage[3] == 2) {
            $('#btnPages_4_1').attr("disabled", true);
            $('#btnPages_4_2').attr("disabled", true);
            $("#btnPages_4_3").attr("disabled", false);
            $('#btnPages_4_4').attr("disabled", false);
        }
        else {
            $('#btnPages_4_1').attr("disabled", false);
            $('#btnPages_4_2').attr("disabled", false);
            $("#btnPages_4_3").attr("disabled", false);
            $('#btnPages_4_4').attr("disabled", false);
        }
        nowPage[3]--;
        $("#SetParm tbody").html("");
        SelectEquipData("SetParm", "select");
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
        $("#Equip tbody").html("");
        SelectEquipData("Equip", "select");
    }
    else if (number == 2) {
        $('#btnPages_2_1').attr("disabled", true);
        $('#btnPages_2_2').attr("disabled", true);
        $("#btnPages_2_3").attr("disabled", false);
        $('#btnPages_2_4').attr("disabled", false);
        nowPage[1] = 1;
        $("#ycp tbody").html("");
        SelectEquipData("ycp", "select");
    }
    else if (number == 3) {
        $('#btnPages_3_1').attr("disabled", true);
        $('#btnPages_3_2').attr("disabled", true);
        $("#btnPages_3_3").attr("disabled", false);
        $('#btnPages_3_4').attr("disabled", false);
        nowPage[2] = 1;
        $("#yxp tbody").html("");
        SelectEquipData("yxp", "select");
    }
    else {
        $('#btnPages_4_1').attr("disabled", true);
        $('#btnPages_4_2').attr("disabled", true);
        $("#btnPages_4_3").attr("disabled", false);
        $('#btnPages_4_4').attr("disabled", false);
        nowPage[3] = 1;
        $("#SetParm tbody").html("");
        SelectEquipData("SetParm", "select");
    }
}
//尾页
function pagEnd(number) {
    if (number == 1) {
        var nowPageGet = parseInt(document.getElementById("nowPage_count_1").innerHTML);
        $('#btnPages_1_1').attr("disabled", false);
        $('#btnPages_1_2').attr("disabled", false);
        $("#btnPages_1_3").attr("disabled", true);
        $('#btnPages_1_4').attr("disabled", true);
        nowPage[0] = nowPageGet;
        $("#Equip tbody").html("");
        SelectEquipData("Equip", "select");
    }
    else if (number == 2) {
        var nowPageGet = parseInt(document.getElementById("nowPage_count_2").innerHTML);
        $('#btnPages_2_1').attr("disabled", false);
        $('#btnPages_2_2').attr("disabled", false);
        $("#btnPages_2_3").attr("disabled", true);
        $('#btnPages_2_4').attr("disabled", true);
        nowPage[1] = nowPageGet;
        $("#ycp tbody").html("");
        SelectEquipData("ycp", "select");
    }
    else if (number == 3) {
        var nowPageGet = parseInt(document.getElementById("nowPage_count_3").innerHTML);
        $('#btnPages_3_1').attr("disabled", false);
        $('#btnPages_3_2').attr("disabled", false);
        $("#btnPages_3_3").attr("disabled", true);
        $('#btnPages_3_4').attr("disabled", true);
        nowPage[2] = nowPageGet;
        $("#yxp tbody").html("");
        SelectEquipData("yxp", "select");
    }
    else {
        var nowPageGet = parseInt(document.getElementById("nowPage_count_4").innerHTML);
        $('#btnPages_4_1').attr("disabled", false);
        $('#btnPages_4_2').attr("disabled", false);
        $("#btnPages_4_3").attr("disabled", true);
        $('#btnPages_4_4').attr("disabled", true);
        nowPage[3] = nowPageGet;
        $("#SetParm tbody").html("");
        SelectEquipData("SetParm", "select");
    }
}
//跳页
function nowPage_goPageBtn(number) {
    var i = 0;
    var t_i = 0;
    $(".nav-tabList").find("li").each(function () {
        if ($(this).attr("class") == "active") {
            t_i = i;
        }
        i++;
    });
    if (t_i == 0) {
        var nowPageGet = parseInt(document.getElementById("nowPage_count_1").innerHTML);
        if (parseInt($("#nowPage_goPage_" + number).val()) > nowPageGet) {
            $("#nowPage_goPage_" + number).val(nowPageGet);
        }
        var value_tz = $("#nowPage_goPage_" + number).val();
        if (value_tz == "0") {
            value_tz = 1;
            $("#nowPage_goPage_" + number).val(value_tz);
        }
        nowPage[0] = value_tz;
        if (nowPage[0] == '1') {
            $("#btnPages_1_1").attr("disabled", true);
            $('#btnPages_1_2').attr("disabled", true);
            $("#btnPages_1_3").attr("disabled", false);
            $('#btnPages_1_4').attr("disabled", false);
        }
        else if (nowPage[0] == nowPageGet) {
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
        $("#Equip tbody").html("");
        SelectEquipData("Equip", "select");
    }
    else if (t_i == 1) {
        var nowPageGet = parseInt(document.getElementById("nowPage_count_2").innerHTML);
        if (parseInt($("#nowPage_goPage_" + number).val()) > nowPageGet) {
            $("#nowPage_goPage_" + number).val(nowPageGet);
        }
        var value_tz = $("#nowPage_goPage_" + number).val();
        if (value_tz == "0") {
            value_tz = 1;
            $("#nowPage_goPage_" + number).val(value_tz);
        }
        nowPage[1] = value_tz;
        if (nowPage[1] == '1') {
            $("#btnPages_2_1").attr("disabled", true);
            $('#btnPages_2_2').attr("disabled", true);
            $("#btnPages_2_3").attr("disabled", false);
            $('#btnPages_2_4').attr("disabled", false);
        }
        else if (nowPage[1] == nowPageGet) {
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
        $("#ycp tbody").html("");
        SelectEquipData("ycp", "select");
    }
    else if (t_i == 2) {
        var nowPageGet = parseInt(document.getElementById("nowPage_count_3").innerHTML);
        $('#btnPages_3_3').attr("disabled", false);
        $('#btnPages_3_4').attr("disabled", false);
        if (parseInt($("#nowPage_goPage_" + number).val()) > nowPageGet) {
            $("#nowPage_goPage_" + number).val(nowPageGet);
        }
        var value_tz = $("#nowPage_goPage_" + number).val();
        if (value_tz == "0") {
            value_tz = 1;
            $("#nowPage_goPage_" + number).val(value_tz);
        }
        nowPage[2] = value_tz;
        if (nowPage[2] == '1') {
            $("#btnPages_3_1").attr("disabled", true);
            $('#btnPages_3_2').attr("disabled", true);
            $("#btnPages_3_3").attr("disabled", false);
            $('#btnPages_3_4').attr("disabled", false);
        }
        else if (nowPage[2] == nowPageGet) {
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
        $("#yxp tbody").html("");
        SelectEquipData("yxp", "select");
    }
    else {
        var nowPageGet = parseInt(document.getElementById("nowPage_count_4").innerHTML);
        $('#btnPages_4_3').attr("disabled", false);
        $('#btnPages_4_4').attr("disabled", false);
        if (parseInt($("#nowPage_goPage_" + number).val()) > nowPageGet) {
            $("#nowPage_goPage_" + number).val(nowPageGet);
        }
        var value_tz = $("#nowPage_goPage_" + number).val();
        if (value_tz == "0") {
            value_tz = 1;
            $("#nowPage_goPage_" + number).val(value_tz);
        }
        nowPage[3] = value_tz;
        if (nowPage[3] == '1') {
            $("#btnPages_4_1").attr("disabled", true);
            $('#btnPages_4_2').attr("disabled", true);
            $("#btnPages_4_3").attr("disabled", false);
            $('#btnPages_4_4').attr("disabled", false);
        }
        else if (nowPage[3] == nowPageGet) {
            $("#btnPages_4_1").attr("disabled", false);
            $('#btnPages_4_2').attr("disabled", false);
            $("#btnPages_4_3").attr("disabled", true);
            $('#btnPages_4_4').attr("disabled", true);
        }
        else {
            $("#btnPages_4_1").attr("disabled", false);
            $('#btnPages_4_2').attr("disabled", false);
            $("#btnPages_4_3").attr("disabled", false);
            $('#btnPages_4_4').attr("disabled", false);
        }
        $("#SetParm tbody").html("");
        SelectEquipData("SetParm", "select");
    }
}

//是否报警
function alarmScheme_plug(alay, tableName, guids) {
    var alarm_schemeVar = new Array();
    if ((alay & 1) > 0) {
        alarm_schemeVar[0] = "<li><span>显示报警：</span><input id=\"alarm_plug_" + tableName + "_a_" + guids + "\" type=\"checkbox\" style=\"cursor:pointer;\" checked=\"checked\" onchange=\"onChangeList('" + tableName + "')\" /><div class=\"clear\"></div></li>";
    }
    else {
        alarm_schemeVar[0] = "<li><span>显示报警：</span><input id=\"alarm_plug_" + tableName + "_a_" + guids + "\" type=\"checkbox\" style=\"cursor:pointer;\" onchange=\"onChangeList('" + tableName + "')\" /><div class=\"clear\"></div></li>";
    }
    if ((alay & 2) > 0) {
        alarm_schemeVar[1] = "<li><span>记录报警：</span><input id=\"alarm_plug_" + tableName + "_b_" + guids + "\" type=\"checkbox\" style=\"cursor:pointer;\" checked=\"checked\" onchange=\"onChangeList('" + tableName + "')\" /><div class=\"clear\"></div></li>";
    }
    else {
        alarm_schemeVar[1] = "<li><span>记录报警：</span><input id=\"alarm_plug_" + tableName + "_b_" + guids + "\" type=\"checkbox\" style=\"cursor:pointer;\" onchange=\"onChangeList('" + tableName + "')\" /><div class=\"clear\"></div></li>";
    }
    for (var j = 0; j < AlarmProcTable.length; j++) {
        var alays = parseInt(AlarmProcTable[j][0]);
        if ((alay & alays) > 0) {
            var k = j + 2;
            alarm_schemeVar[k] = "<li><span>" + AlarmProcTable[j][1] + "：</span><input id=\"alarm_plug_" + tableName + "_" + j + "_" + guids + "\" type=\"checkbox\" style=\"cursor:pointer;\" checked=\"checked\" onchange=\"onChangeList('" + tableName + "')\" /><div class=\"clear\"></div></li>";
        }
        else {
            var k = j + 2;
            alarm_schemeVar[k] = "<li><span>" + AlarmProcTable[j][1] + "：</span><input id=\"alarm_plug_" + tableName + "_" + j + "_" + guids + "\" type=\"checkbox\" style=\"cursor:pointer;\" onchange=\"onChangeList('" + tableName + "')\" /><div class=\"clear\"></div></li>";
        }
    }
    return alarm_schemeVar;
}
//配置
function configData() {
    SelectCheckedEquip();
    if (selectEquip_Now == "") {
        return;
    }
    SelectEquipData("Equip", "config");
    SelectEquipData("ycp", "config");
    SelectEquipData("yxp", "config");
    SelectEquipData("SetParm", "config");
    var newDiv = document.createElement("div");
    newDiv.className = "fullScreenPopup";
    newDiv.id = "fullScreenPopup_Config";
    document.body.appendChild(newDiv);
    $(".fullScreenPopup").load("/Views/plug/System_config.html", function () {
        $(".fullScreenCenter").attr("style", "top:10%;" + window.localStorage.bgd);
        var firstTree = "active";
        var firstConfArray = null;
        for (var i = 0; i < confArry.length; i++) {
            if (confArry[i][2]) {
                $("#treeList_plug_equip").append("<li class='" + firstTree + "' onclick='onTreeList_plug(" + confArry[i][1] + ",this)'>" + confArry[i][0] + "</li>");

                for (var j = 0; j < ycpTable.length; j++) {
                    if (confArry[i][1] == ycpTable[j][0]) {
                        $("#ycp_plug_select").append("<option class='" + firstTree + "' values='" + confArry[i][1] + "'>" + confArry[i][0] + "</option>");
                        break;
                    }
                }

                for (var j = 0; j < yxpTable.length; j++) {
                    if (confArry[i][1] == yxpTable[j][0]) {
                        $("#yxp_plug_select").append("<option class='" + firstTree + "' values='" + confArry[i][1] + "'>" + confArry[i][0] + "</option>");
                        break;
                    }
                }
                
                for (var j = 0; j < SetParmTable.length; j++) {
                    if (confArry[i][1] == SetParmTable[j][0]) {
                        $("#SetParm_plug_select").append("<option class='" + firstTree + "' values='" + confArry[i][1] + "'>" + confArry[i][0] + "</option>");
                        break;
                    }
                }
                
                if (firstConfArray == null) {
                    firstConfArray = confArry[i][1];
                }
                firstTree = "";
            }
        }
        configEquip(firstConfArray);

        var firstList_ycp = $("#ycp_plug_select").find("option:first").attr("values");
        for (var i = 0; i < ycpTable.length; i++) {
            if (ycpTable[i][0] == firstList_ycp) {
                var guids = ycpTable[i][0] + "," + ycpTable[i][1];
                $("#treeList_plug_ycp").append("<li onclick='onTreeList_plug(\"" + guids + "\",this)' title='" + ycpTable[i][1] + "，" + ycpTable[i][2] + "'>" + ycpTable[i][2] + "</li>");
            }
        }

        var firstList_yxp = $("#yxp_plug_select").find("option:first").attr("values");
        for (var i = 0; i < yxpTable.length; i++) {
            if (yxpTable[i][0] == firstList_yxp) {
                var guids = yxpTable[i][0] + "," + yxpTable[i][1];
                $("#treeList_plug_yxp").append("<li onclick='onTreeList_plug(\"" + guids + "\",this)' title='" + yxpTable[i][1] + "，" + yxpTable[i][2] + "'>" + yxpTable[i][2] + "</li>");
            }
        }

        var firstList_SetParm = $("#SetParm_plug_select").find("option:first").attr("values");
        for (var i = 0; i < SetParmTable.length; i++) {
            if (SetParmTable[i][0] == firstList_SetParm) {
                var guids = SetParmTable[i][0] + "," + SetParmTable[i][1];
                $("#treeList_plug_SetParm").append("<li onclick='onTreeList_plug(\"" + guids + "\",this)' title='" + SetParmTable[i][1] + "，" + SetParmTable[i][2] + "'>" + SetParmTable[i][2] + "</li>");
            }
        }

        $("#btnModalUsing").bind("click", onUsingModals);
        $(".advancedSetparm").bind("click", onAdvtoggle);

        $("#btnModalSave").bind("click", onSaveModals);
        $('.system_plug_list').mCustomScrollbar(scrollbarStyle); 
        $('.system_plug_Data_ul').mCustomScrollbar(scrollbarStyle);
        $('.system_plug_Data').mCustomScrollbar(scrollbarStyle);
    });
}
//配置设备表
function configEquip(dt) {
    for (var i = 0; i < equipTable.length; i++) {
        if (equipTable[i][0] == dt) {
            $("#sys_plug_eq_1").html(equipTable[i][0]);
            $("#sys_plug_eq_2").val(equipTable[i][1]);
            $("#sys_plug_eq_3").val(equipTable[i][2]);

            $("#sys_plug_eq_4").html("");
            $("#sys_plug_eq_4").append("<option values=''></option>");
            for (var j = 0; j < GW_VideoInfoData.length; j++) {
                if (equipTable[i][3] == GW_VideoInfoData[j][0]) {
                    $("#sys_plug_eq_4").append("<option values='" + GW_VideoInfoData[j][0] + "' selected>" + GW_VideoInfoData[j][1] + "</option>");
                }
                else {
                    $("#sys_plug_eq_4").append("<option values='" + GW_VideoInfoData[j][0] + "'>" + GW_VideoInfoData[j][1] + "</option>");
                }
            }

            $("#sys_plug_eq_5").html("");
            $("#sys_plug_eq_5").append("<option values=''></option>");
            for (var j = 0; j < GWZiChanData.length; j++) {
                if (equipTable[i][4] == GWZiChanData[j][0]) {
                    $("#sys_plug_eq_5").append("<option values='" + GWZiChanData[j][0] + "' selected>" + GWZiChanData[j][1] + "</option>");
                }
                else {
                    $("#sys_plug_eq_5").append("<option values='" + GWZiChanData[j][0] + "'>" + GWZiChanData[j][1] + "</option>");
                }
            }

            $("#sys_plug_eq_6").html("");
            $("#sys_plug_eq_6").append("<option values=''></option>");
            for (var j = 0; j < GWPlanData.length; j++) {
                if (equipTable[i][5] == GWPlanData[j][0]) {
                    $("#sys_plug_eq_6").append("<option values='" + GWPlanData[j][0] + "' selected>" + GWPlanData[j][0] + "</option>");
                }
                else {
                    $("#sys_plug_eq_6").append("<option values='" + GWPlanData[j][0] + "'>" + GWPlanData[j][0] + "</option>");
                }
            }

            $("#plug_Equip_alarm").html("");
            var alarm_schemeVar = alarmScheme_plug(equipTable[i][equipTable[i].length - 1], "Equip", equipTable[i][0]);
            for (var j = 0; j < alarm_schemeVar.length; j++) {
                $("#plug_Equip_alarm").append(alarm_schemeVar[j]);
            }

            //详细页
            for (var j = 6; j < equipTable[i].length; j++) {
                $("#sys_plug_eq_" + (j + 1)).val(equipTable[i][j]);
            }
        }
    }
}
//配置遥测量
function configycp(dt) {
    for (var i = 0; i < ycpTable.length; i++) {
        if (dt == ycpTable[i][0] + "," + ycpTable[i][1]) {
            $("#sys_plug_ycp_1").html(ycpTable[i][0]);
            $("#sys_plug_ycp_2").html(ycpTable[i][1]);
            for (var j = 3; j < 10; j++) {
                $("#sys_plug_ycp_" + j).val(ycpTable[i][j - 1]);
            }

            $("#sys_plug_ycp_10").html("");
            $("#sys_plug_ycp_10").append("<option values=''></option>");
            for (var j = 0; j < GW_VideoInfoData.length; j++) {
                if (ycpTable[i][9] == GW_VideoInfoData[j][0]) {
                    $("#sys_plug_ycp_10").append("<option values='" + GW_VideoInfoData[j][0] + "' selected>" + GW_VideoInfoData[j][1] + "</option>");
                }
                else {
                    $("#sys_plug_ycp_10").append("<option values='" + GW_VideoInfoData[j][0] + "'>" + GW_VideoInfoData[j][1] + "</option>");
                }
            }

            $("#sys_plug_ycp_11").html("");
            $("#sys_plug_ycp_11").append("<option values=''></option>");
            for (var j = 0; j < GWZiChanData.length; j++) {
                if (ycpTable[i][10] == GWZiChanData[j][0]) {
                    $("#sys_plug_ycp_11").append("<option values='" + GWZiChanData[j][0] + "' selected>" + GWZiChanData[j][1] + "</option>");
                }
                else {
                    $("#sys_plug_ycp_11").append("<option values='" + GWZiChanData[j][0] + "'>" + GWZiChanData[j][1] + "</option>");
                }
            }

            $("#sys_plug_ycp_12").html("");
            $("#sys_plug_ycp_12").append("<option values=''></option>");
            for (var j = 0; j < GWPlanData.length; j++) {
                if (ycpTable[i][11] == GWPlanData[j][0]) {
                    $("#sys_plug_ycp_12").append("<option values='" + GWPlanData[j][0] + "' selected>" + GWPlanData[j][0] + "</option>");
                }
                else {
                    $("#sys_plug_ycp_12").append("<option values='" + GWPlanData[j][0] + "'>" + GWPlanData[j][0] + "</option>");
                }
            }
            if (ycpTable[i][12] == "True" || ycpTable[i][12] == "true") {
                document.getElementById("sys_plug_ycp_13").checked = true;
            }
            else {
                document.getElementById("sys_plug_ycp_13").checked = false;
            }
            $("#plug_ycp_alarm").html("");
            var alarm_schemeVar = alarmScheme_plug(ycpTable[i][ycpTable[i].length - 1], "ycp", ycpTable[i][0]);
            for (var j = 0; j < alarm_schemeVar.length; j++) {
                $("#plug_ycp_alarm").append(alarm_schemeVar[j]);
            }

            //详细页
            if (ycpTable[i][13] == "True" || ycpTable[i][13] == "true") {
                document.getElementById("sys_plug_ycp_14").checked = true;
            }
            else {
                document.getElementById("sys_plug_ycp_14").checked = false;
            }
            for (var j = 14; j < ycpTable[i].length; j++) {
                $("#sys_plug_ycp_" + (j + 1)).val(ycpTable[i][j]);
            }
        }
    }
}
//配置遥信量
function configyxp(dt) {
    for (var i = 0; i < yxpTable.length; i++) {
        if (dt == yxpTable[i][0] + "," + yxpTable[i][1]) {
            $("#sys_plug_yxp_1").html(yxpTable[i][0]);
            $("#sys_plug_yxp_2").html(yxpTable[i][1]);
            for (var j = 3; j < 7; j++) {
                $("#sys_plug_yxp_" + j).val(yxpTable[i][j - 1]);
            }

            $("#sys_plug_yxp_7").html("");
            $("#sys_plug_yxp_7").append("<option values=''></option>");
            for (var j = 0; j < GW_VideoInfoData.length; j++) {
                if (yxpTable[i][6] == GW_VideoInfoData[j][0]) {
                    $("#sys_plug_yxp_7").append("<option values='" + GW_VideoInfoData[j][0] + "' selected>" + GW_VideoInfoData[j][1] + "</option>");
                }
                else {
                    $("#sys_plug_yxp_7").append("<option values='" + GW_VideoInfoData[j][0] + "'>" + GW_VideoInfoData[j][1] + "</option>");
                }
            }

            $("#sys_plug_yxp_8").html("");
            $("#sys_plug_yxp_8").append("<option values=''></option>");
            for (var j = 0; j < GWZiChanData.length; j++) {
                if (yxpTable[i][7] == GWZiChanData[j][0]) {
                    $("#sys_plug_yxp_8").append("<option values='" + GWZiChanData[j][0] + "' selected>" + GWZiChanData[j][1] + "</option>");
                }
                else {
                    $("#sys_plug_yxp_8").append("<option values='" + GWZiChanData[j][0] + "'>" + GWZiChanData[j][1] + "</option>");
                }
            }

            $("#sys_plug_yxp_9").html("");
            $("#sys_plug_yxp_9").append("<option values=''></option>");
            for (var j = 0; j < GWPlanData.length; j++) {
                if (yxpTable[i][8] == GWPlanData[j][0]) {
                    $("#sys_plug_yxp_9").append("<option values='" + GWPlanData[j][0] + "' selected>" + GWPlanData[j][0] + "</option>");
                }
                else {
                    $("#sys_plug_yxp_9").append("<option values='" + GWPlanData[j][0] + "'>" + GWPlanData[j][0] + "</option>");
                }
            }
            $("#plug_yxp_alarm").html("");
            var alarm_schemeVar = alarmScheme_plug(yxpTable[i][yxpTable[i].length - 1], "yxp", yxpTable[i][0]);
            for (var j = 0; j < alarm_schemeVar.length; j++) {
                $("#plug_yxp_alarm").append(alarm_schemeVar[j]);
            }

            //详细页
            if (yxpTable[i][9] == "True" || yxpTable[i][13] == "true") {
                document.getElementById("sys_plug_yxp_10").checked = true;
            }
            else {
                document.getElementById("sys_plug_yxp_10").checked = false;
            }
            for (var j = 10; j < yxpTable[i].length; j++) {
                $("#sys_plug_yxp_" + (j + 1)).val(yxpTable[i][j]);
            }
        }
    }
}
//配置设置表
function configSetParm(dt) {
    for (var i = 0; i < SetParmTable.length; i++) {
        if (dt == SetParmTable[i][0] + "," + SetParmTable[i][1]) {
            $("#sys_plug_SetParm_1").html(SetParmTable[i][0]);
            $("#sys_plug_SetParm_2").html(SetParmTable[i][1]);
            $("#sys_plug_SetParm_3").val(SetParmTable[i][2]);
            $("#sys_plug_SetParm_4").val(SetParmTable[i][8]);

            //详细页
            $("#sys_plug_SetParm_5").val(SetParmTable[i][3]);
            $("#sys_plug_SetParm_6").val(SetParmTable[i][7]);
            $("#sys_plug_SetParm_7").val(SetParmTable[i][4]);
            $("#sys_plug_SetParm_8").val(SetParmTable[i][5]);

            if (SetParmTable[i][6] == "True" || SetParmTable[i][6] == "true") {
                document.getElementById("sys_plug_SetParm_9").checked = true;
            }
            else {
                document.getElementById("sys_plug_SetParm_9").checked = false;
            }
            if (SetParmTable[i][9] == "True" || SetParmTable[i][9] == "true") {
                document.getElementById("sys_plug_SetParm_10").checked = true;
            }
            else {
                document.getElementById("sys_plug_SetParm_10").checked = false;
            }
        }
    }
}

//单击列表
function onTreeList_plug(dt, dthis) {
    $(dthis).parent().find("li").removeClass("active");
    $(dthis).addClass("active");
    if ($(dthis).parent().attr("id") == "treeList_plug_equip") {
        configEquip(dt);
    }
    else if ($(dthis).parent().attr("id") == "treeList_plug_ycp") {
        configycp(dt);
    }
    else if ($(dthis).parent().attr("id") == "treeList_plug_yxp") {
        configyxp(dt);
    }
    else {
        configSetParm(dt);
    }
}

//选中设备,设置其遥测量、遥信量、设置配置
function sys_plug_change(dt) {
    if ($(dt).attr("id") == "ycp_plug_select") {
        $("#treeList_plug_ycp").html("");
        var opts = $(dt).find("option:selected").attr("values");
        for (var i = 0; i < ycpTable.length; i++) {
            if (ycpTable[i][0] == opts) {
                var guids = ycpTable[i][0] + "," + ycpTable[i][1];
                $("#treeList_plug_ycp").append("<li onclick='onTreeList_plug(\"" + guids + "\",this)' title='" + ycpTable[i][1] + "，" + ycpTable[i][2] + "'>" + ycpTable[i][2] + "</li>");
            }
        }
    }
    else if ($(dt).attr("id") == "yxp_plug_select") {
        $("#treeList_plug_yxp").html("");
        var opts = $(dt).find("option:selected").attr("values");
        for (var i = 0; i < yxpTable.length; i++) {
            if (yxpTable[i][0] == opts) {
                var guids = yxpTable[i][0] + "," + yxpTable[i][1];
                $("#treeList_plug_yxp").append("<li onclick='onTreeList_plug(\"" + guids + "\",this)' title='" + yxpTable[i][1] + "，" + yxpTable[i][2] + "'>" + yxpTable[i][2] + "</li>");
            }
        }
    }
    else {
        $("#treeList_plug_SetParm").html("");
        var opts = $(dt).find("option:selected").attr("values");
        for (var i = 0; i < SetParmTable.length; i++) {
            if (SetParmTable[i][0] == opts) {
                var guids = SetParmTable[i][0] + "," + SetParmTable[i][1];
                $("#treeList_plug_SetParm").append("<li onclick='onTreeList_plug(\"" + guids + "\",this)' title='" + SetParmTable[i][1] + "，" + SetParmTable[i][2] + "'>" + SetParmTable[i][2] + "</li>");
            }
        }
    }
}

//高级配置
function onAdvtoggle() {
    var tabNames = $(this).attr("values");
    $("#commonlyList_" + tabNames).toggle();
    $("#advancedList_" + tabNames).toggle();
}
//更改事件
function onChangeList(dt) {
    var dts = dt.split('_');
    $("#commonlyList_" + dts[0]).attr("changes", "true");
    if (dts[1] == "adv") {
        $("#advancedList_" + dts[0]).attr("changes", "true");
    }
    $("#btnModalUsing").attr("disabled", false);
}

//确定
function onSaveModals() {
    onUsingModals();
    onCencel('fullScreenPopup_Config');
}

//应用
function onUsingModals() {
    $("#btnModalUsing").html("操作中");
    $("#btnModalUsing").attr("disabled", true);
    if ($("#commonlyList_Equip").attr("changes") == "true") {
        if ($("#advancedList_Equip").attr("changes") == "true") {
            saveDataEquip("adv");
            $("#advancedList_Equip").attr("changes", "");
        }
        else {
            saveDataEquip("");
        }
        $("#commonlyList_Equip").attr("changes", "");
    }
    if ($("#commonlyList_ycp").attr("changes") == "true") {
        if ($("#advancedList_ycp").attr("changes") == "true") {
            saveDataYcp("adv");
            $("#advancedList_ycp").attr("changes", "");
        }
        else {
            saveDataYcp("");
        }
        $("#commonlyList_ycp").attr("changes", "");
    }
    if ($("#commonlyList_yxp").attr("changes") == "true") {
        if ($("#advancedList_yxp").attr("changes") == "true") {
            saveDataYxp("adv");
            $("#advancedList_yxp").attr("changes", "");
        }
        else {
            saveDataYxp("");
        }
        $("#commonlyList_yxp").attr("changes", "");
    }
    if ($("#commonlyList_SetParm").attr("changes") == "true") {
        if ($("#advancedList_SetParm").attr("changes") == "true") {
            saveDataSetParm("adv");
            $("#advancedList_SetParm").attr("changes", "");
        }
        else {
            saveDataSetParm("");
        }
        $("#commonlyList_SetParm").attr("changes", "");
    }
}

//保存equip表
function saveDataEquip(dt) {
    var updateJSON = [];
    var updateStrListName = new Array("equip_nm", "related_pic", "related_video", "ZiChanID", "PlanNo", "equip_detail", "acc_cyc", "proc_advice", "out_of_contact", "contacted", "event_wav", "communication_drv", "local_addr", "equip_addr", "communication_param", "communication_time_param", "AlarmRiseCycle", "raw_equip_no", "tabname", "attrib", "SafeTime", "alarm_scheme");
    var equipId = $("#sys_plug_eq_1").text();
    for (var i = 0; i < 2; i++) {
        var newRow = { id: equipId, listName: updateStrListName[i], vlaue: "'" + $("#sys_plug_eq_" + (i + 2)).val() + "'" };
        updateJSON.push(newRow);
    }
    for (var i = 2; i < 5; i++) {
        var newRow = { id: equipId, listName: updateStrListName[i], vlaue: "'" + $("#sys_plug_eq_" + (i + 2)).find("option:selected").attr("values") + "'" };
        updateJSON.push(newRow);
    }

    var alarmSche = 0;
    if (document.getElementById("alarm_plug_Equip_a_" + equipId).checked) {
        alarmSche += 1;
    }
    if (document.getElementById("alarm_plug_Equip_b_" + equipId).checked) {
        alarmSche += 2;
    }
    for (var k = 0; k < AlarmProcTable.length; k++) {
        if (document.getElementById("alarm_plug_Equip_" + k + "_" + equipId).checked) {
            alarmSche += parseInt(AlarmProcTable[k][0]);
        }
    }
    var newRowAlarm = { id: equipId, listName: updateStrListName[updateStrListName.length - 1], vlaue: alarmSche };
    updateJSON.push(newRowAlarm);

    //详细页
    if (dt == "adv") {
        for (var i = 5; i < updateStrListName.length - 1; i++) {
            var newRow = { id: equipId, listName: updateStrListName[i], vlaue: "'" + $("#sys_plug_eq_" + (i + 2)).val() + "'" };
            updateJSON.push(newRow);
        }
    }

    JSONToService_SYS(updateJSON, "Equip");
}

//保存ycp表
function saveDataYcp(dt) {
    var updateJSON = [];
    var updateStrListName = new Array("yc_nm", "val_min", "restore_min", "restore_max", "val_max", "unit", "related_pic", "related_video", "ZiChanID", "PlanNo", "curve_rcd", "mapping", "curve_limit", "yc_min", "yc_max", "physic_min", "physic_max", "val_trait", "main_instruction", "minor_instruction", "alarm_acceptable_time", "restore_acceptable_time", "alarm_repeat_time", "proc_advice", "lvl_level", "AlarmRiseCycle", "outmin_evt", "outmax_evt", "wave_file", "alarm_shield", "SafeTime", "alarm_scheme");
    var equipId = $("#sys_plug_ycp_1").text();
    var yc_Id = $("#sys_plug_ycp_2").text();
    var newRow1 = { id: equipId, yc_no: yc_Id, listName: updateStrListName[0], vlaue: "'" + $("#sys_plug_ycp_3").val() + "'" };
    updateJSON.push(newRow1);
    for (var i = 1; i < 5; i++) {
        var newRow = { id: equipId, yc_no: yc_Id, listName: updateStrListName[i], vlaue: $("#sys_plug_ycp_" + (i + 3)).val() };
        updateJSON.push(newRow);
    }
    for (var i = 5; i < 7; i++) {
        var newRow = { id: equipId, yc_no: yc_Id, listName: updateStrListName[i], vlaue: "'" + $("#sys_plug_ycp_" + (i + 3)).val() + "'" };
        updateJSON.push(newRow);
    }
    for (var i = 7; i < 10; i++) {
        var newRow = { id: equipId, yc_no: yc_Id, listName: updateStrListName[i], vlaue: "'" + $("#sys_plug_ycp_" + (i + 3)).find("option:selected").attr("values") + "'" };
        updateJSON.push(newRow);
    }

    if (document.getElementById("sys_plug_ycp_13").checked) {
        var newRow = { id: equipId, yc_no: yc_Id, listName: updateStrListName[10], vlaue: true };
        updateJSON.push(newRow);
    }
    else {
        var newRow = { id: equipId, yc_no: yc_Id, listName: updateStrListName[10], vlaue: false };
        updateJSON.push(newRow);
    }

    var alarmSche = 0;
    if (document.getElementById("alarm_plug_ycp_a_" + equipId).checked) {
        alarmSche += 1;
    }
    if (document.getElementById("alarm_plug_ycp_b_" + equipId).checked) {
        alarmSche += 2;
    }
    for (var k = 0; k < AlarmProcTable.length; k++) {
        if (document.getElementById("alarm_plug_ycp_" + k + "_" + equipId).checked) {
            alarmSche += parseInt(AlarmProcTable[k][0]);
        }
    }
    var newRowAlarm = { id: equipId, yc_no: yc_Id, listName: updateStrListName[updateStrListName.length - 1], vlaue: alarmSche };
    updateJSON.push(newRowAlarm);

    //详细页
    if (dt == "adv") {
        if (document.getElementById("sys_plug_ycp_14").checked) {
            var newRow = { id: equipId, yc_no: yc_Id, listName: updateStrListName[11], vlaue: true };
            updateJSON.push(newRow);
        }
        else {
            var newRow = { id: equipId, yc_no: yc_Id, listName: updateStrListName[11], vlaue: false };
            updateJSON.push(newRow);
        }

        for (var i = 12; i < 18; i++) {
            var newRow = { id: equipId, yc_no: yc_Id, listName: updateStrListName[i], vlaue: $("#sys_plug_ycp_" + (i + 3)).val() };
            updateJSON.push(newRow);
        }

        for (var i = 18; i < 20; i++) {
            var newRow = { id: equipId, yc_no: yc_Id, listName: updateStrListName[i], vlaue: "'" + $("#sys_plug_ycp_" + (i + 3)).val() + "'" };
            updateJSON.push(newRow);
        }

        for (var i = 20; i < 23; i++) {
            var newRow = { id: equipId, yc_no: yc_Id, listName: updateStrListName[i], vlaue: $("#sys_plug_ycp_" + (i + 3)).val() };
            updateJSON.push(newRow);
        }

        for (var i = 23; i < 24; i++) {
            var newRow = { id: equipId, yc_no: yc_Id, listName: updateStrListName[i], vlaue: "'" + $("#sys_plug_ycp_" + (i + 3)).val() + "'" };
            updateJSON.push(newRow);
        }

        for (var i = 24; i < 26; i++) {
            var newRow = { id: equipId, yc_no: yc_Id, listName: updateStrListName[i], vlaue: $("#sys_plug_ycp_" + (i + 3)).val() };
            updateJSON.push(newRow);
        }

        for (var i = 26; i < updateStrListName.length - 1; i++) {
            var newRow = { id: equipId, yc_no: yc_Id, listName: updateStrListName[i], vlaue: "'" + $("#sys_plug_ycp_" + (i + 3)).val() + "'" };
            updateJSON.push(newRow);
        }
    }
    JSONToService_SYS(updateJSON, "ycp");
}

//保存ycp表
function saveDataYxp(dt) {
    var updateJSON = [];
    var updateStrListName = new Array("yx_nm", "evt_01", "evt_10", "related_pic", "related_video", "ZiChanID", "PlanNo", "inversion", "proc_advice_r", "proc_advice_d", "level_r", "level_d", "initval", "val_trait", "main_instruction", "minor_instruction", "alarm_acceptable_time", "restore_acceptable_time", "alarm_repeat_time", "wave_file", "alarm_shield", "AlarmRiseCycle", "SafeTime", "alarm_scheme");
    var equipId = $("#sys_plug_yxp_1").text();
    var yx_Id = $("#sys_plug_yxp_2").text();
    for (var i = 0; i < 4; i++) {
        var newRow = { id: equipId, yx_no: yx_Id, listName: updateStrListName[i], vlaue: "'" + $("#sys_plug_yxp_" + (i + 3)).val() + "'" };
        updateJSON.push(newRow);
    }

    for (var i = 4; i < 7; i++) {
        var newRow = { id: equipId, yx_no: yx_Id, listName: updateStrListName[i], vlaue: "'" + $("#sys_plug_yxp_" + (i + 3)).find("option:selected").attr("values") + "'" };
        updateJSON.push(newRow);
    }

    var alarmSche = 0;
    if (document.getElementById("alarm_plug_yxp_a_" + equipId).checked) {
        alarmSche += 1;
    }
    if (document.getElementById("alarm_plug_yxp_b_" + equipId).checked) {
        alarmSche += 2;
    }
    for (var k = 0; k < AlarmProcTable.length; k++) {
        if (document.getElementById("alarm_plug_yxp_" + k + "_" + equipId).checked) {
            alarmSche += parseInt(AlarmProcTable[k][0]);
        }
    }
    var newRowAlarm = { id: equipId, yx_no: yx_Id, listName: updateStrListName[updateStrListName.length - 1], vlaue: alarmSche };
    updateJSON.push(newRowAlarm);

    //详细页
    if (dt == "adv") {
        if (document.getElementById("sys_plug_yxp_10").checked) {
            var newRow = { id: equipId, yx_no: yx_Id, listName: updateStrListName[7], vlaue: true };
            updateJSON.push(newRow);
        }
        else {
            var newRow = { id: equipId, yx_no: yx_Id, listName: updateStrListName[7], vlaue: false };
            updateJSON.push(newRow);
        }

        for (var i = 8; i < 10; i++) {
            var newRow = { id: equipId, yx_no: yx_Id, listName: updateStrListName[i], vlaue: "'" + $("#sys_plug_yxp_" + (i + 3)).val() + "'" };
            updateJSON.push(newRow);
        }

        for (var i = 10; i < 14; i++) {
            var newRow = { id: equipId, yx_no: yx_Id, listName: updateStrListName[i], vlaue: $("#sys_plug_yxp_" + (i + 3)).val() };
            updateJSON.push(newRow);
        }

        for (var i = 14; i < 16; i++) {
            var newRow = { id: equipId, yx_no: yx_Id, listName: updateStrListName[i], vlaue: "'" + $("#sys_plug_yxp_" + (i + 3)).val() + "'" };
            updateJSON.push(newRow);
        }

        for (var i = 16; i < 19; i++) {
            var newRow = { id: equipId, yx_no: yx_Id, listName: updateStrListName[i], vlaue: $("#sys_plug_yxp_" + (i + 3)).val() };
            updateJSON.push(newRow);
        }

        for (var i = 19; i < 21; i++) {
            var newRow = { id: equipId, yx_no: yx_Id, listName: updateStrListName[i], vlaue: "'" + $("#sys_plug_yxp_" + (i + 3)).val() + "'" };
            updateJSON.push(newRow);
        }

        for (var i = 21; i < 22; i++) {
            var alarmRiseCycle = $("#sys_plug_yxp_" + (i + 3)).val();
            if (alarmRiseCycle == "") {
                alarmRiseCycle = 0;
            }
            var newRow = { id: equipId, yx_no: yx_Id, listName: updateStrListName[i], vlaue: alarmRiseCycle };
            updateJSON.push(newRow);
        }

        for (var i = 22; i < updateStrListName.length - 1; i++) {
            var newRow = { id: equipId, yx_no: yx_Id, listName: updateStrListName[i], vlaue: "'" + $("#sys_plug_yxp_" + (i + 3)).val() + "'" };
            updateJSON.push(newRow);
        }
    }

    JSONToService_SYS(updateJSON, "yxp");
}

//保存SetParm表
function saveDataSetParm(dt) {
    var updateJSON = [];
    var updateStrListName = new Array("[set_nm]", "[set_type]", "[main_instruction]", "[minor_instruction]", "[record]", "[action]", "[value]", "[canexecution]");
    var equipId = $("#sys_plug_SetParm_1").text();
    var setParm_Id = $("#sys_plug_SetParm_2").text();
    var set_nm = { id: equipId, SetParm_ID: setParm_Id, listName: updateStrListName[0], vlaue: "'" + $("#sys_plug_SetParm_3").val() + "'" };
    updateJSON.push(set_nm);

    var values = { id: equipId, SetParm_ID: setParm_Id, listName: updateStrListName[6], vlaue: "'" + $("#sys_plug_SetParm_4").val() + "'" };
    updateJSON.push(values);

    //详细页
    if (dt == "adv") {
        var set_type = { id: equipId, SetParm_ID: setParm_Id, listName: updateStrListName[1], vlaue: "'" + $("#sys_plug_SetParm_5").val() + "'" };
        updateJSON.push(set_type);

        var action = { id: equipId, SetParm_ID: setParm_Id, listName: updateStrListName[5], vlaue: "'" + $("#sys_plug_SetParm_6").val() + "'" };
        updateJSON.push(action);

        var main_instruction = { id: equipId, SetParm_ID: setParm_Id, listName: updateStrListName[2], vlaue: "'" + $("#sys_plug_SetParm_7").val() + "'" };
        updateJSON.push(main_instruction);

        var minor_instruction = { id: equipId, SetParm_ID: setParm_Id, listName: updateStrListName[3], vlaue: "'" + $("#sys_plug_SetParm_8").val() + "'" };
        updateJSON.push(minor_instruction);

        if (document.getElementById("sys_plug_SetParm_9").checked) {
            var newRow = { id: equipId, SetParm_ID: setParm_Id, listName: updateStrListName[4], vlaue: true };
            updateJSON.push(newRow);
        }
        else {
            var newRow = { id: equipId, SetParm_ID: setParm_Id, listName: updateStrListName[4], vlaue: false };
            updateJSON.push(newRow);
        }

        if (document.getElementById("sys_plug_SetParm_10").checked) {
            var newRow = { id: equipId, SetParm_ID: setParm_Id, listName: updateStrListName[7], vlaue: true };
            updateJSON.push(newRow);
        }
        else {
            var newRow = { id: equipId, SetParm_ID: setParm_Id, listName: updateStrListName[7], vlaue: false };
            updateJSON.push(newRow);
        }
    }

    JSONToService_SYS(updateJSON, "SetParm");
}

//执行更改操作
function JSONToService_SYS(updateJSON, tableName) {
    if (updateJSON != null) {
        var jsonStr = JSON.stringify(updateJSON);
        var _url = "";
        if (tableName == "Equip") {
            _url = service + "/SystemEquipChange";
        }
        else if (tableName == "ycp") {
            _url = service + "/SystemYcpChange";
        }
        else if (tableName == "yxp") {
            _url = service + "/SystemYxpChange";
        }
        else if (tableName == "SetParm") {
            _url = service + "/SystemSetParmChange";
        }
        var _data = "jsonChange=" + jsonStr;
        function _successf(data) {
            var resultJs = $(data).children("string").text();
            if (resultJs == "true") {
                console.log(tableName + "，修改成功");
            }
            else if (resultJs == "false") {
                console.log(tableName + "，未修改成功");
            }
            else {
                console.log(tableName + "，部分修改成功");
            }
            $("#btnModalUsing").html("应用");
        }
        JQajaxo("post", _url, false, _data, _successf);
    }
}