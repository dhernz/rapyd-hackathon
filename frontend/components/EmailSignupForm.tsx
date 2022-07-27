
import { FormControl, FormLabel, FormErrorMessage, Input, Button } from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';

const EmailSignupForm = () => {
  function validateEmail(value: string) {
    let error
    if (!value) {
      error = 'Email is required'
    }
    return error
  }

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
            <Field name='email' validate={validateEmail}>
              {({ field, form }) => (
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
            >
              Buy Ticket Now
            </Button>
          </Form>
        )}
      </Formik>
  );
};

export default EmailSignupForm;