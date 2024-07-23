const express = require("express");
const path = require("path");
const {
    Worker,
    isMainThread,
    // parentPort,
    // workerData,
} = require("node:worker_threads");
const { log, LEVEL } = require("./logHelper.js");
const { updateRegistrationStatus } = require("./Functions/dbAccess");
const { Config } = require("./Functions/config");
const Ascii = require("ascii-table");

const app = express(),
    bodyParser = require("body-parser");
port = Config.getPort();

let botName = Config.getBotName();

class WebServer {
    constructor() {
        if (isMainThread) {
            return new Promise((resolve, reject) => {
                const worker = new Worker(__filename);
                worker.on("message", resolve);
                worker.on("error", reject);
                worker.on("exit", (code) => {
                    if (code !== 0)
                        reject(new Error(`Worker stopped with exit code ${code}`));
                });
            });
        } else {
            app.use(bodyParser.json());
            app.use(express.static(path.join(__dirname, "www/dist")));

            app.get("/", (req, res) => {
                res.sendFile(path.join(__dirname, "../www/dist/index.html"));
            });

            app.post("/", (req, res) => {
                if (req.body.authId != null && req.body.stx != null) {
                    if (updateRegistrationStatus(req.body.authId, req.body.stx) == null) {
                        log("updateRegistrationStatus failed to execute", LEVEL.Error);
                    }
                } else {
                    log(
                        "Post did not contain required information, request message: " +
                        req,
                        LEVEL.Error
                    );
                }
            });

            app.listen(port, () => {
                const wwwTable = new Ascii("Webserver Started");

                wwwTable.addRow(
                    `${botName} is listening on the port::`,
                    `${port}`,
                    "🟢"
                );
                console.log(wwwTable.toString());
            });
        }
    }
}

let server = new WebServer();
module.exports = { server };
