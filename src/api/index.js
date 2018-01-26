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
		// 初始化服务 ，拦截器
		this.initSvr().initIntercept();	
	}

	//初始化服务
	initSvr(){
		// 自动生成service函数
		Object.keys(this._service).forEach(key => {
			const svr = this._service[key];
			
			//services服务 
			if(Object.is(key, 'services')){
				if(!utils.isObject(svr)){
					return false;
				}

				Object.keys(svr).forEach(kk => {
	       			 this.makeSvrAction(kk, svr[kk]);
				})
			// gw服务
			}else{
				if(!utils.isArray(svr)){
					return false;
				}
				this.makeGwAction(key, svr);
			}
		});
		return this;
	}
	// 初始化拦截器
	initIntercept(){
		this._http.interceptors.response.use(
			res => {
				// 后台返回成功
				if(res.data && res.data.code === CODE_OK){
					// 如果后台data字段有值，则返回优先后台数据data
					// 如果后台字段data没有值，说明是update delete之类的操作，直接返回即可
					let result = res.data.data || res.data;
					//返回结果上加上total字段
					result.total = res.data.total>>>0;
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
		return this;
	}

	// 生成service服务
	makeSvrAction(name, action){
		const camelCase = utils.toCamelCase( utils.replaceHomeEnd(name, '/', ''), '/');

		this._actions[camelCase] = {};
		Object.assign(this._actions[camelCase], this.createRequests( name, action));
	}
	// 生成gateway服务
	makeGwAction(prefixPath, action){
		const context = this._http;

		action.forEach(actionItem => {
			
			let relativePath = '', option = {
				method: 'get',
				url: '',
				data: {}
			}, actionName;



			if (typeof actionItem === 'string') {
				actionName = actionItem;
			} else {
				if (typeof actionItem === 'object') {
					actionName = actionItem.name;
					option = Object.assign(option, actionItem.option);
				}
			};

			relativePath = actionName;
			
			//如果是本地，走json-server 模拟数据
			if(process.env.NODE_ENV == 'local'){
				relativePath = utils.replaceAll(actionName, '\\.', '_');
			};

			option.url = `/${prefixPath}/${relativePath}`;

			let func = params => {
				option.params = params;
				// this.request(option);
				// console.log(context);
				return context.request(option);
			};

			utils.generateNamespace(this._actions, actionName, func);
		})
	}


	createRequests(path = '/', action = []){
		const context = this._http;
		const funcObj = {};

		if(Array.isArray(path)){
			action = path;
			path = '';
		}


		action.forEach( (com) => {

			let relativePath = utils.replaceHomeEnd(`${path}/${com}`, '/', '').replace(/\/{2,}/g, '/');
			//如果是本地，走json-server 模拟数据
			if(process.env.NODE_ENV == 'local'){
				relativePath = utils.replaceAll(relativePath, '/', '_').toLowerCase();
			} 
			let fun_text = `return this.get('/services/${relativePath}', {params: params})`;
			let fun_name = utils.toCamelCase(com, '/');
			//如果接口名字是bind apply之类的，转化为Bind Apply
			fun_name = utils.isRegularFuncName(fun_name) ? fun_name : fun_name[0].toUpperCase() + fun_name.slice(1);
			funcObj[fun_name] = (new Function('params', fun_text)).bind(context);
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