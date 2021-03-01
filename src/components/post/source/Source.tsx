import React from 'react'
import { parseUrl } from '../../../data/utils'
import FallbackSource from './FallbackSource'
import DefaultLinkSource from './LinkSource'
import SourceProps from './SourceProps'
import SpecialLinkSource from './SpecialLinkSource'

/**
 * Cut away all the unnecessary parts of the link
 */
function extractFirstElement(value: string) {
  return value.split(' ')[0].split('?')[0].split('/')[0]
}

function extractSecondElement(value: string) {
  return value.split(' ')[0].split('?')[0].split('/')[1]
}

type SourceMapping = [string, string, (value: string) => string]

const sources: Record<string, SourceMapping> = {
  'twitter.com/': ['#1da1f2', 'fa-twitter', (value) => extractFirstElement(value.split('twitter.com/')[1])],
  'pixiv.net/': ['#0096FA', 'pixiv', () => 'Pixiv'],
  'patreon.com/': [
    '#FF424D',
    'fa-patreon',
    (value) => {
      const path = value.split('patreon.com/')[1]

      return path.startsWith('posts/') ? extractSecondElement(path) : extractFirstElement(path)
    },
  ],
  'deviantart.com/': ['#00e59b', 'fa-deviantart', (value) => extractFirstElement(value.split('deviantart.com/')[1])],
  'discordapp.com/': ['#7289DA', 'fa-discord', () => 'Discord'],
}

export default function Source({ value }: SourceProps) {
  if (parseUrl(value)) {
    // Sources can contain multiple links
    const links = value.split(' ')
    return (
      <>
        {links.map((link) => {
          const source = Object.keys(sources).find((key) => link.includes(key))

          if (source) {
            const [color, icon, getTitle] = sources[source]

            return <SpecialLinkSource key={link} value={link} color={color} icon={icon} title={getTitle(link)} />
          }

          return <DefaultLinkSource key={link} value={link} />
        })}
      </>
    )
  }

  return <FallbackSource value={value} />
}
