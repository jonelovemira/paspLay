<template>
	<footer>
		<p>中国电信IT研发中心承建</p>
		<p> Copyright © 2014-{{thisYear}} </p>
	</footer>
</template>
<script>
	export default {
		name: 'AlFooter',
		computed: {
			thisYear(){
				return new Date().getFullYear();
			}
		}
	}
</script>
<style scoped lang="scss">
	footer{
		padding: 3px 0;
		width: 100%;
		display: flex;
		flex-direction: column;
		background-color: #e5e9f2;	
		p{
			margin: 0 auto;
			color: #666;
			font-size: 12px;
		}
	}
</style>