const { createAudioPlayer, createAudioResource, getVoiceConnection, AudioPlayerStatus } = require('@discordjs/voice');
const ytdl = require("ytdl-core");

const playVideo = async (id, video) => {
    try {
        const stream = await ytdl(video, { filter: 'audioonly' });
        const player = createAudioPlayer();
        const resource = await createAudioResource(stream);
        const connection = getVoiceConnection(id);
        connection.subscribe(player);
        player.play(resource)
        player.on(AudioPlayerStatus.Idle,()=>setTimeout(()=>connection.disconnect(),10000));

    } catch (error) {
        console.log(error)
    }
}

module.exports = playVideo;