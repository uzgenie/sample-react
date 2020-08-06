import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";
import reduxLogger from "redux-logger";
import rootReducers from "./reducers";
import { ServiceMiddleware } from "./middleware/ServiceMiddleware";

export default function configureStore() {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  return createStore(
    rootReducers,
    composeEnhancers(applyMiddleware(reduxThunk, ServiceMiddleware))
  );
}
