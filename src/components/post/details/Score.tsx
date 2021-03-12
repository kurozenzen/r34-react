import React, { MouseEventHandler, useCallback } from 'react'
import { DefaultTheme } from 'styled-components'
import { HeartIcon } from '../../../icons/FontAwesomeIcons'
import FlexPair from '../../common/FlexPair'
import styled, { css } from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { likePost } from '../../../redux/actions'
import { selectLikedByPostId } from '../../../redux/selectors'
import { boolToNumber } from '../../../data/utils'

const ScorePair = styled(FlexPair)(
  ({ $liked, theme }: { $liked: boolean; theme: DefaultTheme }) => css`
    transition: transform 0.1s ease-out;

    ${$liked
      ? css`
          color: ${theme.colors.liked};

          svg {
            color: ${theme.colors.liked};
          }
        `
      : css``}

    :active {
      transform: scale(1.1);
    }
  `
)

export default function Score(props: { value: number; postId: number }) {
  const { value, postId } = props

  const dispatch = useDispatch()

  const liked = useSelector(selectLikedByPostId(postId))
  const handleClick: MouseEventHandler = useCallback(
    (event) => {
      event.stopPropagation()

      if (!liked) {
        dispatch(likePost(postId))
      }
    },
    [dispatch, liked, postId]
  )

  return (
    <ScorePair onClick={handleClick} $liked={liked}>
      <HeartIcon color='white' />
      <span>{value + boolToNumber(liked)}</span>
    </ScorePair>
  )
}
