import forge from 'node-forge';

export const encryptText = (text, key, iv) => {
    const cipher = forge.cipher.createCipher('AES-CBC', key);
    cipher.start({ iv: iv });
    cipher.update(forge.util.createBuffer(text));
    cipher.finish();
    const encrypted = cipher.output;
    return encrypted.toHex();
}