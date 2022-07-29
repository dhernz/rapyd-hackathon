import { useState } from 'react';
import { FormControl, FormLabel, FormErrorMessage, Input, Button, Flex } from '@chakra-ui/react';
import { getAuth, sendSignInLinkToEmail } from "firebase/auth";
import Router from "next/router";
import { toast } from "react-toastify";

const actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be in the authorized domains list in the Firebase Console.
  url: process.env.NEXT_PUBLIC_IS_PRODUCTION ? "https://rapyd-hackathon-astrapay.vercel.app/" : "http://localhost:3000",
  // This must be true.
  handleCodeInApp: true,
  // dynamicLinkDomain: "https://inlight.signin.link",
};

const EmailSignupForm = () => {
  function validateEmail(value: string) {
    let error
    if (!value) {
      error = 'Email is required'
    }
    return error
  }

  const [email, setEmail] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const attemptLogin = async () => {
      setIsSubmitting(true);
      const auth = getAuth();

      try {
          sendSignInLinkToEmail(auth, email, actionCodeSettings)
              .then(() => {
                  window.localStorage.setItem("emailForSignIn", email);
                  console.log('emailForSignIn -> ', email);
                  // Router.push("/");
              })
              .catch((error) => {
                  const errorCode = error.code;
                  const errorMessage = error.message;
                  toast.error(`${errorCode}: ${errorMessage}`, {
                      position: "top-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                  });
                  return;
              });
              setIsSubmitting(false);
              toast('Success! Check your email spam folder for the magic link!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
      } catch(e: any) {
          toast.error(`${e}`, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
          });
          setIsSubmitting(false);
      }
  };

  return (
      <Flex align="center" justify={'center'} direction="column">
        <Input placeholder="myemail@gmail.com" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
        <Button
          mt={4}
          //   colorScheme='teal'
          bgGradient="linear(to-r, #95A3E6, #E9BBC4)"
          isLoading={isSubmitting}
          type='submit'
          width="180px"
          onClick={attemptLogin}
        >
          Buy Ticket Now
        </Button>
      </Flex>
  );
};

export default EmailSignupForm;