import axios from "axios";

export default axios.create({
    baseURL: "https://streames-2e445.firebaseio.com/"
});