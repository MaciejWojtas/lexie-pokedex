import { renderHook } from '@testing-library/react-hooks'
import PokeAPI, { IPokemon } from 'pokeapi-typescript'
import { NamedEndpointParam } from 'pokeapi-typescript/dist/classes/NamedEndpoint'
import usePokemonList from 'src/features/pokemons/hooks/usePokemonList'
import { mockPokemonList } from 'src/features/pokemons/testing/mockPokemon'

const mockPokeAPIFetch = (param: NamedEndpointParam) =>
  new Promise((resolve) => {
    resolve(mockPokemonList[param as any] as IPokemon)
  })
PokeAPI.Pokemon = { resolve: mockPokeAPIFetch as any } as any

describe('usePokemonList Hook', () => {
  test('returns a pokemon list', async () => {
    const { result, waitForNextUpdate } = renderHook(() => usePokemonList(3))
    expect(result.current).toHaveLength(0)
    await waitForNextUpdate()
    expect(result.current).toHaveLength(3)
  })
})
