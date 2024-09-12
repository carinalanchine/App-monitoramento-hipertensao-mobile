import { FlatList, SafeAreaView, StyleSheet, Text, View, useWindowDimensions } from "react-native"
import { colors } from "../theme/colors";
import { fontFamily } from "../theme/font-family";
import { fontSize } from "../theme/font-size";
import YoutubeIframe from "react-native-youtube-iframe";
import { StatusBarComponent } from "../components/status-bar";
import { useEffect, useState } from "react";
import { useToast } from "react-native-toast-notifications";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../routes/stack.routes";
import { Loading } from "../components/loading";
import { useVideos } from "../service/video.api";

type LoginScreenProps = NativeStackScreenProps<RootStackParamList, "listVideos">;

const extractVideoId = (link: string) => {
  const videoId = link.split("v=")[1].split("&")[0];
  return videoId;
}

const ListVideosScreen = ({ navigation }: LoginScreenProps) => {
  const [loading, setLoading] = useState(false);
  const { listVideos, getVideos } = useVideos();
  const { width } = useWindowDimensions();
  const video_height = 250;
  const toast = useToast();

  const getList = async () => {
    try {
      setLoading(true);
      await getVideos();
    } catch (error) {
      const message = `${error}`.split(": ")[1];
      toast.show(message, { type: "danger" });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getList();
  }, []);

  return (
    <SafeAreaView style={styles.container}>

      <StatusBarComponent variant="lightBlue" />
      <Loading status={loading}></Loading>

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
  videoPlayer: {
    gap: 5,
    width: "100%",
    height: 250,
  },
  listVideos: {
    marginTop: 25,
    paddingHorizontal: 20
  },
  image: {
    height: 50,
    width: 50,
    resizeMode: 'contain'
  },
  emptyCard: {
    flexDirection: 'row',
    gap: 20,
  },
  containerCard: {
    paddingHorizontal: 30,
    paddingTop: 20,
    paddingBottom: 10,
  },
  text: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.lg,
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

export default ListVideosScreen;