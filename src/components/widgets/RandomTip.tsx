import React from 'react'
import styled, { css } from 'styled-components'
import { randomBelow } from '../../data/utils'
import { ArrowDown, ExpandIcon, ExternalLinkIcon } from '../../icons/FontAwesomeIcons'
import { C } from '../designsystem/C'
import { Faded } from '../designsystem/Text'

const TipWrapper = styled.div(
  ({ theme }) => css`
    text-align: center;
    padding: ${theme.dimensions.hugeSpacing};
    max-width: ${theme.dimensions.bodyWidth};
  `
)

const tips: Array<JSX.Element | string> = [
  <Faded>
    You can exclude tags with the <C>-</C> modifier.
  </Faded>,
  'Try tapping the little plus in the tag search.',
  <Faded>
    Each result will have at least one of your <C>~</C> tags.
  </Faded>,
  'Check out the preferences. There are lots of useful options there.',
  'You can get more info about a post be tapping it once.',
  'Tapping on a tag below a post adds it to your active tags.',
  <Faded>
    Large gifs and videos can take a while to load in the app. If this becomes a problem you can open them in a new tab
    with <ExternalLinkIcon />
  </Faded>,
  'If anything stops working or gets weird. Reset the app in preferences.',
  'I hope you are having a nice day!',
  <Faded>
    If a tag is ambiguous, it will have a little arrow <ArrowDown />. Tapping it shows related tags.
  </Faded>,
  <Faded>
    Tapping <ExpandIcon /> in the top left of posts brings you into fullscreen mode.
  </Faded>,
  'Searching with no tags returns ALL posts ever made.',
  'By default, results are sorted chronologically. Newest first. You can change this with the sort selector.',
  "You can filter posts based on how explicit they are. Try entering 'rating' in the search field.",
  "You can search for posts from a specific website by entering 'source:*twitter* for example.",
  'You can upvote a post by tapping its score in the details.',
  'Wanna know more about a post? Enable "Show post metadata" in the options.',
  'Every time you load this page, a random tip will be shown here.',
  'You can enable comments in the preferences. Not all post have comments though.',
  'You can save and share your preferences across devices if you log in with your Google account.',
  'Tapping the number of results displays the exact number instead of an approximation.',
  'You can create supertags once you have two or more active tags. (And you need to be signed in)',
  'Supertags are collections of tags that you can add together.',
  'Supertags retain the modifiers of the tags they contain.',
  'You can tap this tip to get another one.',
  'You can change the modifier of an active tag by clicking and holding it on mobile and right clicking it on desktop.',
  'You can share your supertags with friends under preferences.',
  'Join the discord to get involved with other people who use the app.',
  'I am taking feature request on my discord server.',
  'Check out the about section for info/links about the app and myself.',
  'If you are signed in, your settings are automatically saved online when you change them. This can take up to 15 seconds.',
]

const getRandomTip = () => tips[randomBelow(tips.length)]

export default function RandomTip() {
  const [tip, setTip] = React.useState(getRandomTip())
  const nextTip = React.useCallback(() => setTip(getRandomTip()), [])

  return (
    <TipWrapper role='note' onClick={nextTip}>
      {typeof tip === 'string' ? <Faded>{tip}</Faded> : tip}
    </TipWrapper>
  )
}
