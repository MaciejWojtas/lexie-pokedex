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
import MultipleSelect from 'src/features/pokemons/components/PokemonTypeFilter'
import usePokemonFilters from 'src/features/pokemons/hooks/usePokemonFilters'
import usePokemonList from 'src/features/pokemons/hooks/usePokemonList'

const Home: React.FC = () => {
  const pokemon = usePokemonList()

  const {
    favouriteFilter,
    addFavourite,
    removeFavourite,
    toggleFavouriteFilter,
    queryFilter,
    setQueryFilter,
    typeFilter,
    setTypeFilter,
    filteredData,
    favourites,
  } = usePokemonFilters(pokemon)

  function handleQueryChange(event: ChangeEvent<HTMLInputElement>) {
    setQueryFilter(event.target.value)
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
                <IconButton onClick={() => setQueryFilter('')}>
                  <Close />
                </IconButton>
              </InputAdornment>
            ),
          }}
          onChange={handleQueryChange}
          placeholder="Search Pokemon"
          value={queryFilter}
          variant="outlined"
        />

        <Button
          color={favouriteFilter ? 'primary' : 'secondary'}
          onClick={toggleFavouriteFilter}
          startIcon={favouriteFilter ? <Favorite /> : <FavoriteBorder />}
          sx={{
            flexShrink: 0,
            ml: '2rem',
          }}
        >
          My Favourites ({favourites.length})
        </Button>
        <MultipleSelect pokemonType={typeFilter} setPokemonType={setTypeFilter} />
      </Box>

      <Grid container spacing={2}>
        {filteredData?.map((pokemon) => (
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
