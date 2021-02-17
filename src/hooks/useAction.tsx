import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { AnyAction } from "redux";

export default function useAction(actionCreator: () => AnyAction) {
  const dispatch = useDispatch();

  return useCallback(() => {
    dispatch(actionCreator());
  }, [actionCreator, dispatch]);
}
