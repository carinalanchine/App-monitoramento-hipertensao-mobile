import { useState } from "react"
import { IVideo } from "../interfaces/IVideo"
import { URL_BASE } from "../util/constants";
import { useAuthStore } from "../store/authStore";
import axios from "axios";

export const useVideos = () => {
  const [listVideos, setListVideos] = useState<IVideo[]>(null);
  const authStore = useAuthStore();

  const getVideos = async () => {
    await axios({
      method: 'GET',
      url: URL_BASE + '/video/list',
      headers: {
        Accept: 'application/json',
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + authStore.accessToken
      }
    }).then((response) => {
      setListVideos(response.data.videos);
    }).catch(() => {
      throw new Error("Não foi possível recuperar os vídeos");
    })
  }

  return { listVideos, getVideos };
}
