import React, { useEffect, useMemo } from 'react'
import styled, { css } from 'styled-components'
import Details from './Details'
import Player from '../player/Player'
import { useSelector } from 'react-redux'
import { selectOriginals } from '../../redux/selectors'
import PostDataClass from '../../data/Post'
import LayoutElementProps from '../layout/LayoutElementProps'
import { NO_OP } from '../../data/types'
import useToggle from '../../hooks/useToggle'
import { layer } from '../../styled/mixins'

const ItemWrapper = styled.div(
  ({ theme }) => css`
    padding-top: ${theme.dimensions.gutter};
  `
)

const PositonWrapper = styled.div(
  ({ theme }) => css`
    padding: 0 ${theme.dimensions.gutter};
    width: 100%;
    max-width: ${theme.dimensions.bodyWidth};
    margin: auto;
  `
)

const PostWrapper = styled.div(
  ({ theme }) => css`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto;
    border-radius: ${theme.dimensions.borderRadius};
    overflow: hidden;
    ${layer({ theme })}
  `
)

export function getCorrectSource(loadOriginal: boolean, big_src: string, small_src: string) {
  return loadOriginal ? big_src : small_src
}

export default function Post(props: PostDataClass & LayoutElementProps) {
  const {
    media_type,
    small_src,
    big_src,
    thumbnail_src,
    rating,
    score,
    source,
    tags,
    style,
    onLoad = NO_OP,
    virtualRef,
    id,
    width,
    height,
  } = props

  const [collapsed, toggleCollapsed] = useToggle(true)

  const originals = useSelector(selectOriginals)

  const media_src = useMemo(() => getCorrectSource(originals, big_src, small_src), [big_src, originals, small_src])

  // re-measure when collapsed state changes
  useEffect(() => {
    onLoad()
  }, [onLoad, collapsed])

  return (
    <ItemWrapper style={style} ref={virtualRef} className='list-div'>
      <PositonWrapper>
        <PostWrapper onClick={toggleCollapsed} role='row'>
          <Player
            onLoad={onLoad}
            type={media_type}
            src={media_src}
            thumbnail_src={thumbnail_src}
            postId={id}
            width={width}
            height={height}
          />
          {!collapsed && <Details rating={rating} score={score} source={source} tags={tags} />}
        </PostWrapper>
      </PositonWrapper>
    </ItemWrapper>
  )
}
