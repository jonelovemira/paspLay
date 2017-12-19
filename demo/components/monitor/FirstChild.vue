<template>
	<div>
		<span>first child: </span>
		<el-radio v-model="radio" label="1">备选项</el-radio>
 		<el-radio v-model="radio" label="2">备选项</el-radio>	
 		<button @click="send()">send</button>
	</div>
	
</template>
<script>
	export default {
    data () {
      return {
        radio: '1'
      };
    },
    methods:{
    	send(){
            this._$bus.$emit('__msg', 'msg com from first-child');
    	}
    }
  }
</script>