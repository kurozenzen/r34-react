import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { formatCount } from "../../misc/formatting"
import useToggle from "../../hooks/useToggle"
import { selectCount } from "../../redux/selectors"
import { Title } from "../common/Text"
import Config from "../features/Config"
import Header from "../features/Header"
import LayoutElementProps from "./LayoutElementProps"
import KofiButton from "../features/KofiButton"
import styled, { css } from "styled-components"
import { NO_OP } from "../../data/types"
import RandomTip from "../common/RandomTip"

const Placeholder = styled.div(
  ({ theme }) => css`
    display: grid;
    gap: ${theme.dimensions.gutter};
    place-items: center;
  `
)

export default function LayoutHeader({ onLoad = NO_OP, virtualRef, style }: LayoutElementProps) {
  const [fullNumber, toggleFullNumber] = useToggle()
  const count = useSelector(selectCount)

  useEffect(() => {
    if (count > 0) onLoad()
  }, [count, onLoad])

  return (
    <div onLoad={onLoad} ref={virtualRef} style={style} role="row">
      <Header />
      <Config onLoad={onLoad} />
      {count > 0 ? (
        <Title onClick={toggleFullNumber}>
          {(fullNumber ? count.toLocaleString() : formatCount(count)) + " results"}
        </Title>
      ) : (
        <Placeholder>
          <KofiButton id="V7V73PWW9" label="Support Me on Ko-fi" />
          <RandomTip />
        </Placeholder>
      )}
    </div>
  )
}
