import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

const INITIAL_STATE = {
    isSignedIn: null,
    userId: null
};

const omit = (obj, prop) => {
    const output = {};
    for (const key in obj) {
        if (key !== prop) {
            output[key] = obj[key];
        }
    }
    return output;
}

const authReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "SIGN_IN":
            return { ...INITIAL_STATE, isSignedIn: true, userId: action.payload };
        case "SIGN_OUT":
            return { ...INITIAL_STATE, isSignedIn: false, userId: null };
        default:
            return state;
    }
};

const todoReducer = (state = {}, action) => {
    switch (action.type) {
        case "CREATE_TODO":
            return { ...state };
        case "FETCH_TODO":
        case "EDIT_TODO":
            return { ...state, [action.payload.id]: action.payload.todo };
        case "DELETE_TODO":
            return omit(state, action.payload)
        case "FETCH_TODOS":
            return { ...state, ...action.payload };
        default:
            return state;
    }
};

export default combineReducers({
    auth: authReducer,
    form: formReducer,
    todos: todoReducer
});