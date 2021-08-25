import React, { ReactNode, useCallback } from 'react'
import styled, { css } from 'styled-components'
import { Post } from 'r34-types'
import { FlexColumn } from '../../designsystem/FlexColumn'
import PageNavigation from './PageNavigation'

const PageLayoutFlexColumn = styled(FlexColumn)(
  ({ theme }) => css`
    padding-bottom: ${theme.dimensions.bigSpacing};
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
    <PageLayoutFlexColumn>
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
    </PageLayoutFlexColumn>
  )
}
