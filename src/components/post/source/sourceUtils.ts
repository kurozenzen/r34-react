import { DeviantArtIcon, DiscordIcon, PatreonIcon, TumblrIcon, TwitterIcon } from '../../../icons/FontAwesomeIcons'
import { PixivIcon } from '../../../icons/PixivIcon'

/**
 * Cut away all the unnecessary parts of the link
 */
export function extractFirstElement(value: string) {
  return value.split(' ')[0].split('?')[0].split('/')[0]
}

export function extractSecondElement(value: string) {
  return value.split(' ')[0].split('?')[0].split('/')[1]
}

export type SourceMapping = [string, (props: any) => JSX.Element | null, (value: string) => string]

export const sources: Record<string, SourceMapping> = {
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
