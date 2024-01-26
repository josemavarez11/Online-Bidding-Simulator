import chalk from "chalk";

const LOG_STYLES = Object.freeze({
    SERVER_ON: chalk.italic.magentaBright,
    REQ_RECEIVED: chalk.italic.rgb(35, 222, 167),
    FILE_RECEIVED: chalk.rgb(36, 128, 209)
});

export default LOG_STYLES;