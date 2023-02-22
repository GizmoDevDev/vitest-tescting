import { CacheService } from './CacheService';
const cacheService = new CacheService();

cacheService.getData('https://pokeapi.co/api/v2/pokemon/ditto').then(() => console.log('ditto 1'))
cacheService.getData('https://pokeapi.co/api/v2/pokemon/pikachu').then(() => console.log('pikachu'))

setTimeout(() =>{
  cacheService.getData('https://pokeapi.co/api/v2/pokemon/ditto').then(() => console.log('ditto 2'))
}, 3_000)

setTimeout(() =>{
  cacheService.getData('https://pokeapi.co/api/v2/pokemon/ditto').then(() => console.log('ditto 3'))
}, 8_000)
