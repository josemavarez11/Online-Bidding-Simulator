import LOG_STYLES from "../../chalkStyles.js";
import processBidding from "../utils/processBidding.js";

/**
 * Function to handle the bidding data received.
 * @param {object} req 
 * @param {object} res 
 */
const sendBiddingHandler = (req, res) => {
    console.log(LOG_STYLES.FILE_RECEIVED(`File received at ${new Date().toLocaleString()}`));
    processBidding();
    res.status(204).end();
}

export default sendBiddingHandler;