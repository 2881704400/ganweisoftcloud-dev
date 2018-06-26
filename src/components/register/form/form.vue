<template>
	<div class="form">
		<!--<loading></loading>-->
		<div class="form-content">
			<div class="head">
				欢迎注册敢为云
			</div>
			<div class="more">
				<a href="#/login">已有账号，立即登录&gt&gt</a>
			</div>
			<div class="input-box">
				<Poptip placement="right" class="input-poptip-main">
			        <input type="" name="" id="" class="input-layout" value="" placeholder="设置用户名" />
			        <div slot="content" class="input-poptip-content">
			            <div><span>·&nbsp;</span><label>5-25个字符，推荐使用中文</label></div>
			            <div><span>·&nbsp;</span><label>请勿包含身份证/银行卡等隐私信息，一旦设置成功无法修改</label></div>
			        </div>
			    </Poptip>
			    
			    <Poptip placement="right" class="input-poptip-main">
			        <input type="" name="" id="" class="input-layout" value="" placeholder="设置您的登录密码" />
			        <div slot="content" class="input-poptip-content">
			            <div><span>·&nbsp;</span><label>6-20个字符，密码不能和用户名相同</label></div>
			            <div><span>·&nbsp;</span><label>只能保护字母、数字以及标点符号（除空格）</label></div>
			            <div><span>·&nbsp;</span><label>字母、数字和标点符号至少包含2种</label></div>
			        </div>
			    </Poptip>
				
				<Poptip placement="right" class="input-poptip-main">
			        <input type="" name="" id="" class="input-layout" value="" placeholder="请再次输入您的密码" />
			        <div slot="content" class="input-poptip-content">
			            <div><span>·&nbsp;</span><label>请再次输入您的密码</label></div>
			        </div>
			    </Poptip>
				
				<span class="input-layout-btn">+86</span>
				<Poptip placement="right" class="input-poptip-main">
			        <input type="" name="" id="" class="input-layout-last" value="" placeholder="请输入手机号码" />
			        <div slot="content" class="input-poptip-content">
			            <div><span>·&nbsp;</span><label>请输入您的手机号码</label></div>
			        </div>
			    </Poptip>
				
				<input type="" name="" id="" class="input-layout-last" style="width: 160px;" value="" placeholder="手机验证码" />
			    <Button class="input-box-button">获取验证码</Button>
			    
				<p class="statement-main">
					<Checkbox label="facebook" size="large"></Checkbox>
					<span style="margin-left: -2px;">我已阅读并同意<a href="#">敢为云服务协议</a>和<a href="#">敢为云隐私声明</a></span>
				</p>
				
				<Button type="primary" class="input-box-btn-sure">同意协议并提交</Button>
				<!--<Form :model="formItem" :label-width="80">
	            	<Input v-model="formItem.input" name="user-name" id="user-name" placeholder="设置用户名"></Input>
		        </Form>-->
			</div>
		</div>
	</div>
</template>

<script>
	import loading from '../../loading';
	
	export default {
		data() {
			return {
				formItem: {
					input: '',
					select: '',
					radio: 'male',
					checkbox: [],
					switch: true,
					date: '',
					time: '',
					slider: [20, 50],
					textarea: ''
				},
				formInline: {
					user: '',
					password: ''
				},
				ruleInline: {
					user: [{
						required: true,
						message: 'Please fill in the user name',
						trigger: 'blur'
					}],
					password: [{
							required: true,
							message: 'Please fill in the password.',
							trigger: 'blur'
						},
						{
							type: 'string',
							min: 6,
							message: 'The password length cannot be less than 6 bits',
							trigger: 'blur'
						}
					]
				}
			}
		},
		components:{
			loading,
		}
	}
</script>

<style scoped>
	.form {
		width: 100%;
		height: 680px;
		position: relative;
		background: #F8F8F9;
	}
	
	.form-content {
		width: 50%;
		height: 96%;
		margin: auto;
		position: relative;
		top: 2%;
		background: #fff;
		border-top: 3px solid #18A2EF;
		box-shadow: 1px 1px 10px #E1E1E1;
	}
	
	.form-content .head {
		padding: 40px 0 0 20px;
		font-size: 30px;
		color: #373d41;
		letter-spacing: 1px;
		line-height: 36px;
	}
	
	.form-content .more {
		font-size: 15px;
		text-align: right;
		position: relative;
		top: -30px;
		right: 10px;
	}
	
	.form-content .input-box {
		padding-top: 40px;
		height: 500px;
		width: 340px;
		margin: auto;
	}
	
	.form-content .input-box .input-layout {
		width: 340px;
		height: 43px;
		border: 1px solid #D9D9D9;
		border-radius: 2px;
		margin: 8px 0px;
		font-size: 13px;
		color: #373d41;
		padding-left: 10px;
	}
	
	.form-content .input-box .input-layout-last{
		width: 290px;
		height: 43px;
		border: 1px solid #D9D9D9;
		border-radius: 2px;
		margin: 8px 0px;
		font-size: 13px;
		color: #373d41;
		padding-left: 10px;
	}
	
	.input-layout-btn{
		width: 50px;
		height: 43px;
		display:flex;
		margin: 8px 0px;
		float: left;
		border: 1px solid #D9D9D9;
		border-right: none;
		align-items: center;
		justify-content: center;
		font-size: 13px;
		color: #929597;
	}
	
	.input-poptip-content div{
		width: 100%;
		clear: both;
		white-space: normal;
		letter-spacing: 1.2px;
	}
	
	.input-poptip-content div span{
		float: left;
		width: 6%;
	}
	
	.input-poptip-content div label{
		float: left;
		width: 94%;
	}
	
	.input-box-button{
		width: 167px;
		height: 43px;
		position: relative;
		top: -1px;
		left: 10px;
		color: #333;
		font-size: 13px;
	}
	
	.statement-main{
		padding-top: 6px;
		font-size: 13px;
	}
	
	.input-box-btn-sure{
		width: 340px;
		height: 43px;
		margin-top: 20px;
		/*color: #333;*/
		font-size: 13px;
	}
	
	input::-webkit-input-placeholder,
	textarea::-webkit-input-placeholder {
		color: #929597;
	}
	
	input:-moz-placeholder,
	textarea:-moz-placeholder {
		color: #929597;
	}
	
	input::-moz-placeholder,
	textarea::-moz-placeholder {
		color: #929597;
	}
	
	input:-ms-input-placeholder,
	textarea:-ms-input-placeholder {
		color: #929597;
	}
</style>