import React from "react";
import styled from "styled-components";
import { number, string, array, func } from "prop-types";
import TagList from "../tag/TagList";

const DetailsWrapper = styled.div``;

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

const Rating = styled(({ value }) => <span>{value[0].toUpperCase()}</span>)`
  ::before {
    font-family: "Font Awesome 5 Free";
    font-weight: 400;
    content: "\f25d";
    display: inline-block;
    padding-right: 5px;
  }
`;

const Score = styled(({ value }) => <span>{value}</span>)`
  ::before {
    font-family: "Font Awesome 5 Free";
    font-weight: 400;
    content: "\f004";
    display: inline-block;
    padding-right: 5px;
  }
`;

const Source = styled(({ value }) =>
  value.startsWith("http") ? (
    <a
      href={value}
      target="_blank"
      rel="noopener noreferrer"
      className="source"
    >
      Source
    </a>
  ) : (
    <span>{value}</span>
  )
)`
  ::before {
    font-family: "Font Awesome 5 Free";
    font-weight: 800;
    content: "\f292";
    display: inline-block;
    padding-right: 5px;
  }
`;
