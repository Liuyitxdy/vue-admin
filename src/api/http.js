import axios from "axios";
const http = axios.create({
  baseURL: "http://localhost:9528",
  timeout: 10000,
  method: "get",
});

export default http;
