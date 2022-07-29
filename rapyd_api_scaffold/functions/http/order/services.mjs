
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
let httpOrderServices = functions.https.onCall(async (data, context) => {
  const method = data.method;
  data.url = config.url;
  data.method = config.method;
  let response = null;
  switch(method) {
    case "create":
      response = await createOrder(data);
      return response;
      break;
  }
});

function createOrder(requestData) {
  return new Promise( async (resolve, reject) => {
    let salt = CryptoJS.lib.WordArray.random(12); // Randomly generated for each request.
    console.log("salt: "+salt);
    let timestamp = (Math.floor(new Date().getTime() / 1000) - 10).toString(); // Current Unix time (seconds).
    try {
      requestData.url = "https://sandboxapi.rapyd.net/v1/orders";
      const data = JSON.stringify(requestData);
      // const data = JSON.stringify({
      //     "customer": "cus_c62e8561f1f9217676819dce60accc08",
      //     "currency": "usd",
      //     "coupon": "coupon_aa742b3f19b5b096deebe0bdb1892725",
      //     "items": [{
      //             "type": "sku",
      //             "currency": "usd",
      //             "amount": 200.00,
      //             "quantity": 2,
      //             "parent": "sku_e19d99d1dfd757e47fbf36f24d8729dd",
      //             "description": "Deluxe Gamer's Chair"
      //         }, {
      //             "type": "shipping",
      //             "amount": 10.00,
      //             "currency": "usd",
      //             "description": "Shipping"
      //         }
      //     ],
      //     "shipping_address": {
      //         "name": "John Doe",
      //         "line_1": "123 State Street",
      //         "line_2": "Apt. 34",
      //         "line_3": "",
      //         "city": "Anytown",
      //         "district": "",
      //         "canton": "",
      //         "state": "NY",
      //         "country": "US",
      //         "zip": "12345",
      //         "phone_number": "12125559999",
      //         "metadata": {
      //             "merchant_defined": true
      //         }
      //     },
      //     "tax_percent": 0,
      //     "upstream_id": "GZC12345",
      //     "email": "johndoe@rapyd.net",
      //     "metadata": {
      //         "merchant_defined": true
      //     }
      // }
      const url_path_create_order = "/v1/orders";
      const signature = await getSignature("post", url_path_create_order, salt, timestamp, access_key, secret_key, data);
      try {
        requestData.data = data;
        requestData.method = "post";
        requestData.headers = await getHeaders(signature, salt, timestamp);
        console.log("rd:", requestData);
        let response = await axios(requestData);
        console.log("response.data...:", response.data);
        // Create order
        try {
          const db = admin.firestore();
          let order = await db.collection("orders").doc(response.data.data.id).create(response.data.data);
          console.log("order", order);
        } catch (error) {
          console.log("error creating order...:", error);
        }
        resolve(response.data);
      } catch (error) {
        console.log("error attempting to create order...: ", error.response.data);
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

export {httpOrderServices};

