/**
 * @date        2017-12-12 12:59:29
 * @authors     liuqiao (liu_qiao@chinatelecom.cn)
 * @outline     封装axios操作
 * @description 1定义默认axios配置
 *              2增加响应返回拦截器，对于失败返回增加处理
 *              3依据config/index.js 中SERVICE对象，自动生成数据请求函数
 *              5提供插件形式，通过this.$http即可获取
 *              6提供export暴露出去http服务
 *              7支持service 和 gw服务的POST请求
 *              POST请求使用方法：
 *               7.1 在SERVICE /gw 中，参照如下配置,和之前一样
 *               	services:{ cluster: [..., {name: 'List', option: {method: 'post', transferType: 'form/string'}}, ...]}
 *               	gw: [..., {name: 'user.upload', option: {method: 'post', transferType: 'form/string'}}, ...]}
 *               	其中：method: 'post'是必须配置；
 *               		  transferType是可选字段，值：
 *               		  7.1.1  form，表示body里的参数以FormData形式上传，用于 文件上传，或文件上传+参数，或单独的参数以FormData格式上传(不推荐)
 *               		  7.1.2  string,表示 body里的参数以 字符串序列化形式传给后台，如 ： a=b&c=d
 *               		  7.1.3  不填，则表示以json格式传入后台。在没有文件上传的情况下，推荐此种方式
 *               7.2使用：
 *               	使用过程和以前一致。
 *               	如果是POST请求，可以支持参数在url或body里出现，有如下几种情况：
 *               	eg:
 *               	this._$http.user.upload({a: 'b'}) 参数{a:b}结合config中的配置出现在body里
 *               	this._$http.user.upload({a: 'b'}, {c: 'd'}) 参数a=b出现在URL后， 参数{c:d}结合config中的配置出现在body里
 *               
 */
import Vue from 'vue';
import axios from 'axios';
import {SVR_CODE_OK, SVR_BASE_URL, SVR_TIMEOUT, SVR_WITH_CREDENTIALS, SERVICE, SVR_DATA_TYPE_FORM, SVR_DATA_TYPE_STRING} from './../config';
import utils from './../utils';





class Http {

	constructor({
		baseURL = SVR_BASE_URL, 
		timeout = SVR_TIMEOUT,
		withCredentials = SVR_WITH_CREDENTIALS,
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
		if(service.services){

		}
		//把本项目的auth合并到调用者的项目中去
		service.services = service.services || {};
		service.services.auth = service.services.auth || [];
		service.services.auth = service.services.auth.concat(SERVICE.services.auth);
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
				if(res.data && res.data.code === SVR_CODE_OK){
					// 如果后台data字段有值，则返回优先后台数据data
					// 如果后台字段data没有值，说明是update delete之类的操作，直接返回即可
					let result = res.data.data || res.data;
					//返回结果上加上total字段
					res.data.total && (result.total = res.data.total >>> 0);
					return result;
				// 后台查询/操作失败
				}else{
					utils.warn_svr(res);
					return Promise.reject(res.data || res);
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
			
			let relativePath = '', 
				{actionName, option} = this.parseCfg(actionItem);	
			//1.要支持本地代理，在json-server中要把.替换成_ 
			//2.要生成命名空间
			//所以这里用了两个变量
			//（如果项目使用data-server，由于JSON代理文件Key值支持.和/，那就不用区分环境，也不用替换，不用两个变量了）
			relativePath = actionName;
			
			//如果是本地，走json-server 模拟数据
			// if(process.env.NODE_ENV == 'local'){
			// 	relativePath = utils.replaceAll(relativePath, '\\.', '_');
			// };
			option.url = `/${prefixPath}/${relativePath}`;
			const func = this.createFunc.bind(context, option);
			//生成有效的命名空间，挂载函数
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
			let relativePath = '',
				{actionName, option} = this.parseCfg(com);	

			// 首尾多余/都替换为空，中间有2+个/都替换成1个/	
			relativePath = utils.replaceHomeEnd(`${path}/${actionName}`, '/', '').replace(/\/{2,}/g, '/');
			//如果是本地，走json-server 模拟数据
			// if(process.env.NODE_ENV == 'local'){
			// 	relativePath = utils.replaceAll(relativePath, '/', '_').toLowerCase();
			// } 

			option.url = `/services/${relativePath}`;

			actionName = utils.toCamelCase(actionName, '/');
			//如果接口名字是bind apply之类的，转化为Bind Apply
			actionName = utils.isRegularFuncName(actionName) ? actionName : actionName[0].toUpperCase() + actionName.slice(1);

			const func = this.createFunc.bind(context, option);
			funcObj[actionName] = func;
		});
		return funcObj;
	}
	//解析传进来的对象/字符串
	parseCfg(cfg){
		let actionName = cfg;
		const option = {
			method: 'get'
		};
		// {name:'list', option: {method: 'post', data: {}}}	
		if( utils.isObject(cfg)){
			actionName = cfg.name;
			Object.assign(option, cfg.option || {});
		}
		//Axios bug: axios库遇到POST方法请求时候，不像jquery一样会默认去设置Content-Type，所以这里必须手动设置
		if(option.method == 'post'){
			!option.headers && (option.headers = {});
			if(!option.headers['Content-Type']){
				option.headers['Content-Type'] = option.transferType == SVR_DATA_TYPE_FORM ? 'multipart/form-data' 
																		   :  option.transferType == SVR_DATA_TYPE_STRING ? 'application/x-www-form-urlencoded'
																		   :  'text/plain';
			}
		}
		return {option, actionName};
	}

	
	//创建真实数据函数
	createFunc(option, params, data){

		if(  Object.is(option.method, 'post') && params && !data){
			data = params;
			params = '';
			
		}
		params && (option.params = params);
		if(Object.is(option.method, 'post') && data){
			//Axios bug: Browser中，option.data只能是FormData,File, Blob。所以对于对象，需要序列化为字符串,否则HTTP Request Body里还是对象，不会序列化。
			if(option.transferType ==  SVR_DATA_TYPE_FORM){
				const formData = new FormData;
				for(var key in data){
					formData.append(key, data[key]);
				}
				option.data = formData;	
				// 删除辅助字段transferType
				delete option.transferType;
			}else if(option.transferType == SVR_DATA_TYPE_STRING){
				option.data = data;
				option.transformRequest = [data => utils.serialize(data)];	
				// 删除辅助字段transferType
				delete option.transferType;
			//如果不设置transferType，默认为text/plain,支持 JSON传输	
			}else{
				option.data = {data};
			}
		}
		return this.request(option);
	}
}

Http.axios = axios;

export {Http};

export default {
	install(Vue, opts = {}){

		Vue.prototype._$http = (new Http(opts))['_actions'];
	}
}