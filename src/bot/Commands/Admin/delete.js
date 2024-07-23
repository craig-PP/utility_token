const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require("discord.js");
const { deleteRegistration, checkRegistrationStatus } = require('../../Functions/dbAccess');
const { log, LEVEL } = require('../../logHelper.js');
const { PermissionFlagsBits } = require('discord-api-types/v10');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('delete')
        .setDescription('Delete a user from the database')
        .addStringOption(option =>
            option.setName('userid')
                .setDescription('@username or userid')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator, 0),

    async execute(interaction) {
        let userId = interaction.options.getString('userid');
        log(`${interaction.user.username} used /delete on ${userId} `, LEVEL.Output);
        try {
            let userName = interaction.user.username;
            let userAvatar = interaction.user.displayAvatarURL();
            if (userId.charAt(0) === "<") {
                userId = userId.substring(3);
                userId = userId.slice(0, -1);
            };
            const registered = await checkRegistrationStatus(userId)

            const userDeleted = new EmbedBuilder()
                .setColor("#5c70f2")
                .setTitle("User deleted")
                .setAuthor({
                    name: userName,
                    iconURL: userAvatar,
                })
                .setDescription("User deleted")
                .addFields({ name: userId, value: " has been removed from the database" });

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
                if (deleteRegistration(userId) == null) {
                    throw new Error("deleteRegistration Failed");
                }

                interaction.reply({ embeds: [userDeleted], ephemeral: true });
            } else {
                interaction.reply({ embeds: [userNotFound], ephemeral: true });
            }

        } catch (error) {
            log(error, LEVEL.Error);
        }
    }
}
