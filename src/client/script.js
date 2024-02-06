Swal.fire({
    title: 'Welcome to Online Bidding',
    text: 'Please select the encrypted files you want to send. They will be decrypted and analyzed to get the winner of the bidding process.',
    icon: 'success',
    confirmButtonText: 'Ok'
});

const sendBiddingEndpoint = 'https://localhost:4433/api/sendBiddings';
const biddingInput = document.getElementById('bidding-input');
const sendBiddingButton = document.getElementById('sendbidding-button');
const resetFilesButton = document.getElementById('resetfiles-button');
const h4 = document.getElementById('h4');

resetFilesButton.addEventListener('click', () => biddingInput.value = '');

sendBiddingButton.addEventListener('click', async () => {
    const files = biddingInput.files;
    if (files.length === 0) {
        Swal.fire({
            title: 'Oops...',
            text: 'Please select at least one file to send',
            icon: 'error',
            confirmButtonText: 'Ok'
        });
        return;
    }

    console.log(files);

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
        formData.append('biddings', files[i]);
    }
    try {
        const response = await fetch(sendBiddingEndpoint, {
            method: 'POST',
            body: formData
        });
    
        if(!response.ok) {
            Swal.fire({
                title: 'Oops...',
                text: 'Error sending biddings to the server',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
        }
        else {
            resetBiddingInput();
            Swal.fire({
                title: 'Success!',
                text: 'Biddings sent successfully',
                icon: 'success',
                confirmButtonText: 'Ok'
            });
        } 
    } catch (error) {
        Swal.fire({
            title: 'Oops...',
            text: 'Something went wrong when uploading the biddings. Please try again later.',
            icon: 'error',
            confirmButtonText: 'Ok'
        });
    }
});

biddingInput.addEventListener('change', () => {
    if (biddingInput.files.length > 0) {
        h4.textContent = `${biddingInput.files.length} files selected`;
    } else {
        h4.textContent = 'No files selected';
    }
});

const resetBiddingInput = () => {
    biddingInput.value = '';
    h4.textContent = 'No files selected';
}