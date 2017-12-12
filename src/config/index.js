// 后台服务地址
const BASE_URL = '//10.142.90.57:9100/services/';
// 后台服务返回成功的状态码
const CODE_OK = 'core.ok';
// 后台超时时间
const TIMEOUT = 6000;
// localStorage sessionStorage存储的key名
const STORAGE_KEY = '__$aep';
// 系统使用localStorage还是sessionStorage,值为local session
const STORAGE_TYPE = 'local';

const SERVICE = {
	cluster: ['List', 'Update'],
	'metrics/all': ['GetAllHostStatus']
}

export default {
	BASE_URL,
	CODE_OK,
	TIMEOUT,
	SERVICE
}