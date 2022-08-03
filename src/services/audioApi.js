import axiosClient from "./axiosClient";
const audioApi = {
  postTextConvertAudio: (data) => {
    return axiosClient.post(data);
  },
};

export default audioApi;
