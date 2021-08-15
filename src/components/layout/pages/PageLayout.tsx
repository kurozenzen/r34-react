import React, { ReactNode, useCallback } from 'react'
import styled, { css } from 'styled-components'
import { Post } from 'r34-types'
import BaseFlexColumn from '../../designsystem/FlexColumn'
import PageNavigation from './PageNavigation'

const FlexColumn = styled(BaseFlexColumn)(
  ({ theme }) => css`
    padding-bottom: ${theme.dimensions.gutter};
  `
)

interface PageLayoutProps<T> {
  header?: ReactNode
  outOfItems?: ReactNode
  items?: T[]
  pageSize: number
  currentPage: number
  hasMorePages: boolean
  loadPage: (pageNumber: number) => void
  ItemComponent: (props: T & { index: number }) => JSX.Element
  isLoading: boolean
}

export default function PageLayout(props: PageLayoutProps<Post>) {
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
          {items?.map((item, index) => (
            <ItemComponent key={item.id} index={index} {...item} />
          ))}
          <PageNavigation currentPage={currentPage} loadPage={scrollAndLoadPage} />
        </>
      )}
    </FlexColumn>
  )
}
