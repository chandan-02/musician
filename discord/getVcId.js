const client = require('./client')

const getId = (msg) => {
    const Guild = client.guilds.cache.get(msg.guild.id);
    const Member = Guild.members.cache.get(msg.author.id);
    if (Member.voice.channel) {
        return [true, Member.voice.channelId]
    } else {
        return [false, "not_in_voice"];
    }
}

module.exports = getId;