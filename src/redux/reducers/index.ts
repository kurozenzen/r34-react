import { combineReducers } from "redux";
import preferences from "./preferences";
import results from "./results";
import tags from "./tags";

export default combineReducers({ tags, results, preferences });
