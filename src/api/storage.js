/**
 * @date        2017-12-12 10:42:41
 * @authors     liuqiao (liu_qiao@chinatelecom.cn)
 * @outline     封装localStorage sessionStorage 
 * @description 所有值存储在STORAGE_KEY下，所有值增加expires过期时间字段
 *              结构：
 *              aep:{
					a: {value: 'b', expires: ''}
				}
 */


import {STORAGE_KEY, STORAGE_TYPE} from '@/config';


class Storage{
	
	constructor(type = 'local'){
		this.storage = window[type == 'local' ? 'localStorage' : 'sessionStorage'];
		this.parser = window.JSON;
	}
	
	
	set(key, value = '', expires = 3){
		const data = this.getData();
		// expires为负数，删除此key
		if(expires < 0){
			delete data[key];
			return;
		}
		data[key] = {value, expires: Date.now() + expires * 60 * 1000}; 
		this.parser.stringify(data);
	}
	
	get(key = ''){
		const allData = this.getData();
		const data = allData[key];
		// 不存在
		if(!data){
			return '';
		}
		// 过期
		if(this.isExipired(data.expires)){
			delete allData[key];
			return '';
		}
		return data.value;
		
	}

	// 获取一次值，然后删除此值
	// TODO参照get对照下过期代码
	once(key){
		const allData = this.getData();
		const data = allData[key];
		// 不存在或者过期
		if(!data || this.isExipired(data.expires)){
			return '';
		}
		delete allData[key];
		return data.value;
	}
	//TODO：这里也要有过期代码检查
	has(key){
		const data = this.getData();
		return key in data;
	}

	remove(key){
		if(!key){
			this.storage.removeItem(STORAGE_KEY);
			return;
		}
		const data = this.getData();
		delete data[key];
	}

	// 获取总数据
	getData(){
		return this.parser.parse(this.storage.getItem(STORAGE_KEY)) || {} ;
	}

	//是否过期
	isExipired(date){
		return Date.now() - date > 0;
	}

}
export {Storage};
export default new Storage(STORAGE_TYPE);