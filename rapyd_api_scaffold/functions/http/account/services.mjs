
// Firebase Functions SDK
import functions from "firebase-functions";
import axios from "axios";
import CryptoJS from "crypto-js";
import "dotenv/config";

const salt = CryptoJS.lib.WordArray.random(12); // Randomly generated for each request.
console.log("salt: "+salt);
const timestamp = (Math.floor(new Date().getTime() / 1000) - 10).toString(); // Current Unix time (seconds).
const access_key = process.env.ACCESS_KEY; // The access key from Client Portal.
const secret_key = process.env.SECRET_KEY; // Never transmit the secret key by itself.
const url_path = "/v1/user"; // Portion after the base URL.

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
};

// Callable function definition
let httpAccountServices = functions.https.onCall(async (data, context) => {
  const method = data.method;
  data.url = config.url;
  data.method = config.method;
  let response = null;
  switch(method) {
    case "create":
      response = await createAccount(data);
      return response;
      break;
    case "simulateBankTransfer":
      response = await simulateBankTransfer(data);
      return response;
      break;
  }
});

function createAccount(requestData) {
  return new Promise( async (resolve, reject) => {
    try {
      requestData.url = "https://sandboxapi.rapyd.net/v1/issuing/bankaccounts";
      const data = JSON.stringify(requestData);
      // const data = JSON.stringify({
      //     "currency": "EUR",
      //     "country": "DE",
      //     "description": "Issue virtual account number to wallet",
      //     "ewallet": "ewallet_45ed5c5671ec48617e4691c71966a55c",
      //     // "ewallet": "ewallet_173ff120bb0cfb0cf9e313e3d224524a",
      //     "merchant_reference_id": "account-00003",
      //     "metadata": {
      //         "merchant_defined": true
      //     }
      // });
      const url_path_create_account = "/v1/issuing/bankaccounts";
      const signature = await getSignature("post", url_path_create_account, salt, access_key, secret_key, data);
      try {
          requestData.data = data;
          requestData.method = "post";
          requestData.headers = await getHeaders(signature);
          console.log("rd:", requestData);
          let response = await axios(requestData);
          console.log(response.data);
          resolve(response.data);
      } catch (error) {
          console.log(error.response.data);
          reject(error.response.data);
      }
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}

function simulateBankTransfer(requestData) {
  return new Promise( async (resolve, reject) => {
    try {
      requestData.url = "https://sandboxapi.rapyd.net/v1/issuing/bankaccounts/bankaccounttransfertobankaccount";
      const data = JSON.stringify(requestData);
      // const data = JSON.stringify({
      //     "issued_bank_account": "issuing_8e1df2a8343a7fa2d22cab8391b00f2a",
      //     "amount": "200",
      //     "currency": "EUR"
      // });
      const url_path_simulate_bank_transfer = "/v1/issuing/bankaccounts/bankaccounttransfertobankaccount";
      const signature = await getSignature("post", url_path_simulate_bank_transfer, salt, access_key, secret_key, data);
      try {
          requestData.data = data;
          requestData.method = "post";
          requestData.headers = await getHeaders(signature);
          console.log("rd:", requestData);
          let response = await axios(requestData);
          console.log(response.data);
          resolve(response.data);
      } catch (error) {
          console.log(error.response.data);
          reject(error.response.data);
      }
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
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

// module.exports = {httpTest};
export {httpAccountServices};

