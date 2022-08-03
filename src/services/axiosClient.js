import axios from "axios";

const axiosClient = axios.create({
  baseURL: 'https://demo.corenlp.admicro.vn/tts_multispeakers_demo_2/vangt',
  headers: {
    "content-type": "multipart/form-data",
  },
});

export default axiosClient;
