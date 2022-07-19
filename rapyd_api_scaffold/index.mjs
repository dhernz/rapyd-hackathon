import axios from "axios";
import CryptoJS from "crypto-js";
import "dotenv/config";

const salt = CryptoJS.lib.WordArray.random(12); // Randomly generated for each request.
console.log("salt: "+salt);
const timestamp = (Math.floor(new Date().getTime() / 1000) - 10).toString(); // Current Unix time (seconds).
const access_key = process.env.ACCESS_KEY; // The access key from Client Portal.
const secret_key = process.env.SECRET_KEY; // Never transmit the secret key by itself.
const url_path = "/v1/user"; // Portion after the base URL.

// checks that should be applied upon request reception
// if (JSON.stringify(request.data) !== '{}' && request.data !== '' && typeof request.data !=='object' ){
//     body = JSON.stringify(JSON.parse(request.data));
// }

// const signature = await getSignature(url_path, salt, access_key, secret_key, data);

async function getSignature(method, url_path, salt, access_key, secret_key, data) {
    const to_sign =
      method + url_path + salt + timestamp + access_key + secret_key + data;
    console.log("to_sign:", to_sign);
    let signature = CryptoJS.enc.Hex.stringify(
      CryptoJS.HmacSHA256(to_sign, secret_key)
    );
  
    signature = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(signature));
    console.log("signature: ", signature);
    return signature;
};

const config = {
    url: "https://sandboxapi.rapyd.net/v1/user",
    method: "post"
    // headers: headers
    // data: data
};

// console.log(config);

// call create wallet
// await createWallet(config);

// call update wallet
// await updateWallet(config);

// call disable wallet
// await disableWallet(config);

// call enable wallet
// await enableWallet(config);

// call retrieve wallet
// await retrieveWallet(config);

// call create account
await createAccount(config);

async function createWallet(requestData) {
    // sample request data body
    const data = JSON.stringify({
        "first_name": "Atahualpa",
        "last_name": "Erazo",
        "ewallet_reference_id": "2022-07-04e",
        "metadata": {
            "merchant_defined": true
        },
        "type": "person",
        "contact": {
            "phone_number": "+14155551234",
            "email": "a.erazo@rapyd.net",
            "first_name": "Atahualpa",
            "last_name": "Erazo",
            "mothers_name": "Jane Smith",
            "contact_type": "personal",
            "address": {
                "name": "Atahualpa Erazo",
                "line_1": "123 Main Street",
                "line_2": "",
                "line_3": "",
                "city": "Anytown",
                "state": "NY",
                "country": "US",
                "zip": "12345",
                "phone_number": "+14155551611",
                "metadata": {},
                "canton": "",
                "district": ""
            },
            "identification_type": "DL",
            "identification_number": "1234567890",
            "date_of_birth": "11/22/2000",
            "country": "US",
            "nationality": "US",
            "metadata": {
                "merchant_defined": true
            }
        }
    });
    const signature = await getSignature("post", url_path, salt, access_key, secret_key, data);
    try {
        requestData.data = data;
        requestData.method = "post";
        requestData.headers = await getHeaders(signature);
        console.log(requestData);
        let response = await axios(requestData);
        console.log(response.data);
    } catch (error) {
        console.log(error.response.data);
    }
};

async function updateWallet(requestData) {
    requestData.data = JSON.stringify({
        "email": "a.erazo@beanar.io", // wallet owner email (figure out if this can be updated)
        "ewallet": "ewallet_92174c69e1241bd6400ced235205734b", // id returned on creation, required if phone number is not used
        "ewallet_reference_id": "2022-07-03de", // 
        // "first_name": "Atahualpa", // wallet owner first name (figure out if this can be updated)
        // "last_name": "Erazo", // wallet owner last name (figure out if this can be updated)
        "metadata": {
            "merchant_defined": "updated"
        }
        // "phone_number": "+14155551234" // wallet owner phone number (figure out if this can be updated)
    });
    const signature = await getSignature("put", url_path, salt, access_key, secret_key, requestData.data);
    try {
        requestData.method = "put";
        requestData.headers = await getHeaders(signature);
        console.log(requestData);
        let response = await axios(requestData);
        console.log(response.data);
    } catch (error) {
        console.log(error.response.data);
    }
};

async function disableWallet(requestData) {
    requestData.url = requestData.url+"/disable"
    requestData.data = JSON.stringify({
        "ewallet": "ewallet_92174c69e1241bd6400ced235205734b" // id returned on creation, required if phone number is not used
        // "phone_number": "+14155551234" // wallet owner phone number
    });
    const signature = await getSignature("put", url_path+"/disable", salt, access_key, secret_key, requestData.data);
    try {
        requestData.method = "put";
        requestData.headers = await getHeaders(signature);
        console.log(requestData);
        let response = await axios(requestData);
        console.log(response.data);
    } catch (error) {
        console.log(error.response.data);
    }
};

async function enableWallet(requestData) {
    requestData.url = requestData.url+"/enable"
    requestData.data = JSON.stringify({
        "ewallet": "ewallet_92174c69e1241bd6400ced235205734b" // id returned on creation, required if phone number is not used
        // "phone_number": "+14155551234" // wallet owner phone number
    });
    const signature = await getSignature("put", url_path+"/enable", salt, access_key, secret_key, requestData.data);
    try {
        requestData.method = "put";
        requestData.headers = await getHeaders(signature);
        console.log(requestData);
        let response = await axios(requestData);
        console.log(response.data);
    } catch (error) {
        console.log(error.response.data);
    }
};

async function retrieveWallet(requestData) {
    requestData.data = "";
    requestData.url = requestData.url+"/ewallet_92174c69e1241bd6400ced235205734b";
    const signature = await getSignature("get", url_path+"/ewallet_92174c69e1241bd6400ced235205734b", salt, access_key, secret_key, requestData.data);
    try {
        requestData.method = "get";
        requestData.headers = await getHeaders(signature);
        console.log(requestData);
        let response = await axios(requestData);
        console.log(response.data);
    } catch (error) {
        console.log(error.response.data);
    }
};

async function createAccount(requestData) {
    requestData.url = "https://sandboxapi.rapyd.net/v1/issuing/bankaccounts";
    const data = JSON.stringify({
        "currency": "EUR",
        "country": "DE",
        "description": "Issue virtual account number to wallet",
        "ewallet": "ewallet_45ed5c5671ec48617e4691c71966a55c",
        // "ewallet": "ewallet_173ff120bb0cfb0cf9e313e3d224524a",
        "merchant_reference_id": "account-00003",
        "metadata": {
            "merchant_defined": true
        }
    });
    const url_path_create_account = "/v1/issuing/bankaccounts";
    const signature = await getSignature("post", url_path_create_account, salt, access_key, secret_key, data);
    try {
        requestData.data = data;
        requestData.method = "post";
        requestData.headers = await getHeaders(signature);
        console.log("rd:", requestData);
        let response = await axios(requestData);
        console.log(response.data);
    } catch (error) {
        console.log(error.response.data);
    }
}

async function simulateBankTransfer(requestData) {
    requestData.url = "https://sandboxapi.rapyd.net/v1/issuing/bankaccounts/bankaccounttransfertobankaccount";
    const data = JSON.stringify({
        "issued_bank_account": "issuing_8e1df2a8343a7fa2d22cab8391b00f2a",
        "amount": "200",
        "currency": "EUR"
    });
    const url_path_simulate_bank_transfer = "/v1/issuing/bankaccounts/bankaccounttransfertobankaccount";
    const signature = await getSignature("post", url_path_simulate_bank_transfer, salt, access_key, secret_key, data);
    try {
        requestData.data = data;
        requestData.method = "post";
        requestData.headers = await getHeaders(signature);
        console.log("rd:", requestData);
        let response = await axios(requestData);
        console.log(response.data);
    } catch (error) {
        console.log(error.response.data);
    }
}

async function getHeaders(signature) {
    const headers = {
        "access_key": process.env.ACCESS_KEY,
        "Content-Type": "application/json",
        "salt": ""+salt,
        "signature": signature,
        "timestamp": timestamp
        // "idempotent": timestamp // include for payments or transactions that risk duplication
    };
    
    console.log("headers:", headers);
    return headers;
};