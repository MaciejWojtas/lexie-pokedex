import { IPokemon } from 'pokeapi-typescript'

export const pokemonTypes = [
  'bug',
  'dark',
  'dragon',
  'electric',
  'fairy',
  'fighting',
  'fire',
  'flying',
  'ghost',
  'grass',
  'ground',
  'ice',
  'normal',
  'poison',
  'psychic',
  'rock',
  'steel',
  'water',
] as const

export type PokemonType = typeof pokemonTypes[number]

export interface Pokemon extends Omit<IPokemon, 'types'> {
  types: PokemonType[]
}

export enum PokemonStat {
  hp = 'hp',
  attack = 'attack',
  defense = 'defense',
  specialAttack = 'special-attack',
  specialDefense = 'special-defense',
  speed = 'speed',
}
