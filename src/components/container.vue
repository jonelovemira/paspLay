<template>
	<main class="al-container">
	    <router-view></router-view>
	</main>  
</template>
<script>
	export default {
		name: 'container'
	}
</script>
<style scoped lang="scss">
	.al-container{
	    display: flex;
	    flex: 1;
	    height: 100%;
	    padding: 5px;
	    margin-left:  45px;
	}
</style>