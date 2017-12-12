// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import {$http} from '@/api'
import $bus from '@/api/bus'
import navs from '@/config/topbar.json';

Vue.config.productionTip = false


Vue.use($http);
Vue.use($bus);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: createElement => {
  	  const vNodes = [];
  	  vNodes.push(
  	  		createElement(App, {
	  	  		props: {
	  	  			navs
	  	  		}
	  	    })
  	  );		
  	  return createElement('div', {}, vNodes)
  },
  
  components: { App }
})
