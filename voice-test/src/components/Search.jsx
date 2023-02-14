import * as React from 'react';
import { useState, useEffect } from 'react'

import Button from '@mui/material/Button';
import { Container, Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import VoiceActorPaginatedGrid from './VoiceActors';

// TODO: refactor this into separate module to import elsewhere and unify.
const PAGE_SIZE_HEADER = 'x-list-page-size'
const CURRENT_PAGE_HEADER = 'x-list-current-page'
const TOTAL_PAGES_HEADER = 'x-list-total-pages'
const TOTAL_ROWS_HEADER = 'x-list-total-rows'

const allCustomHeaders = [PAGE_SIZE_HEADER, CURRENT_PAGE_HEADER, TOTAL_PAGES_HEADER, TOTAL_ROWS_HEADER]


export default function SearchBar() {
  const [keywords, setKeywords] = useState('')
  const [data, setData] = useState([])
  const [searchState, setSearchState] = useState('')
  const [page, setPage] = useState(1)
  const [err, setErr] = useState('')


  const search = async () => {
    setSearchState('LOADING');
    // TODO implement dark mode.

    try {
      // TODO: Add fetch options?
      const response = await fetch(`https://api.sandbox.voice123.com/providers/search/?service=voice_over&keywords=${encodeURIComponent(keywords)}&page=${page}`)

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const result = await response.json();
      const providers = result.providers;

      console.log('#providers: ', providers.length);
      allCustomHeaders.map((customHeader) => console.log(`${customHeader}: ${response.headers.get(customHeader)}`))
      console.log('result is: ', JSON.stringify(result, null, 4));

      setData(providers);
    } catch (err) {
      setErr(err.message);
    } finally {
      setSearchState('DONE');
    }
  };
  // TODO: attempt changing event for event, value and just selecting value. 
  return (
    <Container>
      <Grid container spacing={4} alignItems='center'>
        <Grid item xs={10}>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Keywords"
            variant="outlined"
            onChange={(event) => setKeywords(event.target.value)}
            onKeyDown={(event) => {
              event.key === "Enter" ? search() : null
            }}
          />
        </Grid>
        <Grid item xs={2}>
          <Button variant="contained" size="large" onClick={search}> Search </Button>
        </Grid>
        {data ? <Grid item xs={12}>
          <VoiceActorPaginatedGrid actors={data} />
        </Grid> : <></>}
      </Grid>
    </Container >
  );
}