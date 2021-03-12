import React, { MouseEventHandler, useCallback, useEffect, useMemo } from 'react'
import styled, { css, DefaultTheme } from 'styled-components'
import TagList from '../../tag/TagList'
import { listToMap } from '../../../data/utils'
import Rating from './Rating'
import Score from './Score'
import Source from '../source/Source'
import { flexRowGap, flexRowWithGap, gutter, layer } from '../../../styled/mixins'
import { useSelector } from 'react-redux'
import { selectPostById, selectShowMetadata, selectShowComments } from '../../../redux/selectors'
import PostDataClass from '../../../data/PostDataClass'
import { ActiveTab, NO_OP } from '../../../data/types'
import Comments from './Comments'
import Metadata from './Metadata'

const Bar = styled.div(
  ({ theme }) => css`
    grid-row: 2/3;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: nowrap;
    overflow-x: auto;
    ${layer({ theme })}
    padding: ${theme.dimensions.gutter};
    ${flexRowGap(theme.dimensions.hugeSpacing)}
    border-radius: 0 0 ${theme.dimensions.borderRadius} ${theme.dimensions.borderRadius};
  `
)

const Menu = styled.div`
  ${flexRowWithGap}
  ${gutter}
  justify-content: space-around;
  margin-top: 8px;
  grid-row: 3/4;
`

const MenuEntry = styled.span`
  ${({ active, theme }: { active: boolean; theme: DefaultTheme }) =>
    active
      ? css`
          color: ${theme.colors.accentColor};
        `
      : ''}
`

const DetailsTagList = styled(TagList)(
  ({ theme }) => css`
    grid-row: 4/5;
    padding: ${theme.dimensions.gutter};
  `
)

interface DetailsProps {
  postId: number
  onLoad?: () => void
  activeTab: ActiveTab
  setActiveTab: React.Dispatch<React.SetStateAction<ActiveTab>>
}

export default function Details(props: DetailsProps) {
  const { postId, onLoad = NO_OP, activeTab, setActiveTab } = props
  const { rating, score, tags, source, created_at, status, height, width, comments } = useSelector(
    selectPostById(postId)
  ) as PostDataClass
  const tagsForRendering = useMemo(() => listToMap(tags, 'name'), [tags])
  const showMetadata = useSelector(selectShowMetadata)
  const showComments = useSelector(selectShowComments)

  const commentsLength = comments?.length || 0

  const setTags: MouseEventHandler = useCallback(
    (event) => {
      event.stopPropagation()
      setActiveTab('tags')
    },
    [setActiveTab]
  )

  const setComments: MouseEventHandler = useCallback(
    (event) => {
      event.stopPropagation()
      setActiveTab('comments')
    },
    [setActiveTab]
  )

  const setMetadata: MouseEventHandler = useCallback(
    (event) => {
      event.stopPropagation()
      setActiveTab('metadata')
    },
    [setActiveTab]
  )

  useEffect(() => {
    onLoad()
  }, [onLoad, activeTab])

  return (
    <>
      <Bar>
        <Rating value={rating} />
        <Score value={score} postId={postId} />
        {!!source && <Source value={source} />}
      </Bar>
      {((showComments && commentsLength > 0) || showMetadata) && (
        <Menu>
          <MenuEntry active={activeTab === 'tags'} onClick={setTags}>
            Tags
          </MenuEntry>
          {showComments && commentsLength > 0 && (
            <MenuEntry active={activeTab === 'comments'} onClick={setComments}>
              Comments
            </MenuEntry>
          )}
          {showMetadata && (
            <MenuEntry active={activeTab === 'metadata'} onClick={setMetadata}>
              Metadata
            </MenuEntry>
          )}
        </Menu>
      )}

      {
        {
          tags: <DetailsTagList tags={tagsForRendering} detailed={false} />,
          comments: <Comments comments={comments} />,
          metadata: <Metadata created_at={created_at} status={status} width={width} height={height} />,
        }[activeTab]
      }
    </>
  )
}
