import PostDataClass from '../data/Post'
import TagDataClass from '../data/Tag'
import { Modifier, TagLike } from '../data/types'
import { preparePost } from './prepare'

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

    return tags
  }

  async getPosts(
    tags: Record<string, TagDataClass>,
    limit: number = API.defaultPageSize,
    pageNumber = 0,
    minScore = 0
  ) {
    const res = await (await fetch(this.buildPostUrl(pageNumber, tags, minScore, limit))).json()

    return {
      posts: res.posts.map(preparePost) as PostDataClass[],
      count: Number(res.count),
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
    limit: number = API.defaultPageSize
  ) {
    const tagList = Object.values(tags)

    const normalTags = tagList.filter((tag) => tag.modifier !== Modifier.OR)
    const orTags = tagList.filter((tag) => tag.modifier === Modifier.OR)

    let url = `${this.activeApi}/posts?pid=${page}&limit=${limit}`

    let tagString = normalTags
      .map((tag) => `${tag.modifier === '-' ? '-' : ''}${encodeURIComponent(tag.name)}`)
      .join(' + ')

    if (orTags.length > 0) {
      tagString += '+ ( ' + orTags.map((tag) => encodeURIComponent(tag.name)).join(' ~ ') + ' )'
    }

    if (tagString) {
      url += `&tags=${tagString}`
    }

    if (minScore > 0) {
      url += `+${encodeURIComponent('score:>=' + minScore)}`
    }

    return url
  }
}

export default new API()
