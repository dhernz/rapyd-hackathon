
// Firebase Functions SDK
import functions from "firebase-functions";
import admin from "firebase-admin";
import axios from "axios";
import CryptoJS from "crypto-js";
import "dotenv/config";

const access_key = process.env.ACCESS_KEY; // The access key from Client Portal.
const secret_key = process.env.SECRET_KEY; // Never transmit the secret key by itself.
const url_path = "/v1/user"; // Portion after the base URL.

async function getSignature(method, url_path, salt, timestamp, access_key, secret_key, data) {
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
let httpProductServices = functions.https.onCall(async (data, context) => {
  const method = data.method;
  data.url = config.url;
  data.method = config.method;
  let response = null;
  switch(method) {
    case "create":
      response = await createProduct(data);
      return response;
      break;
    case "update":
      response = await updateProduct(data);
      return response;
      break;
  }
});

function createProduct(requestData) {
  return new Promise( async (resolve, reject) => {
    let salt = CryptoJS.lib.WordArray.random(12); // Randomly generated for each request.
    console.log("salt: "+salt);
    let timestamp = (Math.floor(new Date().getTime() / 1000) - 10).toString(); // Current Unix time (seconds).
    try {
      requestData.url = "https://sandboxapi.rapyd.net/v1/products";
      const data = JSON.stringify(requestData);
      // const data = JSON.stringify({
      //     "id": "",
      //     "name": "Monthly parking",
      //     "type": "services",
      //     "active": true,
      //     "attributes": [
      //         "location",
      //         "size"
      //     ],
      //     "description": "Monthly parking - covered area, compact car",
      //     "images": [
      //         "64bit-encoded-image-1",
      //         "64bit-encoded-image-2"
      //     ],
      //     "metadata": {
      //         "merchant_defined": true
      //     },
      //     "shippable": false,
      //     "statement_descriptor": "",
      //     "unit_label": ""
      // }
      const url_path_create_order = "/v1/products";
      const signature = await getSignature("post", url_path_create_order, salt, timestamp, access_key, secret_key, data);
      try {
        requestData.data = data;
        requestData.method = "post";
        requestData.headers = await getHeaders(signature, salt, timestamp);
        console.log("rd:", requestData);
        let response = await axios(requestData);
        console.log("response.data...:", response.data);
        // Create product
        try {
          const db = admin.firestore();
          let product = await db.collection("products").doc(response.data.data.id).create(response.data.data);
          console.log("product", product);
        } catch (error) {
          console.log("error creating product...:", error);
        }
        resolve(response.data);
      } catch (error) {
        console.log("error attempting to create product...: ", error.response.data);
        reject(error.response.data);
      }
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}

function updateProduct(requestData) {
  return new Promise( async (resolve, reject) => {
    let salt = CryptoJS.lib.WordArray.random(12); // Randomly generated for each request.
    console.log("salt: "+salt);
    let timestamp = (Math.floor(new Date().getTime() / 1000) - 10).toString(); // Current Unix time (seconds).
    const productId = requestData.productId;
    try {
      requestData.url = "https://sandboxapi.rapyd.net/v1/products/"+productId;
      const data = JSON.stringify(requestData);
      // const data = JSON.stringify({
      //     "id": "",
      //     "name": "Monthly parking",
      //     "type": "services",
      //     "active": true,
      //     "attributes": [
      //         "location",
      //         "size"
      //     ],
      //     "description": "Monthly parking - covered area, compact car",
      //     "images": [
      //         "64bit-encoded-image-1",
      //         "64bit-encoded-image-2"
      //     ],
      //     "metadata": {
      //         "merchant_defined": true
      //     },
      //     "shippable": false,
      //     "statement_descriptor": "",
      //     "unit_label": ""
      // }
      const url_path_create_order = "/v1/products/"+productId;
      const signature = await getSignature("post", url_path_create_order, salt, timestamp, access_key, secret_key, data);
      try {
        requestData.data = data;
        requestData.method = "post";
        requestData.headers = await getHeaders(signature, salt, timestamp);
        console.log("rd:", requestData);
        let response = await axios(requestData);
        console.log("response.data...:", response.data);
        // Update product
        try {
          const db = admin.firestore();
          let product = await db.collection("products").doc(requestData.productId).update(response.data.data);
          console.log("updated product", product);
        } catch (error) {
          console.log("error updating product...:", error);
        }
        resolve(response.data);
      } catch (error) {
        console.log("error attempting to update product...: ", error.response.data);
        reject(error.response.data);
      }
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}

async function getHeaders(signature, salt, timestamp) {
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

export {httpProductServices};

