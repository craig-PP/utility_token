const { SlashCommandBuilder } = require("@discordjs/builders");
const { log, LEVEL } = require("../../logHelper.js");
const { PermissionFlagsBits } = require("discord-api-types/v10");
const { client } = require("../../index");
const { Config } = require('../../Functions/config.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("whois")
        .setDescription("Checks a user id for the name")
        .addStringOption((option) =>
            option
                .setName("userid")
                .setDescription("users discord id")
                .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator, 0),
    /**
* 
* @param {ChatInputCommandInteraction} interaction
*/

    async execute(interaction) {
        let userId = interaction.options.getString("userid");
        try {
            log(`${interaction.user.username} used /whois on discordId ${userId} `, LEVEL.Output);
            let guildId = Config.getGuildId();
            const guild = client.guilds.cache.get(guildId);
            const member = await guild.members.fetch(userId);
            const memberName = member.user.username;
            log(`${userId} is known as ${memberName}`, LEVEL.Output);
            interaction.reply(userId + " is known as " + memberName);
        } catch (error) {
            interaction.reply(`User not found with id ${userId}`);
            log(error, LEVEL.Error);
        }
    },
};
