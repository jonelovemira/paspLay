import order from './index';
import childRouter from './child-1/childRouter';

export default {
  name: 'order',
  path: '/order',
  component: order,
  children: [
    childRouter
  ]
}
