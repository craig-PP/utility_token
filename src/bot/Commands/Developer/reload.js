const { ChatInputCommandInteraction, SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { loadCommands } = require("../../Handlers/commandHandler");
const { loadEvents } = require("../../Handlers/eventHandler");
const { log, LEVEL } = require("../../logHelper.js");

module.exports = {
    developer: true,
    data: new SlashCommandBuilder()
        .setName("reload")
        .setDescription("Reload your commands/events")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addSubcommand((options) => options
            .setName("events")
            .setDescription("Reload your events"))
        .addSubcommand((options) => options
            .setName("commands")
            .setDescription("Reload your commands")),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client}
     */
    execute(interaction, client) {
        log(`${interaction.user.username} used /reload`, LEVEL.Output);
        const addSubcommand = interaction.options.getSubcommand();

        switch (addSubcommand) {
            case "events": {
                for (const [key, value] of client.events)
                    client.removeListener(`${key}`, value, true);
                loadEvents(client);
                interaction.reply({ content: "Reloaded Events", ephemeral: true });
            }
                break;
            case "commands": {
                loadCommands(client);
                interaction.reply({ content: "Reloaded Commands", ephemeral: true })
            }
                break;
        }
    }


}