import Vue from 'vue';
import Common from '@/main';
import navs from '@/config/topbar.json';
// import sidebars from '@/config/sidebar.json';


Vue.config.productionTip = false;

Vue.use(Common, {
    router: require.context('./components', true, /router.js$/)
});


new Vue({
  el: '#app',
  router: Common.router,
  render: h => {
     const vNodes = [];
     vNodes.push(
         h(Common.App, {
           props: {
             navs
           }
         })
     );    
     return h('div', {}, vNodes)
  },
  mounted(){
      //测试Http
      // this._$http.cluster.list().then(d => console.log(d));
      // this._$http.metricsAll.getAllHostStatus({
      //           token: 'jKhum9rBRkiZAVEYdtHJVIliDILBZ8nCRhP7201XL7U%3D'
      //         }).then(data => {
      //           console.log(`I got data:`, data);
      //         });

      // cookie测试   set get remove has     
      // this._$cookie.set('username', 'liuqiao');
      // console.log(this._$cookie.get('username'));   
      // this._$cookie.remove('username');
      // console.log(this._$cookie.has('username')); 

      // console.log(this._$storage.get('username'));   
      // this._$storage.set('username', 'liuqiao');
      // this._$storage.set('pwd', '123'); 

      // console.log(this._$storage.get('pwd'));   

      // console.log(this._$storage.once('username'));  
      // this._$storage.remove() ;
      // console.log(this._$storage.get('pwd'));   


  } 
})

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue';
// import App from './App';
// import router from '@/router';
// import {$http} from '@/api'
// import $bus from '@/api/bus'
// import navs from '@/config/topbar.json';

// Vue.config.productionTip = false


// Vue.use($http);
// Vue.use($bus);
// /* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   render: createElement => {
//   	  const vNodes = [];
//   	  vNodes.push(
//   	  		createElement(App, {
// 	  	  		props: {
// 	  	  			navs
// 	  	  		}
// 	  	    })
//   	  );		
//   	  return createElement('div', {}, vNodes)
//   },
  
//   components: { App }
// })
