import React, { Component } from 'react';
import './Tag.css';
import activeTags from "../misc/activeTags"

export default class Tag extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.name,
      count: props.count,
      modifier: props.modifier
    }

    this.onClick = props.onClick
  }

  render() {
    return (
      <span className={"badge badge-tag" + (activeTags.has(this.state.name) ? ' active' : ' ') + (this.state.modifier === "-" ? ' exclude' : ' ')} onClick={this.onClick} onTouchEnd={this.releaseFocus}>
        {this.state.count ? this.state.name +" (" + this.state.count + ")" : this.state.name}
      </span>
    )
  }
}

export function TagList(props) {
  return (    
    <div className="tag-list">
      {props.tags.map(tag =>
        <Tag key={"t_"+ tag.name} name={tag.name} count={tag.posts} modifier={tag.modifier} onClick={() => props.onClick(tag)} />
      )}
    </div>
  );
}
