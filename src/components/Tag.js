import React from 'react';
import './Tag.css';
import activeTags from "../misc/activeTags"

export default function Tag(props) {
    return !props.count ? (
      <span className={"badge badge-tag" + (activeTags.has(props.name) ? ' active' : ' ')} onClick={props.onClick}>{props.name}</span>
    ) : (
        <span className="badge badge-tag" onClick={props.onClick}>{props.name} ({props.count})</span>
    )
}

export function TagList(props) {
    return (    
      <div className="tag-list">
        {props.tags.map(tag =>
          <Tag key={"t_"+ tag.name} name={tag.name} count={tag.count} onClick={() => props.onClick(tag)}/>
        )}
      </div>
    );
}
