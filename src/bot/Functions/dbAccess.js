const { apiInterface } = require("./apiInterface");
const { log, LEVEL } = require("../logHelper.js");
const { Config } = require("./config");


const projectApi = Config.getProjectApi();
const coinApi = Config.getCoinApi();

//checks if user entered is registered on the database
async function checkRegistrationStatus(discordId) {
    try {
        log(`${arguments.callee.name} called: ${discordId}`, LEVEL.Trace4);
        const output = await apiInterface.GET(
            projectApi + "checkRegistrationStatus ",
            { discordID: discordId }
        );
        let body_output = JSON.parse(output.body);
        return body_output.response == "S";
    } catch (error) {
        log(error, LEVEL.Error);
        return null;
    }
}

//if user is not registered it adds them to the database
async function updateRegistrationStatus(discordId, stx) {
    try {
        log(`${arguments.callee.name} called: ${discordId}, ${stx}`, LEVEL.Trace4);
        return await apiInterface.POST(
            projectApi + "updateRegistrationStatus",
            { discordID: discordId, stacksID: stx }
        );
    } catch (error) {
        log(error, LEVEL.Error);
        return null;
    }
}

//removes a user from the database (this API will sometimes be set for removing claims during testing)
async function deleteRegistration(discordID) {
    try {
        log(`${arguments.callee.name} called: ${discordID}`, LEVEL.Trace4);
        return await apiInterface.POST(
            projectApi + "delete",
            { discordID: discordID }
        );
    } catch (error) {
        log(error, LEVEL.Error);
        return null;
    }
}

//award tokens to users
async function awardToken(discord, awardTokens) {
    log(`${arguments.callee.name} called: ${discord}, ${awardTokens}`, LEVEL.Trace4);
    try {
        return await apiInterface.POST(
            projectApi + "award",
            { discord: discord, pogs: awardTokens }
        );
    } catch (error) {
        log(error, LEVEL.Error);
        log("db connetion error");
        return null;
    }
}

//fetch users store stx wallet
async function getWallet(userId) {
    try {
        log(`${arguments.callee.name} called: ${userId}`, LEVEL.Trace4);
        let output = await apiInterface.GET(
            projectApi + "stacksWallet",
            { discordID: userId }
        );
        let body_output = JSON.parse(output.body);
        const stxID = body_output.response;
        return stxID;
    } catch (error) {
        log(error, LEVEL.Error);
        return null;
    }
}

//check how many tokens a user has
async function checkTokens(stacks) {
    try {
        log(`${arguments.callee.name} called: ${stacks}`, LEVEL.Trace4);
        let checkAddress =
            coinApi + "count/" +
            stacks;
        const output = await apiInterface.GET(checkAddress);
        let pogcheck = JSON.parse(output.body);
        let pogCount = pogcheck.items[0].pog_count;
        return await pogCount;
    } catch (error) {
        log(error, LEVEL.Error);
        return null;
    }
}

//returns a count of all registered users
async function getUserList() {
    try {
        log(`${arguments.callee.name} called`, LEVEL.Trace4);
        let output = await apiInterface.GET(
            projectApi + "userList"
        );
        let body_output = JSON.parse(output.body);
        return body_output.items;
    } catch (error) {
        log(error, LEVEL.Error);
        return null;
    }
}

module.exports = {
    updateRegistrationStatus,
    checkRegistrationStatus,
    deleteRegistration,
    awardToken,
    getWallet,
    checkTokens,
    getUserList,
};
