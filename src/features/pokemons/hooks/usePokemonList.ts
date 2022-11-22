import { useEffect, useState } from 'react'

import PokeAPI, { IPokemon } from 'pokeapi-typescript'
import { Pokemon, PokemonType } from 'src/features/pokemons/types/pokemon'

export const POKEMON_LENGTH = 150

export const transformData = (data: IPokemon[]) =>
  data.map((pokemon) => ({
    ...pokemon,
    types: pokemon.types.map((type) => type.type.name as PokemonType),
  }))

const UsePokemonList = (length: number = POKEMON_LENGTH) => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([])
  const [error, setError] = useState<any>()
  const fetchPokemon = async () => {
    const promises = [...Array(length)].map((_, index) => () => PokeAPI.Pokemon.resolve(index + 1))

    try {
      const pokemonList = await Promise.all(promises.map((promise) => promise()))
      const pokemon = transformData(pokemonList)
      setPokemon(pokemon)
    } catch (error) {
      setError(error)
    }
  }

  useEffect(() => {
    fetchPokemon()
    // eslint-disable-next-line  react-hooks/exhaustive-deps
  }, [])

  if (error) {
    // eslint-disable-next-line no-console
    console.log('Api Error', error)
  }

  return pokemon
}

export default UsePokemonList
