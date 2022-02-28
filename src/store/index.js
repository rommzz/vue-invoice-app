import Axios from "axios";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    totalInvoice: 0,
    totalUser: 0,
    user: null,
    userForm: false,
    menuIsOpen: false,
    edit: { status: false, id: null },
    editUser: { status: false, id: null },
    filter: [],
    refresh: false,
  },
  mutations: {
    REFRESH_LIST(state) {
      state.refresh = !state.refresh;
    },
    SET_MENU_IS_OPEN(state) {
      state.menuIsOpen = !state.menuIsOpen;
    },
    SET_USER_IS_OPEN(state) {
      state.userForm = !state.userForm;
    },
    SET_EDIT(state, payload) {
      state.edit = { ...payload };
    },
    SET_EDIT_USER(state, payload) {
      state.editUser = { ...payload };
    },
    SET_INVOICES(state, payload) {
      state.invoices.push(payload);
    },
    SET_FILTER(state, payload) {
      state.filter = payload;
    },
    DELETE_INVOICE(state, payload) {
      state.invoices.splice(payload, 1);
    },
    MARK_INVOICE(state, payload) {
      state.invoices[payload].status = "Paid";
    },
    INVOICE_UPDATE(state, payload) {
      state.invoices.splice(payload.index, 1, { ...payload.info });
    },
    SET_TOTAL_INVOICE(state, payload) {
      state.totalInvoice = payload;
    },
    SET_TOTAL_USER(state, payload) {
      state.totalUser = payload;
    },
    setUserData(state, userData) {
      state.user = userData;
      localStorage.setItem("user", JSON.stringify(userData));
      Axios.defaults.headers.common.Authorization = `Bearer ${userData.token}`;
    },
  },
  actions: {
    login({ commit }, credentials) {
      return Axios.post("/user/login", credentials, {
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(({ data }) => {
          commit("setUserData", data);
        })
        .catch((err) => {
          return Promise.reject(err.response.data);
        });
    },
  },
  getters: {
    filteredInvoices(state) {
      if (state.filter.length === 0) return state.invoices;
      else {
        let filtered = state.invoices.filter((item) =>
          state.filter.includes(item.status)
        );
        return filtered;
      }
    },
  },
});
