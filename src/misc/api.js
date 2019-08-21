const pageSize = 20,
  apiUrl1 = "https://custom-r34-api.herokuapp.com",
  apiUrl2 = "https://r34-api-clone.herokuapp.com";

let activeApi = apiUrl1;

fetch(activeApi).catch(() => (activeApi = apiUrl2));

export default {
  async getTags(searchTerm) {
    const res = await fetch(
      activeApi +
        "/tags?limit=" +
        pageSize +
        "&name=" +
        searchTerm +
        "*&order_by=posts"
    );
    return await res.json();
  },

  async getPosts(tags, pageNumber = 0, minScore = 0) {
    const res = await fetch(buildPostUrl(pageNumber, tags, minScore));
    return await res.json();
  },

  async getAliases(tag) {
    const res = await fetch(activeApi + "/alias/" + tag);
    return await res.json();
  }
};

function buildPostUrl(page, tags, minScore) {
  let url = activeApi + "/posts";
  url += "?pid=" + page;
  url += "&limit=" + pageSize;
  url +=
    "&tags=" +
    tags
      .map(t => (t.modifier ? t.modifier : "") + encodeURIComponent(t.name))
      .join("+");
  url += encodeURIComponent("+score:>=" + minScore);
  return url;
}
