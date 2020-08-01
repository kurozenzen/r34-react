import React, { useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAliases,
  selectInfinite,
  selectOutOfResults,
} from "../../redux/selectors";
import { SimpleMap, BLOCK } from "../../data/types";
import TagDataClass from "../../data/Tag";
import Button from "../common/Button";
import Surface, { Line } from "../common/Surface";
import Title from "../common/Title";
import TagList from "../tag/TagList";
import { getMoreResults } from "../../redux/actions";
import outOfResultsPicture from "../../icons/OutOfResults.png";

let concurrencyLock = true;

const lock = () => {
  concurrencyLock = false;
};

const unlock = () => {
  concurrencyLock = true;
};

function hasReachedEndOfPage() {
  return (
    window.innerHeight + document.documentElement.scrollTop >=
    document.documentElement.scrollHeight - window.innerHeight
  );
}

export default function LoadMore() {
  const dispatch = useDispatch();
  const aliases = useSelector(selectAliases);
  const infinite = useSelector(selectInfinite);

  const isOutOfResults = useSelector(selectOutOfResults);

  const aliasesForRendering = useMemo(
    () =>
      aliases.reduce((result: SimpleMap<TagDataClass>, alias) => {
        result[alias.name] = alias;
        return result;
      }, {}),
    [aliases]
  );

  const loadMore = useCallback(() => {
    if (concurrencyLock && !isOutOfResults) {
      lock();
      setTimeout(() => unlock(), 1000);
      dispatch(getMoreResults());
    }
  }, [dispatch, isOutOfResults]);

  window.onscroll = useCallback(() => {
    if (infinite && hasReachedEndOfPage()) {
      loadMore();
    }
  }, [loadMore, infinite]);

  return (
    <>
      {!infinite && !isOutOfResults && (
        <Button type={BLOCK} onClick={loadMore} label="Load More">
          Load More
        </Button>
      )}

      {isOutOfResults && (
        <Surface>
          <img
            src={outOfResultsPicture}
            alt={outOfResultsPicture}
            style={{ width: "100%" }}
          />
          <Line />
          <Title>You have reached the end!</Title>
          <p style={{ textAlign: "center" }}>Go look for something else!</p>
          {aliases.length > 0 && (
            <>
              <p style={{ textAlign: "center" }}>How about some of these?</p>
              <TagList tags={aliasesForRendering} padding />
            </>
          )}
        </Surface>
      )}
    </>
  );
}
