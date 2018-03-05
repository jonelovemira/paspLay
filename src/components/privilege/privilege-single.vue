<template>
	<div class="containter">
		<slot v-if="enable"></slot>
		<slot name="no-privilege" v-if="enable === false">
			<div class="no-privilege">
				<i class="el-icon-info"></i>
				你无权访问本页面，或者已退出登录，请重新登录。
			</div>
		</slot>
	</div>
</template>

<script>
	import utils from './../../utils';
	export default {
		name: 'privilege-single',
		data(){
			return {
				enable: null
			}
		},
		beforeMount(){
			if(this.cache){
				this.hasPrivilege();
			}else{
	    		this.checkSingle();	
			}
	    },
		props: ['privilege', 'cache'],
		// watch: {
		// 	privilege(val, oldVal){
		// 		console.log(111)
		// 		if(val == null){
		// 			return;
		// 		}
		// 		if(val != oldVal){
                    
		// 		console.log(2)

		// 			this.checkSingle();
		// 		}
		// 	}
		// },
		
		methods: {
			checkSingle(){

				this._$http.auth.checkSingle({
					privilege: `${this.privilege}`
				}).then(({enable}) => {
					this.enable = enable;
					// common.settings.set(this.privilege,  enable);
				})
			},
			hasPrivilege(){
				utils.hasPrivilege(this.privilege).then(({enable}) => {
					this.enable = enable;
				})
			}
		}
	}
</script>
<style scoped>
	.containter{
		display: inline-block;
		margin: 0;
		padding: 0;
	}
	.no-privilege{
		height: 100px;
		line-height: 100px;
	}
</style>