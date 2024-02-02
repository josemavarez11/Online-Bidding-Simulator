import { encryptPayload } from './utils/encryptPayload.js';

const sendBiddingEndpoint = 'https://localhost:4433/api/sendBiddings';
const biddingInput = document.getElementById('bidding-input');
const sendBiddingButton = document.getElementById('sendbidding-button');
const resetFilesButton = document.getElementById('resetfiles-button');

resetFilesButton.addEventListener('click', () => biddingInput.value = '');

sendBiddingButton.addEventListener('click', async () => {
    const files = biddingInput.files;
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
        formData.append('biddings', files[i]);
    }
    try {
        const response = await fetch(sendBiddingEndpoint, {
            method: 'POST',
            body: formData
        });
    
        if(!response.ok) alert('Error server sending files');
        else alert('File uploaded successfully');
    } catch (error) {
        alert('Error uploading files');
    }
});