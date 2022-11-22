import { Box, Divider, Stack, Typography } from '@mui/material'
import organizeByLevel from 'src/features/pokemons/utils/moves'

interface PokemonMovesProps {
  levels: ReturnType<typeof organizeByLevel>
}

const PokemonMoves: React.FC<PokemonMovesProps> = ({ levels }) => (
  <Stack direction="column" divider={<Divider />}>
    {Object.keys(levels).map((level) => (
      <Box key={level} py={2}>
        <Typography>Level {level}</Typography>
        <Typography variant="caption">{levels[level].join(', ')}</Typography>
      </Box>
    ))}
  </Stack>
)

export default PokemonMoves
