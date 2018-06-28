//首页事件
function onHomePage() {
    //if (getWebUser) {
    //    pageLists();
    //}
	$('html').removeClass('with-statusbar-overlay');
    // mainView.router.loadPage("RealTime.html")
    // $(".tabbar").css({"position":"absolute","left":0,"top":"100%","transform"});

}

//界面尺寸变化事件
function onResizeCustomized() {
    if ($(".view-main").attr("data-page") == "Voice") {
        var heightWindow = $(".page-content").height();
        if (heightWindow < 500) {
            $(".voiceDivs").css("height", "100%");
            $(".voiceDivs").css("bottom", "40px");
            $(".voiceDivs").css("position", "relative");
        }
        else {
            $(".voiceDivs").css("height", "300px");
            $(".voiceDivs").css("bottom", "60px");
            $(".voiceDivs").css("position", "absolute");
        }
    }
}