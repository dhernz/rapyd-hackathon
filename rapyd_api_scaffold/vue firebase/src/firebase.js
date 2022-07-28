import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/analytics";
import "firebase/compat/functions";

var config = {
  apiKey: "AIzaSyDYfrZX53jPk9idYcM3PqrPUXiRpdZpRYI",
  authDomain: "rapyd-spacex.firebaseapp.com",
  projectId: "rapyd-spacex",
  storageBucket: "rapyd-spacex.appspot.com",
  messagingSenderId: "1082648636072",
  appId: "1:1082648636072:web:2d6be53b880854f44c709d",
  measurementId: "G-QZXCRZGPQK"
};

firebase.initializeApp(config);

//Habilitar para hacer llamados a funciones del emulador
// firebase.functions().useFunctionsEmulator("http://localhost:5001");
// firebase.functions().useEmulator("http://localhost","5001");

export const db = firebase.firestore();
export const fb = firebase;
export const analytics = firebase.analytics();
