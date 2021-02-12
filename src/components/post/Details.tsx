import React, { useMemo } from "react";
import styled, { css, keyframes } from "styled-components";
import TagList, { TagListWrapper } from "../tag/TagList";
import { RatingType } from "../../data/types";
import TagDataClass from "../../data/Tag";
import { listToMap } from "../../data/utils";
import Rating from "./widgets/Rating";
import Score from "./widgets/Score";
import Source from "./widgets/Source";

const fold = keyframes`
  from {
    max-height: 0px;
  }

  to {
    max-height: 1500px;
  }
`;

const DetailsWrapper = styled.div(
  (props) => css`
    > ${TagListWrapper} {
      padding: ${props.theme.dimensions.spacing};
    }
    max-height: unset;
    /* animation: ${fold} 0.4s ease-in; */
  `
);

const Bar = styled.div(
  (props) => css`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    background: ${props.theme.misc.layer};
    padding: ${props.theme.dimensions.spacing};
    border-radius: 0 0 ${props.theme.dimensions.borderRadius}
      ${props.theme.dimensions.borderRadius};
    ${props.theme.shadow.box};

    > span,
    > a {
      margin: ${props.theme.dimensions.spacing};
      line-height: 1rem;
      height: 1rem;
    }
  `
);

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
    <DetailsWrapper className="details-wrapper">
      <Bar className="bar">
        {rating && <Rating value={rating} />}
        {score && <Score value={score} />}
        {source && <Source value={source} />}
      </Bar>
      <TagList tags={tagsForRendering} padding loadAliases={false} />
    </DetailsWrapper>
  );
}
