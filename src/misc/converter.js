import queryString from 'query-string'

export default {
    queryAsTags(query) {
        return queryString.parse(query).tags.split(" ").map(t => {return {name: t}})
    },

    tagsAsQuery(tags) {
        return "?tags=" + tags.map(t => t.name).join("+")
    }
}