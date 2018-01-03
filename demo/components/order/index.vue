<template>
	<sidebar-container :sidebars="sidebars"></sidebar-container>
</template>
<script>
    import sidebars from '@/config/sidebar.json';

	export default {
		name: 'order',
		mounted(){
			this._$http.metricsAll.getAllHostStatus({
                token: 'jKhum9rBRkiZAVEYdtHJVIliDILBZ8nCRhP7201XL7U%3D'
              }).then(data => {
                console.log(`I got data:`, data);
              });
		},
        data() {
            return {
                sidebars: sidebars
            }
        }
	}
</script>