import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import InifinteColumn from '../layout/infinite/InfiniteColumn'
import { ListPost } from '../post/Post'
import { getMoreResults, getResults } from '../../redux/actions'
import {
  selectHasMoreResults,
  selectPageNumber,
  selectPageSize,
  selectPosts,
  selectResultsLayout,
} from '../../redux/selectors'
import LayoutHeader from '../layout/LayoutHeader'
import LayoutOutOfItems from '../layout/LayoutOutOfItems'
import LayoutLoadingItem from '../layout/LayoutLoadingItem'
import useAction from '../../hooks/useAction'
import PageLayout from '../layout/pages/PageLayout'
import { useScrollUpBackNavigation } from '../../hooks/useScrollUpBackNavigation'
import { usePageTitle } from '../../hooks/usePageTitle'

export default function Search() {
  const [isLoading, setLoading] = useState(false)

  const dispatch = useDispatch()

  const posts = useSelector(selectPosts)
  const hasMorePosts = useSelector(selectHasMoreResults)
  const resultsLayout = useSelector(selectResultsLayout)
  const pageSize = useSelector(selectPageSize)
  const pageNumber = useSelector(selectPageNumber)

  const loadMore = useAction(getMoreResults)
  const loadPage = useCallback((index: number) => dispatch(getResults(index)), [dispatch])

  useScrollUpBackNavigation('results')

  usePageTitle('R34 React')

  return (
    <>
      {resultsLayout === 'infinite_column' ? (
        <InifinteColumn
          Header={LayoutHeader}
          OutOfItems={LayoutOutOfItems}
          items={posts}
          LoadingItem={LayoutLoadingItem}
          hasMoreRows={hasMorePosts}
          ItemComponent={ListPost}
          loadMore={loadMore}
          isLoading={isLoading}
          setLoading={setLoading}
        />
      ) : (
        <PageLayout
          header={<LayoutHeader />}
          pageSize={pageSize}
          currentPage={pageNumber}
          hasMorePages={hasMorePosts}
          loadPage={loadPage}
          ItemComponent={ListPost}
          isLoading={isLoading}
          setLoading={setLoading}
          items={posts}
        />
      )}
    </>
  )
}
