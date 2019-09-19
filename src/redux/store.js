import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import { logger } from "redux-logger";
import { rootReducer } from "./reducers/rootReducer";
import rootSaga from "./sagas/saga";

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware, logger))
);
sagaMiddleware.run(rootSaga);
