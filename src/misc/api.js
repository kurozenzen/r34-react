const pageSize = 10,
    apiUrl1 = "https://custom-r34-api.herokuapp.com",
    apiUrl2 = "https://r34-api-clone.herokuapp.com"

let activeApi = apiUrl1

fetch(apiUrl1)
    .then(() => activeApi = apiUrl1)
    .catch(() => activeApi = apiUrl2)

export default {
    async getTags(searchTerm) {
        const res = await fetch(activeApi + "/tags?limit=" + pageSize + "&name=" + searchTerm + "*&order_by=posts");
        return await res.json();
    },

    async getPosts(tags, pageNumber = 1) {
        const res = await fetch(activeApi + "/posts?pid=" + pageNumber + "&limit=" + pageSize + "&tags=" + tags.map(t => t.name).join("+"));
        return await res.json();
    }
}