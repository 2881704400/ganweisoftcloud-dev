<template>
	<div class="card-configure demo-tabs-style2">
		<Tabs type="card" class="card-configure-tabs">
			<TabPane label="快速配置">
				<div class="shop-container">
					<!-- 促销活动栏 组件 -->
					<msgVue>
						<p class="msg-span">说明：快速配置使用自动生成的密码，创建后密码会通过站内信发送给您。</p>
					</msgVue>
					<ul class="shop-list">
						<li class="list">
							<label class="shop-list-tit">
					          <span>地域</span>
					        </label>
							<!-- 地域 组件 -->
							<regionVue></regionVue>
						</li>

						<li class="list">
							<label class="shop-list-tit">
					          <span>机型</span>
					        </label>
							<!-- 机型 组件 -->
							<modelVue></modelVue>
						</li>

						<li class="list">
							<label class="shop-list-tit">
					          <span>操作系统</span>
					       </label>
							<!-- 操作系统 组件 -->
							<systemVue></systemVue>
						</li>

						<li class="list">
							<label class="shop-list-tit">
					          <span>公网带宽</span>
					        </label>
							<div class="shop-list-con">
								<Slider v-model="slider.value" :min="slider.min" :max="slider.max" :step="slider.step" :disabled="slider.disabled" show-tip="always" show-input></Slider>
								<Checkbox size="large" class="shop-list-con-checkbox"><label>分配免费公网IP</label></Checkbox>
							</div>
						</li>
					</ul>

					<div class="slice"></div>

					<ul class="shop-list">
						<li class="list">
							<label class="shop-list-tit">
					          <span>购买数量</span>
					        </label>
							<div class="shop-list-con">
								<InputNumber :max="100" :min="1" :step="1" v-model="InputNumberValue"></InputNumber><span class="input-num-span-desc">台</span>
							</div>
						</li>
						<li class="list">
							<label class="shop-list-tit">
					          <span>购买时长</span>
					        </label>
							<!-- 购买时长 组件 -->
							<durationVue></durationVue>
						</li>
					</ul>
				</div>
				<!-- 费用显示 组件 -->
				<chargeVue></chargeVue>
			</TabPane>
			<TabPane label="自定义配置">
				<div class="shop-container">
					<!-- 促销活动栏 组件 -->
					<msgVue>
						<p>包年包月预付费6个月及以上88折，1年83折，2年7折，3年5折（注：金融专区不参加折扣）。</p>
					</msgVue>
					<div class="shop-container-step">
						<div class="shop-head-step">
							<div class="shop-head-mod">
								<Tabs>
									<TabPane label="1.选择地域与机型" name="name1">
										<ul class="shop-list">
											<li class="custom-list">
												<label class="shop-list-tit">
										          <span>计费模式</span>
										          <i class="shop-plaint-icon"></i>
										        </label>
												<!-- 计费模式 组件 -->
												<chargeModel>
													<RadioGroup v-model="chargeModelBtn" slot="chargeType" type="button">
														<Radio label="包年包月"></Radio>
														<Radio label="按量计费"></Radio>
													</RadioGroup>
													<a slot="chargeMore" target="_blank" href="http://www.qcloud.com/doc/product/213/%E8%AE%A1%E8%B4%B9%E6%A8%A1%E5%BC%8F%E8%AF%B4%E6%98%8E" class="shop-links">详细对比
														<i class="shop-links-icon"></i>
													</a>
												</chargeModel>
											</li>
											<li class="custom-list down">
												<label class="shop-list-tit">
										          <span>地域</span>
										        </label>
												<!-- 地域 组件 -->
												<regionVue>
													<p class="shop-tip-word" id="regionTip">不同地域云产品之间内网不互通；选择最靠近您客户的地域，可降低访问时延，创建成功后不支持切换地域。
														<a href="https://console.cloud.tencent.com/cvm/overview?_ga=1.45885863.240517124.1513765357" class="shop-links" style="font-size:12px;" target="_blank">查看我的云服务器地域
															<i class="shop-links-icon"></i>
														</a>
														<a href="https://www.qcloud.com/document/product/213/6091" class="shop-links" style="font-size:12px;" target="_blank" hotrep="buy.cvm.detail.2">详细对比
															<i class="shop-links-icon"></i>
														</a>
													</p>
												</regionVue>
											</li>
											<li class="custom-list">
												<label class="shop-list-tit">
										          <span>可用区</span>
										          <i class="shop-plaint-icon"></i>
										        </label>
												<!-- 计费模式 组件 -->
												<chargeModel>
													<RadioGroup v-model="regionBtn" slot="chargeType" type="button">
														<Radio label="广州二区"></Radio>
														<Radio label="广州三区"></Radio>
														<Radio label="广州四区"></Radio>
													</RadioGroup>
												</chargeModel>
											</li>
										</ul>
										<div class="slice-all"></div>
										<ul class="shop-list">
											<li class="custom-list">
												<label class="shop-list-tit">
										          <span>系列</span>
										          <i class="shop-plaint-icon"></i>
										        </label>
												<!-- 计费模式 组件 -->
												<chargeModel>
													<RadioGroup v-model="seriesBtn" slot="chargeType" type="button">
														<Radio label="系列1"></Radio>
														<Radio label="系列2"></Radio>
													</RadioGroup>
													<a slot="chargeMore" target="_blank" href="https://www.qcloud.com/document/product/213/7153#.E5.8F.AF.E7.94.A8.E5.AE.9E.E4.BE.8B.E7.B1.BB.E5.9E.8B" class="shop-links">详细对比
														<i class="shop-links-icon"></i>
													</a>
												</chargeModel>
											</li>
											<li class="custom-list">
												<label class="shop-list-tit">
										          <span>机型</span>
										          <i class="shop-plaint-icon"></i>
										        </label>
												<!-- 计费模式 组件 -->
												<chargeModel>
													<RadioGroup v-model="systemModelBtn" slot="chargeType" type="button">
														<Radio label="标准型S1"></Radio>
														<Radio label="高IO型I1"></Radio>
													</RadioGroup>
												</chargeModel>
											</li>
											<li class="custom-list">
												<label class="shop-list-tit">
													<span style="display: none;">机型</span>
												</label>
												<div class="shop-list-con">
													<p class="shop-tip-word" style="margin:0px 0px 10px 0px;">若需独享资源，自主规划自己配置，请选购
										                <a id="jump-cdh" class="shop-links" style="font-size:12px;" href="https://buy.qcloud.com/cdh?regionId=8&amp;zoneId=800003" target="_blank">选购专用宿主机
										                	<i class="shop-links-icon"></i>
										                </a>
										           </p>
												</div>
											</li>
										</ul>
									</TabPane>
									<TabPane label="2.选择镜像" name="name2">标签二的内容</TabPane>
									<TabPane label="3.选择存储与网络" disabled name="name3">标签三的内容</TabPane>
									<TabPane label="4.设置信息" disabled name="name3">标签四的内容</TabPane>
								</Tabs>
							</div>

						</div>
					</div>
		<nextStepModel></nextStepModel>
				</div>
			</TabPane>
		</Tabs>
	</div>

</template>
<script>
	import msgVue from './speed/msg/msg'
	import regionVue from './speed/region/region'
	import modelVue from './speed/model/model'
	import systemVue from './speed/system/system'
	import durationVue from './speed/duration/duration'
	import chargeVue from './speed/charge/charge'
	import chargeModel from './defined/chargeModel/chargeModel'
	import nextStepModel from './defined/nextStep/nextStep'

	export default {
		data() {
			return {
				button1: '广州',
				chargeModelBtn: '包年包月',
				regionBtn: '广州二区',
				seriesBtn: '系列1',
				systemModelBtn: '标准型S1',
				InputNumberValue: 1,
				slider: {
					value: 1,
					min: 0,
					max: 200,
					step: 1,
					disabled: false,

				},
				columns4: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '机型',
                        key: 'systemModel'
                    },
                    {
                        title: '规格',
                        key: 'standard'
                    },
                    {
                        title: 'vCPU',
                        key: 'cpu'
                    },
                    {
                        title: '内存',
                        key: 'memory'
                    },
                    {
                        title: '费用',
                        key: 'fee'
                    }
                ],
                data1: [
                    {
                        systemModel: '标准型S2',	
                        standard: 'S2.SMALL1',
                        cpu: '1核',
                        memory: '1G',
                        fee: '42.00	元/月 起'
                    },
                    {
                        systemModel: '标准型S2',	
                        standard: 'S2.SMALL2',
                        cpu: '1核',
                        memory: '2G',
                        fee: '79.00	元/月 起'
                    },
                    {
                        systemModel: '标准型S2',	
                        standard: 'S2.SMALL4',
                        cpu: '1核',
                        memory: '4G',
                        fee: '135.00 元/月 起'
                    },
                    {
                        systemModel: '标准型S2',	
                        standard: 'S2.MEDIUM2',
                        cpu: '2核',
                        memory: '2G',
                        fee: '135.00 元/月 起'
                    },
                    {
                        systemModel: '标准型S2',	
                        standard: 'S2.MEDIUM2',
                        cpu: '2核',
                        memory: '4G',
                        fee: '179.00 元/月 起'
                    },
                    {
                        systemModel: '标准型S2',	
                        standard: 'S2.MEDIUM2',
                        cpu: '2核',
                        memory: '4G',
                        fee: '179.00 元/月 起'
                    },
                    {
                        systemModel: '标准型S2',	
                        standard: 'S2.MEDIUM2',
                        cpu: '2核',
                        memory: '4G',
                        fee: '179.00 元/月 起'
                    },
                    {
                        systemModel: '标准型S2',	
                        standard: 'S2.MEDIUM2',
                        cpu: '2核',
                        memory: '4G',
                        fee: '179.00 元/月 起'
                    },
                    {
                        systemModel: '标准型S2',	
                        standard: 'S2.MEDIUM2',
                        cpu: '2核',
                        memory: '4G',
                        fee: '179.00 元/月 起'
                    },
                    {
                        systemModel: '标准型S2',	
                        standard: 'S2.MEDIUM2',
                        cpu: '2核',
                        memory: '4G',
                        fee: '179.00 元/月 起'
                    }
                    
                ]
			}
		},
		methods: {
			checkTypeCard: function(indexNum) {
				$("#shopListModelType .shop-list-con-card").removeClass("shop-card-checked");
				$("#shopListModelType .shop-list-con-card").eq(indexNum).addClass("shop-card-checked");
				$("#shopListModelType .shop-list-con-card").eq(indexNum).removeClass("ivu-card-dis-hover")
			},
			checkSystemCard: function(indexNum) {
				$("#shopListSystem .shop-list-con-card").removeClass("shop-card-checked");
				$("#shopListSystem .shop-list-con-card").eq(indexNum).addClass("shop-card-checked");
				$("#shopListSystem .shop-list-con-card").eq(indexNum).removeClass("ivu-card-dis-hover")
			},
			handleSelectAll: function(status) {
                this.$refs.selection.selectAll(status);
            }
		},
		components: {
			msgVue,
			regionVue,
			modelVue,
			systemVue,
			durationVue,
			chargeVue,
			chargeModel,
			nextStepModel,
		}
	}
</script>
<style type="text/css">
	@import '../../../css/server/configure.css';
</style>