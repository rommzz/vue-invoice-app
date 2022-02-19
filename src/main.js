import Vue from "vue";
import "./plugins/axios";
import store from "./store";
import App from "./App.vue";
import router from "./router";
import Vuelidate from "vuelidate";
// import Axios from "axios";

Vue.use(Vuelidate);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
