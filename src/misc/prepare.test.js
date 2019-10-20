import prepare from "./prepare";
import { TAG, POST } from "../../test/mockdata.js";
import { assertTag, assertPost } from "../../test/assertions";

test("prepares a post", () => {
  const post = prepare(POST.DEFAULT);

  assertPost(post);
});

test("prepares a tag", () => {
  const tag = prepare(TAG.FULL);

  assertTag(tag);
});

test("prepares a tag", () => {
  const tag = prepare(TAG.PARTIAL);

  assertTag(tag);
});

test("prepares a tag", () => {
  const tag = prepare(TAG.MINIMAL);

  assertTag(tag);
});
