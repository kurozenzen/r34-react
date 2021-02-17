import React, { useMemo } from "react";
import styled, { css } from "styled-components";
import TagList from "../tag/TagList";
import { RatingType } from "../../data/types";
import TagDataClass from "../../data/Tag";
import { listToMap } from "../../data/utils";
import Rating from "./widgets/Rating";
import Score from "./widgets/Score";
import Source from "./widgets/Source";

const Bar = styled.div(
  ({ theme: { dimensions, misc, shadow } }) => css`
    grid-row: 2/3;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    background: ${misc.layer};
    padding: ${dimensions.bigSpacing};
    ${shadow.box};
    border-radius: 0 0 ${dimensions.borderRadius} ${dimensions.borderRadius};
  `
);

const DetailsTagList = styled(TagList)`
  grid-row: 3/4;
`;

interface DetailsProps {
  rating: RatingType;
  score: number;
  source: string;
  tags: TagDataClass[];
}

export default function Details(props: DetailsProps) {
  const { rating, score, source, tags } = props;
  const tagsForRendering = useMemo(() => listToMap(tags, "name"), [tags]);

  return (
    <>
      <Bar>
        {!!rating && <Rating value={rating} />}
        {!!score && <Score value={score} />}
        {!!source && <Source value={source} />}
      </Bar>
      <DetailsTagList tags={tagsForRendering} padding loadAliases={false} />
    </>
  );
}
