import React, { Component } from 'react';
import './Tag.css';
import activeTags from "../misc/activeTags"

export default class Tag extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.name,
      count: props.count,
      onClick: props.onClick
    }
  }


  render() {
    let content = this.state.count ? this.state.name +" (" + this.state.count + ")" : this.state.name

    return (
      <span className={"badge badge-tag" + (activeTags.has(this.state.name) ? ' active' : ' ')} onClick={this.state.onClick}>{content}</span>
    )
  }
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
