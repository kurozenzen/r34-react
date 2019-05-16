import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { TagList } from '../components/Tag';
import { PostList } from '../components/Post';
import api from "../misc/api";
import converter from "../misc/converter"
import TagSelector from '../components/TagSelector';
import activeTags from "../misc/activeTags"

class Search extends Component { //TODO: data saver => use sample values
  constructor(props) {
    super(props)

    this.state = {
      tags: [],
      suggestions: [],
      posts: [],
      searchTerm: ""
    }

    this.handleAddTag = this.handleAddTag.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleToggleTag = this.handleToggleTag.bind(this)
  }

  componentDidMount() { //TODO: add back navigation handling
    let queryTags,
    s= this.state
    if(this.props.location.search)
      queryTags = converter.queryAsTags(this.props.location.search)

    s.tags = queryTags || []
    this.setState(s)

    if(this.state.tags.length > 0){
      activeTags.add(...this.state.tags.map(t => t.name))
      this.updatePosts()
    }
  }
    
  handleAddTag(tagName) {
    let s = this.state,
    newTag = {
      name: tagName
    }

    if(!s.tags.some(e => e.name === tagName)) {
      s.tags.push(newTag)
      activeTags.add(tagName)
      this.setState(s)
    }
  }

  handleToggleTag(tag) {
    let s = this.state
    if(s.tags.some(e => e.name === tag.name)) {
      s.tags.splice(s.tags.indexOf(tag),1)
      activeTags.remove(tag.name)
    } else {
      s.tags.push(tag)
      activeTags.add(tag.name)
    }

    this.setState(s)
  }

  handleSearch(event) {
    this.updatePosts();
    event.preventDefault();
  }

  updatePosts() {
    api.getPosts(this.state.tags)
      .then(result => {
        let s = this.state
        s.posts = result.map(p => {
          let pp = p
          pp.tags = p.tags.map(t => {
            return { name: t} 
          })
          return pp
        })

        this.props.history.push(converter.tagsAsQuery(this.state.tags));

        this.setState(s)
      })
  }
    
  render() {
    return (
      <main>
        <section className="search">
          <h3 className="centered">Search</h3>
          <TagSelector onSubmit={this.handleAddTag} className="centered"/>
          <label>Tags:</label>
          <TagList tags={this.state.tags} onClick={this.handleToggleTag}/>

          <form onSubmit={this.handleSearch}>
            <input type="submit" value="Search" className="btn btn-block btn-red"/>
          </form>
        </section>

        <section className="results">
          <h3 className="centered">Results</h3>
          <PostList posts={this.state.posts} onTagClick={this.handleToggleTag}/>
        </section>
      </main>
    )
  }
}

export default withRouter(Search)