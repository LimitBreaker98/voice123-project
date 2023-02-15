import * as React from 'react';

import { Grid, Box, Link } from '@mui/material';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import defaultUserPicture from '../assets/default_user_picture.png';

import { getMatchingTextObject } from '../utils/StringHelpers.js';

function HighlightedText({
  previousText,
  match,
  posteriorText,
  extendDescription,
}) {
  return (
    <>
      <Typography
        component={'span'}
        variant='body2'
        color='text.secondary'
        display={'inline'}
      >
        {previousText}
      </Typography>
      <Typography
        component={'span'}
        variant='body2'
        color='text.secondary'
        display={'inline'}
        fontWeight='bold'
      >
        {match}
      </Typography>
      <Typography
        component={'span'}
        variant='body2'
        color='text.secondary'
        display={'inline'}
      >
        {posteriorText}
      </Typography>
    </>
  );
}

function VoiceActorCard({
  actorName,
  userName,
  pictureUrl,
  matchingTextObject,
  sampleUrl,
}) {
  const { previousText, match, posteriorText } = matchingTextObject;
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component='img'
        height='300'
        image={pictureUrl ?? defaultUserPicture}
        alt='Voice Actor Image'
      />
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          <Link href={`https://voice123.com/${encodeURIComponent(userName)}`}>
            {actorName}
          </Link>
        </Typography>
        <HighlightedText
          previousText={previousText}
          match={match}
          posteriorText={posteriorText}
        />
      </CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
        <CardMedia component='audio' controls src={encodeURI(sampleUrl)} />
      </Box>
    </Card>
  );
}

export default function VoiceActorGrid({ actors, keywords }) {
  let actorCards = actors.map((actorData, index) => {
    return (
      <Grid item key={index} xs={12} md={4} lg={3}>
        <VoiceActorCard
          actorName={actorData.user.name ?? 'default name'}
          userName={actorData.user.username ?? 'default username'}
          pictureUrl={
            actorData.user.picture_small ??
            actorData.user.picture_medium ??
            actorData.user.picture_large
          }
          matchingTextObject={getMatchingTextObject(actorData, keywords)}
          sampleUrl={
            actorData.relevant_sample.file ?? 'Provider has no sample file'
          }
        />
      </Grid>
    );
  });
  return (
    <Box>
      <Grid container spacing={2} alignItems='stretch'>
        {actorCards}
      </Grid>
    </Box>
  );
}
