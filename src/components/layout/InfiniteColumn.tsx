import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  IndexRange,
  InfiniteLoader,
  List,
} from "react-virtualized";
import LayoutElementProps from "./LayoutElementProps";

interface InfiniteColumnProps<T> {
  Header?: (props: LayoutElementProps) => JSX.Element;
  Footer?: (props: LayoutElementProps) => JSX.Element;
  OutOfItems?: (props: LayoutElementProps) => JSX.Element;
  items?: T[];
  loadingItem: ReactNode;
  hasMoreRows: boolean;
  loadMore: () => void;
  ItemComponent: (props: T & LayoutElementProps) => JSX.Element;
}

export default function InifinteColumn<T>(props: InfiniteColumnProps<T>) {
  const {
    Header,
    Footer,
    items = [],
    loadingItem,
    hasMoreRows,
    ItemComponent,
    loadMore,
    OutOfItems,
  } = props;

  const [listRef, setListRef] = useState<List | null>(null);

  const cache = useMemo(
    () =>
      new CellMeasurerCache({
        fixedWidth: true,
      }),
    []
  );

  const [isLoading, setLoading] = useState(false);

  const prependedRows = Header ? 1 : 0;
  const appendedRows = Footer ? 1 : 0;
  const loadingRows = 1;

  const rowCount = items.length + prependedRows + appendedRows + loadingRows;

  const isRowLoaded = useCallback(
    ({ index }: { index: number }) =>
      index < prependedRows + items.length + appendedRows, // maybe weird cause the loaded item (footer) is after the loading item
    [appendedRows, items.length, prependedRows]
  );

  useEffect(() => {
    console.log("EFFECT");
    if (listRef) {
      const listener = () => {
        console.log("updating", listRef);
        listRef.measureAllRows();
        listRef.recomputeRowHeights();
        listRef.forceUpdateGrid();
      };

      window.addEventListener("resize", listener);

      return () => {
        console.log("cleanup");
        window.removeEventListener("resize", listener);
      };
    }
  }, [listRef]);

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
      console.log("index", index);
      return (
        <CellMeasurer
          cache={cache}
          columnIndex={0}
          key={key}
          rowIndex={index}
          parent={parent}
        >
          {({ measure, registerChild }) => {
            // Index 0
            if (Header && index < prependedRows) {
              console.log("HEADER");
              return (
                <Header
                  style={style}
                  virtualRef={registerChild}
                  onLoad={measure}
                />
              );
            }

            // Index 1
            if (index < prependedRows + items.length) {
              console.log("ITEM ROW");
              return (
                <ItemComponent
                  style={style}
                  virtualRef={registerChild}
                  onLoad={measure}
                  {...items[index - prependedRows]}
                />
              );
            }

            // Index 2
            if (index < prependedRows + items.length + loadingRows) {
              console.log("LOADING ROW");
              return hasMoreRows ? (
                loadingItem
              ) : OutOfItems && items.length > 0 ? (
                <OutOfItems
                  style={style}
                  virtualRef={registerChild}
                  onLoad={measure}
                />
              ) : (
                <div></div>
              );
            }

            // Index 3
            if (
              Footer &&
              index < prependedRows + items.length + loadingRows + appendedRows
            ) {
              console.log("FOOTER");
              return (
                <Footer
                  style={style}
                  virtualRef={registerChild}
                  onLoad={measure}
                />
              );
            }

            console.warn("index not found / out of bounds. INDEX:", index);
            return null;
          }}
        </CellMeasurer>
      );
    },
    [
      cache,
      Header,
      prependedRows,
      items,
      Footer,
      appendedRows,
      hasMoreRows,
      loadingItem,
      OutOfItems,
    ]
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
      {({ onRowsRendered, registerChild }) => {
        const registerChildHereAswell = (child: List) => {
          setListRef(child);
          registerChild(child);
        };
        return (
          <AutoSizer>
            {({ width, height }) => (
              <List
                ref={registerChildHereAswell}
                onRowsRendered={onRowsRendered}
                rowRenderer={rowRenderer}
                deferredMeasurementCache={cache}
                overscanRowCount={0}
                rowCount={
                  items.length + prependedRows + appendedRows + loadingRows
                }
                rowHeight={cache.rowHeight}
                width={window.innerWidth}
                height={window.innerHeight}
              />
            )}
          </AutoSizer>
        );
      }}
    </InfiniteLoader>
  );
}
