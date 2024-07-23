const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require("discord.js");
const { checkRegistrationStatus } = require('../../Functions/dbAccess');
const { log, LEVEL } = require('../../logHelper.js');
const { PermissionFlagsBits } = require('discord-api-types/v10');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('checkuser')
        .setDescription('Checks if a user is registered with us')
        .addStringOption(option =>
            option.setName('userid')
                .setDescription('@username or userid')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator, 0),
    /**
    * 
    * @param {ChatInputCommandInteraction} interaction
    */

    async execute(interaction) {
        let userId = interaction.options.getString('userid');
        log(`${interaction.user.id} ${interaction.user.username} used /checkuser on discord id ${userId}`, LEVEL.Output)
        try {
            let userName = interaction.user.username;
            let userAvatar = interaction.user.displayAvatarURL();

            if (userId.charAt(0) === "<") {
                userId = userId.substring(3);
                userId = userId.slice(0, -1);
            };

            const registered = await checkRegistrationStatus(userId)

            const userFound = new EmbedBuilder()
                .setColor("#06cf21")
                .setTitle("Database Management")
                .setAuthor({
                    name: userName,
                    iconURL: userAvatar,
                })
                .setDescription("User Found")
                .addFields({
                    name: "That user has been located on our database with the id:",
                    value: userId,
                });

            const userNotFound = new EmbedBuilder()
                .setColor("#a80000")
                .setTitle("Database Management")
                .setAuthor({
                    name: userName,
                    iconURL: userAvatar,
                })
                .setDescription("User Not Found")
                .addFields({
                    name: "That user does not appear to be on our database",
                    value: "Cannot locate user ID:" + userId,
                });

            if (registered != null && registered) {
                interaction.reply({ embeds: [userFound], ephemeral: true });
            } else {
                interaction.reply({ embeds: [userNotFound], ephemeral: true });
            }
        } catch (error) {
            log(error, LEVEL.Error);
        }
    }
}