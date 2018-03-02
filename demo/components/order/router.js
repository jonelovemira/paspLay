import order from './index';
import child from './child/childRouter';

export default {
  name: 'order',
  path: '/order',
  component: order,
  children: [child]
}
