function RealTime() {
    if ($("#conf_tree").find("li").length == 0) {
        allEquipSatatus();
    }
    $$('#rt_content_ref').on("ptr:refresh", refresh_rt);

    toolbarActive('RealTimeTool');
}

function refresh_rt(e) {
    setTimeout(function () {
        initEnsureChonglian(function () {
            allEquipSatatus();
        });
        myApp.ptr.done();
    }, 2000);
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
            treeConfList();
        }
    }
}
var GetEquipTreeLists2;
//获取设备列表（设备数据）
function treeConfList() {
    var _url = service + "/GWEquipTree";
    JQajaxo("post", _url, true, "", _successf);
    function _successf(e) {
        var str = $(e).children('string').text();
        if (str != 'false') {
            document.getElementById('conf_tree').innerHTML = '';
            GetEquipTreeLists2 = null;
            GetEquipTreeLists2 = str;
            $(str).children('GWEquipTreeItem').each(function () {
                var len = $(this).children('GWEquipTreeItem').length;
                var name = $(this).attr('name');
                var equip_no = $(this).attr('EquipNo');
                treeHTML(len, name, equip_no, $('#conf_tree'));
            });
        }

        $('#conf_tree').find('li').each(function () {
            if ($(this).hasClass('items')) {
                $(this).children('a').click();
            }
        });
        $('#conf_tree').find('li').each(function () {
            if ($(this).hasClass('items')) {
                $(this).children('a').click();
            }
        });
        $('#conf_tree').find('ul').each(function () {
            if ($(this).attr('equiplist') != 'true') {
                $(this).parent().parent().parent().remove();
            }
        });
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
        newRow += "<li class=\"items\"><a href=\"#\" onclick='onTreePar(this,\"" + name + "\")' class=\"item-link item-content\">";
        newRow += "<div class=\"item-media\"><i class=\"iconfont icon-xiayiye rt_listIcon\"></i><img src=\"/Image/alarm/" + alarmClass + ".png\"></div>";
        newRow += "<div class=\"item-inner\"><div class=\"item-title\">" + name + "</div></div></a>";
        newRow += "<div class=\"\"><div class=\"list-block\"><ul></ul></div></div>";
        newRow += "</li>";
        if (alarm > 0) {
            thisDom.prepend(newRow);
        }
        else {
            thisDom.append(newRow);
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
                    newRow += "<li id='rt_list_" + equip_no + "'><a onclick='realShows(" + equip_no + ",\"" + name + "\")' class=\"item-link item-content no-animation\">";
                    newRow += "<div class=\"item-media\"><img id=\"imgConf_" + equip_no + "\" src=\"/Image/alarm/" + allEquipStat[2] + ".png\"></div>";
                    newRow += "<div class=\"item-inner\"><div class=\"item-title\">" + name + "</div></div>";
                    newRow += "</a></li>";
                    if (allEquipStat[2] == 'HaveAlarm') {
                        thisDom.prepend(newRow);
                    }
                    else {
                        thisDom.append(newRow);
                    }
                }
            }
            if (newRow == "") {
                newRow += "<li id='rt_list_" + equip_no + "'><a class=\"item-link item-content no-animation\">";
                newRow += "<div class=\"item-media\"><img id=\"imgConf_" + equip_no + "\" src=\"/Image/alarm/NoCommunication.png\"></div>";
                newRow += "<div class=\"item-inner\"><div class=\"item-title\">" + name + "</div></div>";
                newRow += "</a></li>";
                thisDom.append(newRow);
            }
            thisDom.attr('equiplist', 'true');
        }
    }
}
//展开节点
function onTreePar(dt, name) {
    if ($(dt).next().find('ul').children('li').length == 0) {
        var doms = selectDom(name); 
        doms.each(function () {
            var len = $(this).children('GWEquipTreeItem').length;
            var name = $(this).attr('name');
            var equip_no = $(this).attr('EquipNo');
            treeHTML(len, name, equip_no, $(dt).next().children('div').children('ul'));
        });
        $(dt).find('i').toggleClass('icon-triangle-bottom');
    }
    else {
        $(dt).next().toggle();
        $(dt).find('i').toggleClass('icon-triangle-bottom');
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

//单击列表打开设备信息
function realShows(equip_no, name) {
    console.log(333)
    var _urlCount = service + "/EquipItemCount";
    var _dataCount = "equip_no=" + equip_no + "&&userName=" + window.localStorage.userName;
    function _callBackCount(dataCount) {
        var dataCountStr = $$(dataCount).children("string").text();
        if (dataCountStr != "false") {
            var useraCount = JSON.parse(dataCountStr);
            var countAll = [];
            for (var i = 0; i < useraCount.length; i++) {
                countAll.push(parseInt(useraCount[i].count));
            }
            realHtmls(countAll, equip_no, name);
        }
    }
    JQajaxo("post", _urlCount, true, _dataCount, _callBackCount);
}
//配置tab页json数据
function tabListJsons(countAll) {
    var tabList = [];
    if (countAll[0] > 0) {
        tabList.push({
            id: 'tabYcps',
            href: 'tabContentYcps',
            name: '模拟量',
            tableID: 'tableYcps',
            tableThead: ['状态', '模拟量名称', '实时值', '曲线'],
            onRefresh: function (e) {
                $(e.srcElement).css('overflow', 'initial');
                setTimeout(function () {
                    $(e.srcElement).css('overflow', 'auto'); 
                    var equip_no = $("#" + titleStatID).attr('equip_no');
                    serviceDatas(null, equip_no);
                    myApp.ptr.done();
                }, 2000);
            }
        });
    }
    if (countAll[1] > 0) {
        tabList.push({
            id: 'tabYxps',
            href: 'tabContentYxps',
            name: '状态量',
            tableID: 'tableYxps',
            tableThead: ['状态', '状态量名称', '实时状态'],
            onRefresh: function (e) {
                $(e.srcElement).css('overflow', 'initial');
                setTimeout(function () {
                    $(e.srcElement).css('overflow', 'auto');
                    var equip_no = $("#" + titleStatID).attr('equip_no');
                    serviceDatas(null, equip_no);
                    myApp.ptr.done();
                }, 2000);
            }
        });
    }
    if (countAll[2] > 0) {
        tabList.push({
            id: 'tabSets',
            href: 'tabContentSets',
            name: '设置',
            tableID: 'tableSets',
            tableThead: ['设置命令'],
        });
    }
    return tabList;
}
var titleStatID;//设备状态
function realHtmls(countAll, equip_no, name) {
   
    titleStatID = 'titleStats';//设备状态
    var tabList = null;
    if (countAll != null) {
        tabList = tabListJsons(countAll);//tab页列表
    }

    var contentID = 'tabListRT';
     console.log(222);
    $(this).viewShow({

        id: 'RealTimeList',
        title: name,
        titleID: titleStatID,
        leftOnClick: function () {
            //setTimeout(allEquipSatatus,3000);
        },
        contents: {
            id: contentID,
            content: ''
        },
        pageCallBack: function () {
            $('#' + contentID).html('');
            console.log(1)
            $('#' + contentID).tabAndTable({
                tabList: tabList,
                initRefresh: true,
                callBack: function () {
                    serviceDatas(tabList, equip_no);
                }
            });
        }
    });
}

//获取数据
function serviceDatas(tabList, equip) {
    console.log(22233)
    var expression = '$E(' + equip + ')';
    var _urlExpre = service + "/ExpressionEval";
    var _dataExpre = "expression=" + expression + "&&userName=" + window.localStorage.userName;
    function _successExpre(data) {
        var text = $(data).text();
        var textAlarm = '';
        switch (text) {
            case '0': textAlarm = '未通讯'; break;
            case '1': textAlarm = '正常'; break;
            case '2': textAlarm = '有报警'; break;
            case '3': textAlarm = '正在进行设置'; break;
            case '4': textAlarm = '正在初始化'; break;
            case '5': textAlarm = '撤防';
        }
        $('#' + titleStatID).attr('equip_no', equip);
        $('#' + titleStatID).attr('textAlarm', text);
        if (tabList != null) {
            tableFills(equip, text, tabList);//第一次载入数据
        }
        else {
            refreshDatas();//刷新数据
        }
    }
    JQajaxo("post", _urlExpre, true, _dataExpre, _successExpre);
}

//获取遥测表、遥信表的数据
function tableFills(equip, alarm, tabList) {
    var _url = service + "/GetRealTimeData";
    var tabListID = [];
    for (var i = 0; i < tabList.length; i++) {
        if (tabList[i] != null) {
            if (tabList[i].name == '模拟量') {
                tabListID[0] = tabList[i].tableID;
                var _dataYcp = "equip_no=" + equip + "&&table_name=ycp";
                JQajaxo("post", _url, true, _dataYcp, _successfYcp);
                $('#' + tabList[i].href).attr('titleID', tabList[0].titleID);
            }
            else if (tabList[i].name == '状态量') {
                tabListID[1] = tabList[i].tableID;
                var _dataYxp = "equip_no=" + equip + "&&table_name=yxp";
                JQajaxo("post", _url, true, _dataYxp, _successfYxp);
                $('#' + tabList[i].href).attr('titleID', tabList[0].titleID);
            }
            else {
                setTodata(equip, tabList[i].tableID);
            }
        }
    }

    function _successfYcp(data) {
        var resultJs = $(data).children("string").text();
        if (resultJs != "false") {
            jsonTodata(resultJs, "ycp", alarm, tabListID[0]);
        }
    }

    function _successfYxp(data) {
        var resultJs = $(data).children("string").text();
        if (resultJs != "false") {
            jsonTodata(resultJs, "yxp", alarm, tabListID[1]);
        }
    }
}
//创建遥测表，遥信表
function jsonTodata(data, tableName, alarm, tabLists) {
    var usera = JSON.parse(data);
    if (tableName == "ycp") {
        $("#" + tabLists + " tbody").html("");
        for (var i = 0; i < usera.length; i++) {
            var userb = usera[i];
            var userc = new Array(userb.m_IsAlarm, userb.m_YCNm, userb.m_YCValue, userb.m_iYCNo, userb.m_AdviceMsg, userb.m_Unit);
            dataCurve[i] = new Array(userb.m_YCValue, userb.m_Unit);
            var newRow = $("<tr></tr>");
            var alarmImg = '';
            if (alarm != '0') {
                if (userc[0] == 'False' || userc[0] == false) {
                    alarmImg = 'CommunicationOK';
                }
                else {
                    alarmImg = 'HaveAlarm';
                }
            }
            else {
                alarmImg = 'HaveAlarm';
            }
            newRow.append("<td id='m_alarmycps_" + i + "'><img src=\"/Image/alarm/" + alarmImg + ".png\"></td>");

            newRow.append("<td>" + userc[1] + "</td>");
            newRow.append("<td id='valueycps_" + i + "'>" + userc[2] + userc[5] + "</td>");
            newRow.append("<td><a href='#' class='button' onclick=\"curveBox(" + i + ",'" + userc[1] + "',this)\"><i class='iconfont icon-quxiantu'></i></a></td>");
            if (alarmImg == 'HaveAlarm') {
                $("#" + tabLists + " tbody").prepend(newRow);
            }
            else {
                $("#" + tabLists + " tbody:last").append(newRow);
            }
        }
    }
    else {
        $("#" + tabLists + " tbody").html("");
        for (var j = 0; j < usera.length; j++) {
            var userb = usera[j];
            var userc = new Array(userb.m_IsAlarm, userb.m_YXNm, userb.m_YXState, userb.m_iYXNo, userb.m_AdviceMsg);
            var newRow = $("<tr></tr>");
            var alarmImg = '';
            if (alarm != '0') {
                if (userc[0] == 'False' || userc[0] == false) {
                    alarmImg = 'CommunicationOK';
                }
                else {
                    alarmImg = 'HaveAlarm';
                }
            }
            else {
                alarmImg = 'HaveAlarm';
            }
            newRow.append("<td id='m_alarmyxps_" + j + "'><img src=\"/Image/alarm/" + alarmImg + ".png\"></td>");

            newRow.append("<td>" + userc[1] + "</td>");
            newRow.append("<td id='valueyxps_" + j + "'>" + userc[2] + "</td>");
            if (alarmImg == 'HaveAlarm') {
                $("#" + tabLists + " tbody").prepend(newRow);
            }
            else {
                $("#" + tabLists + " tbody:last").append(newRow);
            }
        }
    }
}

//刷新遥测表，遥信表数据
function refreshDatas() {
    var equip_no = $('#' + titleStatID).attr('equip_no');
    if (equip_no == undefined) {
        return;
    }
    var alarm = $('#' + titleStatID).attr('textAlarm');
    var _url = service + "/GetRealTimeData";
    var _dataYcp = "equip_no=" + equip_no + "&&table_name=ycp";
    JQajaxo("post", _url, true, _dataYcp, _successfYcp);
    var _dataYxp = "equip_no=" + equip_no + "&&table_name=yxp";
    JQajaxo("post", _url, true, _dataYxp, _successfYxp);
    function _successfYcp(data) {
        var resultJs = $(data).children("string").text();
        if (resultJs != "false") {
            ycpToHtml(resultJs);
        }
    }
    function _successfYxp(data) {
        var resultJs = $(data).children("string").text();
        if (resultJs != "false") {
            yxpToHtml(resultJs);
        }
    }

    function ycpToHtml(data) {
        var usera = JSON.parse(data);
        for (var i = 0; i < usera.length; i++) {
            var userb = usera[i];
            var userc = new Array(userb.m_IsAlarm, userb.m_YCValue, userb.m_AdviceMsg, userb.m_YCNm, userb.m_Unit);
            dataCurve[i] = new Array(userb.m_YCValue, userb.m_Unit);
            var alarmImg = '';
            if (alarm != '0') {
                if (userc[0] == 'False' || userc[0] == false) {
                    alarmImg = 'CommunicationOK';
                }
                else {
                    alarmImg = 'HaveAlarm';
                }
            }
            else {
                alarmImg = 'HaveAlarm';
            }
            $('#m_alarmycps_' + i).find('img').attr('src', '/Image/alarm/' + alarmImg + '.png');
            $("#valueycps_" + i).html(userc[1] + userc[4]);
            if (alarmImg == 'HaveAlarm') {//有报警置顶
                var dom = $("#valueycps_" + i).parent();
                var doms = dom.parent();
                dom.remove();
                doms.prepend(dom);
            }
        }
    }

    function yxpToHtml(data) {
        var usera = JSON.parse(data);
        for (var i = 0; i < usera.length; i++) {
            var userb = usera[i];
            var userc = new Array(userb.m_IsAlarm, userb.m_YXState, userb.m_AdviceMsg);
            var alarmImg = '';
            if (alarm != '0') {
                if (userc[0] == 'False' || userc[0] == false) {
                    alarmImg = 'CommunicationOK';
                }
                else {
                    alarmImg = 'HaveAlarm';
                }
            }
            else {
                alarmImg = 'HaveAlarm';
            }
            $('#m_alarmyxps_' + i).find('img').attr('src', '/Image/alarm/' + alarmImg + '.png');
            $("#valueyxps_" + i).html(userc[1]);
            if (alarmImg == 'HaveAlarm') {
                var dom = $("#valueyxps_" + i).parent();
                var doms = dom.parent();
                dom.remove();
                doms.prepend(dom);
            }
        }
    }
}

//获取设置表数据
function setTodata(equip, tabLists) {
    $("#" + tabLists).parent().addClass("tableAuto3");
    if (Control_Equip_List(equip) || Control_SetItem_List(equip, false)) {
        var _url = service + "/GetSystemConfig";
        var _dataSet = "equip_no_list=" + equip + "&&table_name=SetParm";
        JQajaxo("post", _url, true, _dataSet, _successfSet);
        function _successfSet(data) {
            $("#" + tabLists + " tbody").html("");
            var resultJs = $(data).children("string").text();
            if (resultJs != "false" && resultJs != "") {
                jsonTobtn(resultJs, equip, tabLists);
            }
        }
    }
    else {
        // $("#tableSeLi").hide();
    }
}
//创建设置表按钮
function jsonTobtn(data, confarr, tabLists) {
    var usera = JSON.parse(data);
    for (var i = 0; i < usera.length; i++) {
        var userb = usera[i];
        var userc = new Array(userb.set_nm, userb.main_instruction, userb.minor_instruction, userb.value, userb.set_type);
        var set_nos1 = Control_Equip_List(confarr);
        var set_nos2 = Control_SetItem_List(confarr, userb.set_no);
        if (set_nos1 || set_nos2) {
            var newRow = "<tr><td><a href='#' class=\"button button-big button-fill color-green\" onclick=\"onSetClickBtn(" + confarr + ",'" + userc[1] + "','" + userc[2] + "','" + userc[3] + "','" + userc[0] + "','" + userc[4] + "')\">" + userc[0] + "</a></td></tr>";
            $("#" + tabLists + " tbody:last").append(newRow);
        }
    }
}
//设置命令
function onSetClickBtn(str_1, str_2, str_3, str_4, btnName, str_5) {
    if (str_5 == "V") {
        myApp.modal({
            title: btnName,
            text: "设置值：<br><input type=\"text\" class=\"modal-text-input\" id=\"setValues\" value=\"" + str_4 + "\">",
            buttons: [
              {
                  text: '取消'
              },
              {
                  text: '确定',
                  onClick: function () {
                      if ($("#setValues").val() != "") {
                          onSetCommand(str_1, str_2, str_3, $("#setValues").val(), btnName);
                      }
                  }
              }
            ]
        });
    }
    else {
        myApp.modal({
            title: btnName,
            text: '确定进行操作吗？',
            buttons: [
              {
                  text: '取消'
              },
              {
                  text: '确定',
                  onClick: function () {
                      onSetCommand(str_1, str_2, str_3, str_4, btnName);
                  }
              }
            ]
        });
    }
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
    JQajaxo("post", _url, true, _dataSet, _successfSet);
    function _successfSet(data) {
        var resultJs = $(data).children("string").text();
        if (resultJs != "false") {
            setTimeout(function () {
                refreshDatas();
                allEquipSatatus();
            }, 3500);
        }
    }
}

//曲线点
var curveDrop = -9;
//遥测表曲线值
var dataCurve = new Array();
//动态数据
var dynamicCurve;
//实时曲线
function curveBox(number, nameCurve, dts) {
    var curveHeight = 300;//曲线高度
    if ($(window).width() > 768) {
        curveHeight = 400;
    }

    $$.get("plug/popoverCurve.html", "", function (data) {
        var popoverHTML = data;
        myApp.popover(popoverHTML, dts);
        $("#poverCurveTitle").html(nameCurve);

        Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });
        $('#highcharts').highcharts({
            chart: {
                type: 'spline',
                animation: Highcharts.svg, // don't animate in old IE
                marginRight: 10,
                height: curveHeight,
                events: {
                    load: function () {
                        clearInterval(dynamicCurve);
                        // set up the updating of the chart each second
                        var series = this.series[0];
                        var yVals = 0;
                        if (!isNaN(yVals)) {
                            yVals = parseFloat(dataCurve[number][0]);
                        } else {
                            yVals = 0;
                        }
                        var x = (new Date()).getTime(), // current time
                           // y = parseInt(10 * Math.random());//Math.random()*10;
                            y = yVals;
                        series.addPoint([x, y], true, true);
                        dynamicCurve = setInterval(function () {
                            if ($("#poverCurveTitle").length < 1) {
                                clearInterval(dynamicCurve);
                                return;
                            }
                            refreshDatas();
                            var yVals = 0;
                            if (!isNaN(yVals)) {
                                yVals = parseFloat(dataCurve[number][0]);
                            } else {
                                yVals = 0;
                            }
                            var x = (new Date()).getTime(), // current time
                               // y = parseInt(10 * Math.random());//Math.random()*10;
                                y = yVals;
                            series.addPoint([x, y], true, true);
                        }, 3000);
                    }
                },
                backgroundColor: 'none'
            },
            title: {
                text: ''
            },
            xAxis: {
                type: 'datetime',
                tickPixelInterval: 120,
                style: {
                    color: '#000'
                },
                labels: {
                    style: {
                        color: '#000'
                    }
                },
            },
            yAxis: {
                title: {
                    text: '',
                    style: {
                        color: '#000'
                    }
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }],
                labels: {
                    style: {
                        color: '#000'
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
    });
}