const { ChatInputCommandInteraction } = require("discord.js");
const { Config } = require("../../Functions/config");

module.exports = {
    name: "interactionCreate",
    /**
* 
* @param {ChatInputCommandInteraction} interaction
*/
    execute(interaction, client) {
        if (!interaction.isChatInputCommand()) return;

        const command = client.commands.get(interaction.commandName);
        if (!command) return interaction.reply({
            content: "This command is outdated",
            ephemeral: true
        })

        if (command.developer && interaction.user.id !== Config.getDevId())
            return interaction.reply({
                content: "This command is only availble to the Developer",
                ephemeral: true
            })

        command.execute(interaction, client);
    }
}