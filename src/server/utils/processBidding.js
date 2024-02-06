// Import external modules.
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

//Import internal modules.
import LOG_STYLES from '../../chalkStyles.js';
import getExcelData from './getExcelData.js';

const privateKey = fs.readFileSync('./keys/private.pem', 'utf8');
const desktopPath = path.join(os.homedir(), 'Desktop');

/**
 * Function to get all the files in the files folder, decrypt them and process its data.
 * It also deletes the files from the files folder after processing them.
 */
const processBidding = () => {
  const encryptedFiles = fs.readdirSync('./files');
  let lowerPrice = Infinity;
  let lowerPriceFile = '';

  encryptedFiles.forEach((encryptedFile) => {
    const encryptedFilePath = path.resolve('./files', encryptedFile);
    console.log(LOG_STYLES.DECRYPT_START('STARTING DECRYPTING PROCESS FOR:', encryptedFilePath));
    try {
      const excelData = getExcelData(encryptedFilePath, privateKey, desktopPath);
      const parsedData = JSON.parse(excelData);
      const price = parsedData[0].precio;
      const name = parsedData[0].empresa;

      if (typeof price === 'number' && price < lowerPrice) {
        lowerPrice = price;
        lowerPriceFile = name;
      }

      console.log(LOG_STYLES.DECRYPT_END('FILE DECRYPTED WITH THIS DATA:', excelData));
    } catch (error) {
      console.error(LOG_STYLES.DECRYPT_ERROR('Error decrypting file', error));
    }
  });
  const result = `The winner is ${lowerPriceFile} with a bid of ${lowerPrice}`;
  fs.readdirSync('./files').forEach((file) => {
    const filePath = path.join('./files', file);
    fs.unlinkSync(filePath);
  });
  return result;
}

export default processBidding;