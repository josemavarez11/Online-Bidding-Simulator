import forge from 'node-forge';
import { encryptText } from './encryptText.js';
import { encryptAESKey } from './encryptAESKey.js';

export const encryptPayload = (payload) => {
    // Generate a random symmetric key for AES encryption
    const symmetricKey = forge.random.getBytesSync(16);
    const iv = forge.random.getBytesSync(16);

    // server's public RSA key (replace this with the actual key)
    //const serverPublicKey = fs.readFileSync('./publicServer.pem', { encoding: 'utf8' }); //probar sacando la key de la carpeta actual a la carpeta keys
    const serverPublicKey = `
    -----BEGIN PUBLIC KEY-----
    MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtvGR6+IUovzaX8gajOWS
    0EyfBP/wzfCRQZe3Vl41kuiJnYfU0WSizTuHSaxpSWCLPOZWnRIIrX031llHsZbj
    IgYmbL9k0ma7MCPImLycsPSIY6bUhh7OLZHrEbBltJ8JBX/lm73m9xb02w6AUnXY
    rN9VqQKsI8eXnEY8pZOBBOY7MNDDsJtHB7xAWlcPaMAos10dxFwRmZLf7yWtFCvJ
    dYfqmtKvTFY6zN5ph/rz2vmmRv4nhlPmZAgffYL1K6Jp3JccFsIhrVG3GU9HPECq
    pmVwWo/YDL+7xvWEVCueNKORxiFFW5iamd863TpcVRzmYId0ZuEZ8tiKZqgtSNfT
    CQIDAQAB
    -----END PUBLIC KEY-----
    `

    // Encrypt the symmetric key with the server's public RSA key
    const encryptedSymmetricKey = encryptAESKey(symmetricKey, serverPublicKey)

    // Encrypt the payload using the generated symmetric key
    const encryptedPayload = encryptText(JSON.stringify(payload), symmetricKey, iv)

   return { 
        esk: encryptedSymmetricKey.toString(), 
        rep: forge.util.encode64(iv + encryptedPayload) 
    }
};