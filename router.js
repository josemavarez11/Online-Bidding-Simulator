import { Router } from "express";
import upload from "./src/server/config/multerUploadConfig.js";
import sendBiddingHandler from "./src/server/handlers/sendBiddingHandler.js";

const router = Router();

router.get('/api', (req, res) => res.send('Hello World from SSL API!'));
router.post('/api/sendBiddings', upload.any(), sendBiddingHandler);

export default router;