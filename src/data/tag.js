export default class Tag {
  constructor(name, types = [], count, modifier = "+") {
    this.name = name;
    this.types = types;
    this.count = count;
    this.modifier = modifier;
  }
}
