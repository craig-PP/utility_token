require('dotenv').config();
const fs = require("node:fs"); //use file system
const oauthClient = { id: process.env.OAUTH_CLIENT_ID, secret: process.env.OAUTH_CLIENT_SECRET };
const oauthAuth = { tokenHost: process.env.OAUTH_TOKENHOST, tokenPath: process.env.OAUTH_TOKENPATH };

class Config {
    static data = null;

    static getData() {
        if (Config.data == null) {
            Config.data = JSON.parse(fs.readFileSync("./config.json", "utf8"));
        }
        return Config.data;
    }

    static getMessages() {
        if (Config.messages == null) {
            Config.messages = JSON.parse(fs.readFileSync("./localisation.json", "utf8"));
        }
        return Config.messages;
    }

    static getPort() {
        return Config.getData().botOptions[0].port;
    }
    static getAutoRoles() {
        return Config.getData().autoRoles;
    }
    static getWhiteListRoles() {
        return Config.getData().whiteListRoles;
    }
    static getToken() {
        return process.env.CLIENT_TOKEN;
    }
    static getClientId() {
        return process.env.CLIENT_ID;
    }
    static getGuildId() {
        return process.env.GUILD_ID;
    }
    static getBotName() {
        return Config.getData().botOptions[0].name;
    }
    static getAnnounceChannel() {
        return process.env.ANNOUNCE_CHANNEL_ID;
    }
    static getReportChannel() {
        return process.env.REPORT_CHANNEL_ID;
    }
    static getWelcomeChannel() {
        return process.env.WELCOME_CHANNEL_ID;
    }
    static getOwnderId() {
        return process.env.OWNER_ID;
    }
    static getDevId() {
        return process.env.DEV_ID;
    }
    static getProjectApi() {
        return process.env.PROJECT_API;
    }
    static getCoinApi() {
        return process.env.COIN_API;
    }
    static getStxPreAddress() {
        return process.env.STX_COLLECTION_PREADDRESS;
    }
    static getOAuthConfig() {
        return {
            client: oauthClient,
            auth: oauthAuth,
        };
    }
}
module.exports = { Config };
