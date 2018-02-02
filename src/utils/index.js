import dateformat from 'dateformat';
import {SVR_EXCLUDE_FUNNAMES} from './../config';

const _maps = {
		'/': '\\/'
};
const _toString = _maps.toString;

// 是对象
const isObject = _ =>{
	return  _toString.call(_).toLowerCase() === '[object object]';
}
const isArray = Array.isArray;

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
//替换字符串中的某个字符
const replaceAll = (str, seperator = '', replaceMent = '' ) => {
	const reg = new RegExp(seperator, 'g');
	return str.replace(reg, replaceMent);
}

//数字转化为千分位 1234 => 1,234
const toThousands = (num) => {
	num = Number(num);
	if(isNaN(num)){
		return '';
	}
	num = '' + num;
	let numArr = num.split('.');
	num = numArr[0];
	// 4321
	num = num.split('').reverse().join('');
	// 432,1   987,654,321, 把最后一个逗号去掉
	num = num.replace(/(\d{3})/g, (_, p) => p + ',').replace(/,$/, '');
	//1,234
	return num.split('').reverse().join('') + (numArr[1] ? '.' + numArr[1]  : '');
}

/**
 * 转换层级字符串为真正的对象，生成命名空间，如把'a.b.c'生成命名空间到一个对象
 * @DateTime 2018-01-15
 * @param    {[Object]}   ctx [要挂载的对象]
 * @param    {[String]}   str [层级字符串]
 * @param    {[any type]}   val [要赋的值]
 * @return   {[Object]}       [转换后的对象]
 */
const generateNamespace = (ctx, str, val) => {
	const arr = str.split('.');
	const len = arr.length;
	arr.reduce((prev, cur, idx) => {
		if(idx === len - 1){
			cur = isRegularFuncName(cur) ? cur : cur[0].toUpperCase() + cur.slice(1);
			prev[cur] = val ? val : {};
		}else{
			prev[cur] = prev[cur] || {};
		}
		return prev[cur];
	}, ctx);
	return ctx;
}

//是否是合格的函数名字
const isRegularFuncName = funcname => {
	return !SVR_EXCLUDE_FUNNAMES.some( _ => Object.is(funcname, _));
}

// 序列化对象
const serialize = obj => {
	let str = '';
	if(!isObject(obj)){
		return obj;
	}
	for(var key in obj){
		str += `${key}=${obj[key]}&`;
	}
	return str.replace(/&$/, '');
}

//自定义Map对象
class CommonMap{
	constructor(){
		this._data = new Map;
	}
	set(key, value, defaultValue = ''){
		this._data.set(key, value == null ? defaultValue : value);

	}
	get(key, defaultValue = ''){
		const val = this._data.get(key);
		return   val == null ?  defaultValue : val;
	}
	has(key){
		return this._data.has(key);
	}
	remove(key){
		if(!key){
			return this._data.clear();
		}else{
			return this.delete(key);
		}
	}
	clear(){
		return this._data.clear();
	}
}


export default {
	isObject,
	isArray,
	warn_svr,
	replaceHomeEnd,
	toCamelCase,
	toThousands,
	replaceAll,
	generateNamespace,
	isRegularFuncName,
	serialize,
	CommonMap,
	install(Vue, opts){
		Vue.prototype._$utils = this;
	}
}