// Firebase Functions SDK
// const functions = require("firebase-functions");
// const functions = require("firebase-functions");
import functions from "firebase-functions";
// Firebase Admin SDK
// const admin = require("firebase-admin");
// const bcrypt = require('bcrypt');

// Static seed to generate tokens
// const seed = require("../seed.json");
// Twilio Helper Library
// const twilio = require('twilio');
// Two-factor authentication for Node.js.
// const speakeasy = require("speakeasy");
// Base32 encoder.
// const base32 = require('hi-base32');
// For sms send request
// const axios = require("axios");
// const username = functions.config().movitext.user;
// const password = functions.config().movitext.password;

// CORS Express middleware to enable CORS Requests.
// const cors = require("cors")({
//     origin: true,
// });

// const db = admin.firestore();

// let secret = seed.private_key_id;

// const accountSid =
// 'ACe04c6a54a53d2ff26e4070e8e69e5055';
// Your Account SID from www.twilio.com/console
// const authToken =
// 'f0fcda67470347b4ada12802a30ac7b9';
// Your Auth Token from www.twilio.com/console
// const authToken =
// functions.config().twilio.token;
// Your Auth Token from www.twilio.com/console
// let client = new twilio(accountSid, authToken);


// exports = module.exports = functions.https.onRequest((req, res) => {
//   if (req.method === "GET") {
//     return res.status(200).send("awake");
//   }

//   // Enable CORS using the `cors` express middleware.
//   if (req.method === "POST") {
//     res.status(200).json({
//       messageID: "message.sid",
//       status: "message.status",
//     });
//   } else {
//     return res.status(403).send("Forbidden!");
//   }
// });

let httpTest = functions.https.onCall((data, context) => {
  const firstName = data.firstName;
  const lastName = data.lastName;
  
  return {
    firstName : firstName,
    lastName : lastName,
    fullName : firstName + " " + lastName
  }
});

// module.exports = {httpTest};
export {httpTest};

