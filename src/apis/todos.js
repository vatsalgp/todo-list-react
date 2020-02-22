import axios from "axios";

export default axios.create({
    baseURL: "https://todo-list-3410d.firebaseio.com/"
});