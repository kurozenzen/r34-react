import TagDataClass from "../data/Tag";
import { Modifier, SimpleMap } from "../data/types";

export class API {
  static pageSize = 20;
  static apiUrl1 = "https://r34-json.herokuapp.com";
  static apiUrl2 = "https://r34-api-clone.herokuapp.com";
  activeApi = API.apiUrl2;

  constructor() {
    this.activeApi = API.apiUrl1;

    // Failover to apiUrl2
    fetch(this.activeApi).catch(() => (this.activeApi = API.apiUrl2));
  }

  async getTags(searchTerm: string, limit: number = API.pageSize) {
    const res = await fetch(
      `${this.activeApi}/tags?limit=${limit}&name=${searchTerm}*&order_by=posts`
    );

    return await res.json();
  }

  async getPosts(
    tags: SimpleMap<TagDataClass>,
    limit: number = API.pageSize,
    pageNumber = 0,
    minScore = 0
  ) {
    const res = await fetch(
      this.buildPostUrl(pageNumber, tags, minScore, limit)
    );

    return await res.json();
  }

  async getAliases(tagName: string) {
    const res = await fetch(`${this.activeApi}/alias/${tagName}`);

    return await res.json();
  }

  buildPostUrl(
    page: number,
    tags: SimpleMap<TagDataClass>,
    minScore: number,
    limit: number = API.pageSize
  ) {
    const normalTags = Object.values(tags).filter(
      (tag) => tag.modifier !== Modifier.OR
    );
    const orTags = Object.values(tags).filter(
      (tag) => tag.modifier === Modifier.OR
    );

    let tagString = normalTags
      .map(
        (tag) =>
          `${tag.modifier === "-" ? "-" : ""}${encodeURIComponent(tag.name)}`
      )
      .join(" + ");

    if (orTags.length > 0) {
      tagString +=
        "+ ( " +
        orTags.map((tag) => encodeURIComponent(tag.name)).join(" ~ ") +
        " )";
    }

    let url = `${this.activeApi}/posts?pid=${page}&limit=${limit}&tags=${tagString}`;

    if (minScore > 0) {
      url += `+${encodeURIComponent("score:>=" + minScore)}`;
    }

    return url;
  }
}

export default new API();
