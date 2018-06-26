<template>
	<div>
		<div class="layout-main-box" style="height: 500px;">
			<p>为什么选择敢为云</p>
			<img src="../../../assets/product/2.png" style="left:14%" />
			<ul class="layout-main-box-desc">
				<li>
					<Icon type="checkmark-circled" size="28" color="#2D84EB"></Icon>
					<span>全面集成各类设备/传感器</span>
				</li>
				<li>
					<Icon type="checkmark-circled" size="28" color="#2D84EB"></Icon>
					<span>依托共性软件平台强大的通讯功能，实现对各类设备/传感器的快速兼容整合</span>
				</li>
			</ul>
		</div>
		<div class="layout-main-box">
			<img src="../../../assets/product/5.png" style="top:11%;left:15%" />
			<ul class="layout-main-box-desc">
				<li>
					<Icon type="checkmark-circled" size="28" color="#2D84EB"></Icon>
					<span>完全自定义的用户界面</span>
				</li>
				<li>
					<Icon type="checkmark-circled" size="28" color="#2D84EB"></Icon>
					<span>平台提供数百种图元模块，可以通过积木式搭建快速满足用户的个性化需求</span>
				</li>
			</ul>
		</div>
		<div class="layout-main-box">
			<img src="../../../assets/product/7.png" style="top:11%;left:19.5%"/>
			<ul class="layout-main-box-desc">
				<li>
					<Icon type="checkmark-circled" size="28" color="#2D84EB"></Icon>
					<span>多样化的人机交互</span>
				</li>
				<li>
					<Icon type="checkmark-circled" size="28" color="#2D84EB"></Icon>
					<span>提供移动终端、C\S、B\S、PC、多屏坐席、多屏\巨屏互动等多种交互方式</span>
				</li>
			</ul>
		</div>
		<div class="layout-main-box">
			<img src="../../../assets/product/15.png" style="top:12%;left:18.5%"/>
			<ul class="layout-main-box-desc">
				<li>
					<Icon type="checkmark-circled" size="28" color="#2D84EB"></Icon>
					<span>信息一站式推送</span>
				</li>
				<li>
					<Icon type="checkmark-circled" size="28" color="#2D84EB"></Icon>
					<span>系统提供自定义信息块的任意组合，一旦发生报警，信息块会随着主界面一起推送给用户</span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {

	}
</script>

<style>
	.layout-main-box {
		width: 100%;
		height: 400px;
		text-align: center;
		position: relative;
	}
	
	.layout-main-box:nth-of-type(odd) {
		background: #f8f8f9;
	}
	
	.layout-main-box:nth-of-type(even) {
		background: #fff;
	}
	
	.layout-main-box p {
		font-size: 1.8rem;
		padding: 30px 0;
	}
	
	.layout-main-box img {
		height: 300px;
		position: absolute;
		left: 20%;
	}
	
	.layout-main-box-desc {
		width: 30%;
		height: 35%;
		position: absolute;
		top: 35%;
		right: 15%;
		text-align: left;
	}
	
	.layout-main-box-desc li {
		height: 50%;
	}
	
	.layout-main-box-desc li span {
		display: block;
		font-size: 16px;
		position: relative;
		top: -27px;
		left: 33px;
	}
</style>