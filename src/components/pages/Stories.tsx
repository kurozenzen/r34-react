import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled, { css } from 'styled-components'
import { setFullscreenPost } from '../../redux/actions'
import { selectFullsceenIndex } from '../../redux/selectors'
import Story from '../layout/stories/Story'

const StoriesWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  overflow: scroll;
  scroll-snap-type: y mandatory;
  scroll-snap-stop: always;

  ::-webkit-scrollbar {
    height: 0px;
    width: 0px;
  }
`

type FillerProps = {
  index: number
}

const Filler = styled.div(
  ({ index }: FillerProps) => css`
    height: ${Math.max(index - 1, 0)}00vh;
  `
)

export default function Stories() {
  const dispatch = useDispatch()

  const setIndex = React.useCallback((index: number) => dispatch(setFullscreenPost(index)), [dispatch])

  const currentIdx = useSelector(selectFullsceenIndex)
  const nextIdx = currentIdx + 1
  const prevIdx = currentIdx - 1

  const indexes = [prevIdx, currentIdx, nextIdx]

  const scrollToNext = React.useCallback(() => {
    document.getElementById(`story-${nextIdx}`)?.scrollIntoView({ behavior: 'smooth' })
  }, [nextIdx])

  return (
    <StoriesWrapper>
      <Filler index={currentIdx} />
      {indexes.map((index) => {
        if (index < 0) return null
        if (index < currentIdx) return <Story key={index} index={index} onInView={setIndex} />
        if (index > currentIdx) return <Story key={index} index={index} onInView={setIndex} />
        return <Story key={index} index={index} onFinished={scrollToNext} />
      })}
    </StoriesWrapper>
  )
}
