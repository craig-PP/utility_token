const { Client, Partials, Collection } = require("discord.js");
const ms = require("ms");
const { Channel, GuildMember, Message, Reaction, ThreadMember, User, GuildScheduledEvent } = Partials;
const { setLogLevel, log, LEVEL } = require('./logHelper.js');
const { welcomeUser } = require("./Events/client/welcome.js");
const { WebServer } = require('./www.js');
const { Config } = require("./Functions/config");

const client = new Client({
    intents: 131071,
    partials: [Channel, GuildMember, Message, Reaction, ThreadMember, User, GuildScheduledEvent],
    allowedMentions: { parse: ["everyone", "roles", "users"] },
    rest: { timeout: ms("1m") }
});

const { loadEvents } = require("./Handlers/eventHandler");

client.events = new Collection();
client.commands = new Collection();

function SetLogLevel() {
    log(`${arguments.callee.name} called`, LEVEL.Trace4);
    const processArgs = process.argv.slice(2);
    if (processArgs.length > 0) {
        setLogLevel(processArgs[0]);
    } else {
        setLogLevel(LEVEL.Output);
    }
    log(`${arguments.callee.name} exit`, LEVEL.Trace4);
};
SetLogLevel();

client.on('guildMemberAdd', async member => {
    welcomeUser(member);
});

loadEvents(client);

module.exports = {
    client,
};

client.login(Config.getToken());

