import { flatten } from 'flat'

export function getMatchingTextObject(actorData, usedKeywords) {
  let defaultTextObject = {
    previousText: "A great ",
    match: "Voice123 ",
    posteriorText: "provider for your job"
  }
  if (usedKeywords === '') {
    return defaultTextObject
  }
  usedKeywords = usedKeywords.toLowerCase()
  usedKeywords = usedKeywords.split(' ')
  let flatProviderObject = flatten(actorData)
  for (let candidateText of Object.values(flatProviderObject)) {
    if (typeof candidateText === 'string') {
      candidateText = candidateText.toLowerCase()
      for (let keyword of usedKeywords) {
        if (candidateText.includes(keyword)) {
          return getObjectFromMatchingText(candidateText, keyword)
        }
      }
    }
  }
  return defaultTextObject
}

export function getObjectFromMatchingText(matchingText, keyword) {
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