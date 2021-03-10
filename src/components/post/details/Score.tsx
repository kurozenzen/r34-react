import React, { MouseEventHandler, useCallback, useState } from 'react'
import { DefaultTheme } from 'styled-components'
import { HeartIcon } from '../../../icons/FontAwesomeIcons'
import FlexPair from '../../common/FlexPair'
import styled, { css } from 'styled-components'

const ScorePair = styled(FlexPair)(({ $liked, theme }: { $liked: boolean; theme: DefaultTheme }) =>
  $liked
    ? css`
        color: ${theme.colors.liked};

        svg {
          color: ${theme.colors.liked};
        }
      `
    : css``
)

export default function Score(props: { value: number; postId: number }) {
  const { value, postId } = props

  const [liked, setLiked] = useState(false)
  const handleClick: MouseEventHandler = useCallback(
    (event) => {
      event.stopPropagation()

      if (!liked) {
        fetch(`https://rule34.xxx/index.php?page=post&s=vote&id=${postId}&type=up`, { mode: 'no-cors' })
          .then(() => {
            setLiked(true)
          })
          .catch((err) => {
            console.warn('Upvote rejected', err)
          })
      }
    },
    [liked, postId]
  )

  return (
    <ScorePair onClick={handleClick} $liked={liked}>
      <HeartIcon color='white' />
      <span>{value + (liked ? 1 : 0)}</span>
    </ScorePair>
  )
}
