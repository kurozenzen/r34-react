import firebase from 'firebase/app'
import 'firebase/auth'
import { getSupertags } from '../firebase'
import * as r34 from 'r34-types'
import { isSupertag } from '../data/utils'

const sourceTags: r34.Tag[] = [
  { name: 'source:*patreon*', count: 12711, types: ['source'] },
  { name: 'source:*twitter*', count: 99927, types: ['source'] },
  { name: 'source:*pixiv*', count: 185080, types: ['source'] },
]

const ratingTags: r34.Tag[] = [
  { name: 'rating:safe', count: 14293, types: ['rating'] },
  { name: 'rating:questionable', count: 219552, types: ['rating'] },
  { name: 'rating:explicit', count: 3821144, types: ['rating'] },
]

class API {
  static defaultPageSize = 20
  static apiLocal = 'http://localhost:8080'
  static apiUrl1 = 'https://r34-json.herokuapp.com'
  static apiUrl2 = 'https://r34-api-clone.herokuapp.com'

  private target: 'local' | 'live' = 'live'
  private version: 'v1' | 'v2' = 'v2'
  private activeApi!: string

  constructor() {
    this.setActiveApi()
  }

  setTarget(target: 'live' | 'local') {
    this.target = target
    this.setActiveApi()
  }

  setVersion(version: 'v1' | 'v2') {
    this.version = version
    this.setActiveApi()
  }

  setActiveApi() {
    if (this.target === 'local') {
      this.activeApi = `${API.apiLocal}/${this.version}`
    } else {
      this.activeApi = `${API.apiUrl1}/${this.version}`

      // Failover to apiUrl2
      fetch(this.activeApi).catch(() => (this.activeApi = `${API.apiUrl2}/${this.version}`))
    }
  }

  async getTags(searchTerm: string, limit: number = API.defaultPageSize, includeSupertags = false) {
    let tags: r34.Tag[] = await (
      await fetch(`${this.activeApi}/tags?limit=${limit}&name=${searchTerm}*&order_by=posts`)
    ).json()

    if (includeSupertags) {
      try {
        const supertags = await getSupertags()
        if (supertags) {
          const matchingSupertags = Object.entries(supertags)
            .filter(([name, details]) => name.toLowerCase().includes(searchTerm.toLowerCase()))
            .map(([name, details]) => ({
              name,
              count: Object.keys(details.tags).length,
              types: ['supertag' as r34.TagType],
            }))
          tags = [...matchingSupertags, ...tags]
        }
      } catch {
        // do nothing as supertags are optional
      }
    }

    // HACKY: Inject suggestions for ratings and some sources
    const matchingRating = ratingTags.filter((tag) => tag.name.includes(searchTerm.replace('rating:', '')))
    tags = [...matchingRating, ...tags]

    const matchingSourceTags = sourceTags.filter((tag) => tag.name.includes(searchTerm.replace('source:', '')))
    tags = [...matchingSourceTags, ...tags]

    return tags
  }

  /**
   * This function can be used to retrieve a number of posts from the backend.
   */
  async getPosts(
    tags: Record<string, r34.AnyBiasedTag>,
    limit: number = API.defaultPageSize,
    pageNumber = 0,
    minScore = 0,
    sort: r34.PostsSort = 'date',
    hideSeen = false
  ) {
    const idToken = await firebase.auth().currentUser?.getIdToken()
    const url = this.buildPostUrl(pageNumber, tags, minScore, limit, sort, hideSeen)
    const apiResponse = await fetch(url, {
      headers: {
        Authorization: 'Bearer ' + idToken,
      },
    })
    const data: r34.PostsResponse = await apiResponse.json()

    return data
  }

  async getAliases(tagName: string) {
    const aliases: r34.AliasTag[] = await (await fetch(`${this.activeApi}/alias/${encodeURIComponent(tagName)}`)).json()

    return aliases
  }

  async getComments(post: r34.Post) {
    const comments: r34.Comment[] = await (await fetch(post.comments_url)).json()

    return comments
  }

  buildPostUrl(
    page: number,
    tags: Record<string, r34.AnyBiasedTag>,
    minScore: number,
    limit: number = API.defaultPageSize,
    sort: r34.PostsSort,
    hideSeen: boolean
  ) {
    // resolve supertags
    const tagList = Object.values(tags)
    const resolvedSupertags = tagList
      .filter(isSupertag)
      .flatMap((tag) => Object.entries(tag.tags).map(([name, modifier]) => ({ name, modifier, types: [] })))
    const singleTags = tagList.filter((tag): tag is r34.BiasedTag => !isSupertag(tag))

    const allTags = [...resolvedSupertags, ...singleTags]

    const normalTags = allTags.filter((tag) => tag.modifier !== '~')
    const orTags = allTags.filter((tag) => tag.modifier === '~')

    let url = `${this.activeApi}/posts?pid=${page}&limit=${limit}`

    if (hideSeen) {
      url += '&hideSeen=true'
    }

    const tagParts = [...normalTags.map((tag) => `${tag.modifier === '-' ? '-' : ''}${encodeURIComponent(tag.name)}`)]

    if (orTags.length > 0) {
      tagParts.push('( ' + orTags.map((tag) => encodeURIComponent(tag.name)).join(' ~ ') + ' )')
    }

    if (minScore > 0) {
      tagParts.push(encodeURIComponent('score:>=' + minScore))
    }

    if (sort !== 'date') {
      tagParts.push(encodeURIComponent('sort:' + sort + ':desc'))
    }

    if (tagParts.length > 0) {
      url += `&tags=${tagParts.join(' + ')}`
    }

    return url
  }
}

export default new API()
