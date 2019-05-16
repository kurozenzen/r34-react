const pageSize = 10,
    api = {
        async getTags(searchTerm) {
            const res = await fetch("https://custom-r34-api.herokuapp.com/tags?limit=10&name=" + searchTerm + "*&order_by=posts");
            return await res.json();
        },

        async getPosts(tags) {
            const res = await fetch("https://custom-r34-api.herokuapp.com/posts?limit=" + pageSize + "&tags=" + tags.map(t => t.name).join("+"));
            return await res.json();
        }
    }

export default api;