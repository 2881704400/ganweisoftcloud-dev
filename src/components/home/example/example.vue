<template>
	<div class="example">
		<p>赋能案例</p>
		
		<div class="itemList">
			<div class="itemCon">
				<div class="itemWrap">
					<img src="../../../assets/product/customer1.jpg" alt="">
				</div>
			</div>
			<div class="itemCon">
				<div class="itemWrap">
					<img src="../../../assets/product/customer2.jpg" alt="">
				</div>
			</div>
			
			<div class="itemCon">
				<div class="itemWrap">
					<img src="../../../assets/product/customer3.jpg" alt="">
				</div>
			</div>
			<div class="itemCon">
				<div class="itemWrap">
					<img src="../../../assets/product/customer4.jpg" alt="">
				</div>
			</div>
			<div class="itemCon">
				<div class="itemWrap">
					<img src="../../../assets/product/customer5.jpg" alt="">
				</div>
			</div>
			<div class="itemCon">
				<div class="itemWrap">
					<img src="../../../assets/product/customer6.jpg" alt="">
				</div>
			</div>
			<div class="itemCon">
				<div class="itemWrap">
					<img src="../../../assets/product/customer7.jpg" alt="">
				</div>
			</div>
			<div class="itemCon">
				<div class="itemWrap">
					<img src="../../../assets/product/customer8.jpg" alt="">
				</div>
			</div>
			<div class="itemCon">
				<div class="itemWrap">
					<img src="../../../assets/product/customer9.jpg" alt="">
				</div>
			</div>
			<div class="itemCon">
				<div class="itemWrap">
					<img src="../../../assets/product/customer10.jpg" alt="">
				</div>
			</div>
			<div class="itemCon">
				<div class="itemWrap">
					<img src="../../../assets/product/customer1.jpg" alt="">
				</div>
			</div>
			<div class="itemCon">
				<div class="itemWrap">
					<img src="../../../assets/product/customer2.jpg" alt="">
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{

			}
		}
	}
</script>
<style>
	.example{
		width: 100%;
		height: auto;
		padding: 40px 0;
	}
	
	.example>p{
		font-size:30px;
		padding: 15px 0;
		text-align: center;
	}

	.example .itemList{
		max-width: 1200px;
		min-width: 320px;
		padding: 20px 0;
		height: auto;
		margin: 0 auto;
		/*border:1px solid red;*/
		overflow: hidden;
		display: flex !important;
		display: -webkit-flex  !important;
		flex-wrap:wrap;
		 align-content:flex-start;

	}
	.example .itemList .itemCon{
		max-width: 170px;
		width: 170px;
		height: 100px;
		padding: 0 10px;
		display: inline-block;
    	margin-bottom: 30px;
    	position: relative;
    	top: 0;
    	transition-duration: .2s;

	}
	.example .itemList .itemCon:hover{
		top: -3px;
		transition: all .2s linear;
		-moz-transition: all .2s linear;
		-webkit-transition: all .2s linear;
		-o-transition: all .2s linear;
	}
	.example .itemList .itemCon:hover .itemWrap{

		-moz-box-shadow:-3px 3px 6px rgba(0,0,0,.1), 3px 0px 6px rgba(0,0,0,.1);
		 -webkit-box-shadow:-3px 3px 6px rgba(0,0,0,.1), 3px 0px 6px rgba(0,0,0,.1); 
		 box-shadow:-3px 3px 6px rgba(0,0,0,.1), 3px 0px 6px rgba(0,0,0,.1);

		transition: all .2s linear;
		-moz-transition: all .2s linear;
		-webkit-transition: all .2s linear;
		-o-transition: all .2s linear;
	}
	.example .itemWrap{
		padding:15px 0px;
		border:1px solid #bdbdbd;
		box-sizing: border-box;

		-moz-box-shadow:0px 0px 0px #eee, 0px 0px 0px #eee; 
		-webkit-box-shadow:0px 0px 0px #eee, 0px 0px 0px #eee; 
		-o-box-shadow:0px 0px 0px #eee, 0px 0px 0px #eee; 
		box-shadow:0px 0px 0px #eee, 0px 0px 0px #eee;
	}


	.example .itemWrap img{
		display: block;
		margin:0 auto ;
		max-width: 100%;
		height: auto;
	}
	
	
	@media screen and (max-width: 768px){
		.example .itemList .itemCon{
			width: 25% !important;
			margin-bottom: 20px;
			height: 80px;
		}

	}

</style>