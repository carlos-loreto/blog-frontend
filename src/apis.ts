import axios from "axios";

export function fetchPosts() {
  return axios.get("http://localhost:8000/api/post").then((res) => res.data);
}

export function createPost(data) {
  return axios
    .post("http://localhost:8000/api/post", data, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
    .then((res) => res.data);
}
