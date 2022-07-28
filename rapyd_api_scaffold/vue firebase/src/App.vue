<template>
  <div id="app">
    <FormulateForm
    class="login-form"
      v-model="form"
      action="#"
      @submit.prevent="submit"
    >
      <FormulateInput
        type="button"
        label="Get Token"
        @click="callHttpTokenServicesGetToken"
      />
    
      <div class="double-wide">
        <FormulateInput
          type="button"
          label="Get Account"
          @click="callHttpAffiliateServicesGetAccount"
        />
        <FormulateInput
          type="button"
          label="Get Fund Info"
          @click="callHttpAffiliateServicesGetFundInfo"
        />
      </div>
      <div class="double-wide">
        <FormulateInput
          type="button"
          label="Account Services"
          @click="callHttpAccountServices"
        />
      </div>

      <!-- <FormulateInput
        type="email"
        label="Email"
        v-model="form.email"
      />
      <FormulateInput
        type="password"
        label="Password"
        v-model="form.password"
      /> -->
      <FormulateInput
        type="submit"
        label="Login"
      />
      <FormulateInput
        type="button"
        label="Sign Out"
        @click="signOut"
      />
      <FormulateInput
        type="textarea"
        label="Token"
        v-model="form.token"
      />
      <FormulateInput
        type="text"
        label="Document Type"
        v-model="form.documentType"
      />
      <FormulateInput
        type="text"
        label="Document Number"
        v-model="form.documentNumber"
      />
      <FormulateInput
        type="text"
        label="Account Number"
        v-model="form.account"
      />
      <FormulateInput
        type="textarea"
        label="Response"
        v-model="form.response"
      />
    </FormulateForm>
  </div>
</template>

<script>
import { fb } from "@/firebase";

export default {
  name: "App",
  components: {},
  data() {
    return {
      form: {
        email: null,
        password: null,
        token: null,
        documentType: null,
        documentNumber: null,
        account: null,
        response: null
      },
      error: null
    };
  },
  mounted() {},
  methods: {
    submit() {
      fb.auth()
      .signInWithEmailAndPassword(this.form.email, this.form.password)
      .then(data=> {
        console.log(data);
      })
      .catch(error=> {
        console.log("Unable to authenticate user", error);
      });
    },
    signOut() {
      fb
        .auth()
        .signOut()
        .then(() => {
          console.log("Signed out...");
        });
    },
    test() {
      let data = {
        firstName: "Juan",
        lastName: "Perez",
      };

      var httpTest = fb.functions().httpsCallable("httpTest");
      httpTest(data)
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
    testSoapSample() {
      let data = {
        name: "juan",
        age: "33",
      };

      let httpSoapServiceSample = fb.functions().httpsCallable("httpSoapServiceSample");
      httpSoapServiceSample(data)
        .then((result) => {
          console.log(result.data);
          console.log(result.data.result.TOKEN);
          this.form.token = result.data.result.TOKEN;
        })
        .catch((err) => {
          console.log(err.message);
        });

    },
    callHttpTokenServicesGetToken() {
      let data = {};
      let httpTokenServicesGetToken = fb.functions().httpsCallable("httpTokenServicesGetToken");
      httpTokenServicesGetToken(data)
        .then((result) => {
          console.log(result.data);
          console.log(result.data.result.TOKEN);
          this.form.token = result.data.result.TOKEN;
          this.form.response = result.data.result;
        })
        .catch((err) => {
          console.log(err.message);
          this.form.response = err.message;
        });

    },
    callHttpAccountServices() {
      let data = {
        method: "listCapabilitiesOfAccountByCountry",
        countryCode: "US",
        currencyCode: "USD"
      };
      let httpAccountServices = fb.functions().httpsCallable("httpAccountServices");
      httpAccountServices(data)
        .then((result) => {
          console.log(result.data);
          // console.log(result.data.result.TOKEN);
          // this.form.token = result.data.result.TOKEN;
          this.form.response = result.data.result;
        })
        .catch((err) => {
          console.log(err.message);
          this.form.response = err.message;
        });

    },
    callHttpAffiliateServicesGetFundInfo() {
      let data = {
        token: this.form.token,
        accountNumber: this.form.account
      };
      let httpAffiliateServicesGetFundInfo = fb.functions().httpsCallable("httpAffiliateServicesGetFundInfo");
      httpAffiliateServicesGetFundInfo(data)
        .then((result) => {
          console.log(result);
          this.form.response = result;
        })
        .catch((err) => {
          console.log(err.message);
          this.form.response = err.message;
        });
    },
    callHttpAffiliateServicesGetAccount() {
      let data = {
        token: this.form.token,
        documentNumber: this.form.documentNumber,
        documentType: this.form.documentType
      };
      console.log(data);
      let httpAffiliateServicesGetAccount = fb.functions().httpsCallable("httpAffiliateServicesGetAccount");
      httpAffiliateServicesGetAccount(data)
        .then((result) => {
          console.log(result.data);
          this.form.response = result.data;
        })
        .catch((err) => {
          console.log(err.message);
          this.form.response = err.message;
        });
    }
  },
};
</script>

<style lang="scss" scoped>
  @import '../node_modules/@braid/vue-formulate/themes/snow/snow.scss';
  .login-form {
    padding: 2em;
    border: 1px solid #a8a8a8;
    border-radius: .5em;
    max-width: 500px;
    box-sizing: border-box;
  }
  .form-title {
    margin-top: 0;
  }
  .login-form::v-deep .formulate-input .formulate-input-element {
    max-width: none;
  }
  @media (min-width: 420px) {
    .double-wide {
      display: flex;
    }
    .double-wide .formulate-input {
      flex-grow: 1;
      width: calc(50% - .5em);
    }
    .double-wide .formulate-input:first-child {
      margin-right: .5em;
    }
    .double-wide .formulate-input:last-child {
      margin-left: .5em;
    }
  }
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
