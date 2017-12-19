import Router from 'vue-router';
import Http from './api'
import Bus from './api/bus';
import Cookie from './api/cookie';
import Storage from './api/storage';
import App from './App';

class Common{
	constructor(){
		this._router = null;
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
		Vue.use(Http, opts.http);
		// storage插件
		Vue.use(Storage, opts.storage);
		// 安装路由
		Vue.use(Router);
		
		//配置路由
		console.log('keys()', opts.router.keys())
		const routes = [];
		opts.router.keys().map(key => {
			console.log( key , opts.router(key))
			// 每个router.js的路由配置对象
			const routeModule = opts.router(key).default;
			Array.isArray(routeModule) ? routes.push.apply(routes, routeModule): routes.push(routeModule);
		});
		console.log('routes: ', routes);
		this._router = new Router({routes});



	}
}
export default Common;