import React from "react";

import { storiesOf } from "@storybook/react";
import TagList from "./TagList.jsx";

storiesOf("TagList", module)
  .add("default", () => (
    <TagList
      tags={[
        { name: "female", count: 100 },
        { name: "male", count: 13, modifier: "-" }
      ]}
    />
  ))
  .add("default, active", () => (
    <TagList
      tags={[
        { name: "female", count: 100 },
        { name: "male", count: 13, modifier: "-" }
      ]}
      activeTags={[{ name: "female" }, { name: "male" }]}
    />
  ))
  .add("mixed", () => (
    <TagList
      tags={[
        { name: "female", count: 100 },
        { name: "male", count: 13, modifier: "-" },
        { name: "samus_ara", count: 13, types: ["character"] },
        { name: "animated", count: 13 },
        { name: "artist", count: 13, types: ["artist"] }
      ]}
      activeTags={[{ name: "female" }, { name: "male" }]}
    />
  ));
