import { useEffect } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Header from '../components/Header';
import Ticket from '../components/Ticket';
import PaymentRequest from '../components/PaymentRequest';
import {
    getAuth,
    isSignInWithEmailLink,
    signInWithEmailLink,
    sendSignInLinkToEmail
} from "firebase/auth";
import { useAuth } from "../context/auth";

const actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be in the authorized domains list in the Firebase Console.
  url: "http://localhost:3004",
  // This must be true.
  handleCodeInApp: true,
  // dynamicLinkDomain: "https://inlight.signin.link",
};

const Home: NextPage = () => {
  useEffect(() => {
      checkIfSignedIn();
  }, []);
  const { currentUser, isLoggedIn, logout } = useAuth();

  const checkIfSignedIn = () => {
      // Confirm the link is a sign-in with email link.
      const auth = getAuth();
      console.log('checking if signed in ');
      
      if (isSignInWithEmailLink(auth, window.location.href)) {
          // Additional state parameters can also be passed via URL.
          // This can be used to continue the user's intended action before triggering
          // the sign-in operation.
          // Get the email if available. This should be available if the user completes
          // the flow on the same device where they started it.
          let email = window.localStorage.getItem("emailForSignIn");
          console.log('check if signed in email: ', email);
          
          if (!email) {
              // User opened the link on a different device. To prevent session fixation
              // attacks, ask the user to provide the associated email again. For example:
              email = window.prompt(
                  "Please provide your email for confirmation"
              );
          }
          // The client SDK will parse the code from the link for you.
          signInWithEmailLink(auth, email || "", window.location.href)
              .then((result: any) => {
                  // Clear email from storage.
                  window.localStorage.removeItem("emailForSignIn");
                  // You can access the new user via result.user
                  // Additional user info profile not available via:
                  // result.additionalUserInfo.profile == null
                  // You can check if the user is new or existing:
                  // result.additionalUserInfo.isNewUser
                  console.log("signInWithEmailLink result: ", result);
              })
              .catch((error: any) => {
                  // Some error occurred, you can inspect the code: error.code
                  // Common errors could be invalid email and invalid or expired OTPs.
                  console.log("error: ", error);
              });
      }
  };
  console.log('isLoggedIn', isLoggedIn);
  console.log('currentUser', currentUser);
  

  return (
    <div className="container">
      <Header />
      {!currentUser && <Ticket />}
      {currentUser && <PaymentRequest />}
    </div>
  )
}

export default Home
