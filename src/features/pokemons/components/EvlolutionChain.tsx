import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import { Box } from '@mui/material'
import { IChainLink, INamedApiResource, IPokemonSpecies } from 'pokeapi-typescript'
import Evolution from 'src/features/pokemons/components/Evlolution'

interface EvolutionChainProps {
  from: INamedApiResource<IPokemonSpecies>
  to: IChainLink[]
}

const EvolutionChain: React.FC<EvolutionChainProps> = ({ from, to }) => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'space-around',
      textAlign: 'center',
    }}
  >
    <Box
      sx={{
        flexBasis: '50%',
      }}
    >
      <Evolution name={from.name} url={from.url} />
    </Box>

    <Box
      sx={{
        flexBasis: '50%',
      }}
    >
      {to.map((link) => (
        <Box
          key={link.species.name}
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <ArrowForwardRoundedIcon />

          <Box
            sx={{
              alignSelf: 'center',
              flex: 1,
            }}
          >
            <Evolution name={link.species.name} url={link.species.url} />
          </Box>
        </Box>
      ))}
    </Box>
  </Box>
)

export default EvolutionChain
