<template>
	<div class="gw-footer">
		<div class="footer-website">
			<div class="website-columns">
				<div class="columns column-img">
					<img src="../assets/img/tel.png" />
				</div>
				<div class="columns columns-list" @click="openUlList(1)">
					<h3>产品与服务</h3>
					<i class="iconfont" :class="{'icon-unfold': !isOneFaceFlag,'icon-packup': isOneFaceFlag}"></i>
					<ul v-show="isShow==1||isShow==999">
						<li>
							<a href="#">解决方案</a>
						</li>
						<li>
							<a href="#">产品列表</a>
						</li>
						<li>
							<a href="#">常见问题</a>
						</li>
						<li>
							<a href="#">开发者文档</a>
						</li>
					</ul>
				</div>
				<div class="columns columns-list" @click="openUlList(2)">
					<h3>关于我们</h3>
					<i class="iconfont" :class="{'icon-unfold': !isTwoFaceFlag,'icon-packup': isTwoFaceFlag}"></i>
					<ul v-show="isShow==2||isShow==999">
						<li>
							<a href="#">公司简介</a>
						</li>
						<li>
							<a href="#">展厅参观</a>
						</li>
						<li>
							<a href="#">联系我们</a>
						</li>
					</ul>
				</div>
				<div class="columns columns-list" @click="openUlList(3)">
					<h3>合作交流</h3>
					<i class="iconfont" :class="{'icon-unfold': !isThreeFaceFlag,'icon-packup': isThreeFaceFlag}"></i>
					<ul v-show="isShow==3||isShow==999">
						<li>
							<a href="#">企业邮箱：ganwei@ganweisoft.com</a>
						</li>
						<li>
							<a href="#">电话：0755-82047841</a>
						</li>
						<li>
							<a href="#">传真：0755-82047847</a>
						</li>
						<li>
							<a href="#">客服QQ：2853993572 2853993575</a>
						</li>
					</ul>
				</div>
				<!--<div class="columns column-img">
					<div class="columns-logo">
						<img src="../assets/img/head_logo.png" />
						<a href="#">立即注册</a>
					</div>
				</div>-->
				<div class="columns column-img weixin-img">
					<h3>关注微信公众号</h3>
					<img src="../assets/img/contact1.jpg" />
				</div>
				<div class="operation-mobile">
					<a href="#" class="qc-btn link-mc"><span>开发者后台</span></a>
				</div>
			</div>
		</div>
		<div class="footer-blogroll blogroll-img">
			<div class="blogroll-inner">
				<span>赋能物联网全领域    打造超级城市大脑</span>
				<a href="#">网站备案号:粤ICP备17071494号-1 粤公网安备 44030502001318号</a>
			</div>
		</div>

	</div>
</template>

<script>
	export default {
		name: 'footers',
		data() {
			return {
				isShow: -1,
				isOneFaceFlag: false,
				isTwoFaceFlag: false,
				isThreeFaceFlag: false,
				clientHeight: 0,
				clientWidth: 0,
			}
		},
		mounted() {
			this.clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
			this.clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
			if(this.clientWidth > 640) {
				this.isShow = 999;
			}
		},
		methods: {
			openUlList(num) {
				if(this.clientWidth > 0 && this.clientWidth < 641) {
					if(this.isShow == num) {
						this.isShow = -1;
						if(num==1){
							this.isOneFaceFlag=false;
						}else if(num==2){
							this.isTwoFaceFlag=false;
						}else if(num==3){
							this.isFalseFaceFlag=false;
						}
					} else {
						this.isShow = num;
						if(num==1){
							this.isOneFaceFlag=true;
						}else if(num==2){
							this.isTwoFaceFlag=true;
						}else if(num==3){
							this.isFalseFaceFlag=true;
						}
					}
					
				} else {
					this.isShow = 999;
				}
			}

		}
	}
</script>

<style lang="scss" src="../assets/styles/sass/footer.scss"></style>