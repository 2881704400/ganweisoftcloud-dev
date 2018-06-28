var equip_nos = 0;
onloadContent();
var getWebUser, ServerHub = null;
function onloadContent() {
    $(".main").attr("value", "1");
    $('.tree').mCustomScrollbar(scrollbarStyle);
    $.ajax({
        type: "post",
        url: service + "/UserPermissions",
        data: "userName=" + window.localStorage.userName,
        success: function (dt) {
            getWebUser = $(dt).children("UserItem");
            allEquipSatatus();
            connect();
        }
    });
}
//创建Socket连接
function connect() {
    ServerHub = null;
    ServerHub = $.connection.serverHub;
    //监听所有设备报警状态
    ServerHub.client.sendEquipSingle = function (data) {
        var dts = data.split(',');
        $('#rt_list_' + dts[0]).children('span').children('img').attr('src', '/Image/alarm/' + dts[2] + '.png');
        allTreeAlarm();
    };
    ServerHub.client.sendConnect = function (data) {
        //console.log(data);
        data = null;
    };

    ServerHub.client.sendAll = function (data, name) {
        ycyxDataAll(data, name);
    };

    ServerHub.client.sendYcpSingle = function (data) {
        //console.log(data);
        ycpSingleData(data);
    }

    ServerHub.client.sendYxpSingle = function (data) {
        yxpSingleData(data);
    }

    $.connection.hub.start().done(function () {
        ServerHub.server.connect();
        ServerHub.server.listenEquipAll(window.localStorage.ac_appkey, window.localStorage.ac_infokey);
    });
    $.connection.hub.disconnected(function () {
        //console.log('已断开');
    });

    $.connection.hub.connectionSlow(function () {
        //console.log('当客户端检测到慢速或频繁下降连接时引发。');
    });
    $.connection.hub.received(function () {
        //console.log('在连接上接收到任何数据时引发。提供接收数据。');
    });
    $.connection.hub.reconnecting(function () {
        //console.log('当底层传输开始重新连接。');
        initEnsureChonglian(function () {
            $.connection.hub.stop();
            if ($('.main').attr('value') == '1') {
                $.connection.hub.start().done(function () {
                    ServerHub.server.connect();
                    ServerHub.server.listenEquipAll(window.localStorage.ac_appkey, window.localStorage.ac_infokey);
                    ServerHub.server.startListen(equip_nos, window.localStorage.ac_appkey, window.localStorage.ac_infokey);
                });
            }
        });
    });
    $.connection.hub.stateChanged(function () {
        //console.log('当连接状态改变时引发。提供旧状态和新状态（连接，连接，连接，或断开）。');
    });
}

//判断父节点下的子节点是否有报警
function allTreeAlarm() {
    $('#treelist').find('li').each(function () {
        if ($(this).hasClass('parent_li')) {
            var t = $(this);
            var alarmNum = 0;
            $(this).children('ul').children('li').each(function () {
                var alarm = $(this).children('span').children('img').attr('src').split('/')[3].split('.')[0];
                if (alarm == 'HaveAlarm') {
                    alarmNum++;
                }
            });
            if (alarmNum > 0) {
                $(this).children('span').children('img').attr('src', '/Image/alarm/HaveAlarm.png');
            }
            else {
                $(this).children('span').children('img').attr('src', '/Image/alarm/CommunicationOK.png');
            }
        }
    });
}

var AllEquipStat;
//获取所有设备和状态
function allEquipSatatus() {
    AllEquipStat = null;
    var _url = service + "/GetEquipAllState";
    JQajaxo("post", _url, true, "", _successf);
    function _successf(data) {
        var resultStr = $(data).children("string").text();
        if (resultStr != 'false') {
            AllEquipStat = resultStr.split(';');
            treeConfList2();
        }
    }
}
var GetEquipTreeLists2;
//获取设备列表（设备数据）
function treeConfList2() {
    var _url = service + "/GWEquipTree";
    JQajaxo("post", _url, true, "", _successf);
    function _successf(e) {
        var str = $(e).children('string').text();
        if (str != 'false') {
            var newRow = $('<li class="parent_li"></li>');
            var span = $('<span></span>');
            span.append('<i class="iconfont icon-jian"></i> ');
            span.append('<img id="imgConf_0" src="/Image/alarm/CommunicationOK.png">');
            span.append('<b>' + $(str).attr('name') + '</b>');

            var ul = $('<ul></ul>');
            GetEquipTreeLists2 = null;
            GetEquipTreeLists2 = str;
            $(str).children('GWEquipTreeItem').each(function () {
                var len = $(this).children('GWEquipTreeItem').length;
                var name = $(this).attr('name');
                var equip_no = $(this).attr('EquipNo');
                treeHTML(len, name, equip_no, ul);
            });

            ul.find('img').each(function () {
                var t = $(this).attr('src').split('/')[3].split('.')[0];
                if (t != 'CommunicationOK') {
                    span.children('img').attr('src', '/Image/alarm/HaveAlarm.png');
                    return false;
                }
            });
            newRow.append(span);
            newRow.append(ul);
            $("#treelist").append(newRow);

            $('#treelist').find('ul').each(function () {
                if ($(this).attr('equiplist') != 'true') {
                    $(this).parent().remove();
                }
            });
            onloadTree("#treelist");//树状列表初始化
        }
    }
}

//添加节点到html
function treeHTML(len, name, equip_no, thisDom) {
    var newRow = "";
    if (len > 0) {
        var alarm = selectAlarm(name);
        var alarmClass = '';
        if (alarm > 0) {
            alarmClass = 'HaveAlarm';
        }
        else {
            alarmClass = 'CommunicationOK';
        }
        newRow += "<li class=\"parent_li\"><span>";
        newRow += "<i class=\"iconfont icon-jian\"></i> ";
        newRow += "<img src=\"/Image/alarm/" + alarmClass + ".png\">";
        newRow += "<b>" + name + "</b>";
        newRow += "</span><ul></ul>";
        newRow += "</li>";

        var $newRows = $(newRow);
        var doms = selectDom(name);
        doms.each(function () {
            var len = $(this).children('GWEquipTreeItem').length;
            var name = $(this).attr('name');
            var equip_no = $(this).attr('EquipNo');
            treeHTML(len, name, equip_no, $newRows.children('ul'));
        })

        if (alarm > 0) {
            thisDom.prepend($newRows);
        }
        else {
            thisDom.append($newRows);
        }
    }
    else {
        if (Browse_Equip_List(equip_no) || Browse_SpecialEquip_List(equip_no, false)) {
            for (var i = 0; i < AllEquipStat.length; i++) {
                var allEquipStat = AllEquipStat[i].split(',');
                if (equip_no == allEquipStat[0]) {
                    if (name == '') {
                        name = allEquipStat[1];
                    }
                    newRow = '';
                    newRow += "<li id='rt_list_" + equip_no + "'><span onclick='onTreeSpan(this," + equip_no + ")'>";
                    newRow += "<img src=\"/Image/alarm/" + allEquipStat[2] + ".png\">";
                    newRow += "<b>" + name + "</b>";
                    newRow += "</span>";
                    newRow += "</li>";
                    if (allEquipStat[2] == 'HaveAlarm') {
                        thisDom.prepend(newRow);
                    }
                    else {
                        thisDom.append(newRow);
                    }
                }
            }
            if (newRow == "") {
                newRow += "<li id='rt_list_" + equip_no + "'><span>";
                newRow += "<img src=\"/Image/alarm/NoCommunication.png\">";
                newRow += "<b>" + name + "</b>";
                newRow += "</span><ul></ul>";
                newRow += "</li>";
                thisDom.append(newRow);
            }
            thisDom.attr('equiplist', 'true');
        }
    }
}
//搜索节点
function selectDom(name) {
    var selectDomRT = null;
    $(GetEquipTreeLists2).find('GWEquipTreeItem').each(function () {
        if ($(this).attr('Name') == name) {
            selectDomRT = $(this).children('GWEquipTreeItem');
        }
    });
    return selectDomRT;
}
//搜索节点是否有报警
function selectAlarm(name) {
    var $selectDomRT = null;
    $(GetEquipTreeLists2).find('GWEquipTreeItem').each(function () {
        if ($(this).attr('Name') == name) {
            $selectDomRT = $(this);
        }
    });
    var equip_alarm = 0; 
    $selectDomRT.find('GWEquipTreeItem').each(function () {
        var equip_nos = $(this).attr('EquipNo');
        for (var i = 0; i < AllEquipStat.length; i++) {
            var allEquipStat = AllEquipStat[i].split(',');
            if (equip_nos == allEquipStat[0]) {
                if (allEquipStat[2] != 'CommunicationOK') {
                    equip_alarm++;
                }

            }
        }
    });
    return equip_alarm;
}

//可查看设备
function Browse_Equip_List(equips) {
    var equipBool = false;
    if (getWebUser.find("IsAdministrator").text() != "true") {
        getWebUser.find("RoleItem").each(function () {
            $(this).find("Browse_Equip_List").find("int").each(function () {
                if (equips == $(this).text()) {
                    equipBool = true;
                }
            });
        });
    }
    else {
        equipBool = true;
    }
    return equipBool;
}
//可查看设备(子集)
function Browse_SpecialEquip_List(equips, num) {
    var equipBool = false;
    if (getWebUser.find("IsAdministrator").text() != "true") {
        getWebUser.find("RoleItem").each(function () {
            $(this).find("Browse_SpecialEquip_List").find("string").each(function () {
                if (equips == $(this).text().split('.')[0]) {
                    if (num != false) {
                        if ($(this).text().split('.')[1] == num) {
                            equipBool = true;
                        }
                    }
                    else {
                        equipBool = true;
                    }
                }
            });
        });
    }
    else {
        equipBool = true;
    }
    return equipBool;
}
//可控制设备
function Control_Equip_List(equips) {
    var equipBool = false;
    if (getWebUser.find("IsAdministrator").text() != "true") {
        getWebUser.find("RoleItem").each(function () {
            $(this).find("Control_Equip_List").find("int").each(function () {
                if (equips == $(this).text()) {
                    equipBool = true;
                }
            });
        });
    }
    else {
        equipBool = true;
    }
    return equipBool;
}
//可控制设备（子集）
function Control_SetItem_List(equips, num) {
    var equipBool = false;
    if (getWebUser.find("IsAdministrator").text() != "true") {
        getWebUser.find("RoleItem").each(function () {
            $(this).find("Control_SetItem_List").find("string").each(function () {
                if (equips == $(this).text().split('.')[0]) {
                    if (num != false) {
                        if ($(this).text().split('.')[1] == num) {
                            equipBool = true;
                        }
                    }
                    else {
                        equipBool = true;
                    }
                }
            });
        });
    }
    else {
        equipBool = true;
    }
    return equipBool;
}

function tabAndTable(countAll, equip_no) {
    $('#tabInfor').html('');
    equip_nos = equip_no;
    var tab = [], table = [];
    if (countAll[0] > 0) {
        var tableDiv = 'tableYcp';
        var newTab = {
            href: '#' + tableDiv,
            name: '模拟量'
        }
        tab.push(newTab);
        var newTable = {
            id: tableDiv,
            th: ['报警状态','模拟量编号','模拟量名称','实时值','曲线','处理意见'],
            tableID:'tableYcpID'
        }
        table.push(newTable);
    }
    if (countAll[1] > 0) {
        var tableDiv = 'tableYxp';
        var newTab = {
            href: '#' + tableDiv,
            name: '状态量'
        }
        tab.push(newTab);
        var newTable = {
            id: tableDiv,
            th: ['报警状态', '状态量编号', '状态量名称', '实时状态', '处理意见'],
            tableID: 'tableYxpID'
        }
        table.push(newTable);
    }
    if (countAll[2] > 0) {
        var tableDiv = 'tableSet';
        var newTab = {
            href: '#' + tableDiv,
            name: '设置'
        }
        tab.push(newTab);
        var newTable = {
            id: tableDiv,
            th: ['设置命令'],
            tableID: 'tableSetID'
        }
        table.push(newTable);
    }
    $('#tabInfor').tabAndTable({
        tab: tab,
        table: table,
        callBack: function () {
            $.connection.hub.stop();
            $.connection.hub.start().done(function () {
                ServerHub.server.connect();
                ServerHub.server.listenEquipAll(window.localStorage.ac_appkey, window.localStorage.ac_infokey);
                ServerHub.server.startListen(equip_nos, window.localStorage.ac_appkey, window.localStorage.ac_infokey);
            });
            if (countAll[2] > 0) {
                setTodata(equip_no);
            }
        }
    });
}

//单击设备列表事件
function onTreeSpan(dt, equip_no) {
    $('#treelist').find('span').removeClass('active');
    $(dt).addClass('active');
    var _urlCount = service + "/EquipItemCount";
    var _dataCount = "equip_no=" + equip_no + "&&userName=" + window.localStorage.userName;
    function _callBackCount(dataCount) {
        var dataCountStr = $(dataCount).children("string").text();
        if (dataCountStr != "false") {
            var useraCount = JSON.parse(dataCountStr);
            var countAll = [];
            for (var i = 0; i < useraCount.length; i++) {
                countAll.push(parseInt(useraCount[i].count));
            }
            tabAndTable(countAll, equip_no);//载入tab和table表
        }
    }
    JQajaxo("post", _urlCount, true, _dataCount, _callBackCount);
}

var ycpRt = new Array();
//载入ycp,yxp测点的所有数据
function ycyxDataAll(data, name) {
    var usera = JSON.parse(data);
    if (name == 'ycp') {
        $("#tableYcpID tbody").html("");
        ycpRt = new Array();
        for (var i = 0; i < usera.length; i++) {
            var userc = jsonYcp(usera[i]);
            var newRow = $("<tr id='ycno_" + userc[3] + "'></tr>");
            if (userc[0] == "False") {
                isAlarms = "<img src=\"/Image/alarm/CommunicationOK.png\">";
                newRow.append("<td status='" + userc[0] + "'>" + isAlarms + "</td>");
            }
            else {
                isAlarms = "<img src=\"/Image/alarm/HaveAlarm.png\">";
                newRow.append("<td status='" + userc[0] + "'>" + isAlarms + "</td>");
            }
            newRow.append("<td>" + userc[3] + "</td>");
            newRow.append("<td>" + userc[1] + "</td>");
            newRow.append("<td>" + userc[2] + userc[5] + "</td>");
            newRow.append("<td><button class='btn btns-style-4' onclick=\"curveBox(" + userc[3] + ",'" + userc[1] + "')\"><i class='iconfont icon-quxiantu'></i></button></td>");
            newRow.append("<td>" + userc[4] + "</td>");
            ycpRt[i] = {
                id: userc[3],
                value: userc[2]
            };
            if (userc[0] == "False") {
                $("#tableYcpID tbody:last").append(newRow);
            }
            else {
                $("#tableYcpID tbody").prepend(newRow);
            }
        }
    }
    else {
        $("#tableYxpID tbody").html("");
        for (var i = 0; i < usera.length; i++) {
            var userc = jsonYxp(usera[i]);
            var newRow = $("<tr id='yxno_" + userc[3] + "'></tr>");
            if (userc[0] == "False") {
                var isAlarms = "<img src=\"/Image/alarm/CommunicationOK.png\">";
                newRow.append("<td status='" + userc[0] + "'>" + isAlarms + "</td>");
            }
            else {
                var isAlarms = "<img src=\"/Image/alarm/HaveAlarm.png\">";
                newRow.append("<td status='" + userc[0] + "'>" + isAlarms + "</td>");
            }
            newRow.append("<td>" + userc[3] + "</td>");
            newRow.append("<td>" + userc[1] + "</td>");
            newRow.append("<td>" + userc[2] + "</td>");
            newRow.append("<td>" + userc[4] + "</td>");
            if (userc[0] == "False") {
                $("#tableYxpID tbody:last").append(newRow);
            }
            else {
                $("#tableYxpID tbody").prepend(newRow);
            }
        }
    }
    data = null;
    $('.tableAuto').mCustomScrollbar(scrollbarStyle);
}
function jsonYcp(dt) {
    var userc = new Array(dt.m_IsAlarm, dt.m_YCNm, dt.m_YCValue, dt.m_iYCNo, dt.m_AdviceMsg, dt.m_Unit);
    return userc;
}
function jsonYxp(dt) {
    var userc = new Array(dt.m_IsAlarm, dt.m_YXNm, dt.m_YXState, dt.m_iYXNo, dt.m_AdviceMsg);
    return userc;
}

//监听ycp测点
function ycpSingleData(data) {
    var dt = data.split(',');
    if ($('#ycno_' + dt[0]).length < 1) {
        $.connection.hub.stop();
        return;
    }
    $('#ycno_' + dt[0]).find('td').each(function (i) {
        if (i == 0 && dt[4] != $(this).attr('status')) {
            if (dt[4] == "False") {
                $(this).find('img').attr('src', '/Image/alarm/CommunicationOK.png');
            }
            else {
                $(this).find('img').attr('src', '/Image/alarm/HaveAlarm.png');
            }
            $(this).attr('status', dt[4]);
        }
        if (i == 3) {
            if ($(this).prev().text() == dt[1]) {
                for (var j = 0; j < ycpRt.length; j++) {
                    if (dt[0] == ycpRt[j].id) {
                        ycpRt[j].value = dt[2];
                    }
                }
                $(this).html(dt[2] + dt[5]);
            }
        }
    });
}
//监听yxp测点
function yxpSingleData(data) {
    var dt = data.split(',');
    if ($('#yxno_' + dt[0]).length < 1) {
        $.connection.hub.stop();
        return;
    }
    $('#yxno_' + dt[0]).find('td').each(function (i) {
        if (i == 0 && dt[4] != $(this).attr('status')) {
            if (dt[4] == "False") {
                $(this).find('img').attr('src', '/Image/alarm/CommunicationOK.png');
            }
            else {
                $(this).find('img').attr('src', '/Image/alarm/HaveAlarm.png');
            }
            $(this).attr('status', dt[4]);
        }
        if (i == 3) {
            $(this).html(dt[2]);
        }
    });
}

//获取设置表数据
function setTodata(confNum) {
    if (Control_Equip_List(confNum) || Control_SetItem_List(confNum, false)) {
        $("#tableSetID tbody").html("");
        var _url = service + "/GetSystemConfig";
        var _dataSet = "equip_no_list=" + confNum + "&&table_name=SetParm";
        JQajaxo("post", _url, false, _dataSet, _successfSet);
        function _successfSet(data) {
            var resultJs = $(data).children("string").text();
            if (resultJs != "false" && resultJs != "") {
                jsonTobtn(resultJs, confNum);
            }
        }
    }  
}

//创建设置表按钮
function jsonTobtn(data, confarr) {
    var usera = JSON.parse(data);
    for (var i = 0; i < usera.length; i++) {
        var userb = usera[i];
        var userc = new Array(userb.set_nm, userb.main_instruction, userb.minor_instruction, userb.value, userb.set_type);
        var set_nos1 = Control_Equip_List(confarr);
        var set_nos2 = Control_SetItem_List(confarr, userb.set_no);
        if (set_nos1 || set_nos2) {
            var newRow = "<tr><td><button class=\"btn btns-style-4\" onclick=\"onSetClickBtn(" + confarr + ",'" + userc[1] + "','" + userc[2] + "','" + userc[3] + "','" + userc[0] + "','" + userc[4] + "')\">" + userc[0] + "</button></td></tr>";
            $("#tableSetID tbody:last").append(newRow);
        }
    }
}
//设置命令
function onSetClickBtn(str_1, str_2, str_3, str_4, btnName, str_5) {
    var newDiv = document.createElement("div");
    newDiv.className = "fullScreenPopup";
    newDiv.id = "fullScreenPopup_SetBtn";
    var newContainer = "<div class='fullScreenAll' onclick='onFullScreenAll(this)'></div><div class='fullScreenCenter bounceInDown animated mg-default' style='" + $("html").attr("style") + "'>";
    newContainer += "<div class='MessageBox_top'><span>提示</span><button class='MessageBox_top_Exit btns-style-6' onclick='onCencel(\"" + newDiv.id + "\")'><i class='iconfont icon-guanbi'></i></button></div>";
    newContainer += "<p class='MessageBox_p1'>操作命令：" + btnName + "</p>";
    if (str_5 == "V") {
        newContainer += "<p class='MessageBox_p2'><span>设置值：</span><input id='setValues' type='text' class='input' style='margin-top:6px;' value='" + str_4 + "' /></p>";
    }
    else {
        newContainer += "<p class='MessageBox_p2'>确定进行控制操作吗？</p>";
    }
    newContainer += "<p class='MessageBox_p3'><button class='btn btns-style-1' onclick='onSetCommand(\"" + str_1 + "\",\"" + str_2 + "\",\"" + str_3 + "\",\"" + str_4 + "\",\"" + newDiv.id + "\")'>确定</button><button  class='btn btns-style-1' onclick='onCencel(\"" + newDiv.id + "\")'>取消</button></p>";
    newContainer += "</div>";
    newDiv.innerHTML = newContainer;
    document.body.appendChild(newDiv);
}

//设置命令-确定
function onSetCommand(str_1, str_2, str_3, str_4, dt) {
    var vals = "";
    if (str_4 == "") {
        vals = $("#setValues").val();
    }
    else {
        vals = str_4;
    }
    var userName = window.localStorage.userName;
    if (userName == null || userName == "") {
        userName = window.sessionStorage.userName;
    }
    var _url = service + "/SetupsCommand";
    var _dataSet = "equip_no=" + encodeURIComponent(str_1) + "&&main_instruction=" + encodeURIComponent(str_2) + "&&minor_instruction=" + encodeURIComponent(str_3) + "&&value=" + encodeURIComponent(vals) + "&&user_name=" + encodeURIComponent(userName);
    JQajaxo("post", _url, false, _dataSet, _successfSet);
    function _successfSet(data) {
        var resultJs = $(data).children("string").text();
        if (resultJs != "false") {
            $(".MessageBox_p2").html("设置成功！");
            $(".MessageBox_p3").hide();
            setTimeout(function () {
                onCencel(dt);
            }, 1000);
        }
    }
}

//曲线点数量
var curveDrop = -19;
//动态数据
var dynamicCurve;
//实时曲线
function curveBox(number, name) {
    var newDiv = document.createElement("div");
    newDiv.className = "fullScreenPopup";
    newDiv.id = "fullScreenPopup_Dynamic";
    var newContainer = "<div class='fullScreenAll' onclick='onFullScreenAll(this)'></div><div class='fullScreenCenter bounceInDown animated mg-lg' style='top:10%;" + $("html").attr("style") + "'>";
    newContainer += "<div class='MessageBox_top'><span>实时曲线</span><button class='MessageBox_top_Exit btns-style-6' onclick='onCencel(\"" + newDiv.id + "\")'><i class='iconfont icon-guanbi'></i></button></div>";
    newContainer += "<div id='highcharts'></div>";
    newContainer += "</div>";
    newDiv.innerHTML = newContainer;
    document.body.appendChild(newDiv);
    Highcharts.setOptions({
        global: {
            useUTC: false
        }
    });
    var colors = $('body').css('color');
    var charts = $('#highcharts').highcharts({
        chart: {
            type: 'spline',
            animation: Highcharts.svg, // don't animate in old IE
            marginRight: 10,
            events: {
                load: function () {
                    clearInterval(dynamicCurve);
                    var series = this.series[0];
                    var yVals = parseFloat(ycpRTValue(number));
                    var x = (new Date()).getTime(), y = yVals;
                    series.addPoint([x, y], true, true);
                    dynamicCurve = setInterval(function () {
                        if ($('#highcharts').length < 1) {
                            clearInterval(dynamicCurve);
                            return;
                        }
                        var yVals = parseFloat(ycpRTValue(number));
                        var x = (new Date()).getTime(), y = yVals;
                        series.addPoint([x, y], true, true);
                    }, 3000);
                }
            },
            backgroundColor: 'none'
        },
        title: {
            text: '' + name,
            style: {
                color: colors
            }
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 140,
            style: {
                color: colors
            },
            labels: {
                style: {
                    color: colors
                }
            }
        },
        yAxis: {
            title: {
                text: '',
                style: {
                    color: colors
                }
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }],
            labels: {
                style: {
                    color: colors
                }
            }
        },
        tooltip: {
            formatter: function () {
                return '<b>' + this.series.name + '</b><br/>' +
                Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                Highcharts.numberFormat(this.y, 2);
            }
        },
        legend: {
            enabled: false
        },
        exporting: {
            enabled: false
        },
        series: [{
            name: '当前值：',
            data: (function () {
                var data = [],
                    time = (new Date()).getTime(),
                    i;
                for (i = curveDrop, j = 0; i <= 0; i++, j++) {
                    data.push({
                        x: time + i * 1000,
                        y: null
                        //y: parseInt(100 * Math.random())
                    });
                }
                return data;
            })()
        }]
    });
}

function ycpRTValue(number) {
    var ycpRts = 0.0;
    for (var j = 0; j < ycpRt.length; j++) {
        if (number == ycpRt[j].id) {
            ycpRts = ycpRt[j].value;
        }
    }
    return ycpRts;
}