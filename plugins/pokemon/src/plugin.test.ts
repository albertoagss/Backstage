import { pokemonPlugin } from './plugin';

describe('pokemon', () => {
  it('should export plugin', () => {
    expect(pokemonPlugin).toBeDefined();
  });
});
