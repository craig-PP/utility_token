const { EmbedBuilder } = require("discord.js");
const { log, LEVEL } = require('../../logHelper.js');
const { Config } = require("../../Functions/config.js");
const messages = Config.getMessages().messages;

const welcomeChannel = Config.getWelcomeChannel();
const reportChannel = Config.getReportChannel();

async function welcomeUser(member) {
    const channel = member.guild.channels.cache.get(welcomeChannel);
    const repChannel = member.guild.channels.cache.get(reportChannel);
    const memberName = member.user.username;
    const memberAvatar = member.user.avatarURL();

    if (!channel) return;

    let i = getRandomInt(4);

    let welcomeImage = Config.getData().welcomeImages[i];

    let welcomeMessage = new EmbedBuilder()
        .setColor("#0099ff")
        .setTitle("New Member")
        .setAuthor({
            name: memberName,
            iconURL: memberAvatar,

        })
        .addFields(
            { name: `${general_messages[0].WELCOME}`, value: `${member}` },
        )
        .setImage(welcomeImage);


    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    await channel.send({ embeds: [welcomeMessage] });
    repChannel.send(`New member, ${member}, joined discord <t:${parseInt(member.user.createdTimestamp / 1000)}:R>`)
    log((`New member, ${member}, joined discord <t:${parseInt(member.user.createdTimestamp / 1000)}:R>`), LEVEL.Output);
}

module.exports = {
    name: "welcome",
    welcomeUser,
};