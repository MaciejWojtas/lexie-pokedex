import { useState } from 'react'

import { Pokemon, PokemonType } from 'src/features/pokemons/types/pokemon'
import {
  propertyArrayMatchQueryArray,
  propertyMatchQuery,
  propertyMatchQueryArray,
  recurseFiltering,
} from 'src/utils/filters'

const getQueryFilter = (query: string) => (data: Pokemon[]) =>
  query ? propertyMatchQuery(data, 'name', query) : data

const getFavouriteFilter = (favourites: string[], enabled: boolean) => (data: Pokemon[]) =>
  enabled ? propertyMatchQueryArray(data, 'name', favourites) : data

const getTypesFilter = (types: PokemonType[]) => (data: Pokemon[]) =>
  types.length ? propertyArrayMatchQueryArray(data, 'types', types) : data

const usePokemonFilters = (data: Pokemon[]) => {
  const [queryFilter, setQueryFilter] = useState('')
  const [favouriteFilter, setFavouriteFilter] = useState(false)
  const [favourites, setFavourites] = useState<string[]>([])
  const [typeFilter, setTypeFilter] = useState<PokemonType[]>([])

  const addFavourite = (pokemon: Pokemon) => {
    setFavourites((favourites) => [...favourites, pokemon.name])
  }

  const removeFavourite = (pokemon: Pokemon) => {
    setFavourites((favourites) => favourites.filter((favourite) => favourite !== pokemon.name))
  }

  const toggleFavouriteFilter = () => {
    setFavouriteFilter((favouriteFilter) => !favouriteFilter)
  }

  const filters = [
    getQueryFilter(queryFilter),
    getFavouriteFilter(favourites, favouriteFilter),
    getTypesFilter(typeFilter),
  ]
  const filteredData = recurseFiltering(data, filters)

  return {
    favouriteFilter,
    addFavourite,
    removeFavourite,
    toggleFavouriteFilter,
    queryFilter,
    setQueryFilter,
    typeFilter,
    setTypeFilter,
    filteredData,
    favourites,
  }
}

export default usePokemonFilters
