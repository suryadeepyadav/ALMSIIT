import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../Components/Sidebar/Navbar";
import Header from "../../Components/Header/Header";
import { youtubeAPI3, youtubeAPI2 } from "./YouTubeApi";

const YoutubeVideo = () => {
  const params = useParams();
  const [video, setVideo] = useState([]);
  const [palylistitem, setpalylistItem] = useState([]);
  useEffect(() => {
    youtubeAPI2
      .get("", {
        params: {
          channelId: "UCINnz-H0Exbl0eyyIqm9HwA",
          playlistId: params.id,
        },
      })
      .then((response) => {
        console.log(response.data.items);
        const videoData = response.data.items.map((item) => ({
          playlistItemId: item.id,
          title: item.snippet.title,
          videoid1: item.snippet.resourceId.videoId,
          thumbnail: item.snippet.thumbnails.standard.url,
        }));
        setpalylistItem(videoData);
        console.log(palylistitem);
        handleVideoClick(videoData[0].videoid1);
      })
      .catch((error) => {
        console.error("Error fetching YouTube data:", error);
      });
  }, []);
  const handleVideoClick = (videoId) => {
    console.log("video clicked:", videoId);
    youtubeAPI3
      .get("", {
        params: { channelId: "UCINnz-H0Exbl0eyyIqm9HwA", id: videoId },
      })
      .then((response) => {
        const videoData = response.data.items.map((item) => ({
          videoId: item.id,
          embedVideo: item.player.embedHtml,
        }));
        const modifiedVideoData = videoData.map((videoItem) => ({
          ...videoItem,
          embedVideo: videoItem.embedVideo.replace(
            'width="480"',
            'width="90%"'
          ),
        }));
        setVideo(modifiedVideoData);
        console.log(video);
      })
      .catch((error) => {
        console.error("Error fetching YouTube data:", error);
      });
  };
  return (
    <div>
      <Navbar>
        <Header Title={"Youtube"} Address={"Youtube"} />
        <h1
          style={{
            marginLeft: 10,
            textAlign: "center",
            color: "blue",
            marginBottom: "4px",
          }}
        >
          {" "}
          Select video from right watch at left
        </h1>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "70%",
            }}
          >
            {video.map((video) => (
              <div
                key={video.videoId}
                className="content"
                style={{ paddingTop: "2px" }}
                dangerouslySetInnerHTML={{ __html: video.embedVideo }}
              ></div>
            ))}
          </div>
          <div style={{ width: "30%" }}>
            {palylistitem.map((playlistitem) => (
              <div key={playlistitem.playlistItemId}>
                <div
                  style={{
                    marginTop: "8px",
                    padding: "4px",
                    border: "2px solid blue",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleVideoClick(playlistitem.videoid1)}
                >
                  {playlistitem.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Navbar>
    </div>
  );
};

export default YoutubeVideo;
