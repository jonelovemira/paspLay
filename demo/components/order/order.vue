<template>
	<div>
		order,hello
	</div>
</template>
<script>
	export default {
		name: 'order',
		mounted(){
			this._$http.metricsAll.getAllHostStatus({
                token: 'jKhum9rBRkiZAVEYdtHJVIliDILBZ8nCRhP7201XL7U%3D'
              }).then(data => {
                console.log(`I got data:`, data);
              });
		}
	}
</script>