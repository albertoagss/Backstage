import { createPlugin, createRoutableExtension } from '@backstage/core-plugin-api';
//import AWXJobLauncher from './components/AnsibleAWXComponent';
import { rootRouteRef } from './routes';

export const awxPlugin = createPlugin({
  id: 'awx',
  routes: {
    root: rootRouteRef,
  },
});

export const AnsibleAWXComponent = awxPlugin.provide(
  createRoutableExtension({
    name: 'AnsibleAWXComponent',
    component: () => import('./components/AnsibleAWXComponent').then(m => m.AnsibleAWXComponent),
    mountPoint: rootRouteRef,
  }),
);


