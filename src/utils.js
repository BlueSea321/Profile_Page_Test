import CryptoJS from "crypto-js";

export const crypt = (string, action = 'e') => {
    const secret_key = 'dreamerly-key';
    const secret_iv = 'dreamerly-iv';
    let output = false;
    const encrypt_method = 'AES-256-CBC';
    const key = CryptoJS.SHA256(secret_key).toString(CryptoJS.enc.Hex);
    const iv = CryptoJS.SHA256(secret_iv).toString().substr(0, 16);

    if (action === 'e') {
        output = CryptoJS.AES.encrypt(string, key, { iv: iv }).toString();
    }
    else if (action === 'd') {
        const decrypted = CryptoJS.AES.decrypt(string, key, { iv: iv });
        output = decrypted.toString(CryptoJS.enc.Utf8);
    };

    return output;
};