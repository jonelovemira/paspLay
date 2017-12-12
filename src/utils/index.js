import dateformat from 'dateformat';

const _maps = {
		'/': '\\/'
};
// 打印后台警告信息
const warn_svr = res => {
	const now = dateformat(Date.now(), 'HH:MM:ss.l');
	let text = `[${now}] [${res.request.responseURL}] 请求失败,状态码${res.status},`;

	if(res.status >= 200 && res.status < 300 || res.status == 304){
		text += `返回：${res.request.responseText}`
	}else{
		text += `返回：${res.statusText}`
	}
	console.warn(text);
}
// 首尾替换字符
const replaceHomeEnd = (str, seperator = ' ', replaceMent = '') => {	
	const reg = new RegExp(`^(${_maps[seperator] || seperator})+|(${_maps[seperator]  || seperator})+$`, 'g');
	return str.replace(reg, replaceMent);
}
// 转化为驼峰式，首字母小写
const toCamelCase = (str, seperator = '_') => {
	const reg = new RegExp(`${_maps[seperator] || seperator}(\\w)`, 'g');
	str = str.replace(reg, (_, p1) => p1.toUpperCase())
	return str[0].toLowerCase() + str.slice(1);
}
export default {
	warn_svr,
	replaceHomeEnd,
	toCamelCase
}