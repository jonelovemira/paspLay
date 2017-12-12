/**
 * @date        2017-12-12 10:47:16
 * @authors     liuqiao (liu_qiao@chinatelecom.cn)
 * @outline     封装cookie操作 
 * @description 
 */
const cookie = {
	//设置cookie (默认3分钟失效)
	set(name, value, expires = 3, path = '/', domain = '', secure = false){
		const now = new Date;
    	expires && now.setMinutes(now.getMinutes() + parseInt(expires));
    	document.cookie = name + "=" + escape(value) + (expires ? ";expires=" + now.toGMTString() :
        "") + (path ? ";path=" + path : "") + (domain ? ";domain=" + domain : "") + (secure ? ";secure=true" : "")
	},
	//获取cookie
	get(name){
		const reg = new RegExp('(^| )' + name +'(?:=([^;]*))?(;|$)');
		const result = document.cookie.match(reg);
		return result? result[2] ? unescape(result[2]) : '' : null;
	},
	// 查询是否有此cookie
	has(name){
		const reg = new RegExp('(^| )('+ name +')(?:=[^;]*)?(;|$)');
		const result = document.cookie.match(reg);
		return !!(result && result[1]);
	},
	// 删除某个cookie
	remove(name){
		this.set(name, '', -1);
	}
}

export default cookie;