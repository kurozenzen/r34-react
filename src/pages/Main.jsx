import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Toggle from "../components/toggle/Toggle";
import TagList from "../components/tagList/TagList";
import PostList from "../components/postList/PostList";
import api from "../misc/api";
import TagSelector from "../components/tagSelector/TagSelector";
import prepare from "../misc/prepare";

let scrollLock = true;

function useTags(initialValue = []) {
  const [tags, setTags] = useState(initialValue);

  const addTag = newTag => {
    if (tags.find(tag => tag.name === newTag.name)) removeTag(newTag);
    setTags([...tags, newTag]);
  };

  const removeTag = tagToRemove => {
    setTags(tags.filter(tag => tag.name !== tagToRemove.name));
  };

  const toggleTag = tagToToggle => {
    if (tags.find(tag => tag.name === tagToToggle.name)) removeTag(tagToToggle);
    else addTag(tagToToggle);
  };

  return [tags, toggleTag, addTag, removeTag];
}

function usePosts(initialValue = []) {
  const [posts, setPosts] = useState(initialValue);

  const addPosts = newPosts => setPosts([...posts, ...newPosts]);

  return [posts, setPosts, addPosts];
}

function useLocalStorageUpdates(
  infiniteScroll,
  filterRated,
  loadOriginal,
  activeTags
) {
  useEffect(() => {
    localStorage.setItem("infinteScroll", JSON.stringify(infiniteScroll));
  }, [infiniteScroll]);
  useEffect(() => {
    localStorage.setItem("showRated", JSON.stringify(filterRated));
  }, [filterRated]);
  useEffect(() => {
    localStorage.setItem("originalSizes", JSON.stringify(loadOriginal));
  }, [loadOriginal]);
  useEffect(() => {
    localStorage.setItem("tags", JSON.stringify(activeTags));
  }, [activeTags]);
}

function Main({ initialState }) {
  const { infinite, rated, originals, activeTags } = initialState;
  //TODO: add suggested tags | filters
  const [infiniteScroll, setInfiniteScroll] = useState(infinite);
  const [filterRated, setFilterRated] = useState(rated);
  const [pageNumber, setPageNumber] = useState(0);
  const [loadOriginal, setLoadOriginal] = useState(originals);
  const [tags, toggleTag, addTag, removeTag] = useTags(activeTags);
  const [posts, setPosts, addPosts] = usePosts([]);

  useLocalStorageUpdates(infiniteScroll, filterRated, loadOriginal, tags);

  // SEARCH
  const search = () => {
    api.getPosts(tags, 0, filterRated ? 1 : undefined).then(newPosts => {
      setPosts(newPosts.map(prepare));
      setPageNumber(0);
    });
  };
  const loadMore = () => {
    api
      .getPosts(tags, pageNumber + 1, filterRated ? 1 : undefined)
      .then(newPosts => {
        addPosts(newPosts.map(prepare));
        setPageNumber(pageNumber + 1);
        scrollLock = true;
      });
  };

  // SCROLL
  const endOfPage = () =>
    window.innerHeight + document.documentElement.scrollTop >=
    document.documentElement.scrollHeight - window.innerHeight;

  window.onscroll = () => {
    if (infiniteScroll && scrollLock && endOfPage()) {
      scrollLock = false;
      loadMore();
    }
  };

  return (
    <main>
      <section className="search">
        <h3 className="centered">Search</h3>
        <TagSelector onSubmit={addTag} className="centered" />

        {tags.length > 0 ? (
          <label>
            Tags:
            <TagList tags={tags} activeTags={tags} onItemClick={removeTag} />
          </label>
        ) : (
          <div className="mb-1" />
        )}

        <Toggle
          text="Infinite Scroll"
          initial={infiniteScroll}
          onChange={() => setInfiniteScroll(!infiniteScroll)}
        />
        <Toggle
          text="Only show Rated"
          initial={filterRated}
          onChange={() => setFilterRated(!filterRated)}
        />
        <Toggle
          text="Load Original Sizes"
          initial={loadOriginal}
          onChange={() => setLoadOriginal(!loadOriginal)}
        />

        <button className="btn btn-block btn-red" onClick={search}>
          Search
        </button>
      </section>

      {posts.length > 0 ? (
        <section className="results">
          <h3 className="centered">Results</h3>
          <PostList
            posts={posts}
            activeTags={tags}
            loadOriginal={loadOriginal}
            onTagClick={toggleTag}
          />
          {!infiniteScroll && (
            <button className="btn btn-block btn-red" onClick={loadMore}>
              Load More
            </button>
          )}
        </section>
      ) : null}
    </main>
  );
}

export default withRouter(Main);
