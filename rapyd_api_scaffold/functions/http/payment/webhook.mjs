// Firebase Functions SDK
import functions from "firebase-functions";
import admin from "firebase-admin";
import axios from "axios";
import CryptoJS from "crypto-js";
import "dotenv/config";

// const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
// // console.log("genRanHex...:", genRanHex(24));
// // const salt = CryptoJS.lib.WordArray.random(12); // Randomly generated for each request.
// const salt = genRanHex(24);
// console.log(salt);
// console.log("salt...: "+salt);
// const timestamp = (Math.floor(new Date().getTime() / 1000)-10).toString(); // Current Unix time (seconds).
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
let httpPaymentWebhook = functions.https.onRequest( (req, res) => {
  console.log("incoming payment data method:", req.method);
  console.log("incoming payment data keys:", Object.keys(req));
  console.log("req.body...:", req.body);
  if(req.method == "post"){
    // print req data
    res.status(200).json({
        message: "printed payment data successfully"
    });
  }
  else {
    res.status(200).json({
      message: "getting other type of request: " + req.method
    });
  }
});

// function createPayment(requestData) {
//   return new Promise( async (resolve, reject) => {
//     let salt = CryptoJS.lib.WordArray.random(12); // Randomly generated for each request.
//     console.log("salt: "+salt);
//     let timestamp = (Math.floor(new Date().getTime() / 1000) - 10).toString(); // Current Unix time (seconds).
//     try {
//       requestData.url = "https://sandboxapi.rapyd.net/v1/payments";
//       const data = JSON.stringify(requestData);
//       // const data = JSON.stringify({
//       //     "amount": 101,
//       //     "currency": "USD",
//       //     "description": "Payment by card token",
//       //     "payment_method": "card_8e3d19a8fcb6742decceec77c81b7012",
//       //     "ewallets": [{
//       //             "ewallet": "ewallet_c4450ec162dc72bb068b19194f024d91",
//       //             "percentage": 100
//       //         }
//       //     ],
//       //     "metadata": {
//       //         "merchant_defined": true
//       //     }
//       // });
//       const url_path_create_account = "/v1/payments";
//       const signature = await getSignature("post", url_path_create_account, salt, timestamp, access_key, secret_key, data);
//       try {
//         requestData.data = data;
//         requestData.method = "post";
//         requestData.headers = await getHeaders(signature, salt, timestamp);
//         console.log("rd:", requestData);
//         let response = await axios(requestData);
//         console.log("response.data...:", response.data);
//         // Create payment object in firebase collection
//         try {
//           const db = admin.firestore();
//           let orderId = "order"+response.data.data.id.substring(7, response.data.data.id.length);
//           const orderObject = requestData.metadata;
//           // let payment = await db.collection("payments").doc(response.data.data.id).create(response.data.data);
//           let order = null;
//           if(requestData.order_id != "" && requestData.order_id){
//             // order = await db.collection("orders").doc(requestData.order_id).get();
//             orderId = requestData.order_id;
//             order = await db.collection("orders").doc(orderId).get();
//             console.log("order...:", order.data());
//             console.log("original_amount...:", response.data.data.original_amount);
//             console.log("order.total_paid...:", order.data().total_paid);
//             orderObject.total_paid = order.data().total_paid + response.data.data.original_amount;
//             console.log("summed amount...:", orderObject.total_paid);
//             const summedAmount = orderObject.total_paid;
//             let updateTotal = await db.collection("orders").doc(orderId).update({total_paid: summedAmount});
//             console.log("updated order total...:", updateTotal);
//           }
//           else {
//             orderObject.total_paid = response.data.data.original_amount;
//             order = await db.collection("orders").doc(orderId).create(orderObject);
//             console.log("created order...:", order);
//           }
//           console.log("order...:", order);
//           try {
//             let payment = await db.collection("orders")
//               .doc(orderId).collection("payments")
//               .doc(response.data.data.id)
//               .create(response.data.data);
//             console.log("payment...:", payment);
//             response.data.order_id = orderId;
//             resolve(response.data);
//           } catch (error) {
//             console.log("error creating payment object...:", error);
//           }
//         } catch (error) {
//           console.log("error creating order...:", error);
//         }
//       } catch (error) {
//         console.log("error attempting to create payment object...: ", error.response.data);
//         reject(error.response.data);
//       }
//     } catch (error) {
//       console.log(error);
//       reject(error);
//     }
//   });
// }

export {httpPaymentWebhook};

