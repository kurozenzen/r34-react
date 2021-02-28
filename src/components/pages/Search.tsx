import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import InifinteColumn from '../layout/infinite/InfiniteColumn'
import Post from '../post/Post'
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
import { ResultLayout } from '../../data/types'
import PageLayout from '../layout/pages/PageLayout'

import Reader from '../reader/Reader'

export default function Search() {
  const [isLoading, setLoading] = useState(false)

  const posts = useSelector(selectPosts)
  const hasMorePosts = useSelector(selectHasMoreResults)
  const resultsLayout = useSelector(selectResultsLayout)
  const pageSize = useSelector(selectPageSize)
  const pageNumber = useSelector(selectPageNumber)

  const dispatch = useDispatch()
  const loadMore = useAction(getMoreResults)
  const loadPage = useCallback((index: number) => dispatch(getResults(index)), [dispatch])

  return (
    <>
      <Reader />
      {resultsLayout === ResultLayout.INFINITE_COLUMN ? (
        <InifinteColumn
          Header={LayoutHeader}
          OutOfItems={LayoutOutOfItems}
          items={posts}
          LoadingItem={LayoutLoadingItem}
          hasMoreRows={hasMorePosts}
          ItemComponent={Post}
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
          ItemComponent={Post}
          isLoading={isLoading}
          setLoading={setLoading}
          items={posts}
        />
      )}
    </>
  )
}
