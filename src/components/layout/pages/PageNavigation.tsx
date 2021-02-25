import React, { MouseEventHandler, useCallback } from 'react'
import { useSelector } from 'react-redux'
import styled, { css } from 'styled-components'
import { selectLastPage } from '../../../redux/selectors'
import { RedButton } from '../../common/Buttons'
import { SmallNumberInput } from '../../common/SmallInput'

const PageRow = styled.div(
  ({ theme }) => css`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    justify-content: center;
    place-items: center;
    gap: ${theme.dimensions.gutter};
    padding: ${theme.dimensions.gutter};
    padding-bottom: 0;
    max-width: ${theme.dimensions.bodyWidth};
    margin: auto;
  `
)

const PageNumber = styled(RedButton)``

const CurrentNumber = styled(SmallNumberInput)``

interface PageNavigationProps {
  currentPage: number
  loadPage: (pageNumber: number) => void
}

export default function PageNavigation(props: PageNavigationProps) {
  const { currentPage, loadPage } = props

  const lastPage = useSelector(selectLastPage)

  const loadSpecificPage = useCallback((newPage: number | string) => loadPage(Number(newPage)), [loadPage])
  const loadFirst: MouseEventHandler<HTMLButtonElement> = useCallback(() => loadPage(0), [loadPage])
  const loadLast: MouseEventHandler<HTMLButtonElement> = useCallback(() => loadPage(lastPage), [loadPage, lastPage])
  const loadPrevious: MouseEventHandler<HTMLButtonElement> = useCallback(() => loadPage(currentPage - 1), [
    currentPage,
    loadPage,
  ])
  const loadNext: MouseEventHandler<HTMLButtonElement> = useCallback(() => loadPage(currentPage + 1), [
    currentPage,
    loadPage,
  ])

  // Render Empty divs to keep everything lined up
  // Could achive the same with grid-column (might do that in the future)
  return (
    <PageRow className='page-navigation'>
      {currentPage > 1 ? <PageNumber onClick={loadFirst}>0</PageNumber> : <div></div>}
      {currentPage > 0 ? <PageNumber onClick={loadPrevious}>{currentPage - 1}</PageNumber> : <div></div>}
      <CurrentNumber value={currentPage} onSubmit={loadSpecificPage} />
      {currentPage < lastPage ? <PageNumber onClick={loadNext}>{currentPage + 1}</PageNumber> : <div></div>}
      {currentPage < lastPage - 1 ? <PageNumber onClick={loadLast}>{lastPage}</PageNumber> : <div></div>}
    </PageRow>
  )
}
