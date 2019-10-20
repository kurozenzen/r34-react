import React from "react";
import styled from "styled-components";
import { number, string, array, func } from "prop-types";
import TagList from "../tag/TagList";
import {
  HeartIcon,
  ExternalLinkIcon,
  SourceIcon,
  RatingIcon
} from "../../icons/Icons";

const DetailsWrapper = styled.div`
  margin-left: 5px;
`;

const Bar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 5px;
  margin-right: 5px;
`;

function Details({ rating, score, source, tags, activeTags, dispatch }) {
  return (
    <DetailsWrapper>
      <Bar>
        {rating && <Rating value={rating} />}
        {score && <Score value={score} />}
        {source && <Source value={source} />}
      </Bar>
      <TagList tags={tags} activeTags={activeTags} dispatch={dispatch} />
    </DetailsWrapper>
  );
}

Details.propTypes = {
  rating: string,
  score: number,
  source: string,
  tags: array,
  activeTags: array,
  dispatch: func
};

export default Details;

const Rating = ({ value }) => (
  <span>
    <RatingIcon color="white" left />
    {value[0].toUpperCase()}
  </span>
);

const Score = ({ value }) => (
  <span>
    {value}
    <HeartIcon color="white" right />
  </span>
);

function Source({ value }) {
  return value.startsWith("http") ? (
    <a
      href={value}
      target="_blank"
      rel="noopener noreferrer"
      className="source"
    >
      <ExternalLinkIcon color="red" left />
      Source
    </a>
  ) : (
    <span>
      <SourceIcon color="white" left />
      {value}
    </span>
  );
}
