import crypto from 'node:crypto';

/**
 * Function to split the data into small chunks and decrypts each chunk separately.
 * The encrypted chunks are concatenated and returned as a single string.
 * @param {Buffer} data 
 * @param {crypto.RsaPrivateKey} privateKey 
 * @returns {string} decryptedDataString
 */
const splitAndDecrypt = (data, privateKey) => {
    const chunkSize = 256;

    const chunks = [];
    for (let i = 0; i < data.length; i += chunkSize) {
        chunks.push(data.slice(i, i + chunkSize));
    }

    const decryptedChunks = chunks.map(chunk => {
        try {
            return crypto.privateDecrypt({
                key: privateKey,
                padding: crypto.constants.RSA_PKCS1_PADDING,
                oaepHash: 'sha256',
            }, chunk);
        } catch (error) {
            console.error('Error decrypting chunk:', error);
            return Buffer.from([]);
        }
    })
    const decryptedData = Buffer.concat(decryptedChunks);
    const decryptedDataString = decryptedData.toString();
    return decryptedDataString;
}

export default splitAndDecrypt;