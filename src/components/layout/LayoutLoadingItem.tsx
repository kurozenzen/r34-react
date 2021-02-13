import React, { useMemo } from "react";
import Surface, { Line } from "../common/Surface";
import Title from "../common/Title";
import TagList from "../tag/TagList";
import outOfResultsPicture from "../../icons/OutOfResults.png";
import { useSelector } from "react-redux";
import { selectAliases } from "../../redux/selectors";
import TagDataClass from "../../data/Tag";
import { SimpleMap } from "../../data/types";

export default function LayoutLoadingItem() {
  const aliases = useSelector(selectAliases);
  const aliasesForRendering = useMemo(
    () =>
      aliases.reduce((result: SimpleMap<TagDataClass>, alias) => {
        result[alias.name] = alias;
        return result;
      }, {}),
    [aliases]
  );

  return (
    <div>
      <Surface>
        <img
          src={outOfResultsPicture}
          alt={outOfResultsPicture}
          style={{ width: "100%" }}
        />
        <Line />
        <Title>You have reached the end!</Title>
        <p style={{ textAlign: "center" }}>Go look for something else!</p>
        {aliases.length > 0 && (
          <>
            <p style={{ textAlign: "center" }}>How about some of these?</p>
            <TagList tags={aliasesForRendering} padding />
          </>
        )}
      </Surface>
    </div>
  );
}
