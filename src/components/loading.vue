<template>
	<Row>
        <Col class="demo-spin-col" span="24">
            <Spin fix>
                <Icon type="load-c" size=68 class="demo-spin-icon-load"></Icon>
                <div>Loading</div>
            </Spin>
        </Col>
    </Row>
</template>

<script type="text/javascript">
	export default {

	}
</script>

<style scoped>
	.demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
    @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }
    .demo-spin-col{
		width: 100%;
		height: 100%;border: 1px solid #f00;
        position: relative;
        border: 1px solid #eee;
    }
</style>