const tags = [];

export default {
  add(tagName) {
    tags.push(tagName);
  },

  remove(tagName) {
    tags.splice(tags.indexOf(tagName), 1);
  },

  has(tagName) {
    return tags.includes(tagName);
  },

  get() {
    return tags;
  }
};
