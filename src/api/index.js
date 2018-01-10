/**
 * @date        2017-12-12 12:59:29
 * @authors     liuqiao (liu_qiao@chinatelecom.cn)
 * @outline     封装axios操作
 * @description 1定义默认axios配置
 *              2增加响应返回拦截器，对于失败返回增加处理
 *              3依据config/index.js 中SERVICE对象，自动生成数据请求函数
 *              5提供插件形式，通过this.$http即可获取
 *              6提供export暴露出去http服务
 */
import Vue from 'vue';
import axios from 'axios';
import {CODE_OK, BASE_URL, TIMEOUT, WITH_CREDENTIALS, SERVICE} from './../config';
import utils from './../utils';

class Http {
	constructor({
					baseURL = BASE_URL, 
					timeout = TIMEOUT,
					withCredentials = WITH_CREDENTIALS,
					service = SERVICE
				}){
	

		this._http = axios.create({
			// 后台地址
			baseURL,
			// 超时时间
			timeout,
			// CORS跨域请求头
			withCredentials
		});
		this._service = service;
		this._actions = [];
		this.init();
	}

	init(){
		// 自动生成service函数
		Object.keys(this._service).forEach(key => {
		        this.makeAction(key, this._service[key]);
		});

		this._http.interceptors.response.use(
							res => {
								// 后台返回成功
								if(res.data && res.data.code === CODE_OK){
									// 如果后台data字段有值，则返回优先后台数据data
									// 如果后台字段data没有值，说明是update delete之类的操作，直接返回即可
									let result = res.data.data || res.data;
									if (!Number.isNaN(parseInt(res.total))) {
										result.total = res.total;
									}
									return result;
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
	}

	makeAction(name, action){
		const camelCase = utils.toCamelCase( utils.replaceHomeEnd(name, '/', ''), '/');
		this._actions[camelCase] = {};
		Object.assign(this._actions[camelCase], this.createRequests( name, action));
	}

	createRequests(path = '/', action = []){
		const context = this._http;
		const funcObj = {};

		if(Array.isArray(path)){
			action = path;
			path = '';
		}


		action.forEach(function (com){

			let relativePath = utils.replaceHomeEnd(`${path}/${com}`, '/', '').replace(/\/{2,}/g, '/');
			//如果是本地，走json-server 模拟数据
			if(process.env.NODE_ENV == 'local'){
				relativePath = utils.replaceAll(relativePath, '/', '_').toLowerCase();
			} 
			console.log('relativePath:', process.env.NODE_ENV, relativePath);
			let fun_text = `return this.get('${relativePath}', {params: params})`
			funcObj[utils.toCamelCase(com, '/')] = (new Function('params', fun_text)).bind(context);
		});
		return funcObj;
	}

	
}

export {Http};

export default {
	install(Vue, opts = {}){

		Vue.prototype._$http = (new Http(opts))['_actions'];
	}
}