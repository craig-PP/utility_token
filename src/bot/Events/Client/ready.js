const { loadCommands } = require("../../Handlers/commandHandler");
const { Config } = require("../../Functions/config.js");
let options = Config.getData().botOptions;

module.exports = {
    name: "ready",
    once: true,
    execute(client) {
        console.log(`${options[0].name} is now ready`);

        loadCommands(client);
    }
}