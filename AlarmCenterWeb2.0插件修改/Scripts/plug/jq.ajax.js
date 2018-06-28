/*****************************************************************
                  jQuery Ajax封装通用类  (linjq)       
*****************************************************************/
$(function () {
	/**
     * ajax封装
     * url 发送请求的地址
     * type 请求方式("POST" 或 "GET")， 默认为 "GET"
     * timeout 设置请求超时时间（毫秒），默认为3分钟
	 * authKey 有效签名
	 * contentType 默认值: "application/x-www-form-urlencoded"。发送信息至服务器时内容编码类型。
     * data 发送到服务器的数据，数组存储，如：{"date": new Date().getTime(), "state": 1}
     * async 默认值: true。默认设置下，所有请求均为异步请求。如果需要发送同步请求，请将此选项设置为 false。
     *       注意，同步请求将锁住浏览器，用户其它操作必须等待请求完成才可以执行。
     * dataType 预期服务器返回的数据类型，常用的如：xml、html、json、text
     * beforeSend 发送请求前可修改 XMLHttpRequest 对象的函数
     * success 成功回调函数
     * error 失败回调函数
     * complete 请求完成后回调函数 (请求成功或失败之后均调用)。
     */
	jQuery.ax = function (opt) {
		this.defaults = {  //默认配置
			url: null,
			type: "GET",
			timeout: 1000 * 60 * 3,
			authKey: window.localStorage.ac_appkey + '-' + window.localStorage.ac_infokey,
			contentType: 'application/x-www-form-urlencoded',
			data: null,
			async: true,
			dataType: "json",
			beforeSend: null,
			success: null,
			error: null,
			complete: null
		};
		this.option = $.extend(true, {}, this.defaults, opt);
		var options = this.option;
		$.ajax({
			type: options.type,
			timeout: options.timeout,
			async: options.async,
			headers: {
				Authorization: options.authKey
			},
			contentType: options.contentType,
			data: options.data,
			url: options.url,
			dataType: options.dataType,
			beforeSend: function (xhr) {
				if (options.beforeSend != null) {
					options.beforeSend(xhr);
				}
			},
			success: function (d) {
				options.success(d);
			},
			error: function (e) {
				if (options.error != null) {
					options.error(e);
				}
			},
			complete: function (xhr, ts) {
				if (options.complete != null) {
					options.complete(xhr, xhr);
				}
			}
		});
	};

	jQuery.axpost = function (opt) {
		this.defaults = {  //默认配置
			url: null,
			type: "POST",
			authKey: window.localStorage.ac_appkey + '-' + window.localStorage.ac_infokey,
			data: null,
			async: true,
			dataType: "json",
			success: null,
			error: null,
		};
		this.option = $.extend(true, {}, this.defaults, opt);
		var options = this.option;
		$.ajax({
			type: options.type,
			async: options.async,
			headers: {
				Authorization: options.authKey
			},
			data: options.data,
			url: options.url,
			dataType: options.dataType,
			success: function (d) {
				options.success(d);
			},
			error: function (e) {
				if (options.error != null) {
					options.error(e);
				}
			}
		});
	};

	jQuery.axget = function (opt) {
		this.defaults = {  //默认配置
			url: null,
			type: "GET",
			authKey: window.localStorage.ac_appkey + '-' + window.localStorage.ac_infokey,
			data: null,
			async: true,
			dataType: "json",
			success: null,
			error: null,
		};
		this.option = $.extend(true, {}, this.defaults, opt);
		var options = this.option;
		$.ajax({
			type: options.type,
			async: options.async,
			headers: {
				Authorization: options.authKey
			},
			data: options.data,
			url: options.url,
			dataType: options.dataType,
			success: function (d) {
				options.success(d);
			},
			error: function (e) {
				if (options.error != null) {
					options.error(e);
				}
			}
		});
	};

    /*
     * ajax封装文件上传
     * 包含上传进度
     */
	jQuery.axfile = function (opt) {
	    this.defaults = {  //默认配置
	        url: null,
	        type: "POST",
	        authKey: window.localStorage.ac_appkey + '-' + window.localStorage.ac_infokey,
	        data: null,
	        async: true,
	        beforeSend: null,
	        success: null,
	        error: null,
	        onprogress: null
	    };
	    this.option = $.extend(true, {}, this.defaults, opt);
	    var options = this.option;
	    $.ajax({
	        type: options.type,
	        timeout: options.timeout,
	        async: options.async,
	        headers: {
	            Authorization: options.authKey
	        },
	        contentType: options.contentType,
	        data: options.data,
	        url: options.url,
	        cache: false,
	        processData: false, // 不处理发送的数据，因为data值是Formdata对象，不需要对数据做处理
	        contentType: false, // 不设置Content-type请求头
	        beforeSend: function (xhr) {
	            if (options.beforeSend != null) {
	                options.beforeSend(xhr);
	            }
	        },
	        success: function (d) {
	            options.success(d);
	        },
	        error: function (e) {
	            if (options.error != null) {
	                options.error(e);
	            }
	        },
	        xhr: function () {
	            var xhr = $.ajaxSettings.xhr();
	            if (options.onprogress && xhr.upload) {
	                xhr.upload.addEventListener("progress", options.onprogress, false);
	                return xhr;
	            }
	        }
	    });
	};

    /*
     * ajax封装文件上传
     * 不包含上传进度
     */
	jQuery.axfilex = function (opt) {
	    this.defaults = {  //默认配置
	        url: null,
	        type: "POST",
	        authKey: window.localStorage.ac_appkey + '-' + window.localStorage.ac_infokey,
	        data: null,
	        async: true,
	        beforeSend: null,
	        success: null,
	        error: null
	    };
	    this.option = $.extend(true, {}, this.defaults, opt);
	    var options = this.option;
	    $.ajax({
	        type: options.type,
	        timeout: options.timeout,
	        async: options.async,
	        headers: {
	            Authorization: options.authKey
	        },
	        contentType: options.contentType,
	        data: options.data,
	        url: options.url,
	        cache: false,
	        processData: false, // 不处理发送的数据，因为data值是Formdata对象，不需要对数据做处理
	        contentType: false, // 不设置Content-type请求头
	        beforeSend: function (xhr) {
	            if (options.beforeSend != null) {
	                options.beforeSend(xhr);
	            }
	        },
	        success: function (d) {
	            options.success(d);
	        },
	        error: function (e) {
	            if (options.error != null) {
	                options.error(e);
	            }
	        }
	    });
	};
});