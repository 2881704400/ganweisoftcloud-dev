<template>
	<div class="shop-list-time">
		<RadioGroup type="button" style="padding: 0px;">
			<Radio label="1个月"></Radio>
			<Radio label="2个月"></Radio>
			<Radio label="3个月"></Radio>
			<Radio label="半年"></Radio>
			<Radio label="1年"></Radio>
			<Radio label="2年"></Radio>
			<Radio label="3年"></Radio>
		</RadioGroup>
		<span class="shop-tip-time-span">
			<a href="javascript:;" id="liteDurationChange">其他时长</a>
		</span>
		<p style="margin-top: 10px;">
			<Checkbox size="large" class="shop-list-con-checkbox"><label>账户余额足够时，设备到期后按月自动续费</label></Checkbox>
		</p>
	</div>
</template>

<script>
	export default{
		
	}
</script>

<style scoped>
	.input-num-span-desc {
		color: #333;
		font-size: 14px;
		margin-left: 5px;
		display: inline-block;
		vertical-align: middle;
	}
	
	.shop-tip-time-span {
		font-size: 14px;
		margin-left: 5px;
		color: #999;
		line-height: 12px;
		margin-top: 10px;
		vertical-align: middle;
	}
	
	.shop-tip-time-span a{
		color: #00a4ff;
	}
	
	.shop-tip-time-span a:hover{
		text-decoration: underline;
	}
	
	.shop-list-con-checkbox label {
		margin-left: 3px;
	}
</style>