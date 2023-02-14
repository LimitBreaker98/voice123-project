import { Container, CssBaseline, Grid } from '@mui/material'
import { useState } from 'react'
import './App.css'
import SearchBar from './components/Search'
import Typography from '@mui/material/Typography';


function App() {
  return (
    <Container className="App">
      <CssBaseline />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Typography variant='h2'>Voice123 Search</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h6'>Find the talent you need for your next project!</Typography>
        </Grid>
        <Grid item xs={12}>
          <SearchBar />
        </Grid>

      </Grid>
    </Container>
  )
}

export default App
