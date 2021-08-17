import React, { MouseEventHandler, useCallback, useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import styled, { css, DefaultTheme } from 'styled-components'
import * as r34 from 'r34-types'
import { ActiveTab, NO_OP } from '../../../data/types'
import { listToMap } from '../../../data/utils'
import useToggleTag from '../../../hooks/useToggleTag'
import { selectPostById, selectShowComments, selectShowMetadata } from '../../../redux/selectors'
import { flexRowGap, flexRowWithGap, gutter, layer } from '../../../styled/mixins'
import TagList from '../../tag/TagList'
import Source from '../source/Source'
import Comments from './Comments'
import Metadata from './Metadata'
import Rating from './Rating'
import Score from './Score'
import { useCheckIsActive } from '../../../hooks/useCheckIsActive'

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
  cursor: pointer;

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
  hasComments: boolean
}

export default function Details(props: DetailsProps) {
  const { postId, onLoad = NO_OP, activeTab, setActiveTab, hasComments } = props
  const { rating, score, tags, source, created_at, status, height, width, comments } = useSelector(
    selectPostById(postId)
  ) as r34.Post
  const tagsForRendering = useMemo(
    () =>
      listToMap(
        tags.map((tag) => ({ name: tag, types: [] })),
        'name'
      ),
    [tags]
  )
  const showMetadata = useSelector(selectShowMetadata)
  const showComments = useSelector(selectShowComments)

  const checkIsActive = useCheckIsActive()

  const commentsLength = comments?.length || 0

  const toggleTag = useToggleTag()
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
          <MenuEntry active={activeTab === 'tags'} onClick={setTags} title='Show tags'>
            Tags
          </MenuEntry>
          {showComments && hasComments && (
            <MenuEntry active={activeTab === 'comments'} onClick={setComments} title='Show comments'>
              Comments
            </MenuEntry>
          )}
          {showMetadata && (
            <MenuEntry active={activeTab === 'metadata'} onClick={setMetadata} title='Show metadata'>
              Metadata
            </MenuEntry>
          )}
        </Menu>
      )}

      {
        {
          tags: (
            <DetailsTagList
              tags={tagsForRendering}
              detailed={false}
              onTagClick={toggleTag}
              getIsActive={checkIsActive}
            />
          ),
          comments: <Comments comments={comments as r34.Comment[]} />,
          metadata: <Metadata created_at={created_at} status={status} width={width} height={height} id={postId} />,
        }[activeTab]
      }
    </>
  )
}
