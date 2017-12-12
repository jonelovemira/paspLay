import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld';
import order from '@/components/order';


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
    	path: '/hello',
    	name: 'hello',
    	component: HelloWorld
    },
    {
    	path: '/order',
    	name: 'order',
    	component: order
    }
  ]
})
