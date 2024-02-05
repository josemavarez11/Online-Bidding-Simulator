import chalk from "chalk";

const LOG_STYLES = Object.freeze({
    SERVER_ON: chalk.italic.magentaBright,
    REQ_RECEIVED: chalk.italic.rgb(35, 222, 167),
    FILE_RECEIVED: chalk.rgb(36, 128, 209),
    DECRYPT_START: chalk.rgb(197, 125, 53),
    DECRYPT_END: chalk.rgb(126, 222, 93),
    DECRYPT_ERROR: chalk.rgb(225, 37, 37)
});

export default LOG_STYLES;