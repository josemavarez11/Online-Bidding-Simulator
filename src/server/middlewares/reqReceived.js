import LOG_STYLES from "../../chalkStyles.js"

/**
 * Middleware to log the request received.
 * @param {object} req 
 * @param {object} res 
 * @param {function} next 
 */
const reqReceivedMiddleware = (req, res, next) => {
    console.log(LOG_STYLES.REQ_RECEIVED(`${req.method} RECEIVED ${req.protocol}:/${req.url}`));
    next();
}

export default reqReceivedMiddleware;