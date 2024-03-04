function showKeyPrompt(callback) {
    const secretKey = prompt("Coloque a senha:");
    callback(secretKey);
}

function showKeyPopup(isEncrypt) {
    const popup = document.getElementById('popup');
    popup.style.display = 'block';

    const closePopup = document.getElementById('close-popup');
    const submitKey = document.getElementById('submit-key');
    const secretKeyInput = document.getElementById('secret-key');

    closePopup.addEventListener('click', function () {
        popup.style.display = 'none';
    });

    submitKey.addEventListener('click', function () {
        const encryptionKey = secretKeyInput.value;

        if (encryptionKey) {
            popup.style.display = 'none';

            if (isEncrypt) {
                handleEncryption(true, encryptionKey); 
            } else {
                handleEncryption(false, encryptionKey); 
            }
        }
    });
}

function handleEncryption(isEncrypt, encryptionKey) {
    const textInput = document.getElementById('text-input').value;

    if (!textInput) {
        document.getElementById('result').style.display = 'block';
        document.getElementById('result').textContent = '[ERRO] recarregue o site e digite corretamente o texto.';
        return;
    }
    
    try {
        if (isEncrypt) {
            const encryptedText = CryptoJS.AES.encrypt(textInput, encryptionKey).toString();
            document.getElementById('encrypted-text').textContent = `${encryptedText}`;
            document.getElementById('decrypted-text').textContent = ''; 
        } else {
            const decryptedText = CryptoJS.AES.decrypt(textInput, encryptionKey).toString(CryptoJS.enc.Utf8);
            document.getElementById('decrypted-text').textContent = `${decryptedText}`;
            document.getElementById('encrypted-text').textContent = ''; 
        }
        document.getElementById('result').style.display = 'block';
    } catch (error) {
        document.getElementById('result').style.display = 'block';
        document.getElementById('result').textContent = '[ERRO] recarregue o site e digite corretamente o texto.';
    }
}


document.getElementById('encrypt-button').addEventListener('click', function () {
    showKeyPopup(true);
});

document.getElementById('decrypt-button').addEventListener('click', function () {
    showKeyPopup(false);
});


document.getElementById('copy-encrypted').addEventListener('click', function () {
    copyToClipboard('encrypted-text');
});

document.getElementById('copy-decrypted').addEventListener('click', function () {
    copyToClipboard('decrypted-text');
});


function copyToClipboard(elementId) {
    const textElement = document.getElementById(elementId);
    const text = textElement.textContent;
    const formattedText = text.replace(/Texto Descriptografado:|Texto Criptografado:/g, '').trim(); 

    const tempInput = document.createElement('textarea');
    tempInput.value = formattedText;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
}
