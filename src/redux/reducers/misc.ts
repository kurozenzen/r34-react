import produce from "immer";
import { MenuType } from "../../data/types";
import { SET_ACTIVE_MENU, AppAction } from "../actions";

export interface MiscState {
  activeMenu: MenuType;
}

export const initialMiscState: MiscState = {
  activeMenu: "search",
};

const setActiveMenu = (state: MiscState, menu: MenuType) =>
  produce(state, (draft) => {
    draft.activeMenu = menu;
  });

export default (
  state: MiscState = initialMiscState,
  action: AppAction
): MiscState => {
  switch (action.type) {
    case SET_ACTIVE_MENU:
      return setActiveMenu(state, action.menu);
    default:
      return state;
  }
};
