import React, { useEffect, useMemo, useState } from 'react'
import styled, { css } from 'styled-components'
import Details from './details/Details'
import Player from '../player/Player'
import { useDispatch, useSelector } from 'react-redux'
import { selectOriginals, selectShowComments } from '../../redux/selectors'
import LayoutElementProps from '../layout/LayoutElementProps'
import { ActiveTab, NO_OP } from '../../data/types'
import useToggle from '../../hooks/useToggle'
import { layer } from '../../styled/mixins'
import { getCorrectSource } from '../../data/utils'
import { fetchComments } from '../../redux/actions'
import * as r34 from 'r34-types'

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
    grid-template-rows: auto auto auto auto;
    border-radius: ${theme.dimensions.borderRadius};
    ${layer({ theme })}
  `
)

export default function Post(props: r34.Post & LayoutElementProps) {
  const {
    type,
    sample_url,
    file_url,
    preview_url,
    style,
    onLoad = NO_OP,
    virtualRef,
    id,
    width,
    height,
    comments,
    has_comments,
  } = props

  const dispatch = useDispatch()

  const [collapsed, toggleCollapsed] = useToggle(true)

  const originals = useSelector(selectOriginals)
  const showComments = useSelector(selectShowComments)

  const media_src = useMemo(() => {
    return getCorrectSource(originals, file_url, sample_url)
  }, [file_url, originals, sample_url])

  // re-measure when collapsed state changes
  useEffect(() => {
    onLoad()
  }, [onLoad, collapsed])

  // Loads comments if conditions are met
  useEffect(() => {
    if (!collapsed && showComments && has_comments && !comments) {
      dispatch(fetchComments(id))
    }
  }, [collapsed, showComments, has_comments, comments, dispatch, id])

  const [activeTab, setActiveTab] = useState<ActiveTab>('tags')

  return (
    <ItemWrapper style={style} ref={virtualRef} className='list-div'>
      <PositonWrapper>
        <PostWrapper onClick={toggleCollapsed} role='row'>
          <Player
            onLoad={onLoad}
            type={type}
            src={media_src}
            thumbnail_src={preview_url}
            postId={id}
            width={width}
            height={height}
          />
          {!collapsed && <Details postId={id} onLoad={onLoad} activeTab={activeTab} setActiveTab={setActiveTab} />}
        </PostWrapper>
      </PositonWrapper>
    </ItemWrapper>
  )
}
