const colors = [
    '\x1b[31m',
    '\x1b[37m',
    '\x1b[33m',
    '\x1b[35m',
    '\x1b[36m',
]

const LEVEL = {
    Error: 0,
    Output: 1,
    Trace2: 2,
    Trace3: 3,
    Trace4: 4,
};

function setLogLevel(level) {
    global.logLevel = level;
}

function log(msg, level) {

    if (global.logLevel < level || level >= colors.length) {
        return
    }

    let now = new Date();
    let date = now.getDate();
    let month = now.getMonth() + 1;
    let year = now.getFullYear();
    let hour = now.getHours();
    let minute = now.getMinutes();
    let timestamp = date + '/' + month + '/' + year + ' ' + hour + ':' + minute;

    console.log(timestamp + '   - ' + colors[level] + msg + '\x1b[0m')
}

module.exports = { setLogLevel, log, LEVEL };