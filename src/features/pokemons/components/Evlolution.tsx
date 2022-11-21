import { Box, Typography } from '@mui/material'
import { getIdFromUrl } from 'src/utils'

interface EvolutionProps {
  name: string
  url: string
}

const Evolution: React.FC<EvolutionProps> = ({ name, url }) => {
  const id = getIdFromUrl(url)
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`

  return (
    <Box sx={{ position: 'relative' }}>
      <Box
        sx={{
          backgroundImage: 'url("/pokeball.svg")',
          backgroundSize: '50%',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          filter: 'brightness(0.8)',
          position: 'absolute',
          height: '100%',
          width: '100%',
        }}
      />
      <Box sx={{ position: 'relative', zIndex: 2 }}>
        <Box component="img" height={150} src={imageUrl} />
        <Typography align="center">{name}</Typography>
      </Box>
    </Box>
  )
}

export default Evolution
