import { FlatList, SafeAreaView, StyleSheet, Text, View, useWindowDimensions } from "react-native"
import { colors } from "../theme/colors";
import { fontFamily } from "../theme/font-family";
import { fontSize } from "../theme/font-size";
import YoutubeIframe from "react-native-youtube-iframe";

const extractVideoId = (link: string) => {
  const videoId = link.split("v=")[1].split("&")[0];

  return videoId
}

const ArrayVideos = [
  {
    link: "https://www.youtube.com/watch?v=iPkWdp4irnE&ab_channel=HospitalIsraelitaAlbertEinstein",
    title: "Titulo1"
  },
  {
    link: "https://www.youtube.com/watch?v=WRkbUg86HDs&ab_channel=Dr.SamuelDalleLaste",
    title: "Titulo2"
  },
  {
    link: "https://www.youtube.com/watch?v=dKSvsAZttr4&ab_channel=Dr.RobertoYano",
    title: "Titulo3"
  }
]

const ListOfVideosScreen = () => {
  const { width } = useWindowDimensions();
  const video_height = 250;

  return (
    <SafeAreaView style={styles.container}>

      <FlatList
        style={styles.listVideos}
        data={ArrayVideos}
        renderItem={({ item }) =>
          <View style={styles.videoPlayer}>
            <Text style={styles.textTitleVideo}>{item.title}</Text>
            <YoutubeIframe
              videoId={extractVideoId(item.link)}
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
    paddingHorizontal: 20
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
    marginTop: 25
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