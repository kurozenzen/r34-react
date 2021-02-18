import React, { useState } from "react";
import { useSelector } from "react-redux";
import InifinteColumn from "../layout/InfiniteColumn";
import Post from "../post/Post";
import { getMoreResults } from "../../redux/actions";
import { selectOutOfResults, selectPosts } from "../../redux/selectors";
import LayoutHeader from "../layout/LayoutHeader";
import LayoutOutOfItems from "../layout/LayoutOutOfItems";
import LayoutLoadingItem from "../layout/LayoutLoadingItem";
import useAction from "../../hooks/useAction";

export default function Search() {
  const posts = useSelector(selectPosts);
  const hasMorePosts = !useSelector(selectOutOfResults);
  const loadMore = useAction(getMoreResults);
  const [isLoading, setLoading] = useState(false);

  return (
    <>
      <InifinteColumn
        Header={LayoutHeader}
        OutOfItems={LayoutOutOfItems}
        items={posts}
        LoadingItem={LayoutLoadingItem}
        hasMoreRows={hasMorePosts}
        ItemComponent={Post}
        loadMore={loadMore}
        isLoading={isLoading}
        setLoading={setLoading}
      />
    </>
  );
}
