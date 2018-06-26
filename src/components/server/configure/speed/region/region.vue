<template>
	<div class="shop-list-con">
		<span class="ui-block-control">
            <span class="ui-block-title">
                <span>华南地区</span>
		</span>
		<span class="ui-block-title">
	            <span>华东地区</span>
		</span>
		<span class="ui-block-title">
	            <span>华北地区</span>
		</span>
		<span class="ui-block-title">
	            <span>西南地区</span>
		</span>
		</span>
		<RadioGroup v-model="checkButton" type="button">
			<Radio label="广州"><span>广州</span></Radio>
			<Radio label="上海"><span>上海</span></Radio>
			<Radio label="北京"><span>北京</span></Radio>
			<Radio label="成都"><span>成都</span></Radio>
		</RadioGroup>
		<slot>
			<p class="shop-tip-word" id="">处在不同地域的云产品内网不通，购买后不能更换。建议选择靠近您客户的地域，以降低访问延迟、提高下载速度</p>
		</slot>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				checkButton: '广州'
			}
		},
	}
</script>

<style scoped>
	.ui-block-control {
		position: absolute;
		left: 108px;
		top: -20px;
	}
	
	.ui-block-title {
		width: 101px;
		text-align: center;
		display: inline-block;
		position: relative;
		font-size: 12px;
		overflow: hidden;
	}
	
	.ui-block-title span {
		display: inline-block;
		padding: 0 5px;
		background-color: #fff;
		color: #999;
		position: relative;
		height: 15px;
		z-index: 1;
	}
	
	.ui-block-title:after {
		content: '';
		display: block;
		position: relative;
		top: -9px;
		margin-left: 5px;
		margin-right: 5px;
		height: 1px;
		background-color: #ccd1d9;
	}
</style>