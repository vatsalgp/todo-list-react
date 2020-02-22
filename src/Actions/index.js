import streams from "../apis/streams";
import history from "../history";

export const signIn = id => {
    return {
        type: "SIGN_IN",
        payload: id
    };
};

export const signOut = () => {
    return {
        type: "SIGN_OUT",
    };
};

export const fetchStreams = () => async dispatch => {
    const response = await streams.get("/streams" + ".json");
    dispatch({
        type: "FETCH_STREAMS",
        payload: response.data
    });
};

export const fetchStream = id => async dispatch => {
    const response = await streams.get("/streams/" + id + ".json");
    dispatch({
        type: "FETCH_STREAM",
        payload: { id, stream: response.data }
    });
};

export const createStream = formValues => async (dispatch, getState) => {
    const { userId } = getState().auth;
    const response = await streams.post("/streams" + ".json", { ...formValues, userId });
    dispatch({
        type: "CREATE_STREAM",
        payload: response.data.name
    });
    history.push("/");
};

export const editStream = (id, formValues) => async dispatch => {
    const response = await streams.patch("/streams/" + id + ".json", formValues);
    dispatch({
        type: "EDIT_STREAM",
        payload: { id, stream: response.data }
    });
    history.push("/");
};

export const deleteStream = id => async dispatch => {
    await streams.delete("/streams/" + id + ".json");
    dispatch({
        type: "DELETE_STREAM",
        payload: id
    });
    history.push("/");
};
