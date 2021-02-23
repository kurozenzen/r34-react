import { combineReducers } from "redux";
import preferences from "./preferences";
import results from "./results";
import tags from "./tags";
import reader from "./reader";

export default combineReducers({ tags, results, preferences, reader });
