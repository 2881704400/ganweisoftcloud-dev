
onloadContent();
function onloadContent() {
    $(".main").attr("value", "8");
    
    equipVideo();
}

var tableVideoConfig;
function equipVideo() {
    var _url = service + "/VideoConfigs";
    var _data = "data=equip";
    function _sccess(data) {
        tableVideoConfig = new Array();
        var result = $(data).children("string").text();
        if (result != "false") {
            var newRow = "";
            var usera = JSON.parse(result);
            for (var i = 0; i < usera.length; i++) {
                var userb = usera[i];
                var jsonString = JSON.stringify(userb);
                var userc = new Array(userb.equip_no, userb.equip_nm, userb.local_addr, userb.equip_addr);
                tableVideoConfig[i] = userc;
                newRow += "<li class=\"parent_li\"><span href=\"#\" class=\"item-link item-content\">";
                newRow += "<i class=\"iconfont icon-jian\"></i> ";
                newRow += "<b style='padding-left:0px!important;'>" + userc[1] + "</b></span>";
                
				if(userb.communication_drv=='HikYun.NET.dll'){
					AccessToken(userb.communication_param,'videoList_'+userb.equip_no);
					newRow += "<ul id='videoList_"+userb.equip_no+"' dll='"+userb.communication_drv+"'></ul>";
				}
				else{
					newRow += "<ul id='videoList_"+userb.equip_no+"' jsonString='" + jsonString + "' dll='"+userb.communication_drv+"'></ul>";
				}
                newRow += "</li>";
            }
            $('#videoList').append(newRow);
			onVideoShow();
        }
    }
    JQajaxo("post", _url, true, _data, _sccess);
}

//加载节点
function onVideoShow() {
	for(var i=0;i<tableVideoConfig.length;i++){
		var equip_no=tableVideoConfig[i][0];
		var _url = service + "/VideoConfigs";
        var _data = "data=" + equip_no;
        function _sccess(data) {
            var result = $(data).children("string").text();
            if (result != "false") {
				var ul=$('#videoList_'+equip_no);
                var usera = JSON.parse(result);
                for (var i = 0; i < usera.length; i++) {
                    var userb = usera[i];
                    var jsonString = JSON.stringify(userb)
                    var userc = new Array(userb.EquipNum, userb.ID, userb.ChannelName, userb.ChannelType, userb.ChannelNum, userb.ControlEquip, userb.Path);
                    var newRow = "";
					if(ul.attr('dll')=='HikYun.NET.dll'){
						newRow += "<li><span equip_no='"+equip_no+"' Video_id='"+userb.ID+"' actions='"+userb.Action+"' onclick='videoListClick(this)'>";
					}
                    else{
						newRow += "<li><span jsonString='" + jsonString + "' onclick='videoListClick(this)'>";
					}
                    newRow += "<b style='padding-left:0px!important;'>" + userc[2] + "</b>";
                    newRow += "</span>";
                    newRow += "</li>";
                    ul.append(newRow);
                }                
            }
			onloadTree("#videoList");//树状列表初始化
        }
        JQajaxo("post", _url, true, _data, _sccess);
	}
}

function videoListClick(dt) {
	$(dt).addClass('active');
	var dll = $(dt).parent().parent().attr('dll');
	if(dll=='HikYun.NET.dll'){
		var address='';
		var equip_no = $(dt).attr('equip_no');
		var actions = $(dt).attr('actions');
		var Video_id = $(dt).attr('Video_id');
		var jsonList = $(dt).parent().parent().attr('jsonList');
		var usera = JSON.parse(jsonList);
		for (var i = 0; i < usera.length; i++) {
			var userb = usera[i];
			if(userb.ID==Video_id){
				address=userb.liveAddress;
			}
		}
		
		var flashvars={f: '/ckplayer/m3u8.swf',a: address,c: 0,p: 1,s: 4,lv: 1};
		var params = {bgcolor: '#FFF', allowFullScreen: true, allowScriptAccess: 'always', wmode: 'transparent'};
		CKobject.embedSWF("/ckplayer/ckplayer.swf", "videoPlay", "video", "100%", "100%", flashvars, params);
		controlsBtn(actions,equip_no,Video_id);
	}
	else{
		var equip = $(dt).parent().parent().attr('jsonString');
		var video = $(dt).attr('jsonString');
		var json = '{"equip":' + equip + ',"video":' + video + '}';
		try{
			myJavaFun.VideoShow(json);
		}
		catch (ex) {
			alert('请更新APP客户端或者使用APP客户端打开！');
		}
	}
    //console.log(json);
    //console.log(JSON.parse(json));
}

//获取AccessToken密钥
function AccessToken(key,idName){
	var keys = key.split('-');
	var appKey = keys[0];
	var appSecret = keys[1];
	$.ajax({
		url:'/GWServices.asmx/PostData',
		data:{
			url:'https://open.ys7.com/api/lapp/token/get',
			value:'appKey='+appKey+'&appSecret='+appSecret
		},
		type:'post',
		success:function(data){
			var dt=$(data).find('string').text();
			var usera = JSON.parse(dt);
			var accessToken = usera.data.accessToken;
			setTimeout(function(){
				$('#'+idName).attr('accessToken',accessToken);
			},500)
			listData(accessToken,idName);
		}
	})
}

//获取视频列表
function listData(accessToken,idName){
	$.ajax({
		url:'/GWServices.asmx/PostData',
		data:{
			url:'https://open.ys7.com/api/lapp/live/video/list',
			value:'accessToken='+accessToken
		},
		type:'post',
		success:function(data){
			var dt=$(data).find('string').text();
			var usera = JSON.parse(dt);
			var useraData = usera.data;
			var list=[];
			for (var i = 0; i < useraData.length; i++) {
				 var userb = useraData[i];
				 //var userc = new Array(userb.deviceSerial, userb.channelNo, userb.liveAddress, userb.hdAddress, userb.status, userb.exception, userb.beginTime, userb.endTime);
				 list.push({deviceSerial:userb.deviceSerial,ID:userb.channelNo,liveAddress:userb.liveAddress,hdAddress:userb.hdAddress});
			}
			var jsonList=JSON.stringify(list);
			setTimeout(function(){
				$('#'+idName).attr('jsonList',jsonList);
			},500);
		}
	});
}

//控制按钮
function controlsBtn(actions,equip_no,Video_id){
	$('.videoControls').find('a').each(function(){
			var values=$(this).attr('values');
			$(this).attr('onmousedown','onSetCommand2('+equip_no+',"'+Video_id+'","'+values+'","true","'+window.localStorage.userName+'",this)');
			$(this).attr('onmouseup','onSetCommand3('+equip_no+',"'+Video_id+'","'+values+'","false","'+window.localStorage.userName+'",this)');
		});
		
		$('.videoControls2').find('img').each(function(){
			var values=$(this).attr('values');
			$(this).attr('onmousedown','onSetCommand('+equip_no+',"'+Video_id+'","'+values+'","true","'+window.localStorage.userName+'",this)');
			$(this).attr('onmouseup','onSetCommand('+equip_no+',"'+Video_id+'","'+values+'","false","'+window.localStorage.userName+'",this)');
		});
}

function onSetCommand2(str_1, str_2, str_3, str_4, dt,thisDom){
	$(thisDom).addClass('active-state');
	onSetCommand(str_1, str_2, str_3, str_4, dt);
}
function onSetCommand3(str_1, str_2, str_3, str_4, dt,thisDom){
	$(thisDom).removeClass('active-state');
	onSetCommand(str_1, str_2, str_3, str_4, dt);
}

//设置命令-确定
function onSetCommand(str_1, str_2, str_3, str_4, dt,thisDom) {
	if(thisDom){
		var act=$(thisDom).attr('actives').split('_');
		if(act[1]=="j"){
			var imgNm=act[0]+'_jv_'+act[2];
			$(thisDom).attr('actives',imgNm);
			$(thisDom).attr('src','/Image/video/'+imgNm+'.png');
		}
		else{
			var imgNm=act[0]+'_j_'+act[2];
			$(thisDom).attr('actives',imgNm);
			$(thisDom).attr('src','/Image/video/'+imgNm+'.png');
		}
	}
    var userName = window.localStorage.userName;
    if (userName == null || userName == "") {
        userName = window.sessionStorage.userName;
    }
    var _url = service + "/SetupsCommand";
    var _dataSet = "equip_no=" + encodeURIComponent(str_1) + "&&main_instruction=" + encodeURIComponent(str_2) + "&&minor_instruction=" + encodeURIComponent(str_3) + "&&value=" + encodeURIComponent(str_4) + "&&user_name=" + encodeURIComponent(userName);
    JQajaxo("post", _url, true, _dataSet, _successfSet);
    function _successfSet(data) {
        var resultJs = $(data).children("string").text();
        if (resultJs != "false") {
            
        }
    }
}
