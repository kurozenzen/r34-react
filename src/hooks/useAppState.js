import { useReducer, useEffect } from "react";

import useLocalStorage from "./useLocalStorage";
import reducer, { initialState } from "./reducer";

/**
 * Creates and manages state
 * @return {[{results: {posts: Array, page: Number, count: Number}, tags: Array, context: {focusedPost: String, activeMenu: String}, options: {originals: Boolean, infinite: Boolean, rated: Boolean}}, dispatch]}
 */
export default function useAppState() {
  const [cache, setCache] = useLocalStorage(initialState);
  const [state, dispatch] = useReducer(reducer, cache);

  useEffect(() => {
    setCache(state);
  }, [setCache, state]);

  return [state, dispatch];
}
