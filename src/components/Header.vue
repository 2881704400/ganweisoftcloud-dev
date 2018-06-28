<template>
	<div class="header" id="sightspotId">
		<div class="header-logo" :class="{bgTranSparent:isShowbgColor}">
			<div class="navigation-inner">
				<div class="logo">
					<a href="nav"><img src="../assets/img/head_logo.png" title="敢为云" /></a>
				</div>

				<div class="operation">
					<div class="login-inner">
						<a href="#" class="login-text">登录</a>
					</div>
					<a href="#" class="qc-btn link-mc"><span>开发者后台</span></a>
					<p class="phone-inner">
						<i class="iconfont icon-web-dianhua"></i> 0755-82047841
					</p>
				</div>
				<div class="menu-btn" @click="openMenu()">
					<i class="iconfont" :class="{'icon-web-menulist': !isMenuFlag,'icon-web-cancel': isMenuFlag}"></i>
				</div>
			</div>
		</div>
		<div class="header-nav" :class="{bgTranSparent:isShowbgColor}">
			<div class="categories" v-show="isShowMenu">
				<ul class="menu">
					<li class="presentation">
						<h2><a href="/#/footer">首页</a></h2>
					</li>
					<li class="presentation">
						<h2 @click="openMenuList(1)"><a href="#">产品</a><i class="iconfont icon-unfold"></i></h2>
						<ul class="menu-list" v-show="isFirst==1||isFirst==999">
							<li @click="openSecMenuList(1)">
								<a href="#">连接——开放物联</a>
								<i class="iconfont icon-unfold"></i>
								<ul class="second-menu" v-show="isSecond==1||isSecond==999">
									<li>
										<a href="#"><i class="iconfont icon-web-dianhua"></i><span>人脸识别</span></a>
									</li>
									<li>
										<a href="#"><i class="iconfont icon-fengdian"></i><span>位置服务</span></a>
									</li>
								</ul>
							</li>
							<li @click="openSecMenuList(2)">
								<a href="#">计算——可靠平台</a>
								<i class="iconfont icon-unfold"></i>
								<ul class="second-menu" v-show="isSecond==2||isSecond==999">
									<li>
										<a href="#"><i class="iconfont icon-dashuju"></i><span>多点触控</span></a>
									</li>
									<li>
										<a href="#"><i class="iconfont icon-atom"></i><span>虚拟现实</span></a>
									</li>
								</ul>
							</li>
							<li @click="openSecMenuList(3)">
								<a href="#">应用——共赢生态</a>
								<i class="iconfont icon-unfold"></i>
								<ul class="second-menu" v-show="isSecond==3||isSecond==999">
									<li>
										<a href="#"><i class="iconfont icon-anquan"></i><span>自然语音</span></a>
									</li>
									<li>
										<a href="#"><i class="iconfont icon-babiao"></i><span>远距体感</span></a>
									</li>
								</ul>
							</li>
							<li @click="openSecMenuList(4)">
								<a href="#">创新——赋能智造</a>
								<i class="iconfont icon-unfold"></i>
								<ul class="second-menu" v-show="isSecond==4||isSecond==999">
									<li>
										<a href="#"><i class="iconfont icon-icontubiao"></i><span>虚拟现实</span></a>
									</li>
									<li>
										<a href="#"><i class="iconfont icon-yingyong"></i><span>城市大脑</span></a>
									</li>
								</ul>
							</li>
						</ul>
					</li>
					<li class="presentation">
						<h2 @click="openMenuList(2)"><a href="#">解决方案</a><i class="iconfont icon-unfold"></i></h2>
						<ul class="menu-list onemenu-list" v-show="isFirst==2||isFirst==999">
							<li>
								<a href="#">智慧建筑</a>
							</li>
							<li>
								<a href="#">智慧社区</a>
							</li>
							<li>
								<a href="#">智慧别墅</a>
							</li>
							<li>
								<a href="#">智慧家居</a>
							</li>
							<li>
								<a href="#">智慧测试</a>
							</li>
							<li>
								<a href="#">智慧工厂</a>
							</li>
							<li>
								<a href="#">智慧城管</a>
							</li>
							<li>
								<a href="#">智慧环保</a>
							</li>
						</ul>
					</li>
					<li class="presentation">
						<h2><a href="#">新闻资讯</a></h2>
					</li>
					<li class="presentation">
						<h2><a href="#">文档支持</a></h2>
					</li>
					<li class="presentation">
						<h2 @click="openMenuList(3)"><a href="#">关于我们</a><i class="iconfont icon-unfold"></i></h2>
						<ul class="menu-list onemenu-list" v-show="isFirst==3||isFirst==999">
							<li>
								<a href="#">公司简介</a>
							</li>
							<li>
								<a href="#">团队介绍</a>
							</li>
							<li>
								<a href="#">联系我们</a>
							</li>
						</ul>
					</li>
				</ul>
				<div class="operation-mobile">
					<a href="#" class="qc-btn link-mc"><span>开发者后台</span></a>
				</div>
				<div class="login-mobile">
					<a href="#">登录</a>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	export default {
		name: 'headers',
		props: ["isShowbgColor"], 
		data() {
			return {
				clientWidth: 0, // 屏幕宽度
				clientHeight: 0, // 屏幕高度
				isFirst: -1,
				isSecond: -1,
				isMenuFlag: false,
				isShowMenu: false
			}
		},
		mounted() {
			this.clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
			this.clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
			if(this.clientWidth > 640) {
				this.isMenuFlag = this.isShowMenu = true;
				this.isFirst = 999;
				this.isSecond = 999;
			}
		},
		methods: {
			openMenu() {
				if(this.isMenuFlag) {
					this.isMenuFlag = this.isShowMenu = false;
				} else {
					this.isMenuFlag = this.isShowMenu = true;
				}
			},
			openMenuList(num) {
				if(this.clientWidth > 0 && this.clientWidth < 641) {
					console.log(num)
					if(this.isFirst == num) {
						this.isFirst = -1;
					} else {
						this.isFirst = num;
					}
				} else {
					this.isFirst = 999;
				}
			},
			openSecMenuList(num) {
				if(this.clientWidth > 0 && this.clientWidth < 641) {
					if(this.isSecond == num) {
						this.isSecond = -1;
					} else {
						this.isSecond = num;
					}
				} else {
					this.isSecond = 999;
				}
			}
		}
	}
</script>

<style lang="scss" src="../assets/styles/sass/header.scss"></style>