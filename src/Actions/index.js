import history from "../history";
import * as firebase from "../firebase";

export const signIn = () => async dispatch => {
    const { uid, name } = await firebase.signIn();
    dispatch({
        type: "SIGN_IN",
        payload: {
            uid,
            name
        }
    });
};

export const signOut = () => {
    firebase.signOut();
    return {
        type: "SIGN_OUT",
    };
};

export const fetchTodos = () => async dispatch => {
    const todos = await firebase.getAll();
    dispatch({
        type: "FETCH_TODOS",
        payload: todos
    });
};

export const fetchTodo = id => async dispatch => {
    const todo = await firebase.get(id);
    dispatch({
        type: "FETCH_TODO",
        payload: todo
    });
};

export const createTodo = form => async (dispatch, getState) => {
    const { uid, name } = getState().auth;
    firebase.create(uid, name, form);
    dispatch({
        type: "CREATE_TODO",
    });
    history.push("/");
};

export const editTodo = (id, formValues) => {
    firebase.update(id, formValues);
    history.push("/");
    return {
        type: "EDIT_TODO",
    };
};

export const deleteTodo = id => {
    firebase.remove(id);
    history.push("/");
    return {
        type: "DELETE_TODO",
        payload: id
    };
}
