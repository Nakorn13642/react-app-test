import axios from "axios";

// create axios instance
const http = axios.create({
    baseURL: "http://localhost:4000",
    withCredentials: false,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
    }
});

http.source = axios.CancelToken.source();
http.isCancel = axios.isCancel;


export default http;