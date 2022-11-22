import * as React from 'react'

import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import OutlinedInput from '@mui/material/OutlinedInput'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { Theme, useTheme } from '@mui/material/styles'
import { PokemonType, pokemonTypes } from 'src/features/pokemons/types/pokemon'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

function getStyles(name: string, pokemonType: string[], theme: Theme) {
  return {
    fontWeight:
      pokemonType.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  }
}
interface PokemonTypeFilterProps {
  pokemonType: PokemonType[]
  setPokemonType(type: PokemonType[]): void
}
export default function PokemonTypeFilter({ pokemonType, setPokemonType }: PokemonTypeFilterProps) {
  const theme = useTheme()

  const handleChange = (event: SelectChangeEvent<PokemonType[]>) => {
    const {
      target: { value },
    } = event
    setPokemonType(value as PokemonType[])
  }

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-name-label">Type</InputLabel>
        <Select
          input={<OutlinedInput label="Type" />}
          MenuProps={MenuProps}
          multiple
          onChange={handleChange}
          value={pokemonType}
        >
          {pokemonTypes.map((name) => (
            <MenuItem key={name} style={getStyles(name, pokemonType, theme)} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}
