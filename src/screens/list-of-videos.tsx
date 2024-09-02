import { FlatList, SafeAreaView, StyleSheet, Text, View, useWindowDimensions } from "react-native"
import { colors } from "../theme/colors";
import { fontFamily } from "../theme/font-family";
import { fontSize } from "../theme/font-size";
import YoutubeIframe from "react-native-youtube-iframe";
import { StatusBarComponent } from "../components/status-bar";
import { useEffect, useState } from "react";
import { IVideo } from "../interfaces/IVideo";
import { URL_BASE } from "../util/constants";
import { useUserStore } from "../store/userStore";

const extractVideoId = (link: string) => {
  const videoId = link.split("v=")[1].split("&")[0];
  return videoId;
}

const ListOfVideosScreen = () => {
  const [listVideos, setListVideos] = useState<IVideo[]>(null);
  const { width } = useWindowDimensions();
  const video_height = 250;
  const userStore = useUserStore();

  useEffect(() => {
    getVideos();
  }, []);

  const getVideos = async () => {
    try {
      const response = await fetch(URL_BASE + '/video/list/', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + userStore.token
        }
      });

      const json = await response.json();

      if (json.status == "success") {
        setListVideos(json.videos);
      }

      else
        throw new Error("Erro ao recuperar vídeos");

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>

      <StatusBarComponent variant="lightBlue" />

      <FlatList
        style={styles.listVideos}
        data={listVideos}
        renderItem={({ item }) =>
          <View style={styles.videoPlayer}>
            <Text style={styles.textTitleVideo}>{item.title}</Text>
            <YoutubeIframe
              videoId={extractVideoId(item.url)}
              height={video_height}
              width={width - 30}
              play={false}
            />

          </View>}
      />

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
  },
  textTitle: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.xl,
    marginTop: 1
  },
  videoPlayer: {
    gap: 5,
    width: "100%",
    height: 250,
  },
  listVideos: {
    marginTop: 25,
    paddingHorizontal: 20
  },
  textTitleVideo: {
    position: "absolute",
    justifyContent: "flex-start",
    alignContent: "flex-start",
    bottom: '5%',
    fontFamily: fontFamily.medium,
    fontSize: fontSize.md
  }
})

export default ListOfVideosScreen;