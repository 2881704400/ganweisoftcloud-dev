function RichScanCallback() {
    var str = $('#equips').val(); 
    realShow(str);
}

function realShow(str) {
    if (str == '') {
        return;
    }
    var idStr = str.split('+');
    if (idStr[0] != 'NULL') {
        var _urlCount = service + "/EquipItemCount";
        var _dataCount = "equip_no=" + idStr[0] + "&&userName=" + window.localStorage.userName;
        function _callBackCount(dataCount) {
            var dataCountStr = $$(dataCount).children("string").text();
            if (dataCountStr != "false") {
                var useraCount = JSON.parse(dataCountStr);
                var countAll = [];
                for (var i = 0; i < useraCount.length; i++) {
                    countAll.push(parseInt(useraCount[i].count));
                }
                realHtml(countAll, idStr);
            }
        }
        JQajaxo("post", _urlCount, true, _dataCount, _callBackCount);
    }
    else {
        realHtml(null, idStr);
    }
}
//配置tab页json数据
function tabListJson(countAll) {
    var tabList = [];
    if (countAll[0] > 0) {
        tabList.push({
            id: 'tabYcp',
            href: 'tabContentYcp',
            name: '模拟量',
            tableID: 'tableYcp',
            tableThead: ['状态', '模拟量名称', '实时值'],
            onRefresh: function (e) {
                $(e.srcElement).css('overflow', 'initial');
                setTimeout(function () {
                    $(e.srcElement).css('overflow', 'auto');
                    var titleid = $(e.srcElement).attr('titleid');
                    var equip_no = $("#" + titleid).attr('equip_no');
                    serviceData(titleid, null, equip_no, e.srcElement);
                    myApp.pullToRefreshDone(e);
                }, 2000);
            }
        });
    }
    if (countAll[1] > 0) {
        tabList.push({
            id: 'tabYxp',
            href: 'tabContentYxp',
            name: '状态量',
            tableID: 'tableYxp',
            tableThead: ['状态', '状态量名称', '实时状态'],
            onRefresh: function (e) {
                $(e.srcElement).css('overflow', 'initial');
                setTimeout(function () {
                    $(e.srcElement).css('overflow', 'auto');
                    var titleid = $(e.srcElement).attr('titleid');
                    var equip_no = $("#" + titleid).attr('equip_no');
                    serviceData(titleid, null, equip_no, e.srcElement);
                    myApp.pullToRefreshDone(e);
                }, 2000);
            }
        });
    }
    if (countAll[2] > 0) {
        tabList.push({
            id: 'tabSet',
            href: 'tabContentSet',
            name: '设置',
            tableID: 'tableSet',
            tableThead: ['设置命令'],
        });
    }
    return tabList;
}
function realHtml(countAll, idStr) {
    var cntID = 'equipNow';
    var cntID2 = 'zichanNow';
    var titleStat = 'titleStat';//设备状态
    var titleStatZiChan = 'titleStatZiChan';//设备状态
    var tabList = null;
    if (countAll != null) {
        tabList = tabListJson(countAll);//tab页列表
        if (tabList.length > 0) {
            tabList[0].titleID = titleStat;
        }
    }

    var toolbarContent;
    var eq = '', eq2 = '';//设备是否隐藏
    var zi = '', zi2 = '';//资产是否隐藏
    var equip = '';
    var zichan = '';
    if (idStr[0] != 'NULL' && idStr[1] != 'NULL') {
        eq2 = 'active';
        equip = idStr[0];
        zichan = idStr[1];
    }
    else {
        if (idStr[0] != 'NULL') {
            zi = 'display:none';
            eq2 = 'active';
            equip = idStr[0];
        }
        else if (idStr[1] != 'NULL') {
            eq = 'display:none';
            zi2 = 'active';
            zichan = idStr[1];
        }
        else {
            return;
        }
    }
    toolbarContent = '<div class="buttons-row tabBtn" style="height:50px;">' +
        '<a id="tabEquip" href="#' + cntID + '" titleID="' + titleStat + '" class="tab-link button ' + eq2 + '" style="line-height:40px;' + eq + '" onclick="tabOnClick(this)">设备</a>' +
        '<a id="tabZichan" href="#' + cntID2 + '" titleID="' + titleStatZiChan + '" class="tab-link button ' + zi2 + '" style="line-height:40px;' + zi + '" onclick="tabOnClick(this)">资产</a>' +
    '</div>';

    $(this).popupShow({
        navbar: {
            id: ''
        },
        contents: {
            id: '',
            content: '<div class="tabs tabs-animated-wrap">' +
                        '<div id="' + cntID + '" class="tab ' + eq2 + ' tabs-animated-wrap"></div>' +
                        '<div id="' + cntID2 + '" class="tab ' + zi2 + ' tabs-animated-wrap"></div>' +
                    '</div>'
        },
        toolbar: {
            id: '',
            content: toolbarContent,
        },
        title: '<span id="' + titleStat + '">设备状态：正常</span><span id="' + titleStatZiChan + '" style="display:none"></span>',
        callBackOpened: function () {
            if (eq == '') {
                $('#' + cntID).tabAndTable({
                    formID: cntID,
                    tabList: tabList,
                    initRefresh: true,//刷新控件是否需要初始化
                    callBack: function () {
                        serviceData(titleStat, tabList, equip);
                    }
                });
            }
            if (zi == '') {
                ZiChanSetParm(cntID2, titleStatZiChan, zichan);
            }
        }
    });
}

function tabOnClick(dt) {
    var id = $(dt).attr("titleID");
    $("#" + id).parent().find('span').hide();
    $("#" + id).show();
}

//获取数据
function serviceData(titleStat, tabList, equip, eHTML) {
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
        $('#' + titleStat).attr('equip_no', equip);
        $('#' + titleStat).html("设备状态：" + textAlarm);
        $('#' + titleStat).attr('textAlarm', text);
        if (tabList != null) {
            tableFill(equip, text, tabList);//第一次载入数据
        }
        else {
            refreshData(eHTML);//刷新数据
        }
    }
    JQajaxo("post", _urlExpre, true, _dataExpre, _successExpre);


}

//获取遥测表、遥信表的数据
function tableFill(equip, alarm, tabList) {
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
                setTodatas(equip, tabList[i].tableID);
            }
        }
    }

    function _successfYcp(data) {
        var resultJs = $(data).children("string").text();
        if (resultJs != "false") {
            jsonTodatas(resultJs, "ycp", alarm, tabListID[0]);
        }
    }

    function _successfYxp(data) {
        var resultJs = $(data).children("string").text();
        if (resultJs != "false") {
            jsonTodatas(resultJs, "yxp", alarm, tabListID[1]);
        }
    }
}
//创建遥测表，遥信表
function jsonTodatas(data, tableName, alarm, tabLists) {
    var usera = JSON.parse(data);
    if (tableName == "ycp") {
        $("#" + tabLists + " tbody").html("");
        for (var i = 0; i < usera.length; i++) {
            var userb = usera[i];
            var userc = new Array(userb.m_IsAlarm, userb.m_YCNm, userb.m_YCValue, userb.m_iYCNo, userb.m_AdviceMsg, userb.m_Unit);
            //dataCurve[i] = new Array(userb.m_YCValue, userb.m_Unit);
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
            //newRow.append("<td><a href='#' class='button' onclick=\"curveBox(" + i + ",'" + userc[1] + "',this)\"><i class='iconfont icon-quxiantu'></i></a></td>");
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
function refreshData(e) {
    var titleid = $(e).attr('titleid');
    var equip_no = $('#' + titleid).attr('equip_no');
    var alarm = $('#' + titleid).attr('textAlarm');
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
            //dataCurve[i] = new Array(userb.m_YCValue, userb.m_Unit);
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
            if (alarmImg == 'HaveAlarm') {
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
function setTodatas(equip, tabLists) {
    $("#" + tabLists).parent().addClass("tableAuto3");
    if (Control_Equip_List(equip) || Control_SetItem_List(equip, false)) {
        $("#" + tabLists + " tbody").html("");
        var _url = service + "/GetSystemConfig";
        var _dataSet = "equip_no_list=" + equip + "&&table_name=SetParm";
        JQajaxo("post", _url, true, _dataSet, _successfSet);
        function _successfSet(data) {
            var resultJs = $(data).children("string").text();
            if (resultJs != "false" && resultJs != "") {
                jsonTobtns(resultJs, equip, tabLists);
            }
        }
    }
    else {
        // $("#tableSeLi").hide();
    }
}
//创建设置表按钮
function jsonTobtns(data, confarr, tabLists) {
    var usera = JSON.parse(data);
    for (var i = 0; i < usera.length; i++) {
        var userb = usera[i];
        var userc = new Array(userb.set_nm, userb.main_instruction, userb.minor_instruction, userb.value, userb.set_type);
        var set_nos1 = Control_Equip_List(confarr);
        var set_nos2 = Control_SetItem_List(confarr, userb.set_no);
        if (set_nos1 || set_nos2) {
            var newRow = "<tr><td><a href='#' class=\"button button-big button-fill color-green\" onclick=\"onSetClickBtns(" + confarr + ",'" + userc[1] + "','" + userc[2] + "','" + userc[3] + "','" + userc[0] + "','" + userc[4] + "')\">" + userc[0] + "</a></td></tr>";
            $("#" + tabLists + " tbody:last").append(newRow);
        }
    }
}
//设置命令
function onSetClickBtns(str_1, str_2, str_3, str_4, btnName, str_5) {
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
                          onSetCommands(str_1, str_2, str_3, $("#setValues").val(), btnName);
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
                      onSetCommands(str_1, str_2, str_3, str_4, btnName);
                  }
              }
            ]
        });
    }
}
//设置命令-确定
function onSetCommands(str_1, str_2, str_3, str_4, dt) {
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

        }
    }
}

//加载资产信息
function ZiChanSetParm(formID, titleID, zichanID) {
    var _url = service + "/QueryTableData";
    var _data = "tableName=GWZiChanTable";
    function _success_1(data) {
        var resultJs = $(data).children("string").text();
        if (resultJs != "false" && resultJs != "") {
            var usera = JSON.parse(resultJs);
            var list;
            for (var i = 0; i < usera.length; i++) {
                var userb = usera[i];
                if (zichanID == userb.ZiChanID) {
                    list = ZCList(userb);
                }
            }
            ZiChanHTML(formID, titleID, list, zichanID);
        }

    }
    JQajaxo("post", _url, true, _data, _success_1);

}
//资产列表
function ZCList(userb) {
    var list = [];
    var date1 = newDate(userb.WeiHuDate);
    var date2 = newDate(GetDateStr(0));
    var day1 = parseInt(dateCost(date1, date2));
    var day2 = parseInt(userb.WeiHuCycle);
    if (day1 < day2) {
        list.push({
            name: '资产状态：', text: '<img src=\"/Image/alarm/CommunicationOK.png\" width="18" height="18">'
        });
    }
    else {
        list.push({
            name: '资产状态：', text: '<img src=\"/Image/alarm/HaveAlarm.png\" width="18" height="18">'
        });
    }

    list.push({
        name: '资产编号：', text: userb.ZiChanID
    });
    list.push({
        name: '资产名称：', text: userb.ZiChanName
    });
    list.push({
        name: '供货厂家：', text: userb.ChangJia
    });
    list.push({
        name: '联系人：', text: userb.LianxiRen
    });
    list.push({
        name: '联系电话：', text: userb.LianxiTel
    });
    list.push({
        name: '联系人电邮：', text: userb.LianxiMail
    });
    return list;
}
var uploadImgDom = null;
function ZiChanHTML(formID, titleID, list, zichanID) {
    var contentIDs = ['contentInfor', 'contentApply'];
    var imgID = 'zichanImg';
    var uploadName = 'uploadID';//图片插件id
    $('#' + formID).maintainZiChan({
        titleID: titleID,
        contentInfor: {
            id: contentIDs[0],
            imgID: imgID,
            list: list,
            btnClick: function (e) {
                weihuClick(e, contentIDs[0], contentIDs[1]);
                if (uploadImgDom != null) {
                    $('#' + uploadName).unbind();
                    $('#' + uploadName).html('');
                    uploadImgDom = null;
                }
                uploadImgDom = $('#' + uploadName).fileImg({
                    compress: 20,
                    fileUpload: {
                        showBtn: false,
                        serverURL: service + '/AddWeihuRecord4ZC2',
                        btnCallBack: function (data) {
                            if (data != "false") {
                                console.log('图片上传成功！');
                                $('#' + contentIDs[0]).find('ul').find('img').attr('src', '/Image/alarm/CommunicationOK.png');
                                myApp.modal({
                                    title: "",
                                    text: '维护成功！',
                                    buttons: [
                                      {
                                          text: '确定'
                                      }
                                    ]
                                });
                            }
                            else {
                                myApp.modal({
                                    title: "",
                                    text: '维护失败！',
                                    buttons: [
                                      {
                                          text: '确定'
                                      }
                                    ]
                                });
                            }
                            $('#' + contentIDs[1]).hide();
                            $('#' + contentIDs[0]).show();
                        }
                    }
                });
            }
        },
        contentApply: {
            id: contentIDs[1],
            uploadImageID: uploadName,
            btnClick: function (e) {
                var titleid = $(e.target.outerHTML).attr('titleid');
                var titleto = $(e.target.outerHTML).attr('titleto');
                $('#' + titleid).html(titleto);
                if ($(e.target.outerHTML).attr('cancel') != 'cancel') {
                    zcSetParm(contentIDs[0], contentIDs[1]);
                }
                else {
                    $('#' + contentIDs[1]).hide();
                    $('#' + contentIDs[0]).show();
                }
            }
        },
        callBack: function () {
            $('#' + contentIDs[0]).attr('zichanID', zichanID);
            if ($('#' + formID).hasClass('active')) {
                $('#' + titleID).parent().find('span').hide();
                $('#' + titleID).show();
            }
            ZCCallBack(zichanID, imgID);
        }
    });
}
//维护按钮
function weihuClick(e, dt1, dt2) {
    var titleid = $(e.target.outerHTML).attr('titleid');
    var titleto = $(e.target.outerHTML).attr('titleto');
    $('#' + titleid).html(titleto);
    $('#' + dt1).hide();
    $('#' + dt2).show();
    $('#' + dt2).find('textarea').focus();
    $('#' + dt2).find('.addimgListItme').each(function () {
        if ($(this).find('img').length > 0) {
            $(this).remove();
        }
    });
    $('#' + dt2).find('.addimgListItme').show();
}
//资产页面加载完成回调
function ZCCallBack(zichanID, imgID) {
    var _url = service + "/GetImageFromSvr";
    var _data = "ZCID=" + zichanID;
    JQajaxo("post", _url, true, _data, _callBackZCimg);
    function _callBackZCimg(dt) {
        var resultJs = $(dt).text();
        if (resultJs != "false" && resultJs != "") {
            var src = 'data:image/png;base64,' + resultJs;
            $('#' + imgID).attr('src', src);
        }
    }
}

//上传参数
function zcSetParm(dt1, dt2) {
    var newRow = [];
    newRow[0] = $('#' + dt1).attr('zichanID');//资产ID
    newRow[1] = window.localStorage.userName;//维护人
    newRow[2] = $('#' + dt2).find('textarea').val();//维护记录
    zcToService(newRow);
}
function zcToService(zcdata) {
    var formDatas = new FormData();
    for (var i = 0; i < uploadImgDom.options.files.length; i++) {
        formDatas.append('file', uploadImgDom.options.files[i].file);
    }
    formDatas.append('zcid', zcdata[0]);
    formDatas.append('zcname', zcdata[1]);
    formDatas.append('record', zcdata[2]);
    uploadImgDom.ajaxUpload(formDatas);
}