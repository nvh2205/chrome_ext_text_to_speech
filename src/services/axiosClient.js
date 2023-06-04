import axios from "axios";

const axiosClient = axios.create({
  baseURL:  `${process.env.REACT_APP_API_URL}/vangt`,
  headers: {
    "content-type": "multipart/form-data",
  },
});

export default axiosClient;
