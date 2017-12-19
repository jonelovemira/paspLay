<template>
	<div>
		second -child
		<p>{{msg}}</p>
	</div>
</template>
<script>
	export default {
		data(){
			return {
				msg: ''
			}
		},
		mounted(){
			 this._$bus.$on('__msg', data => {
			 		  this.msg += `I got msg ,${data} `;
                  });
		}
	}
</script>