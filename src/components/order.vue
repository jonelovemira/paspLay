<template>
	<div>
		order,hello
	</div>
</template>
<script>
	import http from '@/api';
	export default {
		name: 'order',
		mounted(){
			http.actions.metricsAll.getAllHostStatus({
                token: 'jKhum9rBRkiZAVEYdtHJVIliDILBZ8nCRhP7201XL7U%3D'
              }).then(data => {
                console.log(`I got data:`, data);
              });
		}
	}
</script>