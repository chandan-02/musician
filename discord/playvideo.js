const { createAudioPlayer, createAudioResource,getVoiceConnection } = require('@discordjs/voice');
const ytdl = require("ytdl-core");

const playVideo = (id,video) => {
    try {
        const stream = ytdl(video, { filter: 'audioonly' });
        const player = createAudioPlayer();
        const resource = createAudioResource(stream);
        const connection = getVoiceConnection(id);
        connection.subscribe(player);
        player.play(resource);
    } catch (error) {
        console.log(error)
    }
} 

module.exports=playVideo;