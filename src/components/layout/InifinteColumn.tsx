import React, { ReactNode, useCallback, useMemo, useState } from "react";
import {
  CellMeasurer,
  CellMeasurerCache,
  IndexRange,
  InfiniteLoader,
  List,
} from "react-virtualized";

interface InfiniteColumnProps<T> {
  header?: ReactNode;
  footer?: ReactNode;
  items?: T[];
  loadingItem: ReactNode;
  hasMoreRows: boolean;
  loadMore: () => void;
  ItemComponent: (
    props: T & {
      style: any;
      virtualRef: ((element: Element) => void) | undefined;
      onLoad: () => void;
    }
  ) => JSX.Element;
}

export default function InifinteColumn<T>(props: InfiniteColumnProps<T>) {
  const {
    header,
    footer,
    items = [],
    loadingItem,
    hasMoreRows,
    ItemComponent,
    loadMore,
  } = props;

  const cache = useMemo(
    () =>
      new CellMeasurerCache({
        fixedWidth: true,
      }),
    []
  );

  const [isLoading, setLoading] = useState(false);

  const prependedRows = header ? 1 : 0;
  const appendedRows = footer ? 1 : 0;
  const loadingRows = hasMoreRows ? 1 : 0;

  const rowCount = items.length + prependedRows + appendedRows + loadingRows;

  const isRowLoaded = useCallback(
    ({ index }: { index: number }) =>
      index < prependedRows + items.length + appendedRows, // maybe weird cause the loaded item (footer) is after the loading item
    [appendedRows, items.length, prependedRows]
  );

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
          {({ measure, registerChild }) => {
            if (index < prependedRows) {
              return header;
            }
            if (index < prependedRows + items.length) {
              return (
                <ItemComponent
                  style={style}
                  virtualRef={registerChild}
                  onLoad={measure}
                  {...items[index - prependedRows]}
                />
              );
            }
            if (index < prependedRows + items.length + 1 && hasMoreRows) {
              return loadingItem;
            }

            if (footer) {
              return footer;
            }

            console.warn("index not found / out of bounds. INDEX:", index);
            return null;
          }}
        </CellMeasurer>
      );
    },
    [cache, footer, hasMoreRows, header, items, loadingItem, prependedRows]
  );

  const loadMoreRows = (params: IndexRange) => {
    if (isLoading || !hasMoreRows) {
      return Promise.resolve(0);
    }

    setLoading(true);
    loadMore();

    return new Promise((resolve) => {
      setTimeout(() => {
        setLoading(false);
        resolve(1);
      }, 1000);
    });
  };

  return (
    <InfiniteLoader
      isRowLoaded={isRowLoaded}
      loadMoreRows={loadMoreRows}
      rowCount={rowCount}
    >
      {({ onRowsRendered, registerChild }) => (
        <List
          ref={registerChild}
          onRowsRendered={onRowsRendered}
          rowRenderer={rowRenderer}
          deferredMeasurementCache={cache}
          overscanRowCount={0}
          rowCount={100}
          rowHeight={cache.rowHeight}
          width={window.innerWidth}
          height={window.innerHeight}
          style={{ gap: 5 }}
        />
      )}
    </InfiniteLoader>
  );
}
