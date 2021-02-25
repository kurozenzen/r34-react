export function prettifyTagname(tagname: string) {
  return tagname.replace(/_/g, " ")
}

export function normalizeTagname(tagname: string) {
  return tagname.toLowerCase().replace(/ /g, "_")
}
