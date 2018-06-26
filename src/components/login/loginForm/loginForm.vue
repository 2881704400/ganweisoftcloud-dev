<style scoped>
	.loginForm {
		width: auto;
		height: 650px;
		border-bottom: 1px solid rgba(115, 123, 145, .15);
		background: #F7F7F8;
	}
	
	.loginForm-content {
		position: absolute;
		right: 20%;
		top: 120px;
	}
	
	.loginForm-tab {
		display: inline-block;
		background: #fff;
		width: 430px;
		border-radius: 4px;
		box-shadow: 1px 1px 10px #E1E1E1;
	}
	
	.loginForm-tab-title {
		font-size: 28px;
		font-weight: 400;
		padding-top: 25px;
		text-align: center;
		color: #333;
	}
	
	.loginForm .input-box {
		padding-top: 25px;
		height: 410px;
		width: 340px;
		margin: auto;
	}
	
	.loginForm .input-box .input-layout {
		width: 340px;
		height: 43px;
		border: 1px solid #D9D9D9;
		border-radius: 2px;
		margin: 8px 0px;
		font-size: 13px;
		color: #373d41;
		padding-left: 10px;
	}
	
	.loginForm .input-box .input-layout-last {
		width: 290px;
		height: 43px;
		border: 1px solid #D9D9D9;
		border-radius: 2px;
		margin: 8px 0px;
		font-size: 13px;
		color: #373d41;
		padding-left: 10px;
	}
	
	.input-box-btn-sure {
		width: 340px;
		height: 43px;
		margin-top: 20px;
		font-size: 13px;
	}
	
	.input-box-forget {
		width: 340px;
		margin: auto;
		padding: 10px;
		text-align: right;
		font-size: 14px;
		border-bottom: 1px solid lightgrey;
		;
	}
	
	.input-box-email {
		width: 340px;
		margin: auto;
		padding: 10px;
		font-size: 14px;
	}
	
	.input-box-email a {
		color: #ccc;
	}
	
	.regist {
		margin-top: 20px;
		text-align: center;
	}
	
	.regist .tag-line {
		font-size: 14px;
		color: #666;
	}
	
	.regist .link {
		color: #2277da;
		padding: 0 5px;
	}
	
	.next-form-item-explain {
		margin-top: 4px;
		font-size: 14px;
		color: #f15533;
		line-height: 14px;
		position: relative;
		left: 0px;
		top: -5px;
		width: 300px;
		text-align: left;
		display: none;
	}
</style>

<template>
	<div class="loginForm">
		<div class="loginForm-content">
			<div class="loginForm-tab">
				<h1 class="loginForm-tab-title">登录敢为云</h1>
				<div class="input-box">
					<input type="" name="" id="" class="input-layout" value="" placeholder="手机号码/邮箱地址/用户名" />

					<input type="" name="" id="" class="input-layout" value="" placeholder="登陆密码" />

					<Button type="primary" class="input-box-btn-sure">登&nbsp;&nbsp;录</Button>

					<div class="input-box-forget">
						<a href="#">忘记账号或密码</a>
					</div>

					<div class="input-box-email">
						<a href="#">使用其他方式登录</a>
						<!--<Icon type="ios-email" color="grey" size="24" style="position: relative;top:3.5px;left:5px"></Icon>-->
					</div>
				</div>
			</div>
			<div class="regist">
				<p class="tag-line">
					没有账号？
					<a href="#/register" class="link" hotrep="regist.mailactiv.login">立即注册</a>
				</p>
			</div>
		</div>
		
	</div>
</template>

<script>
	export default {

	}
</script>