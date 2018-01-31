<template>
	<sidebar-container :sidebars="sidebars"></sidebar-container>
</template>
<script>
    import sidebars from '@/config/sidebar.json';

	export default {
		name: 'order',
		mounted(){

			this._$http.user.tenant.list().then(data => {
                console.log(`I got data:`, data);
              });
      this._$http.tenant.get.detail({tenantId:'300', $user: 0}).then(data => {
                console.log(`I got data:`, data);
              });
      // this._$http.cluster.list({a: 'b'}, {c: 'd'}).then(data => {
      //   console.log('I data:', data)
      // })
		},
        data() {
            return {
                sidebars: sidebars
            }
        }
	}
</script>