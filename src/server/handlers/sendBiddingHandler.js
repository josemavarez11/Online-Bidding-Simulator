import LOG_STYLES from "../../chalkStyles.js";
import processBidding from "../utils/processBidding.js";

/**
 * Function to handle the bidding data received.
 * @param {object} req 
 * @param {object} res 
 */
const sendBiddingHandler = (req, res) => {
    console.log(LOG_STYLES.FILE_RECEIVED(`File received at ${new Date().toLocaleString()}`));
    const result = processBidding();
    res.status(200).json({ message: result });
}

export default sendBiddingHandler;