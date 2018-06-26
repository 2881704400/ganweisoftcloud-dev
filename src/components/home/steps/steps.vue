<template>
	<div class="guide">
		<div class="container">
			<div class="title">开始接入敢为云</div>
			<div class="process">
				<div class="time-line"></div>
				<div class="node step-1">1</div>
				<div class="node step-2">2</div>
				<div class="node step-3">3</div>
				<div class="node step-4">4</div>
				<div class="node step-5 iconfont">5</div>
			</div>

			<div class="step-desc">
				<div class="node step-1">
					<div class="circle">1</div>
					<div class="desc">首先，注册敢为云账号</div>
					<a class="btn" href="#" @click="login">立即注册</a>
				</div>
				<div class="node step-2">
					<div class="circle">2</div>
					<div class="desc">花2分钟，进行信息实名认证</div>
					<a class="btn" href="#">实名认证</a>
				</div>
				<div class="node step-3">
					<div class="circle">3</div>
					<div class="desc">选择您需要的虚拟机，进行个性化配置</div>
					<a class="btn" href="#">主机配置</a>
				</div>
				<div class="node step-4">
					<div class="circle">3</div>
					<div class="desc">在产品列表中，选择您需要的产品和服务</div>
					<a class="btn" href="#">选择产品</a>
				</div>
				<div class="node step-5">
					<div class="circle iconfont">5</div>
					<div class="desc">现在，您可尽情使用敢为云平台的产品服务</div>
					<a class="btn" href="#" target="_blank">开始使用</a>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		methods: {
			login: function() {
				this.$router.push({
					name: "login"
				});
			}
		}

	}
</script>

<style>
	.guide {
		width: 100%;
		height: 400px;
		background-color: #00a0ff;
		/* 00a0ff */
	}
	
	.guide .container {}
	
	.container {
		padding: 0 10px;
		position: relative;
		width: 74%;
		margin: 0 auto;
		box-sizing: border-box;
	}
	
	.guide .title {
		color: white;
		font-size: 30px;
		text-align: center;
		height: 100px;
		line-height: 100px;
	}
	
	.guide .process {
		position: relative;
		margin-bottom: 20px;
	}
	
	.guide .process .time-line {
		height: 4px;
		width: 80%;
		background-color: white;
		opacity: 0.5;
		position: relative;
		top: 27px;
	}
	
	.guide .process .node {
		color: #00a0ff;
		position: absolute;
		height: 50px;
		width: 50px;
		border-radius: 100px;
		background-color: white;
		text-align: center;
		line-height: 50px;
		font-size: 15px;
	}
	
	.guide .process .step-2 {
		left: 20%;
	}
	
	.guide .process .step-3 {
		left: 40%;
	}
	
	.guide .process .step-4 {
		left: 60%;
	}
	
	.guide .process .step-5 {
		left: 80%;
	}
	
	.guide .step-desc {
		position: absolute;
		width: 100%;
		top: 170px;
	}
	
	.guide .step-desc .node {
		width: 20%;
		height: 150px;
		float: left;
		border-left: 2px solid rgba(255, 255, 255, 0.5);
		position: relative;
	}
	
	.guide .step-desc .node .circle {
		display: none;
	}
	
	.guide .step-desc .node .desc {
		position: absolute;
		top: 12px;
		left: 30px;
		color: white;
		font-size: 16px;
	}
	
	.guide .step-desc .node.step-1 .btn {
		background-color: #f857a6;
		line-height: 40px;
		border: none;
	}
	
	.guide .step-desc .node .btn {
		position: absolute;
		top: 72px;
		left: 30px;
		font-size: 12px;
		padding: 0 33px;
		height: 40px;
		line-height: 36px;
		box-sizing: border-box;
		border-radius: 4px;
		display: block;
		text-align: center;
		cursor: pointer;
		color: white;
		border: 2px solid white;
	}
	
	.guide .step-desc .node .btn:hover {
		border: 2px solid #8BCCFE;
	}
	
	.guide .step-desc .node.step-1 .btn:hover {
		border: none;
		opacity: 0.8;
	}
</style>