import axios from "axios";
const youtubeAPI = axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3/playlists',
    params: {
        part:'snippet',
        key: 'AIzaSyBYtf_rGDfe8Fq78qQe4kfWPRuczJOmOJg',
        channelId:'UCINnz-H0Exbl0eyyIqm9HwA',
        maxResults:50
    }
});
const youtubeAPI2 = axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3/playlistItems',
    params: {
        part:'snippet',
        key: 'AIzaSyBYtf_rGDfe8Fq78qQe4kfWPRuczJOmOJg',
        channelId:'UCINnz-H0Exbl0eyyIqm9HwA',
        playlistId:'PLYJY_Jluha3cl2A88EvAxz4R9A-tSWh3W',
        maxResults:50
    }
});
const youtubeAPI3 = axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3/videos',
    params: {
        part:'player',
        key: 'AIzaSyBYtf_rGDfe8Fq78qQe4kfWPRuczJOmOJg',
        channelId:'UCINnz-H0Exbl0eyyIqm9HwA',
        id:'ajU6V-If4lY'
    }
});
// export default youtubeAPI;
export {youtubeAPI , youtubeAPI3,youtubeAPI2} ;
