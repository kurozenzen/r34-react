import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InifinteColumn from "../layout/infinite/InfiniteColumn";
import Post from "../post/Post";
import { getMoreResults, getResults } from "../../redux/actions";
import {
  selectOutOfResults,
  selectPageNumber,
  selectPosts,
  selectPreferences,
} from "../../redux/selectors";
import LayoutHeader from "../layout/LayoutHeader";
import LayoutOutOfItems from "../layout/LayoutOutOfItems";
import LayoutLoadingItem from "../layout/LayoutLoadingItem";
import useAction from "../../hooks/useAction";
import { ResultLayout } from "../../data/types";
import PageLayout from "../layout/pages/PageLayout";
import { API } from "../../misc/api";

export default function Search() {
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);
  const hasMorePosts = !useSelector(selectOutOfResults);
  const loadMore = useAction(getMoreResults);
  const loadPage = useCallback(
    (index: number) => {
      dispatch(getResults(index));
    },
    [dispatch]
  );
  const [isLoading, setLoading] = useState(false);
  const { resultsLayout } = useSelector(selectPreferences);
  const pageNumber = useSelector(selectPageNumber);

  return resultsLayout === ResultLayout.INFINITE_COLUMN ? (
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
  ) : (
    <PageLayout
      header={<LayoutHeader />}
      pageSize={API.pageSize}
      currentPage={pageNumber}
      hasMorePages={hasMorePosts}
      loadPage={loadPage}
      ItemComponent={Post}
      isLoading={isLoading}
      setLoading={setLoading}
      items={posts}
    />
  );
}
