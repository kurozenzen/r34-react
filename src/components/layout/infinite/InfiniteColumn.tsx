import React, { useCallback } from 'react'
import {
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  IndexRange,
  InfiniteLoader,
  List,
  WindowScroller,
} from 'react-virtualized'
import LayoutElementProps from '../LayoutElementProps'

const cache = new CellMeasurerCache({
  fixedWidth: true,
})

interface InfiniteColumnProps<T> {
  Header?: (props: LayoutElementProps) => JSX.Element
  OutOfItems?: (props: LayoutElementProps) => JSX.Element
  items?: T[]
  LoadingItem: (props: LayoutElementProps) => JSX.Element
  hasMoreRows: boolean
  loadMore: () => void
  ItemComponent: (props: T & LayoutElementProps & { index: number }) => JSX.Element
  isLoading: boolean
}

export default function InifinteColumn<T>(props: InfiniteColumnProps<T>) {
  const { Header, items = [], LoadingItem, hasMoreRows, ItemComponent, loadMore, OutOfItems, isLoading } = props

  const prependedRows = Header ? 1 : 0
  const loadingRows = 1
  const rowCount = items.length + prependedRows + loadingRows

  const isRowLoaded = useCallback(
    ({ index }: { index: number }) => index < prependedRows + items.length + (hasMoreRows ? 0 : 1),
    [hasMoreRows, items.length, prependedRows]
  )

  const rowRenderer = useCallback(
    ({ index, key, parent, style }: { index: number; key: any; parent: any; style: any }) => {
      return (
        <CellMeasurer cache={cache} columnIndex={0} key={key} rowIndex={index} parent={parent}>
          {({ measure, registerChild }) => {
            // Index 0
            if (Header && index < prependedRows) {
              return <Header style={style} virtualRef={registerChild} onLoad={measure} />
            }

            // Index 1
            if (index < prependedRows + items.length) {
              return (
                <ItemComponent
                  style={style}
                  virtualRef={registerChild}
                  onLoad={measure}
                  index={index - prependedRows}
                  {...items[index - prependedRows]}
                />
              )
            }

            // Index 2
            if (index < prependedRows + items.length + loadingRows) {
              return hasMoreRows || isLoading ? (
                <LoadingItem style={style} virtualRef={registerChild} onLoad={measure} />
              ) : OutOfItems && items.length > 0 ? (
                <OutOfItems style={style} virtualRef={registerChild} onLoad={measure} />
              ) : (
                <div></div>
              )
            }

            console.warn('index not found / out of bounds. INDEX:', index)
            return null
          }}
        </CellMeasurer>
      )
    },
    [Header, prependedRows, items, ItemComponent, hasMoreRows, isLoading, LoadingItem, OutOfItems]
  )

  const loadMoreRows = useCallback(
    (params: IndexRange) => {
      if (!isLoading && hasMoreRows) {
        loadMore()
      }

      return Promise.resolve()
    },
    [hasMoreRows, isLoading, loadMore]
  )

  const handleResize = useCallback((size) => {
    cache.clearAll()
  }, [])

  return (
    <InfiniteLoader isRowLoaded={isRowLoaded} loadMoreRows={loadMoreRows} rowCount={rowCount}>
      {({ onRowsRendered, registerChild }) => {
        return (
          <AutoSizer onResize={handleResize} disableHeight>
            {({ width }) => {
              return (
                <WindowScroller>
                  {({ height, isScrolling, onChildScroll, scrollTop }) => {
                    return (
                      <List
                        autoHeight
                        height={height}
                        isScrolling={isScrolling}
                        onScroll={onChildScroll}
                        scrollTop={scrollTop}
                        ref={registerChild}
                        onRowsRendered={onRowsRendered}
                        rowRenderer={rowRenderer}
                        deferredMeasurementCache={cache}
                        overscanRowCount={10}
                        rowCount={items.length + prependedRows + loadingRows}
                        rowHeight={cache.rowHeight}
                        width={width}
                      />
                    )
                  }}
                </WindowScroller>
              )
            }}
          </AutoSizer>
        )
      }}
    </InfiniteLoader>
  )
}
