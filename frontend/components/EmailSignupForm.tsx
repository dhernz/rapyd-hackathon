import { useState } from 'react';
import { FormControl, FormLabel, FormErrorMessage, Input, Button, Flex } from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import { getAuth, sendSignInLinkToEmail } from "firebase/auth";
import Router from "next/router";
import { toast } from "react-toastify";

const actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be in the authorized domains list in the Firebase Console.
  url: "http://localhost:3000",
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

  const onLogIn = async () => {
      const auth = getAuth();

      try {
          sendSignInLinkToEmail(auth, email, actionCodeSettings)
              .then(() => {
                  window.localStorage.setItem("emailForSignIn", email);
                  Router.push("/");
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
      }
  };

  return (
    <Formik
        initialValues={{ }}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2))
            actions.setSubmitting(false)
          }, 1000)
        }}
      >
        {(props) => (
          <Form>
            <Flex align="center" justify={'center'} direction="column">
              <Field name='email' validate={validateEmail}>
                {({ field, form }: any) => (
                  <FormControl isInvalid={form.errors.name && form.touched.name}>
                    {/* <FormLabel>First name</FormLabel> */}
                    <Input {...field} placeholder='myemail@gmail.com' />
                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Button
                mt={4}
              //   colorScheme='teal'
              bgGradient="linear(to-r, #95A3E6, #E9BBC4)"
                isLoading={props.isSubmitting}
                type='submit'
                width="180px"
              >
                Buy Ticket Now
              </Button>
                
            </Flex>
          </Form>
        )}
      </Formik>
  );
};

export default EmailSignupForm;