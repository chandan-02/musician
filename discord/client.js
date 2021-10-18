require('dotenv').config();
const {Client,Intents} = require('discord.js');

const client =  new Client({
    intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.GUILD_MEMBERS,
      Intents.FLAGS.GUILD_PRESENCES,
      Intents.FLAGS.GUILD_VOICE_STATES,
      Intents.FLAGS.DIRECT_MESSAGES,
    ],
    partials: ['CHANNEL'] 
  });

client.on('ready',() => {
    console.log(`User : ${client.user.tag}!`)
})

  
client.login(process.env.DISCORD_TOKEN);

module.exports=client;