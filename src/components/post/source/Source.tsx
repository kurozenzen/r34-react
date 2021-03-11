import React from 'react'
import { parseUrl } from '../../../data/utils'
import { DeviantArtIcon, DiscordIcon, PatreonIcon, TumblrIcon, TwitterIcon } from '../../../icons/FontAwesomeIcons'
import { PixivIcon } from '../../../icons/PixivIcon'
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

type SourceMapping = [string, (props: any) => JSX.Element, (value: string) => string]

const sources: Record<string, SourceMapping> = {
  'twitter.com/': ['#1da1f2', TwitterIcon, (value) => extractFirstElement(value.split('twitter.com/')[1])],
  'pixiv.net/': ['#0096FA', PixivIcon, () => 'Pixiv'],
  'patreon.com/': [
    '#FF424D',
    PatreonIcon,
    (value) => {
      const path = value.split('patreon.com/')[1]

      return path.startsWith('posts/') ? extractSecondElement(path) : extractFirstElement(path)
    },
  ],
  'deviantart.com/': ['#00e59b', DeviantArtIcon, (value) => extractFirstElement(value.split('deviantart.com/')[1])],
  'discordapp.com/': ['#7289DA', DiscordIcon, () => 'Discord'],
  'tumblr.com': ['#75869C', TumblrIcon, (value) => new URL(value).hostname.split('.')[0]],
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
