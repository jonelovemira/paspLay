<template>
	<div class="__privilege_menu">
		<slot></slot>
	</div>
</template>
<script>
	export default {
		data(){
			return {
				

			}
		},
		mounted(){
			this.init();
		},
		methods:{
			init(){
				let container = document.querySelectorAll('.__privilege_menu')[0];
				let privilegeEl = [].slice.call(container.querySelectorAll('[privilege]'), 0)
				// [{privilege: "user.list"}, {privilege："role.list"}]
				
				
				let item = privilegeEl.map(el => {
					return {privilege: el.getAttribute('privilege')};
				});
				
				
				//组装成请求参数
				let params = {item: item};
				this.checkMenu(params);
			},
			checkMenu(params){
				this._$http.auth.checkMenu(params).then(data => {
					//是登陆态
					if(data.isLoggedIn){
						let container = document.querySelectorAll('.__privilege_menu')[0];

						data.item.forEach(result => {
							 container.querySelectorAll(`[privilege="${result.privilege}"]`)[0].style.display = result.enable ? '': 'none';
						})
						container.style.display = 'block';
					}
				})
			}
		}
	}
</script>
<style type="text/css">
	.__privilege_menu{
		display: none;
	}
</style>