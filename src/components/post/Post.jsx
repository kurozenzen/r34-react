import React, { useState } from "react";
import { arrayOf, func, number, object, string } from "prop-types";
import { TagList } from "../tagList/TagList";
import "./Post.css";

function Post(props) {
  let {
    id,
    media_type,
    preview_src,
    original_src,
    rating,
    score,
    source,
    tags,
    loadOriginal,
    activeTags,
    onTagClick
  } = props;

  let media_src;
  if (loadOriginal) {
    media_src = original_src;
  } else {
    media_src = `${preview_src}?${id}`;
    if (media_src.includes("//images")) {
      media_src = media_src.replace("//images", "/images");
    }
  }

  //TODO: smooth collapse
  let [collapsed, setCollapsed] = useState(true);
  return (
    <li id={id} className="list-group-item post gray">
      <Media
        type={media_type}
        src={media_src}
        onClick={() => setCollapsed(!collapsed)}
      />

      <div className={"details collapse" + (collapsed ? "" : ".show")}>
        <div className="d-flex justify-content-between info-bar">
          <Rating value={rating} />
          <Score value={score} />
          <Source value={source} />
        </div>
        <div className="pl-1">
          <TagList
            tags={tags}
            activeTags={activeTags}
            onItemClick={onTagClick}
          />
        </div>
      </div>
    </li>
  );
}

Post.propTypes = {
  id: number,
  media_type: string,
  media_src: string,
  rating: string,
  score: number,
  source: string,
  tags: arrayOf(object),
  onTagClick: func
};

export default Post;

function Media({ type, src, onClick }) {
  let hasMoved = false;
  const onMove = () => {
    hasMoved = true;
  };
  const onRelease = event => {
    if (!hasMoved) onClick(event);
    hasMoved = false;
  };

  switch (type) {
    case "image":
      return (
        <img src={src} alt={src} className="img-fluid" onClick={onClick} />
      );
    case "video":
      return (
        <video
          controls
          loop
          src={src}
          alt={src}
          className="img-fluid"
          onClick={onClick}
          onTouchMove={onMove}
          onTouchEnd={onRelease}
        />
      );
    default:
      return null;
  }
}

function Rating({ value }) {
  return <span className="rating">{value[0].toUpperCase()}</span>;
}

function Score({ value }) {
  return <span className="score">{value}</span>;
}

function Source({ value }) {
  if (value)
    if (value.startsWith("http"))
      return (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="source"
        >
          Source
        </a>
      );
    else return <span className="source">{value}</span>;
  else return null;
}
