<template>
	<div class="boxList">
		<p>为什么选择敢为云</p>
		<Row class="layout-main-box" type="flex" justify="center" align="middle" >
			<Col class="imgWrap"  :lg="12" :md="12" :sm="24" :xs="24">
				<img  src="../../../assets/product/2.png"  />
			</Col>
			<Col class="conWrap"  :lg="12" :md="12" :sm="24" :xs="24">
				<ul class="layout-main-box-desc">
					<li>
						<Icon type="checkmark-circled" size="28" color="#2D84EB" ></Icon>
						<span>全面集成各类设备/传感器</span>
					</li>
					<li>
						<Icon type="checkmark-circled" size="28" color="#2D84EB"></Icon>
						<span>依托共性软件平台强大的通讯功能，实现对各类设备/传感器的快速兼容整合</span>
					</li>
				</ul>
			</Col>
		</Row>
		<Row class="layout-main-box"  type="flex" justify="center" align="middle" >
			<Col class="imgWrap"  :lg="12" :md="12" :sm="24" :xs="24">
				<img src="../../../assets/product/5.png"  />
			</Col>
			<Col class="conWrap" :lg="12" :md="12" :sm="24" :xs="24">
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
			</Col>
		</Row>
		<Row class="layout-main-box"  type="flex" justify="center" align="middle" >
			<Col class="imgWrap"  :lg="12" :md="12" :sm="24" :xs="24">
				<img src="../../../assets/product/7_2.png" />
			</Col>
			<Col class="conWrap" :lg="12" :md="12" :sm="24" :xs="24">
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
			</Col>
		</Row>
		<Row class="layout-main-box"  type="flex" justify="center" align="middle">
			<Col class="imgWrap" :lg="12" :md="12" :sm="24" :xs="24">
				<img src="../../../assets/product/5_2.png" />
			</Col>
			<Col class="conWrap" :lg="12" :md="12" :sm="24" :xs="24">
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
			</Col>
		</Row>
	</div>
</template>

<script>
	export default {
		data(){
			return{

			}
		},methods:{

		},mounted(){
			$(".layout-main-box").each(function(i){
				if(i%2==1){
					$(this).css({"background":"#f2f2f5"})
				}
			})
		}
	}
</script>

<style>
	.boxList>p{
		font-size: 1.8rem;
		padding: 30px 0;
		text-align: center;
	}
	.layout-main-box{
		
	}
	.layout-main-box-desc{
		list-style: none;
	}
	.imgWrap{
		height: 100%;
	}
	.imgWrap img{
		width: 100%;
		height:auto;
		display: block;
		margin: 0 auto;
	}
	.conWrap{
		text-align: center;
		font-size:1.0rem;
	}
	@media screen and (max-width: 768px){
		.boxList>p{
			font-size: 1.2rem;
		}
	}
</style>