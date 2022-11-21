import { useState } from 'react'

import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import FavouriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded'
import FavouriteRoundedIcon from '@mui/icons-material/FavoriteRounded'
import { Box, Chip, DialogTitle, IconButton, Paper, Stack, Tab, Tabs } from '@mui/material'
import { IChainLink } from 'pokeapi-typescript'
import PokemonAbout from 'src/features/pokemons/components/PokemonAbout'
import PokemonEvolution from 'src/features/pokemons/components/PokemonEvolution'
import PokemonMoves from 'src/features/pokemons/components/PokemonMoves'
import PokemonStats from 'src/features/pokemons/components/PokemonStats'
import { PokemonType } from 'src/features/pokemons/contexts/PokemonProvider'
import organizeByLevel from 'src/features/pokemons/utils/moves'

interface PokemonModalProps {
  name: string
  types: PokemonType[]
  imageUrl: string
  experience: number
  height: number
  weight: number
  moves: any[]
  abilities: string[]
  hp: number
  attack: number
  defense: number
  specialAttack: number
  specialDefense: number
  speed: number
  description: string
  evolutions: IChainLink[]
  isFavourite: boolean
  onToggleFavourite: () => void
  onClose: () => void
}

const IMAGE_HEIGHT = 350

const PokemonModal: React.FC<PokemonModalProps> = ({
  name,
  types,
  imageUrl,
  experience,
  height,
  weight,
  moves,
  abilities,
  hp,
  attack,
  defense,
  specialAttack,
  specialDefense,
  speed,
  description,
  evolutions,
  isFavourite,
  onToggleFavourite,
  onClose,
}) => {
  const [currentTab, setCurrentTab] = useState('about')

  function handleTabChange(event: React.SyntheticEvent, newValue: string) {
    setCurrentTab(newValue)
  }

  const movesOrganizedByLevel = organizeByLevel(moves)

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '90vh' }}>
      <Paper sx={{ borderRadius: '30px' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            px: 2,
            pt: 4,
          }}
        >
          <IconButton color="inherit" onClick={onClose}>
            <ArrowBackRoundedIcon />
          </IconButton>

          <IconButton color="inherit" onClick={onToggleFavourite}>
            {isFavourite ? <FavouriteRoundedIcon /> : <FavouriteBorderRoundedIcon />}
          </IconButton>
        </Box>

        <Box
          sx={{
            backgroundImage: 'url("/pokeball.svg")',
            backgroundSize: '50%',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'bottom right',
          }}
        >
          <DialogTitle>{name}</DialogTitle>

          <Stack
            direction="row"
            spacing={1}
            sx={{
              px: 3,
            }}
          >
            {types.map((type) => (
              <Chip key={type} label={type} />
            ))}
          </Stack>

          <Box height={IMAGE_HEIGHT - 100} />
        </Box>
      </Paper>

      <Paper
        sx={{
          flex: 1,
          borderRadius: '30px',
          position: 'relative',
          marginTop: '-2rem',
          minHeight: '5rem',
          pb: 2,
          px: 4,
          paddingTop: '75px',
        }}
        variant="white"
      >
        <Box
          component="img"
          src={imageUrl}
          sx={{
            position: 'absolute',
            left: '50%',
            height: IMAGE_HEIGHT,
            marginTop: `${-IMAGE_HEIGHT}px`,
            transform: 'translateX(-50%)',
          }}
        />

        <Tabs onChange={handleTabChange} value={currentTab} variant="fullWidth">
          <Tab label="About" value="about" />
          <Tab label="Base Stats" value="base-stats" />
          <Tab label="Evolution" value="evolution" />
          <Tab label="Moves" value="moves" />
        </Tabs>

        <Box py={2}>
          {currentTab === 'about' && (
            <PokemonAbout
              abilities={abilities}
              description={description}
              experience={experience}
              height={height}
              weight={weight}
            />
          )}
          {currentTab === 'base-stats' && (
            <PokemonStats
              attack={attack}
              defense={defense}
              hp={hp}
              specialAttack={specialAttack}
              specialDefense={specialDefense}
              speed={speed}
            />
          )}
          {currentTab === 'evolution' && <PokemonEvolution evolutions={evolutions} name={name} />}
          {currentTab === 'moves' && <PokemonMoves levels={movesOrganizedByLevel} />}
        </Box>
      </Paper>
    </Box>
  )
}

export default PokemonModal
