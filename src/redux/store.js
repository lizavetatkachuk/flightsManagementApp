import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { logger } from 'redux-logger';

import { rootReducer } from './reducers/rootReducer';

// const middlewares = [thunk];

// let middleware = applyMiddleware(...middlewares);

// middleware = composeWithDevTools(middleware);

export const store = createStore(rootReducer, composeWithDevTools());
// import React from "react";
// import createSagaMiddleware from "redux-saga";
// import { logger } from "redux-logger";
// import { createStore, applyMiddleware } from "redux";
// import rootReducer from "./reducers/rootReducer";

// export const store = createStore(
//   rootReducer,
//  // applyMiddleware(sagaMiddleware, logger)
// );
// ///sagaMiddleware.run(saga);
