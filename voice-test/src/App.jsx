import { Container, CssBaseline, Grid } from '@mui/material'
import { useState } from 'react'
import './App.css'
import SearchComponent from './components/Search'
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
          <Typography variant='h4'>Find the talent you need for your next project!</Typography>
        </Grid>
        <Grid item xs={12}>
          <SearchComponent />
        </Grid>

      </Grid>
    </Container>
  )
}

export default App
