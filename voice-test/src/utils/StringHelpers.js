import { flatten } from 'flat';
import { LONG_TEXT_THRESHOLD } from './Constants';

export function getMatchingTextObject(actorData, usedKeywords) {
  let defaultTextObject = {
    previousText: 'A great ',
    match: 'Voice123 ',
    posteriorText: 'provider for your job',
    extendDescription: false,
  };
  if (usedKeywords === '') {
    return defaultTextObject;
  }
  usedKeywords = usedKeywords.toLowerCase();
  usedKeywords = usedKeywords.split(' ');
  let flatProviderObject = flatten(actorData);
  for (let candidateText of Object.values(flatProviderObject)) {
    if (typeof candidateText === 'string') {
      candidateText = candidateText.toLowerCase();
      for (let keyword of usedKeywords) {
        if (candidateText.includes(keyword)) {
          return getObjectFromMatchingText(candidateText, keyword);
        }
      }
    }
  }
  return defaultTextObject;
}

function getObjectFromMatchingText(matchingText, keyword) {
  let textIsTooLong = matchingText.length > LONG_TEXT_THRESHOLD;
  if (textIsTooLong) {
    let keywordIndex = matchingText.indexOf(keyword);
    matchingText = `... ${matchingText.slice(
      keywordIndex - LONG_TEXT_THRESHOLD / 2,
      keywordIndex + LONG_TEXT_THRESHOLD / 2
    )} ...`;
  }
  let splittedText = matchingText.split(keyword);
  let matchingTextObject = {
    previousText: splittedText[0],
    match: keyword,
    posteriorText: splittedText[1],
  };
  return matchingTextObject;
}
