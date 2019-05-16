import React from 'react';
import { TagList } from './Tag';
import './Post.css'

export default function Post(props) {
    return (
    <li className="list-group-item post  gray">
        <Media type={props.media_type} src={props.media_src}/>

        <div>
            <div className="d-flex justify-content-between info-bar">
                <Rating value={props.rating}/>
                <Score value={props.score}/>
                <Source value={props.source}/>
            </div>
            <TagList tags={props.tags} onClick={props.onTagClick}/>
        </div>
    </li>
)
}

export function PostList(props) {
    return (    
      <ul className="list-group list-inline post-list">
        {props.posts.map((post) => {
            return (<Post key={"p_" + post.id} media_type={post.type} media_src={post.file_url} rating={post.rating} score={post.score} source={post.source} tags={post.tags} onTagClick={props.onTagClick}/>)
        })}
      </ul>
    );
}

function Media(props) {
    if(props.type === "image")
        return(
            <img src={props.src} alt={props.src} className="img-fluid"/>
        )
    else if(props.type === "video")
        return (
            <video controls loop src={props.src} alt={props.src} className="img-fluid"></video>
        )
    else
        return null
}

function Rating(props) {
    return (<span className="rating">{props.value[0].toUpperCase()}</span>)
}

function Score(props){
    return (<span className="score">{props.value}</span>)
}

function Source(props){
    if(props.value)
        if(props.value.startsWith('http'))
            return (<a href={props.value} className="source">Source</a>)
        else
            return (<span className="source">{props.value}</span>)
    else
        return null;
}
