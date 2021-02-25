import React, { useCallback, useEffect, useMemo, useState } from "react"
import { CellMeasurer, CellMeasurerCache, IndexRange, InfiniteLoader, List } from "react-virtualized"
import LayoutElementProps from "../LayoutElementProps"

interface InfiniteColumnProps<T> {
  Header?: (props: LayoutElementProps) => JSX.Element
  OutOfItems?: (props: LayoutElementProps) => JSX.Element
  items?: T[]
  LoadingItem: (props: LayoutElementProps) => JSX.Element
  hasMoreRows: boolean
  loadMore: () => void
  ItemComponent: (props: T & LayoutElementProps) => JSX.Element
  isLoading: boolean
  setLoading: (value: boolean) => void
}

export default function InifinteColumn<T>(props: InfiniteColumnProps<T>) {
  const {
    Header,
    items = [],
    LoadingItem,
    hasMoreRows,
    ItemComponent,
    loadMore,
    OutOfItems,
    isLoading,
    setLoading,
  } = props

  const [listRef, setListRef] = useState<List | null>(null)

  const cache = useMemo(
    () =>
      new CellMeasurerCache({
        fixedWidth: true,
      }),
    []
  )

  const prependedRows = Header ? 1 : 0
  const loadingRows = 1

  const rowCount = items.length + prependedRows + loadingRows

  const isRowLoaded = useCallback(
    ({ index }: { index: number }) => index < prependedRows + items.length + (hasMoreRows ? 0 : 1),
    [hasMoreRows, items.length, prependedRows]
  )

  useEffect(() => {
    if (listRef) {
      const listener = () => {
        listRef.measureAllRows()
        listRef.recomputeRowHeights()
        listRef.forceUpdateGrid()
      }

      window.addEventListener("resize", listener)

      return () => {
        window.removeEventListener("resize", listener)
      }
    }
  }, [listRef])

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

            console.warn("index not found / out of bounds. INDEX:", index)
            return null
          }}
        </CellMeasurer>
      )
    },
    [cache, Header, prependedRows, items, ItemComponent, hasMoreRows, isLoading, LoadingItem, OutOfItems]
  )

  const loadMoreRows = (params: IndexRange) => {
    if (isLoading || !hasMoreRows) {
      return Promise.reject(0)
    }

    setLoading(true)
    loadMore()

    return new Promise((resolve) => {
      setTimeout(() => {
        setLoading(false)
        resolve(1)
      }, 1000)
    })
  }

  return (
    <InfiniteLoader isRowLoaded={isRowLoaded} loadMoreRows={loadMoreRows} rowCount={rowCount}>
      {({ onRowsRendered, registerChild }) => {
        const registerChildHereAswell = (child: List) => {
          setListRef(child)
          registerChild(child)
        }
        return (
          <List
            ref={registerChildHereAswell}
            onRowsRendered={onRowsRendered}
            rowRenderer={rowRenderer}
            deferredMeasurementCache={cache}
            overscanRowCount={10}
            rowCount={items.length + prependedRows + loadingRows}
            rowHeight={cache.rowHeight}
            width={window.innerWidth}
            height={window.innerHeight}
          />
        )
      }}
    </InfiniteLoader>
  )
}
