// 后台服务地址//132.246.27.59:9089/   //10.142.90.57:9100/
const SVR_BASE_URL = process.env.NODE_ENV ===  'production' ? '//132.246.27.59:9089/' : '//132.246.27.59:9089/';
// 后台服务返回成功的状态码
const SVR_CODE_OK = 'core.ok';
// 后台超时时间
const SVR_TIMEOUT = 6000;

// 是否打开withCredentials开关
const SVR_WITH_CREDENTIALS = true;
// Service服务不能取的函数名字
const SVR_EXCLUDE_FUNNAMES = ['call', 'caller', 'apply', 'name', 'bind', 'delete', 'valueOf'];
// Service服务 数据类型为form
const SVR_DATA_TYPE_FORM = 'form';
// Service服务 数据类型为form
const SVR_DATA_TYPE_STRING = 'string';

// localStorage sessionStorage存储的key名
const STORAGE_KEY = '__$aep';
// 系统使用localStorage还是sessionStorage,值为local session
const STORAGE_TYPE = 'local';

const SERVICE = {
	services: {
		auth: [ 
				{
					name: 'CheckMenu',
					option: {
						method: 'post'
					}
				},
				,'CheckSingle', 'Current'
			]
	}
	
	
}


export  {
	SERVICE,
	SVR_BASE_URL,
	SVR_CODE_OK,
	SVR_TIMEOUT,
	SVR_DATA_TYPE_FORM,
	SVR_DATA_TYPE_STRING, 
	SVR_WITH_CREDENTIALS,
	SVR_EXCLUDE_FUNNAMES,
	STORAGE_KEY,
	STORAGE_TYPE
};