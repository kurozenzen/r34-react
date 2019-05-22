import queryString from 'query-string'

export default {
  queryAsTags(query) {
    return queryString.parse(query).tags.split(" ")
      .map(t => {
        let modifier = "", name = t

        if(t[0] === "-") {
          modifier = t[0]
          name = name.substr(1)
        }

        return {
          name: name,
          modifier: modifier
        }
      })
  },

  tagsAsQuery(tags) {
    return queryString.stringify({
      tags:  tags.map(t => (t.modifier ? t.modifier : "") + t.name)
    })
  }
}