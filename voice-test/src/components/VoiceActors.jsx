import * as React from 'react';
import { Container, Grid, Box, Link } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import defaultUserPicture from '../assets/default_user_picture.png';



function VoiceActorCard({ actorName, userName, pictureUrl, matchingText, sampleUrl }) {
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
        <Typography variant="body2" color="text.secondary">
          {matchingText}
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

export default function VoiceActorGrid({ actors }) {
  // actorData is an object of the providers array of the endpoint's response body
  // actorData.user is an object with user data
  // has username, name, picture_small, picture_medium, picture_large
  // actorData.relevant_sample is an object which has a sample file link and the name of the file. Let's play the file from there first.

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
              actorData.user.picture_large ??
              undefined
            }
            matchingText={'figure this out'}
            sampleUrl={actorData.relevant_sample.file ?? 'hola'}
          />
        </Grid>)
    })
  return (
    <Box>
      <Grid container spacing={2} alignItems='center'>
        {actorCards}
      </Grid>
    </Box>
  )
}


