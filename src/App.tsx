import { ThemeProvider } from '@mui/material'
import Home from 'src/pages/Home'
import { baseTheme } from 'src/theme'

function App() {
  return (
    <ThemeProvider theme={baseTheme}>
      <Home />
    </ThemeProvider>
  )
}

export default App
