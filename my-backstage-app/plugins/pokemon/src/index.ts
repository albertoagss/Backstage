import { createPlugin, createRouteRef, createRoutableExtension } from '@backstage/core-plugin-api';
import PokemonPage from './components/PokemonPage';

export const rootRouteRef = createRouteRef({
  id: 'pokemon',
});

export const pokemonPlugin = createPlugin({
  id: 'pokemon',
  routes: {
    root: rootRouteRef,
  },
});

export const PokemonPageExtension = pokemonPlugin.provide(
  createRoutableExtension({
    name: 'PokemonPage',
    component: () => import('./components/PokemonPage').then(m => m.default),
    mountPoint: rootRouteRef,
  }),
);

