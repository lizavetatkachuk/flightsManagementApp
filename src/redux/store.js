import React from "react";
import createSagaMiddleware from "redux-saga";
import { logger } from "redux-logger";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers/rootReducer";
import saga from "./sagas/saga";

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware, logger)
);
sagaMiddleware.run(saga);
