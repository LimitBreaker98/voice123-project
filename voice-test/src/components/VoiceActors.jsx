import * as React from 'react';
import { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import { Container, Grid, Box, Link } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import defaultUserPicture from '../assets/default_user_picture.png';
import IconButton from '@mui/material/IconButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { flatten } from 'flat'



function getMatchingTextObject(actorData, usedKeywords) {
  //console.log(`usedKeywords: ${usedKeywords} ${typeof (usedKeywords)}`)
  usedKeywords = usedKeywords.toLowerCase()
  usedKeywords = usedKeywords.split(' ')
  let flatProviderObject = flatten(actorData)
  for (let candidateText of Object.values(flatProviderObject)) {
    if (typeof candidateText === 'string') {
      candidateText = candidateText.toLowerCase()
      for (let keyword of usedKeywords) {
        if (candidateText.includes(keyword)) {
          //console.log(`valor: ${candidateText}`)
          console.log(getObjectFromMatchingText(candidateText, keyword))
          return getObjectFromMatchingText(candidateText, keyword)
        }
      }
    }
  }
  console.log("returned default")
  return {} // TODO: clarify this
}

function getObjectFromMatchingText(matchingText, keyword) {
  let textIsTooLong = matchingText.length >= 100
  if (textIsTooLong) {
    let keywordIndex = matchingText.indexOf(keyword)
    matchingText = `... ${matchingText.slice(keywordIndex - 50, keywordIndex + 50)} ...`
  }
  let splittedText = matchingText.split(keyword)
  let matchingTextObject = {
    previousText: splittedText[0],
    match: keyword,
    posteriorText: splittedText[1]
  }
  return matchingTextObject
}


function VoiceActorCard({ actorName, userName, pictureUrl, matchingTextObject, sampleUrl }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="300"
        image={pictureUrl ?? defaultUserPicture}
        alt="Voice Actor Image"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          <Link href={`https://voice123.com/${encodeURIComponent(userName)}`}>
            {actorName}
          </Link>
        </Typography>
        <Typography component={'span'} variant="body2" color="text.secondary" display={'inline'}>
          {matchingTextObject.previousText}
        </Typography>
        <Typography component={'span'} variant="body2" color="text.secondary" display={'inline'} fontWeight='bold'>
          {matchingTextObject.match}
        </Typography>
        <Typography component={'span'} variant="body2" color="text.secondary" display={'inline'}>
          {matchingTextObject.posteriorText}
        </Typography>
      </CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
        <CardMedia
          component="audio"
          controls
          src={encodeURI(sampleUrl)}
        />
      </Box>
    </Card >
  );
}

export default function VoiceActorGrid({ actors, keywords }) {
  // actorData is an object of the providers array of the endpoint's response body
  // actorData.user is an object with user data
  // has username, name, picture_small, picture_medium, picture_large
  // actorData.relevant_sample is an object which has a sample file link and the name of the file. Let's play the file from there first.

  // TODO: handle all cases of having picture_small, picture_medium, picture_large, or none of them.
  // TODO: figure this out
  let actorCards = actors.map(
    (actorData, index) => {
      return (
        <Grid item key={index} xs={4}>
          <VoiceActorCard
            actorName={actorData.user.name ?? 'default name'}
            userName={actorData.user.username ?? 'default username'}
            pictureUrl={
              actorData.user.picture_small ??
              actorData.user.picture_medium ??
              actorData.user.picture_large
            }
            matchingTextObject={getMatchingTextObject(actorData, keywords)}
            sampleUrl={actorData.relevant_sample.file ?? 'hola'}
          />
        </Grid>)
    })
  // TODO: Pagination count should depend on the fetched data. Fetched data has a custom header with amount of pages. 
  // Always show 10, and then show appropriate number of pages. ceil(N/10)
  return (
    <Box>
      <Grid container spacing={2} alignItems='center'>
        {actorCards}
      </Grid>
    </Box>
  )
}


