const client = require('./discord/client.js');
const { joinVoiceChannel, getVoiceConnection } = require('@discordjs/voice');
const {MessageEmbed} = require('discord.js');

const searchAndPlay = require('./discord/searchAndPlay');
const joinAndplay = require('./discord/joinAndplay');
const getId = require('./discord/getVcId');

let prefix = '$';
console.log('sdasd')

client.on('messageCreate', async (message) => {
    if (message.author.bot) { return };
    if (message.content.substr(prefix.length).startsWith('help')){
        const help = [
            {
                name:'$help',
                value:'HELP!'
            },
            {
                name:'\u200B',
                value:'______________________________'
            }
            ,
            {
                name:'$ps VIDEO_NAME',
                value:'Search and play cideo'
            },
            {
                name:'\u200B',
                value:'______________________________'
            },
            {
                name:'$play VIDEO_LINK',
                value:'play video with a link'
            },
            {
                name:'\u200B',
                value:'______________________________'
            },
            {
                name:'$stop',
                value:'stop playing and exit vc'
            }
        ]
           
        const embed = new MessageEmbed().setColor('#00A9CC').setTitle(' -------------- Command menu --------------').addFields(help);
        message.channel.send({ embeds: [embed] });
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
        console.log(idT, message.guild.id)
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

})
