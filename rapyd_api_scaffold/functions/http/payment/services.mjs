// Firebase Functions SDK
import functions from "firebase-functions";
import admin from "firebase-admin";
import axios from "axios";
import CryptoJS from "crypto-js";
import "dotenv/config";

const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
// console.log("genRanHex...:", genRanHex(24));
// const salt = CryptoJS.lib.WordArray.random(12); // Randomly generated for each request.
const salt = genRanHex(24);
console.log(salt);
console.log("salt...: "+salt);
const timestamp = (Math.floor(new Date().getTime() / 1000)-10).toString(); // Current Unix time (seconds).
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
let httpPaymentServices = functions.https.onCall(async (data, context) => {
  const method = data.method;
  data.url = config.url;
  data.method = config.method;
  let response = null;
  switch(method) {
    case "createPayment":
      response = await createPayment(data);
      return response;
      break;
    case "listPaymentMethodsByCountry":
      response = await listPaymentMethodsByCountry(data);
      return response;
      break;
    case "getPaymentMethodRequiredFields":
      response = await getPaymentMethodRequiredFields(data);
      return response;
      break;
  }
});

function createPayment(requestData) {
  return new Promise( async (resolve, reject) => {
    try {
      requestData.url = "https://sandboxapi.rapyd.net/v1/payments";
      const data = JSON.stringify(requestData);
      // const data = JSON.stringify({
      //     "amount": 101,
      //     "currency": "USD",
      //     "description": "Payment by card token",
      //     "payment_method": "card_8e3d19a8fcb6742decceec77c81b7012",
      //     "ewallets": [{
      //             "ewallet": "ewallet_c4450ec162dc72bb068b19194f024d91",
      //             "percentage": 100
      //         }
      //     ],
      //     "metadata": {
      //         "merchant_defined": true
      //     }
      // });
      const url_path_create_account = "/v1/payments";
      const signature = await getSignature("post", url_path_create_account, salt, access_key, secret_key, data);
      try {
        requestData.data = data;
        requestData.method = "post";
        requestData.headers = await getHeaders(signature);
        console.log("rd:", requestData);
        let response = await axios(requestData);
        console.log("response.data...:", response.data);
        // // Create payment object
        // try {
        //   const db = admin.firestore();
        //   let account = await db.collection("wallet").doc(requestData.ewallet).collection("accounts").doc(response.data.data.id).create(response.data.data.bank_account);
        //   console.log("account", account);
        // } catch (error) {
        //   console.log("error creating payment object...:", error);
        // }
        resolve(response.data);
      } catch (error) {
        console.log("error attempting to create payment object...: ", error.response.data);
        reject(error.response.data);
      }
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}

function listPaymentMethodsByCountry(requestData) {
  return new Promise( async (resolve, reject) => {
    const countryCode = requestData.countryCode;
    const currencyCode = requestData.currencyCode;
    const data = "";

    requestData.url = "https://sandboxapi.rapyd.net/v1/payment_methods/country?country="+countryCode+"&currency="+currencyCode;
    const signature = await getSignature("get", "/v1/payment_methods/country?country="+countryCode+"&currency="+currencyCode, salt, access_key, secret_key, data);
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

function getPaymentMethodRequiredFields(requestData) {
  return new Promise( async (resolve, reject) => {
    const paymentType = requestData.paymentType;
    const data = "";

    requestData.url = "https://sandboxapi.rapyd.net/v1/payment_methods/required_fields/"+paymentType;
    const signature = await getSignature("get", "/v1/payment_methods/required_fields/"+paymentType, salt, access_key, secret_key, data);
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

export {httpPaymentServices};

