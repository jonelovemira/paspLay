import Vue from 'vue';
import axios from 'axios';
import CONSTANTS from '@/config';
import utils from '@/utils';



Object.defineProperty(axios, '$baseURL', {
	get(){
		return CONSTANTS.BASE_URL
	}
});

const http = axios.create({
	// 后台地址
	baseURL: axios.$baseURL,
	// 超时时间
	timeout: CONSTANTS.TIMEOUT,
	// CORS跨域请求头
	withCredentials: true

});


http.createRequests = function(path = '/', action = []){
	const self = this;
	const funcObj = {};

	if(Array.isArray(path)){
		action = path;
		path = '';
	}

	action.forEach(function (com){

		const relativePath = utils.replaceHomeEnd(`${path}/${com}`, '/', '').replace(/\/{2,}/g, '/');
		const fun_text = `return this.get('${relativePath}', {params: params})`
		funcObj[utils.toCamelCase(com, '/')] = (new Function('params', fun_text)).bind(self);
	});
	return funcObj;
}

http.actions = {};
http.makeAction = function(name, action){
	const camelCase = utils.toCamelCase( utils.replaceHomeEnd(name, '/', ''), '/');
	this.actions[camelCase] = {};
	Object.assign(http.actions[camelCase], this.createRequests( name, action));
}

Object.keys(CONSTANTS.SERVICE).forEach(key => {
        http.makeAction(key, CONSTANTS.SERVICE[key]);
});

http.interceptors.response.use(
					res => {
						// 后台返回成功
						if(res.data && res.data.code === CONSTANTS.CODE_OK){
							// 如果后台data字段有值，则返回优先后台数据data
							// 如果后台字段data没有值，说明是update delete之类的操作，直接返回即可
							return res.data.data || res.data;
						// 后台查询/操作失败
						}else{
							utils.warn_svr(res);
							return res;
						}
					},
					err => {
						utils.warn_svr(err.response);
						return Promise.reject(err.response);
					}
);

export default http;

export const $http = {
	install(Vue){
		Object.defineProperty(Vue.prototype, '$http', {
			get(){
				return http;
			}
		});
	}
}