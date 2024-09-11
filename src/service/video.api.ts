import { useState } from "react"
import { IVideo } from "../interfaces/IVideo"
import { useAuthStore } from "../store/authStore";
import { useAxios } from "../api/useAxios";

export const useVideos = () => {
  const [listVideos, setListVideos] = useState<IVideo[]>(null);
  const authStore = useAuthStore();
  const axios = useAxios().instance;

  const getVideos = async () => {
    await axios({
      method: 'GET',
      url: '/video/list',
      headers: { 'Authorization': 'Bearer ' + authStore.accessToken }
    }).then((response) => {
      setListVideos(response.data.videos);
    }).catch((error) => {
      if (error.response)
        throw new Error("Não foi possível recuperar os vídeos");

      throw error;
    })
  }

  return { listVideos, getVideos };
}
