import { Divider, Stack, Typography } from '@mui/material'
import { IChainLink } from 'pokeapi-typescript'

import EvolutionChain from './EvlolutionChain'

interface PokemonEvolutionProps {
  name: string
  evolutions: IChainLink[]
}

const PokemonEvolution: React.FC<PokemonEvolutionProps> = ({ name, evolutions }) => (
  <Stack divider={<Divider />} spacing={5}>
    {!evolutions.length && <Typography>{name} does not have any evolutions.</Typography>}

    {[...Array(evolutions.length)].map((_, index) => (
      <EvolutionChain
        from={evolutions[index].species}
        key={evolutions[index].species.name}
        to={evolutions[index].evolves_to}
      />
    ))}
  </Stack>
)

export default PokemonEvolution
