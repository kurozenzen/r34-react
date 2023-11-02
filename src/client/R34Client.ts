import { AliasTag, AnyTag, api, ApiVersion, Artist, Comment } from 'r34-types'
import { getSupertags, init } from './firebase'
import { createSearchParams, ParamsRecord } from './utils'
import { isSuggestionError, serializeAllTags } from './tagUtils'

/**
 * Configure your client.
 */
export interface R34ClientOptions {
  /**
   * API version to use.
   */
  version: ApiVersion
  /**
   * When set to true, the API provides additional, user-specific information like supertags.
   */
  useFirebase: boolean
  /**
   * Configure how many posts are returned by default
   */
  postLimit: number
  /**
   * Configure how many tags are returned by default
   */
  tagLimit: number
  /**
   * How many times to retry failed requests
   */
  requestRetries: number
  /**
   * Enables console logging
   */
  verbose: boolean
}

/**
 * Can be a single backend or multiple. If there are multiple it will automatically switch when one goes down.
 * Valid backends include protocol and port and do not have a trailing slash.
 * @example "http://localhost:8080"
 * @example "https://my-api-server.herokuapp.com"
 */
export type BackendsUrls = string | string[]

export class R34Client {
  //#region Properties
  private currentBackend: number

  backends: string[]
  useFirebase: boolean
  postLimit: number
  tagLimit: number
  version: ApiVersion
  requestRetries: number
  verbose: boolean
  //#endregion

  //#region Management and Utils
  /**
   * Creates a new R34Client.
   */
  constructor(backends: BackendsUrls, options: Partial<R34ClientOptions> = {}) {
    this.backends = typeof backends === 'string' ? [backends] : [...backends]
    this.version = options.version || 'v2'
    this.useFirebase = options.useFirebase || false
    this.postLimit = options.postLimit || 20
    this.tagLimit = options.tagLimit || 20
    this.requestRetries = options.requestRetries || 1
    this.verbose = options.verbose || false
    this.currentBackend = 0

    if (this.useFirebase) {
      init()
    }
  }

  /**
   * Switches to the next backend in the list. When it runs out of backends returns to the first one.
   */
  private useNextBackend() {
    this.currentBackend = (this.currentBackend + 1) % this.backends.length
  }

  /**
   * Combines path with current backend and version to create a valid url
   */
  private getFullUrl(path: string, params: ParamsRecord): URL {
    const host = this.backends[this.currentBackend]
    const version = this.version
    const search = createSearchParams(params).toString()

    return new URL(`${host}/${version}/${path}?${search}`)
  }

  /**
   * Wraps fetch with failover functionality
   */
  private async fetchWithFailover(
    path: string,
    params: ParamsRecord = {},
    fetchOptions: Partial<RequestInit> = {},
    retries = 0
  ): Promise<Response> {
    const url = this.getFullUrl(path, { ...params })

    return fetch(url.toString(), fetchOptions).then((res) => {
      if (!res.ok && this.backends.length > 1 && retries < this.requestRetries) {
        if (this.verbose) {
          console.warn(
            `Fetch failed against ${url}. Status: ${res.status}. Retrying against next backend.\nDetails:`,
            res
          )
        }
        this.useNextBackend()
        return this.fetchWithFailover(path, params, fetchOptions, retries + 1)
      }

      return res
    })
  }
  //#endregion

  //#region API
  //#region Tags
  /**
   * Retrieves tags given a searchTerm
   */
  private async fetchTags(params: api.params.Tags): Promise<api.responses.Tags> {
    console.log(params)

    const baseUrl = 'https://api.rule34.xxx/autocomplete.php?q='
    const name = params.name?.replaceAll(' ', '_')
    const fetched = await fetch(`${baseUrl}${name}`)

    if (fetched.ok) {
      const json = await fetched.json()
      if (Array.isArray(json)) {
        if (json.length === 0) {
          throw new Error('No tags found')
        } else {
          return json.map((t) => ({
            name: t.value,
            count: Number(t.label.substring(t.label.lastIndexOf('(') + 1, t.label.length - 1)),
            types: ['ambiguous'],
          }))
        }
      } else if (json.message) {
        return json
      } else {
        return { message: 'Invalid tag suggestions received', results: 0 }
      }
    } else {
      return { message: 'Failed to load suggestions', results: 0 }
    }
  }

  async getTags(params: api.params.Tags) {
    try {
      const result = await this.fetchTags(params)

      if (isSuggestionError(result)) {
        return result
      }

      let tags = result as AnyTag[]

      const name = params.name

      if (params.supertags && name) {
        try {
          const sanitzedName = name.replaceAll('*', '').toLowerCase()
          const supertags = await getSupertags()
          if (supertags) {
            const matchingSupertags = Object.entries(supertags)
              .filter(([key, _]) => key.toLowerCase().includes(sanitzedName))
              .map(([name, details]) => ({
                name,
                ...details,
              }))
            tags = [...matchingSupertags, ...tags]
          }
        } catch {
          // do nothing as supertags are only for registered users.
        }
      }

      return tags
    } catch (err) {
      console.warn('Failed to get tags:', err)
      return []
    }
  }
  //#endregion

  //#region Posts
  getPostsUrl(pageNumber: number, limit: number, serializedTags: string) {
    const baseApiPostsUrl = `https://api.rule34.xxx/index.php?page=dapi&s=post&q=index`
    const url = `${baseApiPostsUrl}&limit=${limit.toString()}&pid=${pageNumber}`

    return serializedTags === '' ? url : `${url}&tags=${serializedTags}`
  }

  /**
   * This function can be used to retrieve a number of posts from the backend.
   */
  async getPosts(params: api.params.Posts) {
    try {
      let paramsInternal = {
        limit: params.limit ?? this.postLimit,
        pid: params.page ?? 0,
        tags: '',
      }

      if (params.tags) paramsInternal.tags += serializeAllTags(params.tags)
      if (params.score) paramsInternal.tags += `+score:${params.score}`
      if (params.sort && params.sort !== 'date:desc') paramsInternal.tags += `+sort:${params.sort}`

      const apiResponse = await fetch(this.getPostsUrl(paramsInternal.pid, paramsInternal.limit, paramsInternal.tags))

      const text = await apiResponse.text()
      const parser = new DOMParser()
      const xml = parser.parseFromString(text, 'text/xml')

      const count = Number(xml.getElementsByTagName('posts')[0].getAttribute('count'))
      const posts = []

      for (const post of xml.getElementsByTagName('post')) {
        posts.push(this.parsePost(post.attributes))
      }

      return { count, posts }
    } catch (err) {
      console.warn('Failed to get posts:', err)
      return { count: 0, posts: [] }
    }
  }

  parsePost(post: any): any {
    const height = post.getNamedItem('height').value
    const score = post.getNamedItem('score').value
    const file_url = post.getNamedItem('file_url').value
    const parent_id = post.getNamedItem('parent_id').value
    const sample_url = post.getNamedItem('sample_url').value
    const sample_width = post.getNamedItem('sample_width').value
    const sample_height = post.getNamedItem('sample_height').value
    const preview_url = post.getNamedItem('preview_url').value
    const rating = post.getNamedItem('rating').value
    const tags = post.getNamedItem('tags').value
    const id = post.getNamedItem('id').value
    const width = post.getNamedItem('width').value
    const change = post.getNamedItem('change').value
    const md5 = post.getNamedItem('md5').value
    const creator_id = post.getNamedItem('creator_id').value
    const has_children = post.getNamedItem('has_children').value
    const created_at = post.getNamedItem('created_at').value
    const status = post.getNamedItem('status').value
    const source = post.getNamedItem('source').value
    const has_notes = post.getNamedItem('has_notes').value
    const has_comments = post.getNamedItem('has_comments').value
    const preview_width = post.getNamedItem('preview_width').value
    const preview_height = post.getNamedItem('preview_height').value

    return {
      preview_url,
      sample_url,
      file_url,
      created_at,
      has_children: Boolean(has_children),
      md5,
      height: Number(height),
      id: Number(id),
      change: Number(change),
      creator_id: Number(creator_id),
      has_notes: Boolean(has_notes),
      has_comments: Boolean(has_comments),
      parent_id: parent_id ? Number(parent_id) : null,
      preview_width: Number(preview_width),
      preview_height: Number(preview_height),
      rating,
      sample_height: Number(sample_height),
      sample_width: Number(sample_width),
      score: Number(score),
      source,
      status,
      tags: tags.split(' ').filter((tag: any, index: any, array: any) => tag !== '' && array.indexOf(tag) === index),
      width: Number(width),
      comments_url: '',
      creator_url: '',
      type:
        file_url.endsWith('.webm') || file_url.endsWith('.mp4') ? 'video' : file_url.includes('.gif') ? 'gif' : 'image',
    }
  }
  //#endregion

  //#region Aliases
  /**
   * Returns all aliases for a given tag
   */
  async getAliases(params: api.params.Aliases) {
    try {
      const aliases: AliasTag[] = await (await this.fetchWithFailover('alias/' + params.name)).json()

      return aliases
    } catch (err) {
      console.warn('Failed to get aliases:', err)
      return []
    }
  }
  //#endregion

  //#region Comments
  /**
   * Returns all comments for a given post.
   */
  async getComments(params: api.params.Comments): Promise<api.responses.Comments> {
    try {
      // This does not use my api but it is included here for simplicity.
      // Therefore, no failover etc.
      const response = await fetch(params.commentsUrl)
      const text = await response.text()
      const parser = new DOMParser()
      const xml = parser.parseFromString(text, 'text/xml')

      const comments: Comment[] = []
      for (const comment of xml.getElementsByTagName('comment')) {
        const newComment = this.parseComment(comment.attributes)
        comments.push(newComment)
      }

      return comments
    } catch (err) {
      console.warn('Failed to get comments:', err)
      return []
    }
  }

  parseComment = (comment: NamedNodeMap): Comment => {
    let result = {} as Record<string, any>

    for (const attr of comment) {
      result[attr.name] = attr.value
    }
    return result as Comment
  }
  //#endregion

  //#region Artists
  async getArtist(params: api.params.Artist) {
    try {
      const artist: Artist = await (await this.fetchWithFailover('artist', params)).json()

      return artist
    } catch (err) {
      console.warn('Failed to get aliases:', err)
      return undefined
    }
  }
  //#endregion
  //#endregion
}
