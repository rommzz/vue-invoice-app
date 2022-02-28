<template>
  <main class="home">
    <div class="invoice-container">
      <form @submit.prevent class="form">
        <h2>Login</h2>
        <div class="input-item">
          <label class="form__label" for="client-email"> Email </label>
          <input
            class="form__input"
            v-model.trim="form.email"
            type="email"
            name="email"
            id="client-email"
          />
        </div>

        <div class="input-item">
          <label class="form__label" for="client-password"> Password </label>
          <input
            class="form__input"
            v-model.trim="form.password"
            type="password"
            name="password"
            id="client-password"
          />
        </div>

        <div class="input-item">
          <button class="submit" type="submit" value="Login" @click="login()">
            <clip-loader color="white" size="1em" v-if="isLoading" />
            <template v-else> Login </template>
          </button>
        </div>
      </form>
    </div>
  </main>
</template>

<script>
// import Axios from "axios";
import ClipLoader from "vue-spinner/src/ClipLoader.vue";

export default {
  name: "Login",
  components: {
    ClipLoader,
  },
  data() {
    return {
      form: this.getClearForm(),
      isLoading: false,
    };
  },
  methods: {
    getClearForm() {
      return {
        email: null,
        password: null,
      };
    },
    login() {
      this.isLoading = true;
      this.$store
        .dispatch("login", this.form)
        .then(() => {
          this.$router.push(this.$route.query.redirect || { name: "home" });
        })
        .catch((err) => {
          console.log(err.message);
        })
        .finally(() => {
          this.submitLoading = false;
          this.isLoading = false;
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.submit {
  background-color: #7b5cfa;
}
.submit:hover {
  background-color: #9175ff;
}
.invoice-container {
  top: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  width: 30vw;
}
form {
  display: flex;
  flex-direction: column;
  gap: 24px;
  height: 100%;
  overflow-x: hidden;
  padding: 30px;
  border-radius: 20px;
  background: #1e2238;
  color: white;
}
label {
  font-size: 0.75rem;
  font-weight: 500;
  margin-bottom: 12px;
}
input,
select {
  padding: 16px 13px 16px 20px;
  border-radius: 4px;
  border: 1px solid hsl(233, 30%, 21%);
  background-color: hsl(233, 31%, 17%);
  font-weight: 700;
  color: white;
}
select {
  display: flex;
  align-items: center;
  justify-content: center;
}
.input-item {
  display: flex;
  flex-direction: column;
}
.input-group {
  display: flex;
  justify-content: space-between;
}
.input-group > .input-item {
  width: 30%;
}
.added-projects {
  margin-bottom: 20px;
}
.project-labels,
.added-projects-info {
  display: flex;
  gap: 15px;
}
.added-projects-info {
  margin-bottom: 10px;
}
#label-name,
.added-project-name {
  flex-basis: 40%;
}
#label-qty,
.added-project-qty {
  flex-basis: 10%;
}
#label-price,
.added-project-price {
  flex-basis: 20%;
}
#label-total,
.added-project-total {
  flex-basis: 20%;
}
.added-project-name,
.added-project-qty,
.added-project-price,
.added-project-total {
  display: flex;
  align-items: center;
  padding: 14px 13px 14px 20px;
  border-radius: 4px;
  border: 1px solid hsl(233, 30%, 21%);
  background-color: hsl(233, 31%, 17%);
  font-weight: 700;
}
#project {
  gap: 16px;
}
#project-name {
  width: 50%;
}
#project-qty {
  width: 10%;
}
#project-price {
  width: 20%;
}
#project-total {
  width: 20%;
}
.project-delete {
  width: 20px;
  padding-top: 14px;
  cursor: pointer;
}
.project-delete:hover {
  color: rgb(255, 86, 86);
}
#total {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-weight: 700;
  color: white;
}
.price-symbol {
  font-size: 1rem;
  font-weight: 700;
  margin-right: 5px;
}
.btn-container {
  height: 10vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 2rem;
  padding-right: 40px;
  padding-left: 10px;
}
button {
  border: none;
  border-radius: 24px;
  cursor: pointer;
  padding: 17px 24px;
  color: white;
  font-weight: 700;
}
.btn-add-item {
  width: 100%;
  background-color: #252946;
  margin-top: 20px;
}
.btn-discard {
  background-color: #252946;
}
.btn-draft {
  background-color: #373b53;
}
.btn-save {
  background-color: #7b5cfa;
  margin-left: 5px;
}

/* Transition Effects for the component starts here */
.slide-fade-enter-active {
  transition: all 0.5s ease-in-out;
}
.slide-fade-leave-active {
  transition: all 0.5s ease-in-out;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(-700px);
}

/* Custom Scrollbar Styling Starts Here */
::-webkit-scrollbar {
  width: 8px;
}
/* Track */
::-webkit-scrollbar-track {
  background: #141624;
}
/* Handle */
::-webkit-scrollbar-thumb {
  background: #252946;
  border-radius: 20px;
}

input[type="number"] {
  -webkit-appearance: textfield;
  -moz-appearance: textfield;
  appearance: textfield;
}
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
}
.error {
  color: red;
}
.errorborder {
  border: 1px solid red;
}

@media screen and (max-width: 1024px) {
  .form-container {
    top: 80px;
    width: 100vw;
    height: 100vh;
    padding: 20px 20px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  h2 {
    font-size: 1.3rem;
    font-weight: 700;
    margin-bottom: 0.75rem;
  }
  h3 {
    font-size: 0.75rem;
  }
  form {
    padding: 0 10px 10px 10px;
    gap: 16px;
  }
  label {
    font-size: 0.75rem;
    margin-bottom: 6px;
  }
  input,
  select {
    padding: 10px 8px 10px 8px;
  }
  .added-projects {
    margin-bottom: 10px;
  }
  .project-labels,
  .added-projects-info {
    gap: 10px;
  }
  .added-projects-info {
    margin-bottom: 10px;
  }
  #label-name,
  .added-project-name {
    flex-basis: 40%;
  }
  #label-qty,
  .added-project-qty {
    flex-basis: 10%;
  }
  #label-price,
  .added-project-price {
    flex-basis: 20%;
  }
  #label-total,
  .added-project-total {
    flex-basis: 20%;
  }
  .added-project-name,
  .added-project-qty,
  .added-project-price,
  .added-project-total {
    padding: 8px 6px 8px 6px;
  }
  #project {
    gap: 8px;
  }
  .price-symbol {
    font-size: 0.75rem;
  }
  .btn-container {
    padding-top: 2rem;
    padding-right: 20px;
    padding-left: 5px;
  }
  button {
    padding: 8px 12px;
  }
  .btn-add-item {
    margin-top: 10px;
  }
}
</style>
