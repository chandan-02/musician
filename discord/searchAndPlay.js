const searchVideo = require('../youtube/getVideos');
const {MessageEmbed} = require('discord.js');
const playVideo = require('./playvideo');

const searchAndPlay = async(msg) => {
    const arr = await searchVideo(msg.content.substr(4),process.env.GOOGLE_API_2);
    let titles = [];
    arr.map((e, i) => {
        titles.push({ name: (i + 1) + ") " + e.title, value: e.video });
    })
    const embed = new MessageEmbed().setColor('#c184fc').setTitle('Search result :').addFields(...titles);
    const nowPlaying = { name: titles[0].name.substr(2), value: '\u200B' };
    const embed2 = new MessageEmbed().setColor('#ef4445').setTitle('Now playing :').addFields(nowPlaying);
    msg.channel.send({ embeds: [embed] });
    msg.channel.send({ embeds: [embed2] });
    playVideo(msg.guild.id,titles[0].value.trim());
}

module.exports = searchAndPlay;