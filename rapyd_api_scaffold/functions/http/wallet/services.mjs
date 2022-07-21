
// Firebase Functions SDK
// const functions = require("firebase-functions");
// const functions = require("firebase-functions");
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
let httpWalletServices = functions.https.onCall(async (data, context) => {
  const method = data.method;
  data.url = config.url;
  data.method = config.method;
  let response = null;
  switch(method) {
    case "create":
      response = await createWallet(data);
      return response;
      break;
    case "update":
      response = await updateWallet(data);
      return response;
      break;
    case "disable":
      response = await disableWallet(data);
      return response;
      break;
    case "enable":
      response = await enableWallet(data);
      return response;
      break;
    case "retrieve":
      response = await retrieveWallet(data);
      return response;
      break;
  }
});

function createWallet(requestData) {
  return new Promise(async (resolve, reject) => {
    // sample request data body
    try {
      requestData.ewallet_reference_id = requestData.first_name.substring(0,1)
      + requestData.last_name.substring(0,5)
      + timestamp;
      console.log("wallet id: ", requestData.ewallet_reference_id);
      const data = JSON.stringify(requestData);
      const signature = await getSignature("post", url_path, salt, access_key, secret_key, data);
      try {
          requestData.data = data;
          requestData.method = "post";
          requestData.headers = await getHeaders(signature);
          console.log(requestData);
          let response = await axios(requestData);
          console.log(response.data);
          resolve(response.data);
      } catch (error) {
          console.log("Error attempting to generate wallet: ", error.response.data);
          reject(error.response.data);
      }
    } catch (error) {
      console.log("Error attempting to generate signature: ", error);
      reject(error);
    }
  });
};

function updateWallet(requestData) {
  return new Promise( async (resolve, reject) => {
    try {
      const data = JSON.stringify(requestData);
      // requestData.data = JSON.stringify({
          // "email": "a.erazo@beanar.io", // wallet owner email (figure out if this can be updated)
          // "ewallet": "ewallet_92174c69e1241bd6400ced235205734b", // id returned on creation, required if phone number is not used
          // "ewallet_reference_id": "2022-07-03de", // 
          // "first_name": "Atahualpa", // wallet owner first name (figure out if this can be updated)
          // "last_name": "Erazo", // wallet owner last name (figure out if this can be updated)
          // "metadata": {
          //     "merchant_defined": "updated"
          // }
          // "phone_number": "+14155551234" // wallet owner phone number (figure out if this can be updated)
      // });
      const signature = await getSignature("put", url_path, salt, access_key, secret_key, data);
      try {
          requestData.method = "put";
          requestData.headers = await getHeaders(signature);
          console.log(requestData);
          let response = await axios(requestData);
          console.log(response.data);
      } catch (error) {
          console.log(error.response.data);
      }
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

function disableWallet(requestData) {
  return new Promise( async (resolve, reject) => {
    try {
      requestData.url = requestData.url+"/disable";
      const data = JSON.stringify(requestData);
      // requestData.data = JSON.stringify({
      //     "ewallet": "ewallet_92174c69e1241bd6400ced235205734b" // id returned on creation, required if phone number is not used
      //     // "phone_number": "+14155551234" // wallet owner phone number
      // });
      const signature = await getSignature("put", url_path+"/disable", salt, access_key, secret_key, data);
      try {
          requestData.method = "put";
          requestData.headers = await getHeaders(signature);
          console.log(requestData);
          let response = await axios(requestData);
          console.log(response.data);
      } catch (error) {
          console.log(error.response.data);
      }
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

function enableWallet(requestData) {
  return new Promise( async (resolve, reject) => {
    try {
      requestData.url = requestData.url+"/enable"
      const data = JSON.stringify(requestData);
      // requestData.data = JSON.stringify({
      //     "ewallet": "ewallet_92174c69e1241bd6400ced235205734b" // id returned on creation, required if phone number is not used
      //     // "phone_number": "+14155551234" // wallet owner phone number
      // });
      const signature = await getSignature("put", url_path+"/enable", salt, access_key, secret_key, data);
      try {
          requestData.method = "put";
          requestData.headers = await getHeaders(signature);
          console.log(requestData);
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
};

function retrieveWallet(requestData) {
  return new Promise( async (resolve, reject) => {
    const wallet = requestData.eWallet;
    const data = "";
    // requestData.url = requestData.url+"/ewallet_92174c69e1241bd6400ced235205734b";
    requestData.url = requestData.url+"/"+wallet;
    const signature = await getSignature("get", url_path+"/"+wallet, salt, access_key, secret_key, data);
    try {
        requestData.method = "get";
        requestData.headers = await getHeaders(signature);
        console.log(requestData);
        let response = await axios(requestData);
        console.log(response.data);
        resolve(response.data);
    } catch (error) {
        console.log(error.response.data);
        reject(error.response.data);
    }
  });
};

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
export {httpWalletServices};

