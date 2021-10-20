const client = require('./discord/client.js');
const { joinVoiceChannel, getVoiceConnection } = require('@discordjs/voice');
const { MessageEmbed } = require('discord.js');
const help = require('./discord/help');
const searchAndPlay = require('./discord/searchAndPlay');
const joinAndplay = require('./discord/joinAndplay');
const getId = require('./discord/getVcId');

const callME = require('./youtube/whichApi');

let prefix = '$';

client.on('messageCreate', async (message) => {
    try {
        if (message.author.bot) { return };
        if (message.content.substr(prefix.length).startsWith('help')) {

            const embed = new MessageEmbed().setColor('#00A9CC').setTitle(' -------------- Command menu --------------').addFields(help);
            message.channel.send({ embeds: [embed] });
        }
        if (message.content.substr(prefix.length).startsWith('change')) {
            const res = callME(); 
            res=='none' ? message.reply('Quota exceeded') : message.reply('Changing API')
        }

        if (message.content.substr(prefix.length).startsWith('play')) {
            const [inVoice, idT] = getId(message);

            if (inVoice) {
                joinVoiceChannel({
                    channelId: idT,
                    guildId: message.guild.id,
                    adapterCreator: message.guild.voiceAdapterCreator,
                })
                joinAndplay(message);
            }
            else {
                message.channel.send('Join vc bro 😑');
            }
        }

        if (message.content.substr(prefix.length).startsWith('ps')) {
            const [inVoice, idT] = getId(message);
            if (inVoice) {
                joinVoiceChannel({
                    channelId: idT,
                    guildId: message.guild.id,
                    adapterCreator: message.guild.voiceAdapterCreator,
                })

                searchAndPlay(message);
            } else {
                message.channel.send('Join vc bro 😑');
            }
        }

        if (message.content.substr(prefix.length) == 'stop') {
            getVoiceConnection(message.guild.id).disconnect();
            message.channel.send('stopping');
        }
    } catch (error) {
        console.log(error)
    }
})
