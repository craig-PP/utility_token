const { Client, GatewayIntentBits, Partials, Collection } = require("discord.js");
const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits;
const { Config } = require("./config");
const client = new Client({
    intents: [Guilds, GuildMembers, GuildMessages],
});
let total = 0;

// static
class DiscordRoles {
    static roles = null;

    static getRoles() {
        if (DiscordRoles.roles == null) {
            DiscordRoles.roles = Config.getAutoRoles();
        }
        return DiscordRoles.roles;
    }

    static async updateUserRoles(ctx, discordUser, totalGuests) {
        total = totalGuests;
        const guest_count = await discordUser.checkWallet(total);
        let discordRoles = DiscordRoles.getRoles();
        for (const i in discordRoles) {
            let applicable = guest_count >= discordRoles[i].minGuests;
            let target_role = ctx.guild.roles.cache.find(
                (role) => role.name === discordRoles[i].name
            );
            if (applicable) {
                ctx.member.roles.add(target_role);
            } else {
                ctx.member.roles.remove(target_role);
            }
        }
    }
}

class DiscordUser {
    constructor(userId = null, walletAddress = null) {
        this.userId = userId;
        this.discordUser = null;
        this.walletAddress = walletAddress;
    }

    async getDiscordUser() {
        if (this.discordUser == null) {
            this.discordUser = client.users.cache.find(
                (user) => user.id == this.userId
            );
        }
        return this.discordUser;
    }

    async checkWallet(total) {
        if (this.walletAddress == null) {
            return null;
        }
        return total;
    }
}

module.exports = {
    DiscordUser,
    DiscordRoles,
};
