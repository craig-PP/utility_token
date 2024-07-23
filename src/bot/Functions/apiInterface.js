const { log, LEVEL } = require('../logHelper.js')
let request = require('request');
const { ClientCredentials } = require('simple-oauth2');
const { Config } = require('./config');
const { Interaction } = require('discord.js');

class ApiInterface {
    constructor() {
        try {
            this._client = new ClientCredentials(Config.getOAuthConfig());
            this._token = null;
        } catch (error) {
            Interaction.reply("We are having difficulty connecting to the database right now, please try again later...");
            log(error, LEVEL.Output);
        }
    }

    async GetToken() {
        if (this._token == null) {
            try {
                log("getting token", LEVEL.Trace4);
                this._token = await this._client.getToken({ json: true });
                log("token:" + this._token, LEVEL.Trace4);
            } catch (error) {
                log('Access Token error ' + error.message, LEVEL.Error);
            }
        } else if (this._token.expired()) {
            try {
                log("refreshing token", LEVEL.Trace4);
                this._token = await accessToken.refresh({ json: true });
            } catch (error) {
                log("token: " + this._token, LEVEL.Trace4);
                this._token = await this._client.getToken({ json: true });
            }
        }
        return this._token;
    }

    async POST(uri, params) {
        try {
            return new Promise(resolve => {
                apiInterface.GetToken().then(localToken =>
                    request(
                        {
                            headers: {
                                Authorization: "Bearer " + localToken.token.access_token
                            },
                            qs: params,
                            uri, uri,
                            method: 'POST'
                        }, function (err, res, body) {
                            resolve(res);
                        })
                )
            });
        } catch (error) {
            Interaction.reply("We are having difficulty connecting to the database right now, please try again later...");
            log(error, LEVEL.Output);
        }
    }

    async GET(uri, params) {
        return new Promise(resolve => {
            try {
                apiInterface.GetToken().then(localToken =>
                    request(
                        {
                            headers: {
                                Authorization: "Bearer " + localToken.token.access_token
                            },
                            qs: params,
                            uri, uri,
                            method: 'GET'
                        }, function (err, res, body) {
                            log("response from GET: " + res.statusCode, LEVEL.Trace3)
                            resolve(res);
                        })
                )
            } catch (error) {
                Interaction.reply("We are having difficulty connecting to the database right now, please try again later...");
                log(error, LEVEL.Output);
            }
        });

    }
}

apiInterface = new ApiInterface();

module.exports = { apiInterface };