import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import InifinteColumn from "../components/layout/InfiniteColumn";
import Post from "../components/post/Post";
import { getMoreResults } from "../redux/actions";
import { selectOutOfResults, selectPosts } from "../redux/selectors";
import LayoutHeader from "../components/layout/LayoutHeader";
import LayoutFooter from "../components/layout/LayoutFooter";
import LayoutLoadingItem from "../components/layout/LayoutLoadingItem";

export default function Search() {
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);
  const hasMorePosts = !useSelector(selectOutOfResults);
  const loadMore = useCallback(() => dispatch(getMoreResults()), [dispatch]);

  return (
    <>
      <InifinteColumn
        Header={LayoutHeader}
        Footer={LayoutFooter}
        OutOfItems={LayoutLoadingItem}
        items={posts}
        loadingItem={<span>LOADING...</span>}
        hasMoreRows={hasMorePosts}
        ItemComponent={Post}
        loadMore={loadMore}
      />
    </>
  );
}
