//Import external modules.
import { Router } from "express";

//Import internal modules.
import upload from "./src/server/config/multerUploadConfig.js";
import sendBiddingHandler from "./src/server/handlers/sendBiddingHandler.js";

//Create a router.
const router = Router();

//Route to dispatch a hello world message in the /api path.
router.get('/api', (req, res) => res.send('Hello World from SSL API!'));

//Route to receive encrypted biddings.
router.post('/api/sendBiddings', upload.any(), sendBiddingHandler);

export default router;