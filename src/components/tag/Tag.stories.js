import React from "react";

import { storiesOf } from "@storybook/react";
import Tag from "./Tag.jsx";
import "./Tag.css";

storiesOf("Tag", module)
  .add("default", () => <Tag name="female" />)
  .add("default, active", () => (
    <Tag name="female" activeTags={[{ name: "female" }]} />
  ))
  .add("count", () => <Tag name="female" count={1010232} />)
  .add("count, active", () => (
    <Tag name="female" count={1010232} activeTags={[{ name: "female" }]} />
  ))
  .add("exclude", () => <Tag name="female" modifier="-" count={1010232} />)
  .add("exclude, active", () => (
    <Tag
      name="female"
      count={1010232}
      modifier="-"
      activeTags={[{ name: "female" }]}
    />
  ))
  .add("character", () => (
    <Tag name="female" types={["character"]} count={1010232} />
  ))
  .add("character, active", () => (
    <Tag
      name="female"
      count={1010232}
      types={["character"]}
      activeTags={[{ name: "female" }]}
    />
  ))
  .add("artist", () => <Tag name="female" types={["artist"]} count={1010232} />)
  .add("artist, active", () => (
    <Tag
      name="female"
      count={1010232}
      types={["artist"]}
      activeTags={[{ name: "female" }]}
    />
  ))
  .add("aliases", () => (
    //TODO: fix
    <Tag name="female" count={1010232} aliasTags={[{ name: "Alias_1" }]} />
  ))
  .add("aliases, active", () => (
    <Tag
      name="female"
      count={1010232}
      activeTags={[{ name: "female" }]}
      aliasTags={[{ name: "Alias_1" }]}
    />
  ));
