; (function ($, window, document, undefined) {
    //载入popup插件
    $.fn.popupShow = function (opt) {
        this.defaults = {
            id: '',
            title: '',
            closeText: '关闭',
            rightContent: {
                id: '',
                href: '#',
                text: '',
                onClick: null
            },
            navbar: {//顶部导航
                id: '',
                show: true,
            },
            contents: {//主体
                id: '',
                show: true,
                content: '',
            },
            toolbar: {//底部导航
                id: '',
                show: true,
                content: '',
            },
            callBackOpen: null,//open 当 Popover 开始打开动画时，事件将被触发。
            callBackOpened: null,//opened 当 Popover 完成打开动画时，事件将被触发。
            callBackClose: null,//close 当 Popover 开始结束动画时，事件将被触发。
            callBackClosed: null,//closed 当 Popover 完成结束动画时，事件将被触发。
        },
            this.options = $.extend(true, {}, this.defaults, opt);
        var showList = ['', '', ''];
        if (!this.options.navbar.show) {
            showList[0] = 'style="display:none"';
        }
        if (!this.options.contents.show) {
            showList[1] = 'style="display:none"';
        }
        if (!this.options.toolbar.show) {
            showList[2] = 'style="display:none"';
        }
        var popupHTML = '<div class="popup pages navbar-through toolbar-through tablet-fullscreen" id="' + this.options.id + '">' +
            '<div class="page">' +
            '<div class="navbar" id="' + this.options.navbar.id + '" ' + showList[0] + '>' +
            '<div class="navbar-inner">' +
            '<div class="left">' +
            '<a href="#" class="popup-close link">' + this.options.closeText + '</a>' +
            '</div>' +

            '<div class="center sliding">' + this.options.title + '</div>' +

            '<div class="right">' +
            '<a id="' + this.options.rightContent.id + '" href="' + this.options.rightContent.href + '" class="link icon-only">' + this.options.rightContent.text + '</a>' +
            '</div>' +
            '</div>' +
            '</div>' +

            '<div class="page-content" id="' + this.options.contents.id + '" ' + showList[1] + '>' +
            this.options.contents.content +
            '</div>' +

            '<div class="toolbar tabbar tabbar-labels" id="' + this.options.toolbar.id + '" ' + showList[2] + '>' +
            this.options.toolbar.content +
            '</div>' +
            '</div>' +
            '</div>';
        if (this.options.rightContent.onClick != null) {
            popupHTML.find('.right a').unbind();
            popupHTML.find('.right a').bind('click', this.options.rightContent.onClick);
        }

        // if (this.options.callBackOpen != null) {
        //     popupHTML.on('open', this.options.callBackOpen);
        // }
        // if (this.options.callBackOpened != null) {
        //     popupHTML.on('opened', this.options.callBackOpened);
        // }
        // if (this.options.callBackClose != null) {
        //     popupHTML.on('close', this.options.callBackClose);
        // }
        // if (this.options.callBackClosed != null) {
        //     popupHTML.on('closed', this.options.callBackClosed);
        // }

        // myApp.popup(popupHTML);
        var dt = this.options;
        myApp.popup.create({
            content: popupHTML,
            on:{
                open: dt.callBackOpen,
                opened: dt.callBackOpened,
                close: dt.callBackClose,
                closed: dt.callBackClosed,
            },
        }).open();


        popupHTML = null;
        return this;
    };

    //载入动态页面
    $.fn.viewShow = function (opt) {
        console.log(2)
        this.defaults = {
            id: '',
            title: '',
            titleID: '',
            leftOnClick: null,
            rightContent: {
                id: '',
                href: '#',
                text: '',
                onClick: null
            },
            contents: {//主体
                id: '',
                content: '',
            },
            pageCallBack: null,//界面回调
        },
        this.options = $.extend(true, {}, this.defaults, opt);
        var viewHTML = $('<div class="navbar">' +
            '<div class="navbar-inner">' +
            '<div class="left">' +
            '<a href="#" class="back link"><i class="iconfont icon-back"></i></a>' +
            '</div>' +

            '<div class="center sliding" id="' + this.options.titleID + '">' + this.options.title + '</div>' +

            '<div class="right">' +
            '<a id="' + this.options.rightContent.id + '" href="' + this.options.rightContent.href + '" class="link icon-only">' + this.options.rightContent.text + '</a>' +
            '</div>' +
            '</div>' +
            '</div>' +

            '<div class="page" id="' + this.options.id + '" data-page="' + this.options.id + '">' +
            '<div class="page-content" id="' + this.options.contents.id + '">' +
            this.options.contents.content +
            '</div>' +
            '</div>');
        if (this.options.leftOnClick != null) {
            viewHTML.find('.left a').unbind();
            viewHTML.find('.left a').bind('click', this.options.leftOnClick);
        }
        if (this.options.rightContent.onClick != null) {
            viewHTML.find('.right a').unbind();
            viewHTML.find('.right a').bind('click', this.options.rightContent.onClick);
        }

        
        
        console.log(viewHTML)
//         var view1= myApp.views.create('.view-init',{
//           routes : [
//               // Load via Ajax
//               {
//                 render:viewHTML
//               },
  
  
// ],
//         })
        var getview=myApp.views.get('.view-init')
        console.log(getview)
        // myApp.views.get("#RealTimeList");
        
        // if (this.options.pageCallBack != null) {
        //     var s = myApp.views.create(this.options.contents.id, this.options.pageCallBack);
        //     s.trigger();
        //     s.remove();
        // }
        viewHTML = null;
        return this;
    };

    //载入底部输入框插件
    $.fn.bottomText = function (opt) {
        this.defaults = {
            id: '',//根节点ID
            textID: '',//输入框ID
            originalID: '',//原始输入框ID
            placeholder: '请输入内容',
            rightBtn: {//确定按钮
                id: '',
                href: '#',
                text: '确定',
                onClick: null
            },
            value: '',
            callBack: null,//回调
            zIndex: 99999
        },
            this.options = $.extend(true, {}, this.defaults, opt);
        var btnHTML = $('<div class="toolbar" id="' + this.options.id + '" style="background:#fff;position:absolute;display:none;z-index:' + this.options.zIndex + '">' +
            '<div class="messagebar" style="height:44px;">' +
            '<div class="toolbar-inner">' +
            '<textarea id="' + this.options.textID + '" placeholder="' + this.options.placeholder + '"></textarea>' +
            '<a id="' + this.options.rightBtn.id + '" href="' + this.options.rightBtn.href + '" class="link icon-only">' + this.options.rightBtn.text + '</a>' +
            '</div>' +
            '</div>' +
            '</div>');

        btnHTML.find('a').unbind();
        var option = this.options;
        btnHTML.find('a').bind('click', function () {
            var text = $(this).prev().val();
            if (option.rightBtn.onClick != null) {
                option.rightBtn.onClick(text);
            }
            if (Object.prototype.toString.call(option.originalID) == '[object String]') {
                $('#' + option.originalID).val(text);
            }
            else {
                $(option.originalID).val(text);
            }
        });

        $('body').append(btnHTML);
        $(btnHTML).slideToggle(function () {
            $(btnHTML).find('textarea').val(option.value);
            $(btnHTML).find('textarea').focus();
            $(btnHTML).find('textarea').bind('blur', function () {
                var thisText = $(this).parent().parent().parent();
                thisText.slideToggle(function () {
                    thisText.remove();
                });
            });
            btnHTML = null;
            if (option.callBack != null) {
                option.callBack();
            }
        });
        return this;
    };

    //tab页插件
    $.fn.tabAndTable = function (opt) {
        this.defaults = {
            id: '',//根节点ID
            tabList: [],//tab列表[{id:'',href:'',name:'',tableID:'',tableThead:[],onRefresh:function}]
            initRefresh: false,//刷新控件是否初始化
            callBack: null,//回调
        },
            this.options = $.extend(true, {}, this.defaults, opt);
        var config = this.options;
        var btnRow = '';
        var tabsRow = '';
        for (var i = 0; i < config.tabList.length; i++) {
            var activeClass = '';
            if (i == 0) {
                activeClass = 'active';
            }
            btnRow += '<a id="' + config.tabList[i].id + '" href="#' + config.tabList[i].href + '" class="tab-link ' + activeClass + ' button">' + config.tabList[i].name + '</a>';
            var th = '';
            if (config.tabList[i].tableThead.length == 1) {
                th += '<th style="text-align:center;">' + config.tabList[i].tableThead[0] + '</th>';
            }
            else {
                for (var j = 0; j < config.tabList[i].tableThead.length; j++) {
                    th += '<th>' + config.tabList[i].tableThead[j] + '</th>';
                }
            }

            tabsRow += ' <div id="' + config.tabList[i].href + '" class="tab ' + activeClass + ' pull-to-refresh-content" style="overflow:auto;position:relative;" data-ptr-distance="55">' +
                '<div class="pull-to-refresh-layer">' +
                '<div class="preloader"></div>' +
                '<div class="pull-to-refresh-arrow"></div>' +
                '</div>' +

                '<div class="tableAuto tableAuto2">' +
                '<table id="' + config.tabList[i].tableID + '">' +
                '<thead>' +
                '<tr>' +
                th +
                '</tr>' +
                '</thead>' +
                '<tbody></tbody>' +
                '</table>' +
                '</div>' +
                '</div>';
        }
        var contentHTML = $('<div class="tabs-animated-wrap" id="' + config.id + '">' +
            '<div class="buttons-row tabBtn">' +
            btnRow +
            '</div>' +

            '<div class="tabs">' +
            tabsRow +
            '</div>' +
            '</div>');
        this.innerHTML = "";
        $(this).append(contentHTML).ready(function () {
            for (var i = 0; i < config.tabList.length; i++) {
                if (config.tabList[i].onRefresh != null) {
                    if (config.initRefresh) {
                        myApp.initPullToRefresh($('#' + config.tabList[i].href));
                    }
                    $$('#' + config.tabList[i].href).on("refresh", config.tabList[i].onRefresh);
                }
            }
            if (config.callBack != null) {
                config.callBack();
            }
        });
        contentHTML = null;
        return this;
    };

    //资产信息和维护
    $.fn.maintainZiChan = function (opt) {
        this.defaults = {
            id: '',//根节点ID
            titleID: '',
            contentInfor: {
                id: '',
                title: '资产信息',
                imgID: '',
                list: [],//{name:'',text:''}
                btnText: '我要维护',
                btnClick: null,
            },
            contentApply: {
                id: '',
                title: '维护申请',
                textareaID: '',
                uploadImageID: 'fileImg', //上传图片插件ID
                btnText: '提交',
                btnTextCan: '取消',
                btnClick: null,
            },
            callBack: null,//回调
        },
            this.options = $.extend(true, {}, this.defaults, opt);
        var config = this.options;
        var newRow = '';
        for (var i = 0; i < config.contentInfor.list.length; i++) {
            newRow += '<li>' +
                '<div class="item-content">' +
                '<div class="item-media mgList_left">' + config.contentInfor.list[i].name + '</div>' +
                '<div class="item-inner">' +
                '<div class="item-title">' + config.contentInfor.list[i].text + '</div>' +
                '</div>' +
                '</div>' +
                '</li>';
        }

        var contentHTML = $('<div class="list-block" id="' + config.id + '" style="overflow:auto;height:100%;">' +
            '<div id="' + config.contentInfor.id + '">' +
            '<img id="' + config.contentInfor.imgID + '" class="zicanImg"/>' +
            '<ul>' +
            newRow +
            '</ul>' +
            '<a href="#" class="button button-big button-fill zicanBtn" titleID="' + config.titleID + '" titleto="' + config.contentApply.title + '">' + config.contentInfor.btnText + '</a>' +
            '</div>' +

            '<div id="' + config.contentApply.id + '" style="display:none">' +
            '<p class="words leftText">请输入维护内容：</p>' +
            '<p class="mgSection">' +
            '<textarea id="' + config.contentApply.textareaID + '" style="background:#fff;"></textarea>' +
            '</p>' +
            '<p class="words leftText"></p>' +
            '<div id="' + config.contentApply.uploadImageID + '" class="addimgDiv">' +
            '</div>' +
            '<p class="row">' +
            '<a href="#" class="button button-big button-fill zicanBtn col-50" titleID="' + config.titleID + '" titleto="' + config.contentInfor.title + '">' + config.contentApply.btnText + '</a>' +
            '<a href="#" class="button button-big zicanBtn color-red col-50" titleID="' + config.titleID + '" titleto="' + config.contentInfor.title + '" cancel="cancel">' + config.contentApply.btnTextCan + '</a>' +
            '</p>' +
            '</div>' +
            '</div>');
        this.innerHTML = "";
        $("#" + config.titleID).html(config.contentInfor.title);
        $(this).append(contentHTML).ready(function () {
            if (config.contentInfor.btnClick != null) {
                $('#' + config.contentInfor.id).find('a').unbind();
                $('#' + config.contentInfor.id).find('a').bind('click', config.contentInfor.btnClick);
            }
            if (config.contentApply.btnClick != null) {
                $('#' + config.contentApply.id).find('a').unbind();
                $('#' + config.contentApply.id).find('a').bind('click', config.contentApply.btnClick);
            }
            if (config.callBack != null) {
                config.callBack();
            }
        });
        contentHTML = null;
        return this;
    };

    //选择图片或拍照插件
    $.fn.fileImg = function (opt) {
        this.defaults = {  //默认配置
            way: 'multiple="multiple"',  //multiple多种选择，camera只打开照相机
            ico: {  //打开按钮的图标
                src: '',  //图片地址
                icon: 'iconfont icon-addimg'  //内置字体图标
            },
            count: 4,  //最大图片数量
            compress: 100,  //压缩预览图片，按百分比来压缩，默认为0，不压缩，最大值为100
            fixedWidth: null,  //按固定宽度压缩，若当前宽度小于固定宽度则不压缩，若百分比参数也有，则按固定宽度
            fileUpload: {  //上传配置
                showBtn: true,//是否显示上传按钮
                serverURL: '/GWService.asmx/FileUpload',//上传服务地址
                serverFolder: '',//上传到服务器的文件夹地址，默认为根目录下/FileUpload/
                btnText: '开始上传',//上传按钮的名字
                btnCallBack: null
            },
            callBack: null,//回调
        },
            this.options = $.extend(true, {}, this.defaults, opt);
        var option = this.options;
        if (option.way == 'camera') {
            option.way = 'capture="camera"';
        }

        var icons = '';
        if (option.ico.src == '') {
            icons = '<i class="' + option.ico.icon + ' addimgListIcon"></i>';
        }
        else {
            icons = '<img src="' + option.ico.src + ' addimgListIcon"/>';
        }

        var accept = 'image/gif,image/jpeg,image/jpg,image/png,image/svg';
        if (isAndroid()) {
            accept = 'image/*';
        }
        var imgHTML = $('<div class="addimgList flexBoxStart">' +
            '<div class="addimgListItme">' +
            '<input type="file" accept="' + accept + '" ' + option.way + '>' +
            icons +
            '</div>' +
            '</div>');
        //选择事件
        this.fileImgChangeFun = function () {
            $(this).find('input').unbind();
            option.files = [];
            $(this).find('input').bind('change', function (index) {
                var thisElem = $(index.target).parent();
                try {
                    var len = this.files.length;
                    if (option.count < len) {
                        len = option.count;
                    }
                    for (var i = 0; i < len; i++) {
                        var r = (Math.random() + '').split('.');
                        var ran = 'file_' + r[1];
                        option.files.push({
                            name: ran,
                            file: this.files[i]
                        });

                        var reader = new FileReader();
                        reader.item = ran;
                        reader.onloadstart = function () {
                            addImageHTML(thisElem, this.item);
                        };
                        reader.onload = function (e) {
                            if (option.fixedWidth == null) {
                                if (option.compress == 0 || option.compress == 100) {
                                    $('#' + this.item).attr('src', e.target.result);
                                }
                                else {
                                    compress(e.target.result, function (res, item) {
                                        $('#' + item).attr('src', res);
                                    }, option.compress, this.item, null);
                                }
                            }
                            else {
                                compress(e.target.result, function (res, item) {
                                    $('#' + item).attr('src', res);
                                }, option.compress, this.item, option.fixedWidth);
                            }
                        };
                        reader.readAsDataURL(this.files[i]);
                    }
                }
                catch (e) {
                    reader = null;
                }
            });
        }
        var t = this;
        $(this).append(imgHTML).ready(function () {
            t.fileImgChangeFun();
            t = null;
            if (option.callBack != null) {
                option.callBack();
            }
        });

        //压缩
        function compress(res, fun, compressNum, item, fixedWidth) {
            var img = new Image();
            var compressNumbs = compressNum / 100;
            img.onload = function () {
                var cvs = document.createElement('canvas'),
                    ctx = cvs.getContext('2d'); 
                if (fixedWidth != null && parseInt(fixedWidth) < img.width) {
                    img.height = img.height / (img.width / parseInt(fixedWidth));
                    img.width = parseInt(fixedWidth);
                }
                else {
                    img.width *= compressNumbs;
                    img.height *= compressNumbs;
                }

                cvs.width = img.width;
                cvs.height = img.height;

                ctx.clearRect(0, 0, cvs.width, cvs.height);
                ctx.drawImage(img, 0, 0, img.width, img.height);
                var dataUrl = cvs.toDataURL('image/jpeg', 1);
                cvs = null;
                fun(dataUrl, item);
            }
            img.src = res;
        }

        //添加预览图片
        function addImageHTML(dom, index) {
            var newRowDiv = $("<div class='addimgListItme' item='" + index + "'></div>");
            var newRow = $("<img id='" + index + "'/>");
            //newRow.attr("src", base64URL);
            newRowDiv.append(newRow);
            newRowDiv.unbind();
            newRowDiv.bind('click', function () {
                var list = new Array();
                var initialSlides = 0;
                var th = $(this).find('img').attr('src');
                $(this).parent().find('img').each(function (i) {
                    list.push({ url: $(this).attr('src'), captions: '1', ram: $(this).parent().attr('item') });
                    if (th == $(this).attr('src')) {
                        initialSlides = i;
                    }
                });
                photoBrowserShow(list, initialSlides, this);
            });
            newRow = null;
            dom.before(newRowDiv);
            newRowDiv = null;
            var parent = dom.parent();
            var len = parent.children("div").length;
            if (len > option.count) {
                parent.children("div").eq(len - 1).hide();
            }
            parent = null;
        }

        //预览图片
        function photoBrowserShow(list, initialSlides, dt) {
            var myPhotoBrowser = myApp.photoBrowser({
                zoom: 400,
                photos: list,
                theme: 'dark',
                ofText: '/',
                backLinkText: ' ',
                initialSlide: initialSlides,
                onOpen: function () {
                    if ($('.photo-browser').find('.right').html() == "") {
                        var lables = $("<label class=\"label-checkbox item-content\" style=\"background:transparent\">" +
                            "<input id='rightCheckbox' type=\"checkbox\" name=\"ks-checkbox\" checked>" +
                            "<div class=\"item-media\"><i class=\"icon icon-form-checkbox\"></i></div>" +
                            "</label>");
                        var th = this;
                        lables.unbind();
                        lables.bind('click', function () {
                            var t = parseInt($('.photo-browser-current').text()) - 1;
                            var p = th.photos[t].captions;
                            if (p == '0') {
                                th.photos[t].captions = '1';
                            }
                            else {
                                th.photos[t].captions = '0';
                            }
                        });
                        $('.photo-browser').find('.right').append(lables);
                        lables = null;
                    }
                },
                onTransitionEnd: function () {
                    var t = parseInt($('.photo-browser-current').text()) - 1;
                    var p = this.photos[t].captions;
                    if (document.getElementById('rightCheckbox')) {
                        if (p == '0') {
                            document.getElementById('rightCheckbox').checked = false;
                        }
                        else {
                            document.getElementById('rightCheckbox').checked = true;
                        }
                    }
                },
                onClose: function () {
                    var t = this.photos;
                    $(dt).parent().find('img').each(function (i) {
                        if (t[i].captions == '0') {
                            var parent = $(this).parent().parent();
                            $(this).parent().remove();
                            var len = parent.children("div").length;
                            parent.children("div").eq(len - 1).show();

                            var item = t[i].ram;
                            for (var j = 0; j < option.files.length; j++) {
                                if (option.files[j].name == item) {
                                    option.files.splice(j, 1);
                                }
                            }
                        }
                    });
                    t = null;
                }
            });
            myPhotoBrowser.open();
        }

        //判断是否为android端
        function isAndroid() {
            var sUserAgent = navigator.userAgent.toLowerCase();
            var bIsAndroid = sUserAgent.match(/android/i) == "android";
            return bIsAndroid;
        }

        imgHTML = null;

        //上传按钮
        if (option.fileUpload.showBtn) {
            var btnUpload = $('<button class="button button-fill btnUpload">' + option.fileUpload.btnText + '</button>');
            btnUpload.bind('click', onFileUpload);
            $(this).append(btnUpload);
            btnUpload = null;
        }
        //开始上传
        function onFileUpload() {
            if (option.files.length == 0) {
                myApp.modal({
                    title: "",
                    text: '未选中任何文件！',
                    buttons: [
                        {
                            text: '确定'
                        }
                    ]
                });
                return;
            }
            var formDatas = new FormData();
            for (var i = 0; i < option.files.length; i++) {
                formDatas.append('file', option.files[i].file);
            }
            ajaxUpload(formDatas);
        }
        //ajax上传
        function ajaxUpload(formDatas) {
            var progressModal;
            var ajaxDom = $.ajax({
                type: 'post',
                url: option.fileUpload.serverURL,
                data: formDatas,
                cache: false,
                processData: false, // 不处理发送的数据，因为data值是Formdata对象，不需要对数据做处理
                contentType: false, // 不设置Content-type请求头
                beforeSend: function () {
                    progressModal = myApp.modal({
                        title: "",
                        text: '<p id="progressText">正在上传</p>',
                        buttons: [
                            {
                                text: '取消',
                                onClick: function () {
                                    ajaxDom.abort();
                                }
                            }
                        ]
                    });
                },
                success: function (data) {
                    ajaxDom = null;
                    if (option.fileUpload.btnCallBack != null) {
                        myApp.closeModal(progressModal);
                        option.fileUpload.btnCallBack(data);
                    }
                    else {
                        $("#progressText").html('成功上传：' + data + '个文件');
                        setTimeout(function () {
                            myApp.closeModal(progressModal);
                        }, 2000);
                    }
                },
                xhr: function () {
                    var xhr = $.ajaxSettings.xhr();
                    if (onprogress && xhr.upload) {
                        xhr.upload.addEventListener("progress", onprogress, false);
                        return xhr;
                    }
                },
                error: function () { ajaxDom = null; }
            });
        }
        this.ajaxUpload = ajaxUpload;
        //上传进度
        function onprogress(evt) {
            var loaded = evt.loaded;                  //已经上传大小情况 
            var tot = evt.total;                      //附件总大小 
            var per = Math.floor(100 * loaded / tot);     //已经上传的百分比  

            $("#progressText").html("上传进度：" + per + "%");
        }

        //清空
        this.clear = function () {
            option.files = [];
            $(this).find('.addimgList').find('div').each(function () {
                if ($(this).find('input').length <= 0) {
                    $(this).remove();
                }
            });
        }

        return this;
    };
})(jQuery, window, document);