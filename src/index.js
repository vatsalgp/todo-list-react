import React from "react";
import ReactDom from "react-dom";
import reduxThunk from "redux-thunk";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
// import { compose } from "redux";

import App from "./Components/App";
import reducers from "./Reducers";

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const composeEnhancers = x => x;
const store = createStore(reducers, composeEnhancers(applyMiddleware(reduxThunk)));

ReactDom.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.querySelector("#root")
);