<template>
  <transition name="slide-fade">
    <div class="form-container" v-show="userForm">
      <h2>Buat User</h2>
      <form class="form">
        <div class="input-item">
          <label
            class="form__label"
            :class="{
              error: $v.form.name.$error,
            }"
            for="client-name"
          >
            Nama
          </label>
          <input
            class="form__input"
            :class="{
              errorborder: $v.form.name.$error,
            }"
            v-model.trim="$v.form.name.$model"
            type="text"
            name="name"
            id="name"
          />
        </div>

        <div class="input-item">
          <label
            class="form__label"
            :class="{
              error: $v.form.email.$error,
            }"
            for="client-email"
          >
            Email
          </label>
          <input
            class="form__input"
            :class="{
              errorborder: $v.form.email.$error,
            }"
            v-model.trim="$v.form.email.$model"
            type="email"
            name="email"
            id="client-email"
          />
        </div>

        <div class="input-item">
          <label
            class="form__label"
            :class="{
              error: $v.form.password.$error,
            }"
            for="client-street"
          >
            Password
          </label>
          <input
            class="form__input"
            :class="{
              errorborder: $v.form.password.$error,
            }"
            v-model.trim="$v.form.password.$model"
            type="password"
            name="password"
            id="client-street"
          />
        </div>

        <div class="input-item">
          <label
            class="form__label"
            :class="{
              error: $v.form.password_repeat.$error,
            }"
            for="client-street"
          >
            Ulangi Password
          </label>
          <input
            class="form__input"
            :class="{
              errorborder: $v.form.password_repeat.$error,
            }"
            v-model.trim="$v.form.password_repeat.$model"
            type="password"
            name="clientStreet"
            id="client-street"
          />
        </div>

        <div class="input-checkbox">
          <input
            style="margin-right: 0.5em"
            v-model.trim="form.is_admin"
            type="checkbox"
            name="clientStreet"
            id="checkbox"
          />
          <label for="checkbox"> Admin </label>
        </div>
      </form>
      <div class="btn-container">
        <button class="btn-discard" @click="SET_USER_IS_OPEN">Buang</button>
        <div>
          <button v-show="!editUser.status" class="btn-save" @click="save">
            <clip-loader size="12px" v-if="isLoading" color="#fff" />
            <template v-else> Simpan </template>
          </button>
          <button v-show="editUser.status" class="btn-save" @click="update">
            Simpan Perubahan
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Axios from "axios";
import { mapMutations, mapState } from "vuex";
import ClipLoader from "vue-spinner/src/ClipLoader.vue";
import { FormValidation } from "../mixins/FormValidation";

export default {
  name: "UserFormComp",
  components: {
    ClipLoader,
  },
  data() {
    return {
      form: this.getClearForm(),
      isLoading: false,
    };
  },
  mixins: [FormValidation],
  computed: {
    ...mapState(["userForm", "editUser"]),
    projectItemTotal() {
      return this.projectItem.quantity * this.projectItem.price;
    },
  },
  methods: {
    getClearForm() {
      return {
        name: null,
        email: null,
        is_admin: false,
        password: null,
        password_repeat: null,
      };
    },
    ...mapMutations(["SET_USER_IS_OPEN", "REFRESH_LIST"]),
    focusInput() {
      this.$refs.nextInput.focus();
    },
    save() {
      this.isLoading = true;
      // let validation = this.checkFormValidation();
      // console.log(validation);
      Axios.post("user/register", this.form)
        .then((res) => {
          console.log(res);
          this.SET_USER_IS_OPEN();
          // this.REFRESH_LIST();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    update() {
      this.isLoading = true;
      // let validation = this.checkFormValidation();
      // console.log(validation);
      this.calculateInvoiceDue();
      this.calculateTotalPrice();
      Axios.put(`invoice/${this.editUser.id}/update`, this.form)
        .then((res) => {
          console.log(res);
          this.SET_USER_IS_OPEN();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    checkFormValidation() {
      if (this.$v.$dirty && !this.$v.$invalid) {
        return true;
      } else {
        this.$v.$touch();
        return false;
      }
    },
  },
  watch: {
    editUser() {
      if (this.editUser.status) {
        this.isLoading = true;
        Axios.get(`user/${this.editUser.id}`)
          .then((res) => {
            this.form = res.data;
            this.form.is_admin = this.form.is_admin === "1";
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            this.isLoading = false;
          });
      } else {
        this.form = this.getClearForm();
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.form-container {
  position: absolute;
  top: 0;
  left: 0;
  max-width: 720px;
  height: 100vh;
  padding: 56px 32px 2rem 129px;
  display: flex;
  flex-direction: column;
  background-color: #141624;
  border-top-right-radius: 24px;
  border-bottom-right-radius: 24px;
  color: white;
  z-index: 2;
}
h2 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
}
h3 {
  font-size: 0.75rem;
  font-weight: 700;
  color: rgb(123, 92, 250);
}
form {
  display: flex;
  flex-direction: column;
  padding: 0 24px 10px 10px;
  gap: 24px;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
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
.input-checkbox {
  display: flex;
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
