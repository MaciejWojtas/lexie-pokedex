import populateEvolution, { ChainLink } from './populateEvolution'

const link: ChainLink = {
  evolves_to: [
    {
      evolves_to: [
        {
          evolves_to: [],
          species: {
            name: 'victreebel',
            url: 'https://pokeapi.co/api/v2/pokemon-species/71/',
          },
        },
      ],
      species: {
        name: 'weepinbell',
        url: 'https://pokeapi.co/api/v2/pokemon-species/70/',
      },
    },
  ],
  species: {
    name: 'bellsprout',
    url: 'https://pokeapi.co/api/v2/pokemon-species/69/',
  },
}

const expectedResult = [
  {
    evolves_to: [
      {
        evolves_to: [
          {
            evolves_to: [],
            species: { name: 'victreebel', url: 'https://pokeapi.co/api/v2/pokemon-species/71/' },
          },
        ],
        species: { name: 'weepinbell', url: 'https://pokeapi.co/api/v2/pokemon-species/70/' },
      },
    ],
    species: { name: 'bellsprout', url: 'https://pokeapi.co/api/v2/pokemon-species/69/' },
  },
  {
    evolves_to: [
      {
        evolves_to: [],
        species: { name: 'victreebel', url: 'https://pokeapi.co/api/v2/pokemon-species/71/' },
      },
    ],
    species: { name: 'weepinbell', url: 'https://pokeapi.co/api/v2/pokemon-species/70/' },
  },
]

describe('organizeByLevel function', () => {
  test('Returns the initial flag value while the client is still initializing', async () => {
    const result = [] as ChainLink[]
    populateEvolution(link, result)

    expect(result).toMatchObject(expectedResult)
  })
})
