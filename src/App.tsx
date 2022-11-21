import { ThemeProvider } from '@mui/material'
import PokemonProvider from 'src/features/pokemons/contexts/PokemonProvider'
import Home from 'src/pages/Home'
import { baseTheme } from 'src/theme'

function App() {
  return (
    <ThemeProvider theme={baseTheme}>
      <PokemonProvider>
        <Home />
      </PokemonProvider>
    </ThemeProvider>
  )
}

export default App
