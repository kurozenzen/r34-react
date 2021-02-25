import { TagType, Modifier } from "./types"

export default class TagDataClass {
  name: string
  count?: number | null
  types?: TagType[]
  modifier?: Modifier

  constructor(name: string, types: TagType[] = [], count: number | null = null, modifier: Modifier = Modifier.PLUS) {
    this.name = name
    this.types = types
    this.count = count
    this.modifier = modifier
  }
}
