import history from "../history";
import { create, get, getAll, remove, update } from "../firebase";

export const signIn = (uid, name) => {
    return {
        type: "SIGN_IN",
        payload: {
            uid,
            name
        }
    };
};

export const signOut = () => {
    return {
        type: "SIGN_OUT",
    };
};

export const fetchTodos = () => async dispatch => {
    const todos = await getAll();
    dispatch({
        type: "FETCH_TODOS",
        payload: todos
    });
};

export const fetchTodo = id => async dispatch => {
    const todo = await get(id);
    dispatch({
        type: "FETCH_TODO",
        payload: todo
    });
};

export const createTodo = form => async (dispatch, getState) => {
    const { uid, name } = getState().auth;
    create(uid, name, form);
    dispatch({
        type: "CREATE_TODO",
    });
    history.push("/");
};

export const editTodo = (id, formValues) => {
    update(id, formValues);
    history.push("/");
    return {
        type: "EDIT_TODO",
    };
};

export const deleteTodo = id => {
    remove(id);
    history.push("/");
    return {
        type: "DELETE_TODO",
        payload: id
    };
}
