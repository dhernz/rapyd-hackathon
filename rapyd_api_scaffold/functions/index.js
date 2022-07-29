// const functions = require("firebase-functions");

import admin from 'firebase-admin';

import {httpTest} from "./http/test.f.mjs";
import {httpWalletServices} from "./http/wallet/services.mjs";
import {httpAccountServices} from "./http/account/services.mjs";
import {httpPaymentServices} from "./http/payment/services.mjs";
import {httpPaymentWebhook} from "./http/payment/webhook.mjs";

import {readFile} from 'fs/promises';
const serviceAccount = JSON.parse(
  await readFile(
    new URL("./rapyd-spacex-firebase-adminsdk-3s9xc-143d46d7d6.json", import.meta.url)
  )
);

const settings = {timestampsInSnapshots: true};
const config = {
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://rapyd-spacex.firebaseio.com",
};

admin.initializeApp(config);
admin.firestore().settings(settings);

// module.exports = httpTest;
// exports = httpTest;
export {httpTest};
export {httpWalletServices};
export {httpAccountServices};
export {httpPaymentServices};
export {httpPaymentWebhook};