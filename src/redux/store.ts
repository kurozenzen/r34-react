import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./reducers";
import eventLogging from "./middleware/eventLogging";
import apiRequests from "./middleware/apiRequests";
import { composeWithDevTools } from "redux-devtools-extension";

const persistConfig = {
  key: "appstate",
  storage,
  blacklist: ["results"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(eventLogging, apiRequests))
);
export const persistor = persistStore(store);
