import firebase from 'firebase/app'
import 'firebase/auth'
import { getSupertags } from '../firebase'
import * as r34 from 'r34-types'
import { getTagParameter } from '../data/tagUtils'

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
  readonly defaultPageSize = 20
  readonly apiLocal = 'http://localhost:8080'
  readonly apiUrl1 = 'https://r34-json.herokuapp.com'
  readonly apiUrl2 = 'https://r34-api-clone.herokuapp.com'

  private target: 'local' | 'live' = 'live'
  private version: 'v1' | 'v2' = 'v2'
  private activeApi!: string

  constructor() {
    this.setActiveApi()
  }

  /**
   * Switches between remote prod api and local dev api
   */
  setTarget(target: 'live' | 'local') {
    this.target = target
    this.setActiveApi()
  }

  /**
   * Sets the api version to use.
   */
  setVersion(version: 'v1' | 'v2') {
    this.version = version
    this.setActiveApi()
  }

  /**
   * Updates the base url with new configuration.
   * In case "live" api fails it will fallback to the backup.
   */
  setActiveApi() {
    if (this.target === 'local') {
      this.activeApi = `${this.apiLocal}/${this.version}`
    } else {
      this.activeApi = `${this.apiUrl1}/${this.version}`

      // Failover to apiUrl2
      fetch(this.activeApi).catch(() => (this.activeApi = `${this.apiUrl2}/${this.version}`))
    }
  }

  /**
   * Retrieves tags given a searchTerm
   */
  private async fetchTags(searchTerm: string, limit: number): Promise<r34.Tag[]> {
    return await (await fetch(`${this.activeApi}/tags?limit=${limit}&name=${searchTerm}&sort=count`)).json()
  }

  async getTags(searchTerm: string, limit: number = this.defaultPageSize, includeSupertags = false) {
    let tags: r34.AnyTag[] = await this.fetchTags(`*${searchTerm}*`, limit)

    // request more specific if we get blcoked by the api
    // if (tags.length === 0) tags = await this.fetchTags(`${searchTerm}*`, limit)
    // if (tags.length === 0) tags = await this.fetchTags(`${searchTerm}`, limit)

    if (includeSupertags) {
      try {
        const supertags = await getSupertags()
        if (supertags) {
          const matchingSupertags = Object.entries(supertags)
            .filter(([name, details]) => name.toLowerCase().includes(searchTerm.toLowerCase()))
            .map(([name, details]) => ({
              name,
              ...details,
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
    limit: number = this.defaultPageSize,
    pageNumber = 0,
    minScore = 0,
    sort: r34.PostsSort = 'date',
    hideSeen = false
  ) {
    const idToken = await firebase.auth().currentUser?.getIdToken()
    const url = this.buildPostUrl(pageNumber, tags, { minScore, limit, sort, hideSeen })
    const apiResponse = await fetch(url, {
      headers: {
        Authorization: 'Bearer ' + idToken,
      },
    })
    const data: r34.PostsResponse = await apiResponse.json()

    return data
  }

  /**
   * Returns all aliases for a given tag
   */
  async getAliases(tagName: string) {
    const aliases: r34.AliasTag[] = await (await fetch(`${this.activeApi}/alias/${encodeURIComponent(tagName)}`)).json()

    return aliases
  }

  /**
   * Returns all comments for a given post.
   */
  async getComments(post: r34.Post) {
    const comments: r34.Comment[] = await (await fetch(post.comments_url)).json()

    return comments
  }

  /**
   * Constructs an api url that will return posts that match your parameters
   */
  buildPostUrl(
    page: number,
    tags: Record<string, r34.QueryTag | r34.Supertag>,
    options: {
      minScore?: number
      limit?: number
      sort?: r34.PostsSort
      hideSeen?: boolean
    } = {}
  ) {
    const { minScore = 0, limit = api.defaultPageSize, sort = 'date', hideSeen = false } = options
    const params = {
      pid: page,
      limit,
      hideSeen,
      tags: getTagParameter(tags, minScore, sort),
    }

    return `${api.activeApi}/posts?${Object.entries(params)
      .map(([key, value]) => (value === '' || value === false ? null : `${key}=${value}`))
      .filter((i) => i !== null)
      .join('&')}`
  }
}

export const api = new API()
