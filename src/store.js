import reduxThunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import reducers from "./Reducers";

const getAuthState = () => {
    const authJSON = window.localStorage.getItem("auth");
    const auth = JSON.parse(authJSON);
    return auth ? auth : {};
};

const persistedState = { auth: getAuthState() };

let store;

if (process.env.NODE_ENV === "production")
    store = createStore(reducers, persistedState, applyMiddleware(reduxThunk));
else {
    const { compose } = require("redux");
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    store = createStore(reducers, persistedState, composeEnhancers(applyMiddleware(reduxThunk)));
}

export default store;