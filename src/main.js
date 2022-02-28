import Vue from "vue";
import "./plugins/axios";
import store from "./store";
import App from "./App.vue";
import router from "./router";
import Vuelidate from "vuelidate";
import { Pagination } from "buefy";

// import 'buefy/dist/buefy.css'
import "./sass/app.scss";

Vue.use(Pagination);
Vue.use(Vuelidate);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
