import { useEffect, useState } from "react";
import Navbar from "../../Components/Sidebar/Navbar";
import Header from "../../Components/Header/Header";
import {useNavigate } from "react-router-dom";
import { Card } from "antd";
// const { Meta } = Card;
// import axios from "axios";
import { youtubeAPI,  } from "./YouTubeApi";

const Youtube = () => {
  const [playlist, setplaylist] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    youtubeAPI
      .get("", { params: { channelId: "UCINnz-H0Exbl0eyyIqm9HwA" } })
      .then((response) => {
        console.log(response.data.items);
        const videoData = response.data.items.map((item) => ({
          playlistId: item.id,
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.standard.url,
        }));
        setplaylist(videoData);
      })
      .catch((error) => {
        console.error("Error fetching YouTube data:", error);
      });
  }, []);

  const handlePlaylistClick = (playlistId) => {
    console.log(playlistId);
    return navigate(`/youtubevideo/${playlistId}`);
    // fetchPlaylist(playlistId);
  };

  return (
    <div>
      <Navbar>
        <Header Title={"Youtube"} Address={"Youtube"} />
        <h1 style={{marginLeft:10,textAlign:'center'}}>Playlist</h1>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {playlist.map((playlist) => (
            <Card
              key={playlist.playlistId}
              style={{ width: 230,border:'2px solid skyblue', marginLeft: 10,marginTop:4 }}
              cover={<img src={playlist.thumbnail} alt={playlist.title} />}
            >
              {/* <Meta title={video.title} /> */}
              <p>{playlist.title}</p>
              <button
                style={{
                  marginTop: "2px",
                  padding: "4px",
                  border: "2px solid skyblue",
                  borderRadius: "4px",
                }}
                onClick={() => handlePlaylistClick(playlist.playlistId)}
              >
                Start Watching
              </button>
            </Card>
          ))}
        </div>
      </Navbar>
    </div>
  );
};

export default Youtube;
