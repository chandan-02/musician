require('dotenv').config();
const axios = require('axios')

const searchVideo = async (query, API) => {
    var res = await axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&type=video&key=${API}&q=${query}`).catch(err => { });
    let arrVideo = [];
    if (res){
        res.data.items.map(eachVideo => {
            let videoObj = {
                video: `https://www.youtube.com/watch?v=${eachVideo.id.videoId}`,
                title: eachVideo.snippet.title.replace(/&quot;/g, '"')
            }
            arrVideo.push(videoObj);
        })
        return arrVideo;
    }
    else{
        return '6969';
    }
}

module.exports = searchVideo;