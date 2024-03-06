import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "2661dc4fcd8829fcaefe55f6b1787da5",
    language: "ko-KR",
  },
});

export default instance;
