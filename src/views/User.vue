<template>
  <main class="home">
    <UserHeader class="header" />
    <div class="invoices-container">
      <pulse-loader class="loader" color="#fff" v-if="isLoading" />
      <template v-else>
        <template v-if="currentData.total">
          <UserShort
            v-for="(item, index) in data"
            :key="item.id"
            :user="item"
            :index="index"
          />
          <b-pagination
            @change="(v) => getData(v, filter)"
            :total="currentData.total"
            :per-page="currentData.per_page"
            v-model="currentPage"
            range-before="2"
            range-after="2"
          >
          </b-pagination>
        </template>
        <template v-else>
          <div class="no-data">
            <p>Tidak ada data</p>
          </div>
        </template>
      </template>
    </div>
  </main>
</template>

<script>
import Axios from "axios";
import { mapGetters, mapMutations, mapState } from "vuex";
import UserHeader from "../components/UserHeader.vue";
import UserShort from "../components/UserShort.vue";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";

export default {
  name: "User",
  props: {},
  components: {
    UserHeader,
    UserShort,
    PulseLoader,
  },
  data() {
    return {
      data: [],
      currentPage: 1,
      currentData: {},
      isLoading: false,
    };
  },
  computed: {
    ...mapGetters(["filteredInvoices"]),
    ...mapState(["filter", "refresh"]),
  },
  methods: {
    ...mapMutations(["SET_EDIT", "REFRESH_LIST"]),
    getData(page) {
      this.SET_EDIT({ status: false });
      this.isLoading = true;
      this.data = [];
      this.currentData = {};
      Axios.get("/user?page=" + page)
        .then((r) => {
          this.data = r.data.data;
          this.currentData = r.data;
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
  watch: {
    filter(val) {
      this.currentPage = 1;
      this.getData((this.currentPage = 1), val);
    },
    refresh(val) {
      if (val) {
        this.getData(1);
        this.REFRESH_LIST();
        this.currentPage = 1;
      }
    },
  },
  created() {
    this.getData(1);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.loader {
  text-align: center;
  top: 50%;
  position: absolute;
  left: 50%;
}
.home {
  padding: 50px 150px 50px 220px;
  height: 100vh;
  width: 100%;
}
.invoices-container {
  height: 90%;
  overflow-y: scroll;
  padding-right: 10px;
}
.header {
  margin-bottom: 30px;
}

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

@media screen and (max-width: 1024px) {
  .home {
    padding: 100px 120px 20px 120px;
  }
  .header {
    margin-bottom: 20px;
  }
}

@media screen and (max-width: 750px) {
  .home {
    padding: 100px 20px 20px 20px;
  }
}
</style>
