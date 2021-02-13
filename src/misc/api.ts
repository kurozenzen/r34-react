import TagDataClass from "../data/Tag";
import { SimpleMap } from "../data/types";

export const pageSize = 20;
const apiUrl1 = "https://r34-json.herokuapp.com";
const apiUrl2 = "https://r34-api-clone.herokuapp.com";

let activeApi = apiUrl1;

// Failover to apiUrl2
fetch(activeApi).catch(() => (activeApi = apiUrl2));

export default {
  async getTags(searchTerm: string, limit: number = pageSize) {
    const res = await fetch(
      `${activeApi}/tags?limit=${limit}&name=${searchTerm}*&order_by=posts`
    );

    return await res.json();
  },

  async getPosts(tags: SimpleMap<TagDataClass>, pageNumber = 0, minScore = 0) {
    const res = await fetch(buildPostUrl(pageNumber, tags, minScore));

    return await res.json();
  },

  async getAliases(tagName: string) {
    const res = await fetch(`${activeApi}/alias/${tagName}`);

    return await res.json();
  },
};

function buildPostUrl(
  page: number,
  tags: SimpleMap<TagDataClass>,
  minScore: number
) {
  const tagString = Object.values(tags)
    .map(
      (tag) =>
        `${tag.modifier === "-" ? "-" : ""}${encodeURIComponent(tag.name)}`
    )
    .join("+");

  let url = `${activeApi}/posts?pid=${page}&limit=${pageSize}&tags=${tagString}`;

  if (minScore > 0) {
    url += `+${encodeURIComponent("score:>=" + minScore)}`;
  }

  return url;
}
