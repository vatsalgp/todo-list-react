import todos from "../apis/todos";
import history from "../history";

export const signIn = (id, userName) => {
    return {
        type: "SIGN_IN",
        payload: {
            id,
            userName
        }
    };
};

export const signOut = () => {
    return {
        type: "SIGN_OUT",
    };
};

export const fetchTodos = () => async dispatch => {
    const response = await todos.get("/todos.json");
    dispatch({
        type: "FETCH_TODOS",
        payload: response.data
    });
};

export const fetchTodo = id => async dispatch => {
    const response = await todos.get("/todos/" + id + ".json");
    dispatch({
        type: "FETCH_TODO",
        payload: { id, todo: response.data }
    });
};

export const createTodo = formValues => async (dispatch, getState) => {
    const { userId, userName } = getState().auth;
    const response = await todos.post("/todos.json", { ...formValues, userId, userName });
    dispatch({
        type: "CREATE_TODO",
        payload: response.data.name
    });
    history.push("/");
};

export const editTodo = (id, formValues) => async dispatch => {
    const response = await todos.patch("/todos/" + id + ".json", formValues);
    dispatch({
        type: "EDIT_TODO",
        payload: { id, todo: response.data }
    });
    history.push("/");
};

export const deleteTodo = id => async dispatch => {
    await todos.delete("/todos/" + id + ".json");
    dispatch({
        type: "DELETE_TODO",
        payload: id
    });
    history.push("/");
};
