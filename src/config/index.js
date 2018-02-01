// 后台服务地址//132.246.27.59:9089/   //10.142.90.57:9100/
const BASE_URL = process.env.NODE_ENV ===  'production' ? '//10.142.90.57:9100/' : '//10.142.90.57:9100/';
// 后台服务返回成功的状态码
const CODE_OK = 'core.ok';
// 后台超时时间
const TIMEOUT = 6000;
// localStorage sessionStorage存储的key名
const STORAGE_KEY = '__$aep';
// 系统使用localStorage还是sessionStorage,值为local session
const STORAGE_TYPE = 'local';
// 是否打开withCredentials开关
const WITH_CREDENTIALS = true;
// Service服务不能取的函数名字
const SERVICE_EXCLUDE_FUNNAMES = ['call', 'caller', 'apply', 'name', 'bind', 'delete', 'valueOf'];

const SERVICE = {
	services: {
		file: [{name: 'upload', option: {method: 'post', upload: true}}],
		cluster: [{name: 'List', option: {method: 'post'}}],
		'dc': ['MapList']
	},
	gw: ['tenant.get.detail', {name: 'user.tenant.list', option:{ method: 'post'} }, 'app.auth.add', 'app.auth.delete']
	
}


export  {
	BASE_URL,
	CODE_OK,
	TIMEOUT,
	SERVICE,
	SERVICE_EXCLUDE_FUNNAMES,
	STORAGE_KEY,
	STORAGE_TYPE,
	WITH_CREDENTIALS
};