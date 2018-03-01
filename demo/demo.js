import Vue from 'vue';
import Common from '@/main';
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
         h(Common.App)
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

