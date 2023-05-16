import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import axios from "axios";
import thunk from "redux-thunk";
import logger from "redux-logger";
import combineReducers from "./store/reducers/index";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";

function saveToLocalStorage(state) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (e) {
    console.log(e);
  }
}

function loadFromLocalStorage() {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistedState = loadFromLocalStorage();
const middlewares = applyMiddleware(thunk, logger);

const store = createStore(
  combineReducers,
  persistedState,
  composeEnhancers(middlewares)
);

const root = ReactDOM.createRoot(document.getElementById("root"));
axios.defaults.withCredentials = true;
store.subscribe(() => saveToLocalStorage(store.getState()));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
export { store };
