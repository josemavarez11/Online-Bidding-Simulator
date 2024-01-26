import LOG_STYLES from "../../chalkStyles.js"

const reqReceivedMiddleware = (req, res, next) => {
    console.log(LOG_STYLES.REQ_RECEIVED(`${req.method} RECEIVED ${req.protocol}:/${req.url}`));
    next();
}

export default reqReceivedMiddleware;