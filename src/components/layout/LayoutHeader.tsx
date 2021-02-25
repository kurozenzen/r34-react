import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { formatCount } from '../../misc/formatting'
import useToggle from '../../hooks/useToggle'
import { selectCount } from '../../redux/selectors'
import { Title } from '../common/Text'
import Config from '../features/Config'
import Header from '../features/Header'
import LayoutElementProps from './LayoutElementProps'
import KofiButton from '../features/KofiButton'
import styled, { css } from 'styled-components'
import { NO_OP } from '../../data/types'
import RandomTip from '../common/RandomTip'
import Surface from '../common/Surface'
import { HorizontalLine } from '../common/Lines'

const Placeholder = styled.div(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.dimensions.hugeSpacing};
    align-items: center;
    max-width: ${theme.dimensions.bodyWidth};
    margin: auto;

    height: calc(100vh - 400px);
    padding: 0 10%;
  `
)

export default function LayoutHeader({ onLoad = NO_OP, virtualRef, style }: LayoutElementProps) {
  const [fullNumber, toggleFullNumber] = useToggle()
  const count = useSelector(selectCount)

  // Trigger load event when count is > 0
  // This is used to re-measure the element
  useEffect(() => {
    count > 0 && onLoad()
  }, [count, onLoad])

  return (
    <div onLoad={onLoad} ref={virtualRef} style={style} role='row'>
      <Header />
      <Config onLoad={onLoad} />
      {count > 0 ? (
        <Title onClick={toggleFullNumber}>
          {(fullNumber ? count.toLocaleString() : formatCount(count)) + ' results'}
        </Title>
      ) : (
        <Placeholder>
          <RandomTip />

          <KofiButton id='V7V73PWW9' label='Support Me on Ko-fi' />
        </Placeholder>
      )}
    </div>
  )
}
