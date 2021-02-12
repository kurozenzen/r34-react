import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Config from "../components/features/Config";
import Footer from "../components/features/Footer";
import Header from "../components/features/Header";
import InifinteColumn from "../components/layout/InfiniteColumn";
import Post from "../components/post/Post";
import { getMoreResults } from "../redux/actions";
import { selectOutOfResults, selectPosts } from "../redux/selectors";

export default function Search() {
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);
  const hasMorePosts = !useSelector(selectOutOfResults);
  const loadMore = useCallback(() => dispatch(getMoreResults()), [dispatch]);

  return (
    <>
      <InifinteColumn
        Header={({ onLoad, virtualRef, style }) => (
          <div onLoad={onLoad} ref={virtualRef} style={style}>
            <Header />
            <Config onLoad={onLoad} />
          </div>
        )}
        Footer={({ onLoad, virtualRef, style }) => (
          <div onLoad={onLoad} ref={virtualRef} style={style}>
            <Footer />
          </div>
        )}
        items={posts}
        loadingItem={<span>LOADING...</span>}
        hasMoreRows={hasMorePosts}
        ItemComponent={Post}
        loadMore={loadMore}
      />
    </>
  );
}
