const { EmbedBuilder } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const { checkRegistrationStatus } = require('../../Functions/dbAccess');
const { Config } = require("../../Functions/config.js");
const register = Config.getMessages().register;
const { log, LEVEL } = require('../../logHelper.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`${register[0].COMMAND_NAME}`)
        .setDescription(`${register[0].COMMAND_DESCRIPTION}`),
    async execute(interaction) {
        log(`${interaction.user.username} used /register`, LEVEL.Output);
        try {
            let userId = interaction.user.id;
            let userName = interaction.user.username;
            let userAvatar = interaction.user.displayAvatarURL();
            const registered = await checkRegistrationStatus(userId);

            const generateRegistrationUrl = new EmbedBuilder()
                .setColor(`${register[0].COLOR}`)
                .setTitle(`${register[0].TITLE}`)
                .setAuthor({
                    name: `${userName}`,
                    iconURL: `${userAvatar}`,
                })
                .setDescription(`${register[0].DESCRIPTION}`)
                .addFields({
                    name: `${register[0].FIELD1_NAME}`,
                    value: `${register[0].FIELD1_VALUE}${userId}&avatar=` + userAvatar + `${register[0].FIELD1_VALUE2}`,
                });

            const alreadyRegistered = new EmbedBuilder()
                .setColor(`${register[0].COLOR_EXISTS}`)
                .setTitle(`${register[0].TITLE}`)
                .setAuthor({
                    name: `${userName}`,
                    iconURL: `${userAvatar}`,
                })
                .setDescription(`${register[0].DESCRIPTION}`)
                .addFields({
                    name: `${register[0].FIELD1_NAME}`,
                    value: `${register[0].FIELD1_VALUE_EXISTS}`,
                });

            if (registered == null || !registered) {
                interaction.reply({ embeds: [generateRegistrationUrl], ephemeral: register[0].EPHEMERAL });
            } else {
                interaction.reply({ embeds: [alreadyRegistered], ephemeral: register[0].EPHEMERAL });
            }

        } catch (error) {
            log(error, LEVEL.Error);
        }
    }
}
