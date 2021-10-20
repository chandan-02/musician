const axios = require('axios');
require('dotenv').config();

const arr = [process.env.GOOGLE_API, process.env.GOOGLE_API_2];

const callME = () => {

    const getAPI = async () => {
        for (let i = 0; i < arr.length; i++) {
            const res = await axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&type=video&key=${arr[i]}&q=something`).catch(err => { });
            if (res) {
                process.env.MAIN_API=arr[i];
                break
            }
        }
    }
    getAPI();
    if (process.env.MAIN_API == undefined) { return 'none' }
}

module.exports = callME;

