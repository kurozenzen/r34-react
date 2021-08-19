import React, { useCallback, useState } from 'react'
import styled, { css } from 'styled-components'
import { Faded } from '../designsystem/Text'

const tips = [
  'Try tapping the little plus in the tag search.',
  "You can exclude tags with the '-' modifier.",
  "Each result will have at least one of your '~' tags.",
  'Check out the settings. There are lots of useful options there.',
  'You can get more info about a post be tapping it once.',
  'Tapping on a tag below a post adds it to your active tags.',
  "Large gifs and videos can take a while to load in the app. Try clicking the 'Open in new tab' icon in the bottom left corner for faster loading times.",
  'If anything stops working or gets weird. Reset the app in the settings.',
  'I hope you are having a nice day!',
  'If a tag is ambiguous, it will have a little arrow on the right. Tapping it shows related tags.',
  'Tapping the icon in the top left of posts brings you into fullscreen mode.',
  'Searching for nothing returns ALL posts ever made.',
  'Results are sorted chronologically. Newest first.',
  "You can filter posts based on how explicit they are. Try entering 'rating' in the search field.",
  "You can search for posts from a specific website by entering 'source:*twitter* for example.",
  'You can upvote a post by tapping its score in the details.',
  'Wanna know more about a post? Enable "Show post metadata" in the options.',
  'Every time you load this page, a random tip will be shown here.',
  'You can enable comments in the settings. Not all post have comments though.',
  'You can save and share your settings across devices if you log in with your Google account.',
  'Tapping the number of results displays the exact number instead of an approximation.',
  'You can create supertags once you have two or more active tags.',
  'Supertags are collections of tags that you can add together.',
  'Supertags retain the modifiers of the tags they contain.',
  'You can tap this tip to get another one.',
  'You can change the modifier of a tag by: clicking and holding it on mobile and right clicking it on desktop.',
  'You can share your supertags with friends in the settings.',
  'Join the discord to get involved with other people who use the app.',
  'I am taking feature request on my discord in case there is some functionalityyou want.',
  'Check out the about section for info/links about the app and myself.',
]

const Span = styled(Faded)(
  ({ theme }) => css`
    text-align: center;
    font-size: 16px;
    padding: ${theme.dimensions.hugeSpacing} 10%;
    max-width: ${theme.dimensions.bodyWidth};
  `
)

function getRandomTip() {
  return tips[Math.floor(Math.random() * tips.length)]
}

export default function RandomTip() {
  const [tip, setTip] = useState(getRandomTip())
  const nextTip = useCallback(() => {
    setTip(getRandomTip())
  }, [])

  return <Span onClick={nextTip}>{tip}</Span>
}
