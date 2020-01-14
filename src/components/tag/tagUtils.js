export function prettifyTagname(tagname) {
  return tagname.replace(/_/g, " ");
}

export function normalizeTagname(tagname) {
  return tagname.toLowerCase().replace(/ /g, "_");
}
