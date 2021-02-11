import React, { useCallback, useState } from "react";
import styled from "styled-components";
import {
  List,
  CellMeasurerCache,
  CellMeasurer,
  InfiniteLoader,
  IndexRange,
  WindowScroller,
  AutoSizer,
} from "react-virtualized";
import "react-virtualized/styles.css";

import { useSelector } from "react-redux";
import {
  selectCount,
  selectOutOfResults,
  selectPosts,
} from "../../redux/selectors";
import Post from "./Post";
import { resolve } from "path";

const cache = new CellMeasurerCache({
  fixedWidth: true,
});

export default function DynamicList({
  isLoading,
  setLoading,
  loadMore,
}: {
  isLoading: boolean;
  setLoading: (value: boolean) => void;
  loadMore: () => void;
}) {
  const posts = useSelector(selectPosts);
  const count = useSelector(selectCount);
  const outOfResults = useSelector(selectOutOfResults);

  // If there are more items to be loaded then add an extra row to hold a loading indicator.
  const rowCount = posts.length;

  // Only load 1 page of items at a time.
  // Pass an empty callback to InfiniteLoader in case it asks us to load more than once.
  const loadMoreRows = (params: IndexRange) => {
    console.log("LOADING MORE");
    if (isLoading || outOfResults) {
      return Promise.resolve(0);
    }

    loadMore();

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(1);
      }, 1000);
    });
  };

  // Every row is loaded except for our loading indicator row.
  const isRowLoaded = ({ index }: { index: number }) => {
    console.log("CHECK: " + index);
    return index < posts.length - 1;
  };

  const rowRenderer = useCallback(
    ({
      index,
      key,
      parent,
      style,
    }: {
      index: number;
      key: any;
      parent: any;
      style: any;
    }) => {
      return (
        <CellMeasurer
          cache={cache}
          columnIndex={0}
          key={key}
          rowIndex={index}
          parent={parent}
        >
          {({ measure, registerChild }) => (
            <Post
              style={style}
              virtualRef={registerChild}
              onLoad={measure}
              {...posts[index]}
            />
          )}
        </CellMeasurer>
      );
    },
    [posts]
  );

  return (
    <InfiniteLoader
      isRowLoaded={isRowLoaded}
      loadMoreRows={loadMoreRows}
      rowCount={rowCount}
    >
      {({ onRowsRendered, registerChild }) => (
        <AutoSizer disableHeight>
          {({ width }) => (
            <List
              ref={registerChild}
              onRowsRendered={onRowsRendered}
              rowRenderer={rowRenderer}
              deferredMeasurementCache={cache}
              overscanRowCount={0}
              rowCount={100}
              rowHeight={cache.rowHeight}
              width={width}
              height={window.innerHeight}
              style={{ gap: 5 }}
            />
          )}
        </AutoSizer>
      )}
    </InfiniteLoader>
  );
}
