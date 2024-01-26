import express from 'express';
import https from 'node:https';
import fs from 'node:fs';
import cors from 'cors';
import LOG_STYLES from "./src/chalkStyles.js";
import router from './router.js';
import reqReceivedMiddleware from './src/server/middlewares/reqReceived.js';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express()
    .use(express.static(path.join(__dirname, 'src', 'client')))
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(cors())
    .use(reqReceivedMiddleware)
    .use('/', router);

const sslServer = https.createServer({
    key: fs.readFileSync(path.join(__dirname, 'cert', 'server.key')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'server.cer'))
}, app);

const PORT = 4433;

sslServer.listen(PORT, () => {
    console.log(LOG_STYLES.SERVER_ON(`SSL Server is running on port https://localhost:${PORT}`));
});