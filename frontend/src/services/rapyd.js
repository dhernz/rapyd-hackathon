import axios from "axios";
import CryptoJS from "crypto-js";
// import "dotenv/config";

const salt = CryptoJS.lib.WordArray.random(12); // Randomly generated for each request.
console.log("salt: "+salt);
const timestamp = (Math.floor(new Date().getTime() / 1000) - 10).toString(); // Current Unix time (seconds).
const access_key = process.env.REACT_APP_ACCESS_KEY; // The access key from Client Portal.
const secret_key = process.env.REACT_APP_SECRET_KEY; // Never transmit the secret key by itself.
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

    console.log('method, url_path, salt, access_key, secret_key, data', method, url_path, salt, access_key, secret_key, data);

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

async function createWallet(requestData) {
    // sample request data body
    console.log('env process', process.env);
    const data = JSON.stringify({
        "first_name": "Atahualpa",
        "last_name": "Erazo",
        "ewallet_reference_id": "2022-07-03e",
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

async function getHeaders(signature) {
    const headers = {
        "access_key": process.env.REACT_APP_ACCESS_KEY,
        "Content-Type": "application/json",
        "salt": ""+salt,
        "signature": signature,
        "timestamp": timestamp
        // "idempotent": timestamp // include for payments or transactions that risk duplication
    };
    
    console.log("headers:", headers);
    return headers;
};

const rapyd = {
    getHeaders,
    getSignature,
    createWallet,
    updateWallet,
    retrieveWallet,
    disableWallet,
    enableWallet,
    retrieveWallet,
    config
};

export default rapyd;