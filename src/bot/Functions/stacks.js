const fetch = require("node-fetch");
const { log, LEVEL } = require("../logHelper");
const { Config } = require("./config");

const stxCollectionPreAddress = Config.getStxPreAddress();

//checks collection passed to it
async function checkCollection(stacks, collection) {

    log(`${arguments.callee.name} called: ${stacks}`, LEVEL.Output);

    const collectionOutput = await fetch(stxCollectionPreAddress + stacks + collection);
    let collectionOutput_text = await collectionOutput.text();
    let collectionBody_output = JSON.parse(collectionOutput_text);
    let collectionAmount = collectionBody_output["total"];

    return collectionAmount;
}

module.exports = {
    checkCollection,
};
