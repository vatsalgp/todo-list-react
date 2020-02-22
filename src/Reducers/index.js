import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

const INITIAL_STATE = {
    isSignedIn: null,
    userId: null
};

const omit = (obj, prop) => {
    const output = {};
    for (const key in obj) {
        if (key != prop) {
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

const streamReducer = (state = {}, action) => {
    switch (action.type) {
        case "CREATE_STREAM":
            return { ...state };
        case "FETCH_STREAM":
        case "EDIT_STREAM":
            return { ...state, [action.payload.id]: action.payload.stream };
        case "DELETE_STREAM":
            return omit(state, action.payload)
        case "FETCH_STREAMS":
            return { ...state, ...action.payload };
        default:
            return state;
    }
};

export default combineReducers({
    auth: authReducer,
    form: formReducer,
    streams: streamReducer
});