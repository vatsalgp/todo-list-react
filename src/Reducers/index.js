import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

const INITIAL_STATE = {
    isSignedIn: null,
    uid: null,
    name: null
};

const authReducer = (state = INITIAL_STATE, action) => {
    let auth;
    switch (action.type) {
        case "SIGN_IN":
            auth = {
                isSignedIn: true,
                uid: action.payload.uid,
                name: action.payload.name
            };
            window.localStorage.setItem("auth", JSON.stringify(auth));
            return { ...INITIAL_STATE, ...auth };
        case "SIGN_OUT":
            auth = {
                isSignedIn: false,
                uid: null,
                name: null
            };
            window.localStorage.setItem("auth", JSON.stringify(auth));

            return { ...INITIAL_STATE, ...auth };
        default:
            return state;
    }
};

const todoReducer = (state = {}, action) => {
    switch (action.type) {
        case "CREATE_TODO":
            return { ...state };
        case "FETCH_TODOS":
        case "FETCH_TODO":
            return { ...state, ...action.payload };
        case "EDIT_TODO":
            return { ...state };
        case "DELETE_TODO":
            delete state[action.payload];
            return { ...state }
        default:
            return state;
    }
};

export default combineReducers({
    auth: authReducer,
    form: formReducer,
    todos: todoReducer
});