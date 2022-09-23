import { AliasTag, AnyTag, api, ApiVersion, Artist } from 'r34-types'
import { getSupertags, init } from './firebase'
import { createSearchParams, ParamsRecord } from './utils'
import { serializeTagname, isSuggestionError, serializeAllTags } from './tagUtils'

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
    const paramsInternal = { limit: this.tagLimit, ...params }

    if (params.name) {
      paramsInternal.name = serializeTagname(params.name)
    }

    const res = await this.fetchWithFailover('tags', paramsInternal)

    return res.json()
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
          const sanitzedName = name.replaceAll("*", "").toLowerCase()
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
  /**
   * This function can be used to retrieve a number of posts from the backend.
   */
  async getPosts(params: api.params.Posts) {
    try {
      let paramsInternal: api.params.PostsLegacy = {
        limit: params.limit ?? this.postLimit,
        pid: params.page ?? 0,
        tags: '',
      }

      if (params.tags) paramsInternal.tags += serializeAllTags(params.tags)
      if (params.score) paramsInternal.tags += `+score:${params.score}`
      if (params.sort && params.sort !== 'date:desc') paramsInternal.tags += `+sort:${params.sort}`

      const apiResponse = await this.fetchWithFailover('posts', paramsInternal)
      const data: api.responses.Posts = await apiResponse.json()

      return data
    } catch (err) {
      console.warn('Failed to get posts:', err)
      return { count: 0, posts: [] }
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
      return (await fetch(params.commentsUrl)).json()
    } catch (err) {
      console.warn('Failed to get comments:', err)
      return []
    }
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
