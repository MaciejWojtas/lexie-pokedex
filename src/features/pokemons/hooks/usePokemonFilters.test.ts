import { act, renderHook } from '@testing-library/react-hooks'
import PokeAPI, { IPokemon } from 'pokeapi-typescript'
import { NamedEndpointParam } from 'pokeapi-typescript/dist/classes/NamedEndpoint'
import usePokemonFilters from 'src/features/pokemons/hooks/usePokemonFilters'
import { transformData } from 'src/features/pokemons/hooks/usePokemonList'
import { mockPokemonList } from 'src/features/pokemons/testing/mockPokemon'

const mockPokeAPIFetch = (param: NamedEndpointParam) =>
  new Promise((resolve) => {
    resolve(mockPokemonList[param as any] as IPokemon)
  })
PokeAPI.Pokemon = { resolve: mockPokeAPIFetch as any } as any
const transformedPokemonList = transformData(mockPokemonList as any)

describe('usePokemonFilters Hook', () => {
  test('returns a pokemon list when no filters selected', async () => {
    const { result } = renderHook(() => usePokemonFilters(transformedPokemonList))
    expect(result.current.filteredData).toMatchObject(transformedPokemonList)
    expect(result.current.filteredData).toHaveLength(transformedPokemonList.length)
  })
  test('returns a pokemon matches query when query is set', async () => {
    const { result } = renderHook(() => usePokemonFilters(transformedPokemonList))
    act(() => {
      result.current.setQueryFilter('bu')
    })
    expect(result.current.filteredData).toHaveLength(2)

    expect(result.current.filteredData).toMatchObject([
      transformedPokemonList[0],
      transformedPokemonList[1],
    ])
  })
  test('returns a full listof pokemon when has favourite and favourite is not toggled', async () => {
    const { result } = renderHook(() => usePokemonFilters(transformedPokemonList))
    act(() => {
      result.current.addFavourite(transformedPokemonList[2])
      result.current.addFavourite(transformedPokemonList[3])
    })
    expect(result.current.filteredData).toHaveLength(4)

    expect(result.current.filteredData).toMatchObject(transformedPokemonList)
  })
  test('returns a list of favourite pokemon when has favourite and favourite is  toggled', async () => {
    const { result } = renderHook(() => usePokemonFilters(transformedPokemonList))
    act(() => {
      result.current.addFavourite(transformedPokemonList[2])
      result.current.addFavourite(transformedPokemonList[3])
      result.current.toggleFavouriteFilter()
    })
    expect(result.current.filteredData).toHaveLength(2)

    expect(result.current.filteredData).toMatchObject([
      transformedPokemonList[2],
      transformedPokemonList[3],
    ])
  })

  test('returns an empty list of favourite pokemon when favourite is removed', async () => {
    const { result } = renderHook(() => usePokemonFilters(transformedPokemonList))
    act(() => {
      result.current.addFavourite(transformedPokemonList[2])
      result.current.toggleFavouriteFilter()
    })
    expect(result.current.filteredData).toHaveLength(1)
    expect(result.current.filteredData).toMatchObject([transformedPokemonList[2]])
    act(() => {
      result.current.removeFavourite(transformedPokemonList[2])
    })
    expect(result.current.filteredData).toHaveLength(0)
  })

  test('returns a list of pokemon filtered by types when has types are provided', async () => {
    const { result } = renderHook(() => usePokemonFilters(transformedPokemonList))
    act(() => {
      result.current.setTypeFilter(['flying', 'electric'])
    })
    expect(result.current.filteredData).toHaveLength(3)

    expect(result.current.filteredData).toMatchObject([
      transformedPokemonList[1],
      transformedPokemonList[2],
      transformedPokemonList[3],
    ])
  })

  test('returns a list of pokemon filtered by all kind of filters at same time', async () => {
    const { result } = renderHook(() => usePokemonFilters(transformedPokemonList))
    act(() => {
      result.current.setTypeFilter(['flying', 'water'])
      result.current.setQueryFilter('bu')
      result.current.addFavourite(transformedPokemonList[0])
      result.current.toggleFavouriteFilter()
    })
    expect(result.current.filteredData).toHaveLength(1)

    expect(result.current.filteredData).toMatchObject([transformedPokemonList[0]])
  })
})
