<template>
	<div class="foot">
    <div class="container clearfix">
        <div class="logo"></div>
        <div class="links">
            <div class="title">产品</div>
            <div class="item">
                <a href="/product.html">多屏互动</a>
            </div>
            <div class="item">
                <a href="/product-international-sms.html">远距体感</a>
            </div>
            <div class="item">
                <a href="/product-voice.html">自然语音</a>
            </div>
            <div class="item">
                <a href="/product-voice-notification.html">虚拟现实</a>
            </div>
            <!--<div class="item">
                <a href="/product-voice.html">移动终端</a>
            </div>
            <div class="item">
                <a href="/product-voice-notification.html">多点触控</a>
            </div>-->
        </div>
        <div class="links">
            <div class="title">使用指南</div>
            <div class="item">
                <a href="/api2.0/guide.html">API文档</a>
            </div>
            <div class="item">
                <a href="/start/faq.html">常见问题</a>
            </div>
            <div class="item">
                <a href="/api2.0/document-demo.html">示例下载</a>
            </div>
        </div>
        <div class="links">
            <div class="title">服务</div>
            <div class="item">
                <a href="/price.html">价格详情</a>
            </div>
            <div class="item">
                <a href="/start/policy.html">服务协议</a>
            </div>
            <div class="item">
                <a href="/start/attachment.html">隐私协议</a>
            </div>
            <div class="item">
                <a href="/partner_link/links.html">合作伙伴</a>
            </div>
        </div>
        <div class="links links-lastchild">
            <div class="title">关于我们</div>
            <div class="item"><a href="/about/us.html">联系我们</a></div>
            <div class="item"> 企业邮箱：ganwei@ganweisoft.com</div>
            <div class="item">传真：0755-82047847</div>
            <div class="item">电话：0755-82047841 82737061 82047842</div>
            <div class="item">客服QQ：2853993572 2853993575</div>
        </div>
    </div>
</div>
</template>

<script>
</script>
export default{ }
<style>
	.foot {
    	background-color: #fff;
    	width: 100%;
    	height: 240px;
	}
	.foot .container {
	    position: relative;
	    padding: 0 10px;
	}
	.foot .logo {
	    display: none;
	}
	.foot .container .links {
	    float: left;
	    width: 25%;
	    height: 100%;
	    position: relative;
	}
	.foot .container .links .title {
	    padding: 33px 0 18px 0;
	    color: #999;
	    border-bottom: 1px solid lightgrey;
	    margin-bottom: 20px;
	    display: inline-block;
	}
	.foot .container .links .item {
	    height: 25px;
	    line-height: 25px;
	    color: #666666;
	}
	.foot .container .links .item a {
	    cursor: pointer;
}
</style>