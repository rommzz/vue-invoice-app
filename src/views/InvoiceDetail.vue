<template>
  <main class="detail">
    <router-link :to="{ name: 'Home' }" class="link">
      <svg
        class="back-icon"
        color="hsl(252, 94%, 67%)"
        viewBox="0 0 1024 1024"
        style="stroke: currentcolor; fill: currentcolor"
      >
        <path
          d="M730.6 18.4l-505.4 505.2 505.4 505.4 144.8-144.8-360.6-360.6 360.6-360.4z"
        ></path>
      </svg>
      <span class="back-text">Beranda</span>
    </router-link>
    <pulse-loader class="loader" color="#fff" v-if="isLoading" />
    <template v-else>
      <div class="status-container">
        <p class="status-title">Status</p>
        <p
          class="status-body"
          :class="[
            invoice.status === 'Draft'
              ? 'draft'
              : invoice.status === 'Pending'
              ? 'pending'
              : 'paid',
          ]"
        >
          <span class="status-circle">.</span> {{ invoice.status }}
        </p>
        <div class="btn-container">
          <button
            class="btn btn-edit"
            v-if="invoice.status === 'Draft' || invoice.status === 'Pending'"
            @click="editInvoice"
          >
            Edit
          </button>
          <button class="btn btn-delete" @click="deleteItem">Hapus</button>
          <button
            class="btn btn-mark"
            v-if="invoice.status === 'Pending'"
            @click="markAsPaid"
          >
            <clip-loader v-if="paidLoading" color="white" size="12px" />
            <template v-else> Tandai Sudah Dibayar </template>
          </button>
        </div>
      </div>
      <div class="details">
        <div class="project-info">
          <p class="project-id">#{{ invoice.id }}</p>
          <p class="project-desc">{{ invoice.invoice_description }}</p>
        </div>
        <div class="adress">
          <p class="adress-street">{{ invoice.address.client_address }}</p>
          <p class="adress-city">{{ invoice.address.client_city }}</p>
          <p class="adress-postcode">{{ invoice.address.client_postCode }}</p>
          <p class="adress-country">{{ invoice.address.client_country }}</p>
        </div>
        <div class="date">
          <p class="date-label">Tanggal Invoice</p>
          <p class="date-body">{{ invoice.invoice_date }}</p>
        </div>
        <div class="name">
          <p class="name-label">Tagihan Kepada:</p>
          <p class="name-body">{{ invoice.client_name }}</p>
        </div>
        <div class="mail">
          <p class="mail-label">Dikirim Ke:</p>
          <p class="mail-body">{{ invoice.client_email }}</p>
        </div>
        <div class="due">
          <p class="due-label">Jatuh Tempo</p>
          <p class="due-body">{{ invoice.invoice_due }}</p>
        </div>
        <div class="client-adress">
          <p class="client-street">{{ invoice.address.address }}</p>
          <p class="client-city">{{ invoice.address.city }}</p>
          <p class="client-postcode">{{ invoice.postcode }}</p>
          <p class="client-country">{{ invoice.country }}</p>
        </div>
        <div class="item-container">
          <p>NamaItem</p>
          <p>QTY.</p>
          <p>Harga</p>
          <p>Total</p>
          <div
            class="project-item"
            v-for="(item, index) in invoice.items"
            :key="index"
          >
            <p class="prj-text">{{ item.name }}</p>
            <p class="prj-text">{{ item.quantity }}</p>
            <p class="prj-text">
              {{ item.price }}
            </p>
            <p class="prj-text">
              {{ item.total }}
            </p>
          </div>
        </div>
        <div class="amount">
          <p class="amount-text">Jumlah Total</p>
          <p class="amount-number">
            {{ invoice.total_price }}
          </p>
        </div>
      </div>
    </template>
  </main>
</template>

<script>
import Axios from "axios";
import { mapMutations } from "vuex";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import ClipLoader from "vue-spinner/src/ClipLoader.vue";

export default {
  name: "InvoiceDetail",
  components: {
    PulseLoader,
    ClipLoader,
  },
  props: {
    id: {
      default: null,
    },
    index: Number,
  },
  data() {
    return {
      invoice: {},
      isLoading: true,
      paidLoading: false,
    };
  },
  methods: {
    getData() {
      this.isLoading = true;
      Axios.get(`/invoice/${this.id}`)
        .then((res) => {
          this.invoice = res.data;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    ...mapMutations([
      "DELETE_INVOICE",
      "MARK_INVOICE",
      "SET_MENU_IS_OPEN",
      "SET_EDIT",
    ]),

    deleteItem() {
      Axios.delete(`/invoice/${this.id}/delete`)
        .then((res) => {
          this.$router.push({ name: "Home" });
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    markAsPaid() {
      this.paidLoading = true;
      Axios.put(`/invoice/${this.id}/paid`)
        .then((res) => {
          console.log(res);
          this.invoice = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.paidLoading = false;
        });
    },
    editInvoice() {
      this.SET_EDIT({ status: true, id: this.invoice.id });
      this.SET_MENU_IS_OPEN();
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style scoped>
.loader {
  text-align: center;
  top: 50%;
  position: absolute;
  left: 50%;
}
.detail {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 50px 150px 50px 220px;
  color: white;
}
.link {
  text-decoration: none;
}
.back-icon {
  width: 10px;
  height: 10px;
}
.back-text {
  color: white;
  font-weight: 700;
  margin-left: 20px;
}
.status-container {
  padding: 20px 24px;
  display: flex;
  align-items: center;
  background-color: #1e2238;
  border-radius: 8px;
}
.status-title {
  font-weight: 600;
  color: hsl(231, 75%, 93%);
  flex-basis: 60px;
}
.status-body {
  width: 105px;
  padding: 13px 0 13px 40px;
  border-radius: 6px;
  font-weight: 700;
  display: flex;
  align-items: center;
  position: relative;
}
.status-circle {
  font-size: 40px;
  position: absolute;
  left: 15px;
  top: -14px;
}
.draft {
  background-color: #292c45;
  color: rgb(224, 228, 251);
}
.pending {
  background-color: rgba(255, 145, 0, 0.06);
  color: rgb(255, 145, 0);
}
.paid {
  background-color: rgba(51, 215, 160, 0.06);
  color: rgb(51, 215, 160);
}
.btn-container {
  margin-left: auto;
}
.btn {
  padding: 16px 24px;
  border: none;
  border-radius: 24px;
  color: white;
  font-weight: 700;
  cursor: pointer;
}
.btn-edit {
  background-color: #252946;
  margin-left: auto;
}
.btn-edit:hover {
  background-color: #1b1d32;
}
.btn-delete {
  background-color: #ec5555;
  margin-left: 10px;
}
.btn-delete:hover {
  background-color: #fb999a;
}
.btn-mark {
  background-color: #7b5cfa;
  margin-left: 10px;
}
.btn-mark:hover {
  background-color: #9175ff;
}
.details {
  padding: 20px 30px;
  display: grid;
  background-color: #1e2238;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  border-radius: 8px;
}
.project-info {
  grid-column-start: 1;
  grid-column-end: 2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
}
.project-id {
  font-size: 16px;
  font-weight: 700;
}
.date-body,
.due-body,
.name-body,
.mail-body {
  font-size: 15px;
  font-weight: 700;
}
.adress {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  grid-column-start: 3;
  grid-column-end: 4;
}
.date {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  grid-column-start: 1;
  grid-column-end: 2;
  gap: 10px;
}
.name {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  grid-column-start: 2;
  grid-column-end: 3;
  gap: 10px;
}
.mail {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  grid-column-start: 3;
  grid-column-end: 4;
  gap: 10px;
}
.due {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  grid-column-start: 1;
  grid-column-end: 2;
  gap: 10px;
}
.client-adress {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  grid-column-start: 2;
  grid-column-end: 3;
}
.item-container {
  grid-column-start: 1;
  grid-column-end: 4;
  grid-row-start: 4;
  grid-row-end: 5;
  padding: 20px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  background-color: #252946;
  display: grid;
  grid-template-columns: 2fr repeat(3, 1fr);
  row-gap: 20px;
}
.project-item {
  grid-column-start: 1;
  grid-column-end: 5;
  display: grid;
  grid-template-columns: 2fr repeat(3, 1fr);
}
.prj-text {
  font-weight: 700;
}
.amount {
  grid-column-start: 1;
  grid-column-end: 4;
  grid-row-start: 5;
  grid-row-end: 6;
  padding: 20px 70px 20px 20px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  background-color: #0d0e17;
  margin-top: -20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.amount-number {
  font-size: 20px;
  font-weight: 700;
}

@media screen and (max-width: 1024px) {
  .detail {
    padding: 100px 120px 20px 120px;
  }
}

@media screen and (max-width: 750px) {
  .detail {
    padding: 100px 20px 20px 20px;
  }
}
</style>
