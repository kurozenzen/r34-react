import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { openFullscreen } from '../../data/browserUtils'
import { setFullscreenPost } from '../../redux/actions'
import { selectCount, selectFullsceenIndex } from '../../redux/selectors'
import { OutOfItems } from '../layout/LayoutOutOfItems'
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

const Screen = styled.div`
  min-height: 100vh;
  min-width: 100vw;
  max-height: 100vh;
  max-width: 100vw;

  scroll-snap-align: start;
  scroll-snap-stop: always;

  display: grid;
  place-content: center;

  @media (pointer: fine) {
    ::-webkit-scrollbar {
      height: 0px;
      width: 0px;
    }
  }
`

export default function Stories() {
  const dispatch = useDispatch()
  const history = useHistory()

  const [ref, setRef] = React.useState<HTMLElement | null>(null)

  const currentIdx = useSelector(selectFullsceenIndex)
  const postCount = useSelector(selectCount)
  const nextIdx = currentIdx + 1
  const prevIdx = currentIdx - 1

  const indexes = [prevIdx, currentIdx, nextIdx]

  const setIndex = React.useCallback((index: number) => dispatch(setFullscreenPost(index)), [dispatch])

  const scrollToPrevious = React.useCallback(() => {
    document.getElementById(`story-${prevIdx}`)?.scrollIntoView({ behavior: 'smooth' })
  }, [prevIdx])

  const scrollToNext = React.useCallback(() => {
    document.getElementById(`story-${nextIdx}`)?.scrollIntoView({ behavior: 'smooth' })
  }, [nextIdx])

  React.useEffect(() => {
    const handler = () => {
      if (!document.fullscreenElement) {
        history.goBack()
      }
    }

    document.addEventListener('fullscreenchange', handler, { passive: true })

    return () => {
      document.removeEventListener('fullscreenchange', handler)
    }
  }, [history])

  React.useEffect(() => {
    if (ref) {
      openFullscreen(ref)
    }
  }, [ref])

  return (
    <StoriesWrapper ref={setRef}>
      <Filler index={currentIdx} />
      {indexes.map((index) => {
        if (index < 0) return null
        if (index >= postCount)
          return (
            <Screen key={index}>
              <OutOfItems />
            </Screen>
          )
        if (index < currentIdx) return <Story key={index} index={index} onInView={setIndex} />
        if (index > currentIdx) return <Story key={index} index={index} onInView={setIndex} />
        return <Story key={index} index={index} onFinished={scrollToNext} onBack={scrollToPrevious} active />
      })}
    </StoriesWrapper>
  )
}
