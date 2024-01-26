import LOG_STYLES from "../../chalkStyles.js";

const sendBiddingHandler = (req, res) => {
    console.log(LOG_STYLES.FILE_RECEIVED(`File received at ${new Date().toLocaleString()}`));
    res.status(204).end();
}

export default sendBiddingHandler;