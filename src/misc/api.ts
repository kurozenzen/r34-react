import PostDataClass from '../data/PostDataClass'
import TagDataClass from '../data/TagDataClass'
import { Modifier, SortType, TagLike, TagType } from '../data/types'
import { DirtyPost, preparePost } from './prepare'

const sourceTags: TagLike[] = [
  { name: 'source:*patreon*', posts: 12711, types: [TagType.SOURCE] },
  { name: 'source:*twitter*', posts: 99927, types: [TagType.SOURCE] },
  { name: 'source:*pixiv*', posts: 185080, types: [TagType.SOURCE] },
]

const ratingTags: TagLike[] = [
  { name: 'rating:safe', posts: 14293, types: [TagType.RATING] },
  { name: 'rating:questionable', posts: 219552, types: [TagType.RATING] },
  { name: 'rating:explicit', posts: 3821144, types: [TagType.RATING] },
]

class API {
  static defaultPageSize = 20
  static apiUrl1 = 'https://r34-json.herokuapp.com'
  static apiUrl2 = 'https://r34-api-clone.herokuapp.com'

  activeApi = API.apiUrl2

  constructor() {
    this.activeApi = API.apiUrl1

    // Failover to apiUrl2
    fetch(this.activeApi).catch(() => (this.activeApi = API.apiUrl2))
  }

  async getTags(searchTerm: string, limit: number = API.defaultPageSize) {
    const tags: TagLike[] = await (
      await fetch(`${this.activeApi}/tags?limit=${limit}&name=${searchTerm}*&order_by=posts`)
    ).json()

    // HACKY: Inject suggestions for ratings and some sources
    if (searchTerm.startsWith('rating:')) {
      const matchingRating = ratingTags.filter((tag) => tag.name.includes(searchTerm.replace('rating:', '')))
      return [...tags, ...matchingRating]
    }

    if (searchTerm.startsWith('source:')) {
      const matchingSourceTags = sourceTags.filter((tag) => tag.name.includes(searchTerm.replace('source:', '')))
      return [...tags, ...matchingSourceTags]
    }

    return tags
  }

  async getPosts(
    tags: Record<string, TagDataClass>,
    limit: number = API.defaultPageSize,
    pageNumber = 0,
    minScore = 0,
    sort: SortType = SortType.DATE,
    hideSeen = false
  ) {
    const res = await (await fetch(this.buildPostUrl(pageNumber, tags, minScore, limit, sort))).json()
    const count = Number(res.count)
    const posts = res.posts.map((rawPost: DirtyPost) => {
      return preparePost(rawPost)
    }) as PostDataClass[]

    return {
      posts,
      count,
    }
  }

  async getAliases(tagName: string) {
    const aliases: TagLike[] = await (await fetch(`${this.activeApi}/alias/${encodeURIComponent(tagName)}`)).json()

    return aliases
  }

  buildPostUrl(
    page: number,
    tags: Record<string, TagDataClass>,
    minScore: number,
    limit: number = API.defaultPageSize,
    sort: SortType
  ) {
    const tagList = Object.values(tags)
    const normalTags = tagList.filter((tag) => tag.modifier !== Modifier.OR)
    const orTags = tagList.filter((tag) => tag.modifier === Modifier.OR)

    let url = `${this.activeApi}/posts?pid=${page}&limit=${limit}`

    const tagParts = [...normalTags.map((tag) => `${tag.modifier === '-' ? '-' : ''}${encodeURIComponent(tag.name)}`)]

    if (orTags.length > 0) {
      tagParts.push('( ' + orTags.map((tag) => encodeURIComponent(tag.name)).join(' ~ ') + ' )')
    }

    if (minScore > 0) {
      tagParts.push(encodeURIComponent('score:>=' + minScore))
    }

    if (sort !== SortType.DATE) {
      tagParts.push(encodeURIComponent('sort:' + sort + ':desc'))
    }

    if (tagParts.length > 0) {
      url += `&tags=${tagParts.join(' + ')}`
    }

    return url
  }
}

export default new API()
