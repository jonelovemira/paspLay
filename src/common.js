import Router from 'vue-router';
import HttpInstance, {Http} from './api'
import Bus from './api/bus';
import Cookie from './api/cookie';
import Storage from './api/storage';
import Utils from './utils';
import './utils/filters';
import App from './App';


class Common{
	constructor(){
		this._router = null;
		this.initGlobalVariable();
	}
	//初始化全局变量
	initGlobalVariable(){
		window.common = window.common || {};
		common.settings = new Utils.CommonMap;
	}
	get App(){
		return App;
	}
	
	//返回Storage类
	get Storage(){
		return Storage;
	}
	// 返回Http类
	get Http(){
		return Http;
	}
	
	get Utils(){
		return Utils;
	}

	//路由对象
	get router(){
		return this._router;
	}
	
	install(Vue, opts = {}){
		// 事件总线插件
		Vue.use(Bus);
		// 安装cookie
		Vue.use(Cookie);
		// Http服务插件
		Vue.use(HttpInstance, opts.http);
		// storage插件
		Vue.use(Storage, opts.storage);
		// 安装路由
		Vue.use(Router);
		// 安装utils
		Vue.use(Utils);
		
		//配置路由
		const routes = [];
		opts.router.keys().map(key => {
			// 每个router.js的路由配置对象
			const routeModule = opts.router(key).default;
			Array.isArray(routeModule) ? routes.push.apply(routes, routeModule): routes.push(routeModule);
		});
		this._router = new Router({routes});



	}
}
export default Common;