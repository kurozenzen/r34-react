import React from 'react';
import { TagList } from './Tag';
import './Post.css'

export default class Post extends React.Component { //TODO: smooth collapse
    constructor(props) {
        super(props)
        this.state = {
            id: props.id,
            media_type: props.media_type,
            media_src: props.media_src,
            rating: props.rating,
            score: props.score,
            source: props.source,
            tags: props.tags,
            collapsed: true
        }

        this.onTagClick = props.onTagClick
        this.toggleDetails = this.toggleDetails.bind(this)
    }

    toggleDetails(event) {
        this.setState({
            collapsed: !this.state.collapsed
        })
    }

    render() {
        return (
            <li id={this.state.id} className='list-group-item post gray'>
                <Media type={this.state.media_type} src={this.state.media_src} onClick={this.toggleDetails} />

                <div className={'details collapse' + (this.state.collapsed ? '' : '.show')}>
                    <div className='d-flex justify-content-between info-bar'>
                        <Rating value={this.state.rating} />
                        <Score value={this.state.score} />
                        <Source value={this.state.source} />
                    </div>
                    <div className="pl-1">
                        <TagList tags={this.state.tags} onClick={this.onTagClick} />
                    </div>
                </div>
            </li>
        )
    }
}

export function PostList(props) {
    return (    
      <ul className='list-group list-group-flush post-list'>
        {props.posts.map((post) => {
            return (<Post key={'p_' + post.id} id={post.id} media_type={post.type} media_src={post.sample_url} rating={post.rating} score={post.score} source={post.source} tags={post.tags} onTagClick={props.onTagClick} />)
        })}
      </ul>
    );
}

function Media(props) {
    let hasMoved = false,
    onMove = (event) => {
        hasMoved = true
    },
    onRelease = (event) => {
        if(!hasMoved)
            props.onClick(event)
        hasMoved = false
    }

    if(props.type === 'image')
        return(
            <img src={props.src} alt={props.src} className='img-fluid' onClick={props.onClick} />
        )
    else if(props.type === 'video')
        return (
            <video controls loop src={props.src} alt={props.src} className='img-fluid' onClick={props.onClick} onTouchMove={onMove} onTouchEnd={onRelease}></video>
        )
    else
        return null
}

function Rating(props) {
    return (
        <span className='rating'>{props.value[0].toUpperCase()}</span>
    )
}

function Score(props) {
    return (
        <span className='score'>{props.value}</span>
    )
}

function Source(props) {
    if(props.value)
        if(props.value.startsWith('http'))
            return (<a href={props.value} target="_blank" rel="noopener noreferrer" className='source'>Source</a>)
        else
            return (<span className='source'>{props.value}</span>)
    else
        return null;
}
