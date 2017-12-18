/**
 * @date        2017-12-12 12:59:29
 * @authors     liuqiao (liu_qiao@chinatelecom.cn)
 * @outline     事件通信总线Bus 
 * @description 
 */
import Vue from 'vue';

const bus = new Vue({
					name: '__$bus'
				});

export {bus};
export default {
	install(Vue){
		Object.defineProperty(Vue.prototype, '_$bus', {
			get(){
				return bus;
			}
		})
	}
}

