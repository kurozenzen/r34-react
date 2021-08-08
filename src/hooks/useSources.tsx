import React from 'react'
import { useSelector } from 'react-redux'
import { selectOriginals } from '../redux/selectors'
import * as r34 from 'r34-types'

export function useSources(type: r34.PostType, thumbnailSrc: string, sampleSrc: string, fullSrc: string) {
  const loadOriginals = useSelector(selectOriginals)

  return React.useMemo(() => {
    switch (type) {
      case 'image':
        return loadOriginals ? ['', fullSrc] : ['', sampleSrc]
      case 'gif':
        return sampleSrc.includes('.gif') ? [thumbnailSrc, sampleSrc] : [sampleSrc, fullSrc]
      case 'video':
        return loadOriginals ? [thumbnailSrc, fullSrc] : [thumbnailSrc, sampleSrc]
    }
  }, [fullSrc, loadOriginals, sampleSrc, thumbnailSrc, type])
}
