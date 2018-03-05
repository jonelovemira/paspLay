import Vue from 'vue';

//获取用户权限
const getUserPrivilege = _ => {
	const vue = new Vue();
	//TODO先占用一个全局变量，后期在优化
	const userPrivilege = window.__iam_user_privilege;
	// const userPrivilege = common.settings.get('user_privilege');

	if(userPrivilege){
			return Promise.resolve(userPrivilege);
	}
	
	return	vue._$http.auth.current({}).then(({privilege}) => {
		privilege = privilege || [];
		 window.__iam_user_privilege = privilege;
		// common.settings.set('user_privilege', privilege);
		return privilege;
	});
}

//查看用户是否拥有某项权限
const hasPrivilege = (privilege) => {
	const isArray = Array.isArray(privilege);
	isArray ? '' : (privilege = [privilege]);
	return getUserPrivilege().then(userPrivilege => {
		const rs = [];
		privilege.forEach(pri => {
			rs.push(userPrivilege.indexOf(pri) > -1 ? true : false);
		})
		return isArray ? rs : rs[0];
	});
}

export {getUserPrivilege, hasPrivilege}