const { ChatInputCommandInteraction, SlashCommandBuilder } = require('discord.js');
const { log, LEVEL } = require("../../logHelper.js");
const { PermissionFlagsBits } = require("discord-api-types/v10");
const { EmbedBuilder } = require("discord.js");
const { Config } = require("../../Functions/config");
const { client } = require("../../index");
const {
    checkRegistrationStatus,
    awardToken,
    checkTokens,
    getWallet,
} = require("../../Functions/dbAccess")

let coins = Config.getMessages().coins;
let tokens = Config.getData().projectOptions[0].coinName;
let tokenCount = 0;

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`${coins[0].COMMAND_NAME}`)
        .setDescription(`${coins[0].COMMAND_DESCRIPTION} ${tokens}s`)
        .addStringOption((option) =>
            option.setName('userid').setDescription('@username or userid').setRequired(true)
        )
        .addStringOption((option) =>
            option.setName('tokens').setDescription('tokens').setRequired(true)
        )
        .addStringOption((option) =>
            option.setName('reason').setDescription('reason').setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    /**
    * 
    * @param {ChatInputCommandInteraction} interaction
    */

    async execute(interaction) {

        const { options } = interaction;
        try {
            let userName = interaction.user.username;
            let userAvatar = interaction.user.displayAvatarURL();
            let userId = interaction.options.getString("userid");
            if (userId.charAt(0) === "<") {
                userId = userId.substring(2);
                userId = userId.slice(0, -1);
            };
            const reason = options.getString("reason");
            let guildId = Config.getGuildId();
            let guild = client.guilds.cache.get(guildId);
            let tokenReward = options.getString('tokens');

            const member = await guild.members.fetch(userId);
            const memberName = member.user.username;
            const memberAvatar = member.user.avatarURL();

            log(`${userName} used /${coins[0].COMMAND_NAME} to give ${tokenReward} ${tokens} to ${memberName} for ${reason}`, LEVEL.Output);

            const registered = await checkRegistrationStatus(userId);

            if (!registered) {
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
                interaction.reply({ embeds: [userNotFound], ephemeral: false });
            } else {
                tokenReward = parseInt(tokenReward);
                tokenResponse = await awardToken(userId, tokenReward);
                let tokens = await Config.getData().projectOptions[0].coinName;
                if ((tokenReward > 1) || (tokenReward < -1)) {
                    tokens = tokens + "s";
                }

                try {
                    const stxID = await getWallet(userId);
                    if (stxID == null) {
                        throw new Error("Failed to get wallet for:" + userId);
                    }
                    tokenCount = await checkTokens(stxID);
                    tokenCount = Math.round(tokenCount * 100) / 100;
                    if (stxID == null) {
                        throw new Error(`Failed to check ${tokens}s for: ${userId}: ${stxID}`);
                    }

                } catch (error) {
                    log(`Error: ${error}`, LEVEL.Error);
                    interaction.channel.send(`Error: ${error} - report to PP dev ref: PP API error`);
                    interaction.deleteReply();
                }

                try {
                    const tokenChange = new EmbedBuilder()
                        .setColor(`${coins[0].COLOR}`)
                        .setTitle(`${tokens}${coins[0].TITLE}`)
                        .setAuthor({
                            name: memberName,
                            iconURL: memberAvatar,
                        })
                        .setDescription(`${coins[0].DESCRIPTION}`)
                        .addFields({
                            name: `${userName} ${coins[0].FIELD1_NAME} ${tokenReward} ${tokens} to ${memberName} ${reason}`,
                            value: `New ${tokens} total: ${tokenCount}`,
                        });

                    const tokenRemove = new EmbedBuilder()
                        .setColor(`${coins[0].TAKEN_COLOR}`)
                        .setTitle(`${tokens}${coins[0].TAKEN_TITLE}`)
                        .setAuthor({
                            name: memberName,
                            iconURL: memberAvatar,
                        })
                        .setDescription(`${coins[0].TAKEN_DESCRIPTION}`)
                        .addFields({
                            name: `${userName} ${coins[0].TAKEN_FIELD_NAME} ${tokenReward} ${tokens} from ${memberName} ${reason}`,
                            value: `New ${tokens} total: ${tokenCount}`,
                        });

                    if (tokenResponse.statusMessage == 'OK') {

                        if (tokenReward > 0) {
                            interaction.channel.send(`<@${userId}>`);
                            interaction.reply({ embeds: [tokenChange], ephemeral: coins[0].EPHEMERAL });
                        } else {
                            interaction.channel.send(`<@${userId}>`);
                            interaction.reply({ embeds: [tokenRemove], ephemeral: coins[0].EPHEMERAL });
                        }
                    } else {
                        interaction.reply(`Error, ${tokens}s not awarded, did you enter a number?`)
                    }
                } catch (error) {
                    log(`Error: ${error}`, LEVEL.Error);
                    interaction.channel.send(`Error: ${error} - report to PP dev ref: embed error`);
                    interaction.deleteReply();
                }

            }
        } catch (error) {
            log(error, LEVEL.Error);
            interaction.reply(`Unknown error`);
        }
    },
};