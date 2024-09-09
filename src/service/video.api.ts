import { useEffect, useState } from "react"
import { IVideo } from "../interfaces/IVideo"
import { URL_BASE } from "../util/constants";
import { useAuthStore } from "../store/authStore";

export const useVideos = () => {
  const [listVideos, setListVideos] = useState<IVideo[]>(null);
  const authStore = useAuthStore();

  const getVideos = async () => {
    const response = await fetch(URL_BASE + '/video/list', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + authStore.accessToken
      }
    });

    const json = await response.json();

    if (json.status !== "success")
      throw new Error(json.message);

    setListVideos(json.videos);
  }

  return { listVideos, getVideos };
}
