import forge from 'node-forge';

export const encryptAESKey = (AESKey, publicKey) => {
    const publicKeyPem = forge.pki.publicKeyFromPem(publicKey);
    const rsaEncryptedAesKey = publicKeyPem.encrypt(AESKey, 'RSA-OAEP');
    return forge.util.encode64(rsaEncryptedAesKey);
}