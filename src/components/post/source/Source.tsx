import React from 'react'
import { parseUrl } from '../../../data/utils'
import FallbackSource from './FallbackSource'
import DefaultLinkSource from './LinkSource'
import SourceProps from './SourceProps'
import { sources } from './sourceUtils'
import SpecialLinkSource from './SpecialLinkSource'

export default function Source({ value }: SourceProps) {
  if (parseUrl(value)) {
    // Sources can contain multiple links
    const links = value.split(' ')
    return (
      <>
        {links.map((link) => {
          const source = Object.keys(sources).find((key) => link.includes(key))

          if (source) {
            const [color, Icon, getTitle] = sources[source]

            return <SpecialLinkSource key={link} value={link} color={color} Icon={Icon} title={getTitle(link)} />
          }

          return <DefaultLinkSource key={link} value={link} />
        })}
      </>
    )
  }

  return <FallbackSource value={value} />
}
