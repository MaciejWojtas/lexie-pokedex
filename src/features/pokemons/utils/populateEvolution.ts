import { IPokemonSpecies } from 'pokeapi-typescript/dist/interfaces/Pokemon/PokemonSpecies'
import { INamedApiResource } from 'pokeapi-typescript/dist/interfaces/Utility/NamedApiResourceList'
import { isOG } from 'src/utils'

export interface ChainLink {
  evolves_to: ChainLink[]
  species: INamedApiResource<IPokemonSpecies>
}

const populateEvolution = <T extends ChainLink>(link: T, chain: T[]) => {
  // only respect the OG pokemon
  if (!link.evolves_to.length) {
    return
  }

  const linkWithOnlyOgEvolutions = {
    ...link,
    evolves_to: link.evolves_to.filter((link) => isOG(link.species.url)),
  }

  // in some cases, non-OG pokemon evolve into OG pokemon (like Pichu)
  // don't include non-OG pokemon in our chain, but still process
  // their evolutions
  if (isOG(linkWithOnlyOgEvolutions.species.url)) {
    chain.push(linkWithOnlyOgEvolutions)
  }
  linkWithOnlyOgEvolutions.evolves_to.forEach((childPoke) => populateEvolution(childPoke, chain))
}

export default populateEvolution
