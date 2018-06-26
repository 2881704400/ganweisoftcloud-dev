<style scoped>
	.navigation{
		
	}
	.layout-menu {
		width: 102px;
		height: 60px;
		background: #1A3060;
		border-right: 1px solid #202530;
		float: left;
	}
	
	.layout-menu:hover {
		cursor: pointer;
		background: #18BBD8;
	}
	
	.layout-icon {
		width: 80%;
		height: 40px;
		border-radius: 3px;
		float: left;
		position: relative;
		top: 8px;
		left: 10%;
		text-align: center;
	}
	
	.layout-icon>span {
		color: #fff;
		font-size: 16px;
		position: relative;
		top: -18%;
		left: 5px;
	}
	
	.layout-logo {
		width: 100px;
		height: 30px;
		border-radius: 3px;
		float: left;
		position: relative;
		top: 15px;
		left: 20px;
	}
	
	.layout-logo img {
		width: 100%;
		margin-top: -2px;
	}
	
	.layout-nav {
		float: right;
	}
	
	.layout-nav .nav-menu-icon-search{
		font-size: 24px;
		position: relative;
		top: 5px;
		left: 8px;
	}
	.layout-nav .nav-menu-icon{
		font-size: 18px;
		position: relative;
		top: 2px;	
	}
	
	.layout-nav .menu-box{
		box-sizing: border-box;
	}
	
	.layout-nav .menu-box span {
		display: inline-block;
		position: relative;
		margin-left: 6px;
	}
	
	.layout-nav .menu-box:hover {
		color: #179DFC;
	}
	
	.layout-nav .nav-menu-button{
		height: 28px;
		line-height: 12px;
	}
	
	.layout-assistant {
		width: 300px;
		margin: 0 auto;
		height: inherit;
	}
	
	.layout-breadcrumb {
		padding: 10px 15px 0;
	}
	
	.layout-content {
		min-height: 200px;
		overflow: hidden;
		background: #fff;
		border-radius: 4px;
	}
	
	.layout-content-main {
		padding: 10px;
	}
	
	@-webkit-keyframes slideInLeft {
		-webkit-transform: translateX(645px);
 		 transform: translateX(645px);
	}

	.animation1{
		animation: slideInLeft 1s ease;
		-webkit-animation: slideInLeft 1s ease;
	}
	
	.menu-left-position {
		position: absolute;
		top: 60px;
		left: 0px;
		z-index: 1;
		display: none;
		overflow-y: auto;
    	overflow-x: hidden;
	}
	
	.demo-auto-complete-item{
        padding: 4px 0;
        border-bottom: 1px solid #F6F6F6;
    }
    .demo-auto-complete-group{
        font-size: 12px;
        padding: 4px 6px;
    }
    .demo-auto-complete-group span{
        color: #666;
        font-weight: bold;
    }
    .demo-auto-complete-group a{
        float: right;
    }
    .demo-auto-complete-count{
        float: right;
        color: #999;
    }
    .demo-auto-complete-more{
        display: block;
        margin: 0 auto;
        padding: 4px;
        text-align: center;
        font-size: 12px;
    }
</style>
<template>
	<div class="navigation">
		<Menu mode="horizontal" theme="dark" active-name="1" style="background: #1A3060;">
			<div id="navigationMenuBtnId" class="layout-menu" @mouseenter="showLeftMenu" @mouseleave="hideLeftMenu">
				<div class="layout-icon">
					<Icon type="navicon" size="32" color="#fff"></Icon>
					<span>导航</span>
				</div>
			</div>
			<div class="layout-logo">
				<a href="#/home" title="敢为云"><img src="../../../assets/logos4.png"></a>
			</div>
			<div class="layout-nav">
				<MenuItem name="1">
					<AutoComplete
				        v-model="AutoCompleteValue"
				        icon="ios-search"
				        :data="AutoCompleteData"
				        placeholder="input here"
				        @on-search="handleSearch"
				        style="width:300px">
				        <div class="demo-auto-complete-item" v-for="item in AutoCompleteDataDefault">
				            <div class="demo-auto-complete-group">
				                <span>{{ item.title }}</span>
				                <a href="https://www.google.com/search?q=iView" target="_blank">更多</a>
				            </div>
				            <Option v-for="option in item.children" :value="option.title" :key="option.title">
				                <span class="demo-auto-complete-title">{{ option.title }}</span>
				                <span class="demo-auto-complete-count">{{ option.count }} 人关注</span>
				            </Option>
				        </div>
				        <a href="#" class="demo-auto-complete-more">查看所有结果</a>
				    </AutoComplete>
					
				</MenuItem>
				<MenuItem name="2">
				<Poptip trigger="hover" placement="bottom">
					<div class="menu-box" @click="server" >
						<Icon type="ios-keypad" class="nav-menu-icon"></Icon>
						<span>产品</span>
						
					</div>
					<div slot="content" style="width: 1000px;">
							<footerVue></footerVue>
						</div>
				</Poptip>
				</MenuItem>
				<MenuItem name="3">
				<Poptip trigger="hover" content="我是解决方案" placement="bottom">
					<div class="menu-box">
						<Icon type="ios-analytics" class="nav-menu-icon"></Icon>
						<span>解决方案</span>
					</div>
				</Poptip>
				</MenuItem>
				<MenuItem name="4">
				<Poptip trigger="hover" content="我是价格" placement="bottom">
					<div class="menu-box">
						<Icon type="ios-paper" class="nav-menu-icon"></Icon>
						<span>价格</span>
					</div>
				</Poptip>
				</MenuItem>
				<MenuItem name="5">
				<Poptip trigger="hover" content="控制台" placement="bottom">
					<div class="menu-box">
						<Icon type="gear-a" class="nav-menu-icon"></Icon>
						<span>控制台</span>
					</div>
				</Poptip>
				</MenuItem>
				<MenuItem name="6">
					<Button class="nav-menu-button" @click="register">注&nbsp;册</Button>
					&nbsp;
					<Button type="primary" class="nav-menu-button" @click="login">登&nbsp;录</Button>
				</MenuItem>
			</div>
		</Menu>
		<div class="layout-menu-left" @mouseenter="showLeftMenu" @mouseleave="hideLeftMenu">
			<Col span="4" id="menu-left-position-id" class="menu-left-position" style="height: 100%;">
			<Menu active-name="1-2" theme="light" width="auto" :open-names="[ '1']" style="height: 100%;">
				<Submenu name="1">
					<template slot="title">
						<Icon type="ios-navigate"></Icon>
						Item 1
					</template>
					<MenuItem name="1-1">Option 1</MenuItem>
					<MenuItem name="1-2">Option 2</MenuItem>
					<MenuItem name="1-3">Option 3</MenuItem>
				</Submenu>
				<Submenu name="2">
					<template slot="title">
						<Icon type="ios-keypad"></Icon>
						Item 2
					</template>
					<MenuItem name="2-1">Option 1</MenuItem>
					<MenuItem name="2-2">Option 2</MenuItem>
				</Submenu>
				<Submenu name="3">
					<template slot="title">
						<Icon type="ios-analytics"></Icon>
						Item 3
					</template>
					<MenuItem name="3-1">Option 1</MenuItem>
					<MenuItem name="3-2">Option 2</MenuItem>
				</Submenu>
				<Submenu name="4">
					<template slot="title">
						<Icon type="ios-analytics"></Icon>
						Item 4
					</template>
					<MenuItem name="4-1">Option 1</MenuItem>
					<MenuItem name="4-2">Option 2</MenuItem>
				</Submenu>
				<Submenu name="5">
					<template slot="title">
						<Icon type="ios-analytics"></Icon>
						Item 5
					</template>
					<MenuItem name="5-1">Option 1</MenuItem>
					<MenuItem name="5-2">Option 2</MenuItem>
				</Submenu>
				<Submenu name="6">
					<template slot="title">
						<Icon type="ios-analytics"></Icon>
						Item 6
					</template>
					<MenuItem name="6-1">Option 1</MenuItem>
					<MenuItem name="6-2">Option 2</MenuItem>
				</Submenu>
				<Submenu name="7">
					<template slot="title">
						<Icon type="ios-analytics"></Icon>
						Item 7
					</template>
					<MenuItem name="7-1">Option 1</MenuItem>
					<MenuItem name="7-2">Option 2</MenuItem>
				</Submenu>
			</Menu>
			</Col>
		</div>
	</div>
</template>

<script>
	import footerVue from '../../footer/footer'
	
	export default {
		data(){
			return {
				AutoCompleteValue: '',
				AutoCompleteData: [],
                AutoCompleteDataDefault: [
                    {
                        title: '话题',
                        children: [
                            {
                                title: 'AlarmCenter',
                                count: 10000,

                            },
                            {
                                title: 'AlarmCenterWeb',
                                count: 10600,

                            }
                        ]
                    },
                    {
                        title: '问题',
                        children: [
                            {
                                title: 'AlarmCenter 有多好',
                                count: 60100,

                            },
                            {
                                title: 'AlarmCenter 是啥',
                                count: 30010,

                            }
                        ]
                    },
                    {
                        title: '文章',
                        children: [
                            {
                                title: 'AlarmCenter 是物联网管理平台',
                                count: 100000,

                            }
                        ]
                    }
                ]
			}
		},
		methods: {
			showLeftMenu: function() {
				$(".layout-menu").css({
					backgroundColor: '#18BBD8'
				})
				$("#menu-left-position-id").slideDown(250);
				$('body').css('overflow-y','hidden');
				$('body').css('marginRight','17px');
			},
			hideLeftMenu: function() {
				var div = document.getElementById("menu-left-position-id");
				var btnDiv=document.getElementById("navigationMenuBtnId");
				var x = event.clientX;
				var y = event.clientY;
				var divx1 = div.offsetLeft;
				var divy1 = div.offsetTop;
				var divx2 = div.offsetLeft + div.offsetWidth;
				var divy2 = div.offsetTop + div.offsetHeight;
				var btnDivx1 = btnDiv.offsetLeft;
				var btnDivy1 = btnDiv.offsetTop;
				var btnDivx2 = btnDiv.offsetLeft + btnDiv.offsetWidth;
				var btnDivy2 = btnDiv.offsetTop + btnDiv.offsetHeight;
				if((x <= divx1 || x >= divx2 || y < divy1 || y > divy2)
				&& (x <= btnDivx1 || x >= btnDivx2 || y < btnDivy1 || y > btnDivy2)) {
					//如果离开，则执行。。  
					$("#menu-left-position-id").slideUp(250);
					setTimeout(function() {
						$(".layout-menu").css({
							backgroundColor: '#1A3060'
						})
					}, 300)

				} else {
					$(".layout-menu").css({
						backgroundColor: '#18BBD8'
					})
				}
				$('body').css('overflow-y','auto');$('body').css('marginRight','0px');
			},
			register :function(){
				this.$router.push({ name: "register" });
			},
			login :function(){
				this.$router.push({ name: "login" });
			},
			server :function(){
				this.$router.push({ name: "serverVue" });
			},
			handleSearch :function(value){
				this.AutoCompleteData= !value ? [] : [
                    value,
                    value + value,
                    value + value + value
                ];
			}
		},
		components:{
			footerVue,
		}
	}
</script>
