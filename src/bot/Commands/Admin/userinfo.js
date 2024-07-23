const { SlashCommandBuilder } = require("@discordjs/builders");
const { log, LEVEL } = require("../../logHelper.js");
const { PermissionFlagsBits } = require("discord-api-types/v10");
const { EmbedBuilder } = require("discord.js");
const { Config } = require("../../Functions/config");
const { client } = require("../../index");
const {
    checkRegistrationStatus,
    checkTokens,
    getWallet,

} = require("../../Functions/dbAccess");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("userinfo")
        .setDescription("Displays userdata")
        .addStringOption((option) =>
            option
                .setName("userid")
                .setDescription("@username or userid")
                .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator, 0),

    async execute(interaction) {
        interaction.deferReply();
        let userId = interaction.options.getString("userid");
        log(`${interaction.user.username} used /userinfo on discordId ${userId} `, LEVEL.Output);
        try {
            if (userId.charAt(0) === "<") {
                userId = userId.substring(2);
                userId = userId.slice(0, -1);
            };
            let guildId = Config.getGuildId();
            const guild = client.guilds.cache.get(guildId);
            const member = await guild.members.fetch(userId);
            const memberAvatar = member.user.displayAvatarURL();
            const memberName = member.user.username;
            const coin = Config.getData().projectOptions[0].coinName;

            const registered = await checkRegistrationStatus(userId);

            if (registered == null || !registered) {
                coinCount = "0";
            } else {
                const stxID = await getWallet(userId);
                if (stxID == null) {
                    throw new Error("Failed to get wallet for:" + userId);
                }
                let coinCount = await checkTokens(stxID);
                coinCount = Math.round(coinCount * 100) / 100;

                const Response = new EmbedBuilder()
                    .setColor("#40c90e")
                    .setTitle("What we know about " + memberName)
                    .setAuthor({
                        name: memberName,
                        iconURL: memberAvatar,
                    })
                    .setThumbnail(memberAvatar)
                    .setDescription("Found on our database")
                    .addFields({ name: "ID: ", value: "user " + userId })
                    .addFields(
                        {
                            name: "Roles",
                            value: `${member.roles.cache
                                .map((r) => r)
                                .join(" ")
                                .replace("@everyone", " ") || "None"
                                }`,
                        },
                        { name: `${coin}s`, value: coinCount.toString(), inline: true },
                        {
                            name: "Member Since",
                            value: `<t:${parseInt(member.joinedTimestamp / 1000)}:R>`,
                            inline: true,
                        },
                        {
                            name: "Discord User Since",
                            value: `<t:${parseInt(member.user.createdTimestamp / 1000)}:R>`,
                            inline: true,
                        }
                    );

                await interaction.channel.send({ embeds: [Response], ephemeral: true });
                interaction.deleteReply();
            }
        } catch (error) {
            interaction.channel.send('User not found, did you enter the id correctly?');
            interaction.deleteReply();
            log(error, LEVEL.Error);
        }

    },
};
