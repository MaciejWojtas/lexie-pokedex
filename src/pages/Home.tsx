import React, { ChangeEvent } from 'react'

import { Close, Favorite, FavoriteBorder, Search } from '@mui/icons-material'
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material'
import PokemonCard from 'src/features/pokemons/components/PokemonCard'
import { Field, usePokemonContext } from 'src/features/pokemons/contexts/PokemonProvider'

const Home: React.FC = () => {
  const {
    pokemon,
    query,
    search,
    favourites,
    addFavourite,
    removeFavourite,
    filters,
    addFilter,
    removeFilter,
  } = usePokemonContext()

  function handleQueryChange(event: ChangeEvent<HTMLInputElement>) {
    search(event.target.value)
  }

  const handleToggleFavourites = () => {
    if (filters[Field.favourite]) {
      removeFilter(Field.favourite)
    } else {
      addFilter(Field.favourite, true)
    }
  }

  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <Typography variant="h1">
        What Pokemon <br />
        are you looking for?
      </Typography>
      <Box
        sx={{
          display: 'flex',
          pt: 4,
          pb: 2,
        }}
      >
        <TextField
          id="pokemon-search"
          InputProps={{
            sx: { pr: 0 },
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => search('')}>
                  <Close />
                </IconButton>
              </InputAdornment>
            ),
          }}
          onChange={handleQueryChange}
          placeholder="Search Pokemon"
          value={query}
          variant="outlined"
        />

        <Button
          color={filters[Field.favourite] ? 'primary' : 'secondary'}
          onClick={handleToggleFavourites}
          startIcon={filters[Field.favourite] ? <Favorite /> : <FavoriteBorder />}
          sx={{
            flexShrink: 0,
            ml: '2rem',
          }}
        >
          My Favourites ({favourites.length})
        </Button>
      </Box>

      <Grid container spacing={2}>
        {pokemon.map((pokemon) => (
          <Grid item key={pokemon.name} md={4} sm={6} xs={12}>
            <PokemonCard
              isFavourite={favourites.includes(pokemon.name)}
              onAddFavourite={() => addFavourite(pokemon)}
              onRemoveFavourite={() => removeFavourite(pokemon)}
              pokemon={pokemon}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default Home
