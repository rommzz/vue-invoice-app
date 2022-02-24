import { required } from "vuelidate/lib/validators";

export const FormValidation = {
  validations: {
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
