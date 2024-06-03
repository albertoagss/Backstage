// export { awxPlugin, AnsibleAWXComponent } from './plugin';

import { createPlugin, createRouteRef, createRoutableExtension } from '@backstage/core-plugin-api';
import AnsibleAWXComponent from './components/AnsibleAWXComponent';

export const rootRouteRef = createRouteRef({
  id: 'awx',
});

export const awxPlugin = createPlugin({
  id: 'awx',
  routes: {
    root: rootRouteRef,
  },
});

export const AwxPageExtension = awxPlugin.provide(
  createRoutableExtension({
    name: 'AnsibleAWXComponent',
    component: () => import('./components/AnsibleAWXComponent').then(m => m.default),
    mountPoint: rootRouteRef,
  }),
);
