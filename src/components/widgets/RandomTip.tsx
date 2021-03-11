import React, { useMemo } from 'react'
import styled, { css } from 'styled-components'
import { Faded } from '../common/Text'

const tips = [
  'Try tapping the little plus in the tag search.',
  "You can exclude tags with the '-' modifier.",
  "Each result will have at least one of your '~' tags.",
  'Check out the settings. There are lots of uesful options there.',
  'Starting a tag search with a * gives more results.',
  'When filtering rated posts, you can configure the minimum score by taping the red number.',
  'You can get more info about a post be tapping it once.',
  'Tapping on a tag below a post adds it to your active tags.',
  "Large gifs and videos can take a while to load in the app. Try clicking the 'Open in new tab' icon in the bottom left corner for faster loading times.",
  'If anything stops working or gets weird. Reset the app in the settings.',
  'I hope you are having a nice day!',
  'If a tag is ambiguous, it will have a little arrow on the right. Tapping it shows related tags.',
  'Tapping the icon in the top left of posts brings you into fullscreen mode.',
  'Searching for nothing returns ALL posts ever made.',
  'Results are sorted chronologically. Newest first.',
  "You can search for safe posts by entering 'rating:safe' in the search field. The same works for questionable and explicit.",
  "You can search for posts from a specific website by entering 'source:*twitter* for example.",
  'You can upvote a post by tapping its score in the details.',
  'Wanna know more about a post? Enable "Show post metadata" in the options.',
  'Every time you reload the page, a random tip will be shown here.',
  'You can enable comments in the settings. Not all post have comments though.',
]

const Span = styled(Faded)(
  ({ theme }) => css`
    text-align: center;
    font-size: 16px;
    padding: ${theme.dimensions.hugeSpacing};
    max-width: ${theme.dimensions.bodyWidth};
  `
)

export default function RandomTip() {
  const tip = useMemo(() => tips[Math.floor(Math.random() * tips.length)], [])

  return <Span>{tip}</Span>
}
