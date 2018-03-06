import order from './index';
import demo1 from './child/demo1';
import demo2 from './child/demo2';

export default {
	name: 'order',
	path: '/order',
	component: order,
	children: [{
			path: 'safety',
			name: 'my_safety',
			component: demo1,
			meta: {
				menuIndex: "personal.safety"
			}
		},
		{
			path: 'info',
			name: 'my_info',
			component: demo2,
			meta: {
				menuIndex: "personal.info"
			}
		}
	]
}