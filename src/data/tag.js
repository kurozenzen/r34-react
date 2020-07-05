export default class Tag {
  /**
   * @param {String} name
   * @param {String[]} types
   * @param {Number} count
   * @param {"+" | "-"} modifier
   */
  constructor(name, types = [], count, modifier = "+") {
    this.name = name;
    this.types = types;
    this.count = count;
    this.modifier = modifier;
  }
}
