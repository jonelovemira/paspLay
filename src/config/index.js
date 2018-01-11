// 后台服务地址
const BASE_URL = process.env.NODE_ENV ===  'production' ? '/services/' : '/services/';
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
const SERVICE_EXCLUDE_FUNNAMES = ['call', 'caller', 'apply', 'name', 'bind', 'valueOf'];

const SERVICE = {
	cluster: ['List', 'Apply'],
	'metrics/all': ['GetAllHostStatus']
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