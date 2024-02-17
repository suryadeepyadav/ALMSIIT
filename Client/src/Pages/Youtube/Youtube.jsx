import { useEffect, useState } from "react";
import Navbar from "../../Components/Sidebar/Navbar";
import Header from "../../Components/Header/Header";
import axios from "axios"; // You may need to install axios if not already done.

const Youtube = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    // Your YouTube Data API Key
    const apiKey = "AIzaSyB49GjnnviyW5YJtBLLi3_4LLo-c_xT4tQ";

    // Your query (e.g., search for a specific term)
    const query = "cats"; // Replace with your desired search query

    // API request URL
    const apiUrl = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&type=video&q=${query}`;

    // Fetch YouTube data using axios (or any other HTTP library)
    axios
      .get(apiUrl)
      .then((response) => {
        // Extract video data from the response
        const videoData = response.data.items.map((item) => ({
          videoId: item.id.videoId,
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.default.url,
        }));

        // Update the 'videos' state with the retrieved data
        setVideos(videoData);
      })
      .catch((error) => {
        console.error("Error fetching YouTube data:", error);
      });
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <div>
      <Navbar>
        <Header Title={"Youtube"} Address={"Youtube"} />
        <h1>YouTube Videos</h1>
        <ul>
          {videos.map((video) => (
            <li key={video.videoId}>
              <img src={video.thumbnail} alt={video.title} />
              <p>{video.title}</p>
            </li>
          ))}
        </ul>
      </Navbar>
    </div>
  );
};

export default Youtube;
