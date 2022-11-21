import organizeByLevel, { PokemonMove } from './moves'

const mockPokemonMoves: PokemonMove[] = [
  { level: 1, name: 'name1' },
  { level: 1, name: 'name2' },
  { level: 0, name: 'name1' },
  { level: 0, name: 'name2' },
  { level: 0, name: 'name3' },
  { level: 2, name: 'name1' },
  { level: 2, name: 'name1' },
  { level: 3, name: 'name1' },
]

describe('organizeByLevel function', () => {
  test('Returns the initial flag value while the client is still initializing', async () => {
    const result = organizeByLevel(mockPokemonMoves)

    expect(result).toMatchObject({
      '0': ['name1', 'name2', 'name3'],
      '1': ['name1', 'name2'],
      '2': ['name1', 'name1'],
      '3': ['name1'],
    })
  })
})
