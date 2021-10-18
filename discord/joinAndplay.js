const { MessageEmbed } = require('discord.js');
const playVideo = require('./playvideo');

const joinAndplay = (msg) => {
    if (msg.content.substr(5).includes(' https://www.youtube.com/')) {
        const nowPlaying = { name: msg.content.substr(5), value: '\u200B' };
        const embed = new MessageEmbed().setColor('#ef4445').setTitle('Now playing :').addFields(nowPlaying);
        msg.channel.send({ embeds: [embed] });
        msg.suppressEmbeds(true);
        playVideo(msg.guild.id,nowPlaying.name.trim())
    } else {
        msg.channel.send('Invalid Link 😑')
    }
}

module.exports = joinAndplay;