import * as r34 from 'r34-types'
import React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled, { css } from 'styled-components'
import { ActiveTab, NO_OP } from '../../data/types'
import useToggle from '../../hooks/useToggle'
import { fetchComments } from '../../redux/actions'
import { selectShowComments, selectShowPostDetails } from '../../redux/selectors'
import { layer } from '../../styled/mixins/theming'
import { ZIndex } from '../../styled/zIndex'
import LayoutElementProps from '../layout/LayoutElementProps'
import { Media } from '../player/Media'
import Details from './details/Details'

const ItemWrapper = styled.div(
  ({ theme }) => css`
    padding-top: ${theme.dimensions.bigSpacing};
  `
)

const PositonWrapper = styled.div(
  ({ theme }) => css`
    padding: 0 ${theme.dimensions.bigSpacing};
    width: 100%;
    max-width: ${theme.dimensions.bodyWidth};
    margin: auto;
  `
)

const PostWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto auto auto;
  ${layer}

  // Set area of media and overlay
    img, video {
    grid-area: 1/1/2/2;
    z-index: ${ZIndex.POST};
  }

  .overlay {
    grid-area: 1/1/2/2;
    z-index: ${ZIndex.OVERLAY};
  }
`

export function ListPost(props: r34.Post & LayoutElementProps & { index: number }) {
  const {
    style,
    virtualRef,
    type,
    sample_url,
    file_url,
    preview_url,
    onLoad = NO_OP,
    id,
    width,
    height,
    comments,
    has_comments,
    index,
  } = props

  return (
    <ItemWrapper style={style} ref={virtualRef} className='list-div'>
      <PositonWrapper>
        <Post
          type={type}
          sample_url={sample_url}
          file_url={file_url}
          preview_url={preview_url}
          onLoad={onLoad}
          id={id}
          width={width}
          height={height}
          comments={comments}
          has_comments={has_comments}
          index={index}
        />
      </PositonWrapper>
    </ItemWrapper>
  )
}

type PostProps = Pick<
  r34.Post,
  'type' | 'sample_url' | 'file_url' | 'preview_url' | 'id' | 'width' | 'height' | 'comments' | 'has_comments'
> & { onLoad?: () => void; index: number }

export const Post = React.memo((props: PostProps) => {
  const {
    type,
    sample_url,
    file_url,
    preview_url,
    onLoad = NO_OP,
    id,
    width,
    height,
    comments,
    has_comments,
    index,
  } = props

  const dispatch = useDispatch()

  const [activeTab, setActiveTab] = useState<ActiveTab>('tags')
  const [collapsed, toggleCollapsed] = useToggle(true)

  const showPostDetails = useSelector(selectShowPostDetails)
  const showComments = useSelector(selectShowComments)

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

  return (
    <PostWrapper onClick={toggleCollapsed} role='row' data-name='post-wrapper' tabIndex={0}>
      <Media
        detailsVisible={!collapsed}
        type={type}
        thumbnailSrc={preview_url}
        sampleSrc={sample_url}
        fullSrc={file_url}
        onLoad={onLoad}
        index={index}
        width={width}
        height={height}
        isActive={true}
      />
      {showPostDetails && !collapsed && (
        <Details
          postId={id}
          onLoad={onLoad}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          hasComments={has_comments}
        />
      )}
    </PostWrapper>
  )
})
