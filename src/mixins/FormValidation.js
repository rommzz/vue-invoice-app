import { required } from "vuelidate/lib/validators";

export const FormValidation = {
  validations: {
    form: {
      name: {
        required,
      },
      email: {
        required,
      },
      password: {
        required,
      },
      password_repeat: {
        required,
      },
    },
    invoiceForm: {
      address: {
        client_address: {
          required,
        },
        client_city: {
          required,
        },
        client_postCode: {
          required,
        },
        client_country: {
          required,
        },
      },
      city: {
        required,
      },
      postCode: {
        required,
      },
      country: {
        required,
      },
      client_name: {
        required,
      },
      client_email: {
        required,
      },
      invoice_description: {
        required,
      },
      items: {
        required,
      },
    },
  },
};
