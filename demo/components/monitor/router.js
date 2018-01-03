import index from './index';
import cluster from './cluster/index';
import datacenter from './datacenter/index';
import welcome from './welcome/index';


export default [
	{
	  name: 'monitor',
	  path: '/monitor',
	  component: index
	},
	{
	  name: 'cluster',
	  path: '/monitor/cluster',
	  component: cluster
	},
	 {
	  name: 'datacenter',
	  path: '/datacenter',
	  component: datacenter
	},{
	  name: 'welcome',
	  path: '/welcome',
	  component: welcome	
	}
];
