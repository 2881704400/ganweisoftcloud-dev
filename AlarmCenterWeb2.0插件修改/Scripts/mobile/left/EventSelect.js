
function EventSelect() {
    onLoadPicker();
    onEquipLists();
    $('#timeScreen div').unbind();
    $('#timeScreen div').bind('click', onTimeScreen);
    $('#querySelect').unbind();
    $('#querySelect').bind('click', onQuerySelect);
}

//加载日期
function onLoadPicker() {
    if ($('#iptEvtSel_1').val() != '') {
        return;
    }
    var allYears = (function () {
        var arr = [];
        for (var i = 1950; i <= 2030; i++) { arr.push(i); }
        return arr;
    })();
    var allMonths = ('01 02 03 04 05 06 07 08 09 10 11 12').split(' ');
    var allDays = ('01 02 03 04 05 06 07 08 09 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31').split(' ');
    var allHours = function () {
        var arr = [];
        for (var i = 0; i <= 23; i++) { arr.push(i < 10 ? '0' + i : i); }
        return arr;
    }();
    var allMinutes = (function () {
        var arr = [];
        for (var i = 0; i <= 59; i++) { arr.push(i < 10 ? '0' + i : i); }
        return arr;
    })();

    var today = new Date();
    var getMonths = today.getMonth() + 1;
    var getMonth = (getMonths < 10 ? '0' + getMonths : getMonths);
    var getDate = (today.getDate() < 10 ? '0' + today.getDate() : today.getDate());

    var getHours = (today.getHours() < 10 ? '0' + today.getHours() : today.getHours());
    var getMinutes = (today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes());

    var pickerDescribe = myApp.picker.create({
        inputEl: '#iptEvtSel_1',
        rotateEffect: true,
        renderToolbar: function (){
            return '<div class="toolbar">' +
                       '<div class="toolbar-inner">' +
                           '<div class="left">开始时间：</div>' +
                           '<div class="right">' +
                               '<a href="#" class="link sheet-close popover-close"">关闭</a>' +
                           '</div>' +
                       '</div>' +
                   '</div>';
        },
        value: [today.getFullYear(), getMonth, getDate, '00', '00'],
        on:{
            onChange: function (picker, values) {
                var daysInMonth = new Date(picker.value[2], picker.value[0] * 1 + 1, 0).getDate();
                if (values[1] > daysInMonth) {
                    picker.cols[1].setValue(daysInMonth);
                }
            },            
        },

        formatValue: function (p, values) {
            return values[0] + '/' + values[1] + '/' + values[2] + ' ' + values[3] + ':' + values[4];
        },
        cols: [
            { values: allYears, textAlign: 'left' },
            { values: allMonths, },
            { values: allDays, },

            { divider: true, content: '&nbsp;&nbsp;' },

            { values: allHours, },
            { divider: true, content: ':' },
            { values: allMinutes, }
        ]
    });

    var pickerDescribe2 = myApp.picker.create({
        inputEl: '#iptEvtSel_2',
        rotateEffect: true,
        renderToolbar: function (){
            return '<div class="toolbar">' +
                       '<div class="toolbar-inner">' +
                           '<div class="left">开始时间：</div>' +
                           '<div class="right">' +
                               '<a href="#" class="link sheet-close popover-close"">关闭</a>' +
                           '</div>' +
                       '</div>' +
                   '</div>';
        },
        value: [today.getFullYear(), getMonth, getDate, getHours, getMinutes],
        on:{
            onChange: function (picker, values) {
                var daysInMonth = new Date(picker.value[2], picker.value[0] * 1 + 1, 0).getDate();
                if (values[1] > daysInMonth) {
                    picker.cols[1].setValue(daysInMonth);
                }
            },
        },
        formatValue: function (p, values) {
            return values[0] + '/' + values[1] + '/' + values[2] + ' ' + values[3] + ':' + values[4];
        },
        cols: [
            { values: allYears, textAlign: 'left' },
            { values: allMonths, },
            { values: allDays, },

            { divider: true, content: '&nbsp;&nbsp;' },

            { values: allHours, },
            { divider: true, content: ':' },
            { values: allMinutes, }
        ]
    });
}

//加载筛选
function onScreening() {
    var screen = $('#screenings').attr('screen');
    var equips = $('#screenings').attr('equips');
    var evts = $('#screenings').attr('evts').split(',');
    $.get('plug/Screening.html', function (datas) {
        $(this).popupShow({
            title: '筛选',
            closeText: '取消',
            contents: {
                content: datas
            },
            toolbar: {
                id: 'toolbarScreening',
                content: '<div class="row screenBtn"><a href="#" class="button button-big button-fill col-30" onclick="onReset()">重置</a>' +
                    '<a href="#" class="button button-big button-fill color-green col-70 popup-close" onclick="onConfirmScre()">确 认</a></div>'
            },
            callBackOpened: function () {
                $('#toolbarScreening').css('height', '60px');

                for (var i = 0; i < evts.length; i++) {
                    document.getElementById('evts_' + evts[i]).checked = true;
                }

                $('#equipList').html('');
                for (var i = 0; i < equip_list.length; i++) {
                    var ck = '';
                    if (i == 0) {
                        ck = 'onclick="allSelected(this)"';
                    }
                    var checked = '';
                    if (equips == "x") {
                        checked = 'checked="checked"';
                    }
                    else {
                        var equipsp = equips.split(',');
                        for (var j = 0; j < equipsp.length; j++) {
                            if (equip_list[i][1] == equipsp[j]) {
                                checked = 'checked="checked"';
                            }
                        }
                    }
                    var newRow = $('<li equip_no="' + equip_list[i][1] + '"><label class="item-checkbox item-content" ' + ck + '></label></li>');
                    newRow.find('label').append('<input id="equip_no_' + equip_list[i][1] + '" type="checkbox" name="ks-checkbox" value="' + equip_list[i][1] + '" ' + checked + '>');
                    newRow.find('label').append('<i class="icon icon-checkbox"></i>');
                    newRow.find('label').append('<div class="item-inner"><div class="item-title">' + equip_list[i][0] + '</div></div>');
                    $('#equipList').append(newRow);
                }
            }
        });
    });
    
}

//选择全部
function allSelected(dt) {
    if (document.getElementById('equip_no_x').checked) {
        for (var i = 1; i < equip_list.length; i++) {
            document.getElementById('equip_no_' + equip_list[i][1]).checked = false;
        }
    }
    else {
        for (var i = 1; i < equip_list.length; i++) {
            document.getElementById('equip_no_' + equip_list[i][1]).checked = true;
        }
    }
}

//选择时间跨度
function onTimeScreen() {
    $(this).parent().find('div').removeClass('active');
    $(this).addClass('active');
    $("#selectDate").attr('values', $(this).attr('value'));
    if ($(this).attr('value') == '3') {
        $('#iptEvtSel_1').attr('disabled', false);
        $('#iptEvtSel_2').attr('disabled', false);
    }
    else {
        $('#iptEvtSel_1').attr('disabled', true);
        $('#iptEvtSel_2').attr('disabled', true);
    }
}

var equip_list = null;
//加载所有设备
function onEquipLists() {
    if ($('#screenings').attr('equips')) {
        return;
    }
    var _url = service + "/EquipItemList";
    function _successf(data) {
        var resultJs = $(data).children("string").text();
        if (resultJs != "false") {
            equip_list = new Array();
            var usera = JSON.parse(resultJs);
            equip_list[0] = new Array('全部', 'x');
            for (var i = 1; i < usera.length; i++) {
                var userb = usera[i];
                var userc = new Array(userb.name, userb.value);
                equip_list[i] = userc;
            }
            $('#screenings').attr('equips', 'x');
            $('#screenings').attr('evts', '1,2,3');
            $('#screenings').unbind();
            $('#screenings').bind('click', onScreening);
        }
    }
    JQajaxo("post", _url, false, "", _successf);
}

//重置
function onReset() {
    $('#evtsList').find('li').each(function () {
        var value = $(this).find('input').attr('value');
        document.getElementById('evts_' + value).checked = true;
    });
    for (var i = 1; i < equip_list.length; i++) {
        document.getElementById('equip_no_' + equip_list[i][1]).checked = true;
    }
}

//确认
function onConfirmScre() {
    var evtsChecked = '';
    $('#evtsList').find('li').each(function () {
        var value = $(this).find('input').attr('value');
        if (document.getElementById('evts_' + value).checked) {
            evtsChecked += value + ',';
        }
    });
    evtsChecked = evtsChecked.substring(0, evtsChecked.length - 1);
    $('#screenings').attr('evts', evtsChecked);

    var equips = '';
    for (var i = 1; i < equip_list.length; i++) {
        if (document.getElementById('equip_no_' + equip_list[i][1]).checked) {
            equips += equip_list[i][1] + ',';
        }
    }
    equips = equips.substring(0, equips.length - 1);
    if (equips.split(',').length + 1 == equip_list.length) {
        equips = 'x';
    }
    $('#screenings').attr('equips', equips);
}

var listData, nowPage;
//查询
function onQuerySelect() {
    var equips = $('#screenings').attr('equips');
    if (equips == 'x') {
        equips = '';
        for (var i = 1; i < equip_list.length; i++) {
            equips += equip_list[i][1] + ',';
        }
        equips = equips.substring(0, equips.length - 1);
    }

    var evtsName = ['', '设备事件', '设置事件', '系统事件'];
    var evts = $('#screenings').attr('evts').split(',');
    var btnRow = '', tabsRow = '';
    for (var i = 0; i < evts.length; i++) {
        var activeClass = '';
        if (i == 0) {
            activeClass = 'active';
        }
        btnRow += '<a href="#evtContentsTab_' + evts[i] + '" class="tab-link ' + activeClass + ' button">' + evtsName[evts[i]] + '</a>';
        tabsRow += '<div id="evtContentsTab_' + evts[i] + '" class="tab ' + activeClass + '" style="overflow:auto;margin-bottom:30px;">' +
            '<div class="list-block"><ul id="evtContents_' + evts[i] + '" class="msList"></ul></div>' +
        '</div>';
    }
    
    var contentHTML = '<div class="tabs-animated-wrap">' +
                        '<div class="buttons-row tabBtn">' +
                            btnRow +
                        '</div>' +

                        '<div class="tabs">' +
                            tabsRow +
                        '</div>' +
                    '</div>';
    nowPage = new Array(1, 1, 1);
    $(this).viewShow({
        id:'resultEvent',
        title: '查询结果',
        contents: {
            content: contentHTML
        },
        pageCallBack: function () {
            myApp.showIndicator();
            for (var i = 0; i < evts.length; i++) {
                if (evts[i] == '1') {
                    setTimeout(function () {
                        tableDataEvent("EqpEvt");
                    }, 500);
                }
                if (evts[i] == '2') {
                    setTimeout(function () {
                        tableDataEvent("SetEvt");
                    }, 500);
                }
                if (evts[i] == '3') {
                    setTimeout(function () {
                        tableDataEvent("SysEvt");
                    }, 500);
                }
            }
        }
    });
}

//返回当前时间格式
function nowDate() {
    var datetime = "";
    var selectOptionVal = $("#selectDate").attr("values");
    if (selectOptionVal == "0") {
        datetime = localDateTime(1) + ":00," + localDateTime(1).split(' ')[0] + " 23:59:59";
    }
    if (selectOptionVal == "1") {
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
    if (selectOptionVal == "2") {
        var localdate = new Date();
        var getMonthc = localdate.getMonth() + 1;
        if (localdate.getMonth() + 1 < 10) {
            getMonthc = "0" + getMonthc;
        }
        datetime = localdate.getFullYear() + "/" + getMonthc + "/01 00:00:00";
    }
    if (selectOptionVal == "3") {

        datetime = $("#iptEvtSel_1").val().toString() + ":00" + "," + $("#iptEvtSel_2").val().toString() + ":00";
    }
    return datetime;
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
        //var datetime = getMonthVar + "/" + getDateVar;
        //return
    }
    else if (numb == 1) {
        return NowDateTimeVar_d;
    }
    else {
        return NowDateTimeVar_h;
    }
}

function SelectCheckedEquip() {
    var list = $('#screenings').attr('equips');
    if (list == 'x') {
        list = '';
        for (var i = 1; i < equip_list.length; i++) {
            list += equip_list[i][1] + ',';
        }
        list = list.substring(0, list.length - 1);
    }
    return list;
}

var EqpEvtData = null, SetEvtData = null, SysEvtData = null;
//获取表数据
function tableDataEvent(tableName) {
    var _url = "";
    var datatime = nowDate();
    var _data = "";
    var selectNums = SelectCheckedEquip();
    if (tableName == "EqpEvt") {
        $('#evtContents_1').html("");
        if (selectNums == "") {
            return;
        }
        _url = service + "/QueryEquipEvt";
        _data = "times=" + datatime + "&&equip_no_list=" + selectNums;
        function _successEqp(data) {
            var resultJs = $(data).children("string").text();
            EqpEvtData = resultJs;
            if (resultJs != "false") {
                jsonToTableEvent(resultJs, "1");
            }
            myApp.hideIndicator();
            myApp.attachInfiniteScroll($$('#evtContentsTab_1'));
            $$('#evtContentsTab_1').on('infinite', function () {
                nowPage[0]++;
                jsonToTableEvent(EqpEvtData, "1");
            });
        }
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
            SetEvtData = resultJs;
            if (resultJs != "false") {
                jsonToTableEvent(resultJs, "2");
            }
            myApp.hideIndicator();
            myApp.attachInfiniteScroll($$('#evtContentsTab_2'));
            $$('#evtContentsTab_2').on('infinite', function () {
                nowPage[1]++;
                jsonToTableEvent(SetEvtData, "2");
            });
        }
        JQajaxo("post", _url, false, _data, _successSet);
    }
    else {
        $('#tableSys tbody').html("");
        _url = service + "/QuerySystemEvt";
        _data = "times=" + datatime;
        function _successSys(data) {
            var resultJs = $(data).children("string").text();
            SysEvtData = resultJs;
            if (resultJs != "false") {
                jsonToTableEvent(resultJs, "3");
            }
            myApp.hideIndicator();
            myApp.attachInfiniteScroll($$('#evtContentsTab_3'));
            $$('#evtContentsTab_3').on('infinite', function () {
                nowPage[2]++;
                jsonToTableEvent(SysEvtData, "3");
            });
        }
        JQajaxo("post", _url, false, _data, _successSys);
    }
}

//将json数据转换为table表格
function jsonToTableEvent(resultJs, tablen) {
    var usera = JSON.parse(resultJs);
    for (var i = 0; i < usera.length; i++) {
        var userb = usera[i];
        var userc = "";
        if (tablen == "1") {
            userc = new Array(userb.equip_nm, userb.event, userb.time);
            if (i >= nowPage[0] * 20 - 20 && i < nowPage[0] * 20) {
                var newRow = $("<li class=\"accordion-item\"></li>");
                var newRowa = $("<a href='#' class='item-link item-content'></a>");
                var times = userb.time.split(' ');
                newRowa.append("<div class='item-media mgList_left'>" + times[0] + "<br/>" + times[1] + "</div>");

                var newRowItem = $("<div class='item-inner'></div>");
                newRowItem.append("<div class='item-title'>" + userb.event + "</div>");
                newRowa.append(newRowItem);
                newRow.append(newRowa);

                var detailedRow = "<div class=\"accordion-item-content\"><div class=\"content-block\">";
                detailedRow += "<p>时间：" + userb.time + "</p>";
                detailedRow += "<p>设备名称：" + userb.equip_nm + "</p>";
                detailedRow += "<p>事件：" + userb.event + "</p>";
                detailedRow += "</div></div>";
                newRow.append(detailedRow);
                $("#evtContents_1:last").append(newRow);
            }
        }
        else if (tablen == "2") {
            userc = new Array(userb.equip_nm, userb.event, userb.operator, userb.time);
            if (i >= nowPage[1] * 20 - 20 && i < nowPage[1] * 20) {
                var newRow = $("<li class=\"accordion-item\"></li>");
                var newRowa = $("<a href='#' class='item-link item-content'></a>");
                var times = userb.time.split(' ');
                newRowa.append("<div class='item-media mgList_left'>" + times[0] + "<br/>" + times[1] + "</div>");

                var newRowItem = $("<div class='item-inner'></div>");
                newRowItem.append("<div class='item-title'>" + userb.event + "</div>");
                newRowa.append(newRowItem);
                newRow.append(newRowa);

                var detailedRow = "<div class=\"accordion-item-content\"><div class=\"content-block\">";
                detailedRow += "<p>时间：" + userb.time + "</p>";
                detailedRow += "<p>设备名称：" + userb.equip_nm + "</p>";
                detailedRow += "<p>事件：" + userb.event + "</p>";
                detailedRow += "<p>操作人员：" + userb.operator + "</p>";
                detailedRow += "</div></div>";
                newRow.append(detailedRow);
                $("#evtContents_2:last").append(newRow);
            }
        }
        else {
            userc = new Array(userb.event, userb.time);
            if (i >= nowPage[2] * 20 - 20 && i < nowPage[2] * 20) {
                var newRow = $("<li class=\"accordion-item\"></li>");
                var newRowa = $("<a href='#' class='item-link item-content'></a>");
                var times = userb.time.split(' ');
                newRowa.append("<div class='item-media mgList_left'>" + times[0] + "<br/>" + times[1] + "</div>");

                var newRowItem = $("<div class='item-inner'></div>");
                newRowItem.append("<div class='item-title'>" + userb.event + "</div>");
                newRowa.append(newRowItem);
                newRow.append(newRowa);

                var detailedRow = "<div class=\"accordion-item-content\"><div class=\"content-block\">";
                detailedRow += "<p>时间：" + userb.time + "</p>";
                detailedRow += "<p>事件：" + userb.event + "</p>";
                detailedRow += "</div></div>";
                newRow.append(detailedRow);
                $("#evtContents_3:last").append(newRow);
            }
        }
    }
}