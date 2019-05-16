const tags = []

export default {
    add(tagName) {
        tags.push(tagName)
    },

    remove(tagName) {
        tags.splice(tags.indexOf(tagName), 1)
    },

    has(tagName) {
        console.log(tagName)
        console.log(tags)
        console.log(tags.includes(tagName))
        return tags.includes(tagName)
    }
}