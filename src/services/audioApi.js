import axiosClient from "./axiosClient";
const audioApi = {
  postTextConvertAudio: async (listSelectText) => {
    const listAudioFetch = await Promise.all(
      listSelectText.map(async (item, index) => {
        const { text, speaker_id, speed_up } = item;

        const data = new FormData();
        data.append("text", text);
        data.append("speaker_id", speaker_id);
        data.append("speed_up", speed_up);

        const arrText = text.split(" ");
        const textIndex = arrText.splice(0, 1).join(" ");
        try {
          const res = await axiosClient.post(item);
          return {
            src: `${process.env.REACT_APP_API_URL}/static/${res.data.file_path}`,
            name: `${index}. ${textIndex}...`,
          };
        } catch (error) {
          return "err";
        }
      })
    );
    return listAudioFetch;
  },
};

export default audioApi;
