import React, { useCallback } from 'react'
import styled, { css } from 'styled-components'
import PostDataClass from '../../../data/PostDataClass'
import BaseFlexColumn from '../../common/FlexColumn'
import PageNavigation from './PageNavigation'

const FlexColumn = styled(BaseFlexColumn)(
  ({ theme }) => css`
    padding-bottom: ${theme.dimensions.gutter};
  `
)

interface PageLayoutProps<T> {
  header?: JSX.Element
  outOfItems?: JSX.Element
  items?: T[]
  pageSize: number
  currentPage: number
  hasMorePages: boolean
  loadPage: (pageNumber: number) => void
  ItemComponent: (props: T) => JSX.Element
  isLoading: boolean
  setLoading: (value: boolean) => void
}

export default function PageLayout(props: PageLayoutProps<PostDataClass>) {
  const { header, items, ItemComponent, currentPage, loadPage } = props

  const scrollAndLoadPage = useCallback(
    (value: number) => {
      loadPage(value)
      document.getElementsByClassName('page-navigation')[0].scrollIntoView()
    },
    [loadPage]
  )

  return (
    <FlexColumn>
      {header}
      {items && items.length > 0 && (
        <>
          <PageNavigation currentPage={currentPage} loadPage={loadPage} />
          {items?.map((item) => (
            <ItemComponent key={item.id} {...item} />
          ))}
          <PageNavigation currentPage={currentPage} loadPage={scrollAndLoadPage} />
        </>
      )}
    </FlexColumn>
  )
}
