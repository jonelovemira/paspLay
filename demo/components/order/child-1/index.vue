<template>
    <div>
    	<form>
		    <input type="text" name="title" v-model="title"><br>
		    <input type="file" name="logo" id="logo" @change="getFile($event)"><br>
	   		<input type="button" value="Upload" @click="btnClick">
	   		<input type="button" value="触发HTTP请求" @click="anotherHTTP">
	    </form>
    </div>
</template>

<script>
    export default {
    	name: 'child1',
		data(){
			return {
				title: '',
				logo: ''
			}
		},
		methods:{
			anotherHTTP(){

							// this._$http.user.tenant.list({a:'b'}).then(data => {
				   //              console.log(`I got data:`, data);
				   //            });
				      // this._$http.tenant.get.detail({tenantId:'300', $user: 0}).then(data => {
				      //           console.log(`I got data:`, data);
				      //         });
				       this._$http.dc.mapList({aa:'bb'}).then(data => {
				                console.log(`I got data:`, data);
				              });
				      // this._$http.cluster.list({a: 'b'}, {c: 'd'}).then(data => {
				      //   console.log('I data:', data)
				      // })
			},
			getFile(evt){
				console.log(evt)
				this.logo = evt.target.files[0];
				console.log(this.logo);
			},
			btnClick(){
				this._$http.file.upload({ a: 'b'},{
					title: this.title,
					logo: this.logo
				}).then(data => {
					console.log('I receive data', data);
				}).catch(ex => console.log(ex));
			}
		}
    }
</script>