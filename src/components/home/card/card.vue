<template>
	<div class="layout-row-box">
		<ul>
			<li>
				<Card class="layout-row-box-card">
					<div>
						<Icon type="ionic" size="64" color="#179DFC" class="card_icon"></Icon>
						<p>大数据解决方案
							<span class="more">了解详情&gt;&gt;</span>
						</p>
						<p class="business-desc">
							提供集合覆盖多种类型数据源、秒级响应的数据集市、易用的动态计算方法和深度分析算法、强大的企业级管控系统、简单的可视化操作的大数据解决方案与服务，将数据转化为商业及各行业应用价值。
						</p>
					</div>
				</Card>
			</li>
			<li>
				<Card class="layout-row-box-card">
					<div>
						<Icon type="xbox" size="64" color="#179DFC" class="card_icon"></Icon>
						<p>智能语音交互
							<span class="more">了解详情&gt;&gt;</span>
						</p>
						<p class="business-desc">
							基于语音识别、自然语言理解、声纹识别、语音合成等技术构建智能自然语音交互系统，满足多种实际应用场景下的人机指令下达，执行反馈、人机对话，对话监测。赋予产品听、说、理解的智能人机交互体验。
						</p>
					</div>
				</Card>
			</li>
			<li>
				<Card class="layout-row-box-card">
					<div>
						<Icon type="earth" size="64" color="#179DFC" class="card_icon"></Icon>
						<p>位置服务
							<span class="more">了解详情&gt;&gt;</span>
						</p>
						<p class="business-desc">
							提供海量定位信息和人群动态数据分析、高达亿次位置查询和亿次用户洞察统计分析计算。整合地图、定位、地点搜索、路线导航、热力图等多种应用能力，生动直观快速在交互界面上展示实时分析结论。为规划决策或监控等提供可靠数据支撑。
						</p>
					</div>
				</Card>
			</li>
			<li>
				<Card class="layout-row-box-card">
					<div>
						<Icon type="android-person-add" size="64" color="#179DFC" class="card_icon"></Icon>
						<p>人脸识别
							<span class="more">了解详情&gt;&gt;</span>
						</p>
						<p class="business-desc">
							人脸识别（Facial Recognition）技术包括人脸检测与分析、人脸比对与验证、人脸检索等技术。是一种基于深度学习技术的面部分析的服务，作为基础技术服务广泛应用于智慧城市建设各领域多种场景下的智慧应用中。
						</p>
					</div>
				</Card>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {

	}
</script>

<style>
	.layout-row-box {
		width: 100%;
		/*height: 270px;*/
		display: inline-block;
		background: #fff;
		margin-top: -5px;
		margin-bottom: 3px;
	}
	
	.layout-row-box ul {
		width: 70%;
		margin: auto;
		transition: opacity .3s .6s, visibility 0s .6s, margin-top 0s .6s;
	}
	
	.layout-row-box ul:before {
		content: '';
		display: table;
	}
	
	.layout-row-box ul>li {
		width: 24%;
		float: left;
		margin-left: 1%;
	}
	
	.layout-row-box-card {
		width: 100%;
		margin-top: 5px;
		border: 0px;
	}
	
	.layout-row-box-card .card_icon{
		padding-left: 30px;
	}
	
	.layout-row-box-card:hover {
		cursor: pointer;
	}
	
	.layout-row-box-card p {
		padding: 15px 0px 0px 10px;
		text-align: left;
	}
	
	.layout-row-box-card p .more {
		padding-left: 10px;
		color: #00a0ff;
	}
	
	.business-desc {
		color: #666666;
		padding: 15px 0px 0px 10px;
	}
</style>