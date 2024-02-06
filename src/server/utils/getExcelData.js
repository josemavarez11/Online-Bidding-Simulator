//Import external modules.
import fs from 'node:fs';
import xlsx from 'xlsx';
import path from 'node:path';
import crypto from 'node:crypto';

//Import internal modules.
import splitAndDecrypt from './splitAndDecrypt.js';

/**
 * Function to decrypt the data from an excel file.
 * It reads the file, save it in the specified path and returns its data.
 * @param {string} inputPath 
 * @param {crypto.RsaPrivateKey} privateKey 
 * @param {string} outputPath 
 * @returns {string} data
 */
const getExcelData = (inputPath, privateKey, outputPath) => {
    const encryptedData = fs.readFileSync(inputPath);
    const decryptedData = splitAndDecrypt(encryptedData, privateKey);
    const decryptedSheet = JSON.parse(decryptedData);
    const newSheet = decryptedSheet.Sheets[decryptedSheet.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(newSheet);
    const filename = path.basename(inputPath, '.xlsx');
    outputPath = path.join(outputPath, `${filename}.xlsx`);
    try {

        xlsx.writeFile(decryptedSheet, outputPath);
        
    } catch (error) {
        error.message = `Error writing the file: ${error}`;
    }
    const stringData = JSON.stringify(data);

    return stringData;
}

export default getExcelData;