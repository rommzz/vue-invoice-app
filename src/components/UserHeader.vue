<template>
  <div class="invoices-header">
    <div class="title">
      <h1 class="title-name">User</h1>
      <p class="title-total">Total User: {{ $store.state.totalUser }}</p>
    </div>
    <button class="add-invoice" @click="open()">
      Buat <span class="remove">User</span><span class="symbol">+</span>
    </button>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "InvoicesHeader",
  data() {
    return {
      filterIsOpen: false,
      selectedFilter: [],
    };
  },
  props: {},
  methods: {
    ...mapMutations(["SET_USER_IS_OPEN", "SET_EDIT_USER", "SET_FILTER"]),
    open() {
      this.SET_USER_IS_OPEN();
      this.SET_EDIT_USER();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.invoices-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
}
.title {
  flex-basis: 50%;
}
.title-name {
  font-weight: 700;
  font-size: clamp(1.25rem, 5vw, 2rem);
}
.title-total {
  font-weight: 500;
}
.btn-group {
  display: flex;
  align-items: center;
}
.filter {
  position: relative;
}
.filter-btn {
  font-weight: 700;
  cursor: pointer;
}
.filter-body {
  display: flex;
  flex-direction: column;
  width: 200px;
  padding: 24px;
  background-color: #252946;
  position: absolute;
  top: 40px;
  left: -40px;
  border-radius: 8px;
  gap: 14px;
}
label {
  font-weight: 700;
  margin-left: 10px;
}
.filter-item {
  display: flex;
  align-items: center;
}
.add-invoice {
  font-weight: 700;
  padding: 16px 20px;
  border: none;
  background-color: #7b5cfa;
  color: hsl(0, 0%, 100%);
  border-radius: 24px;
  outline: none;
  position: relative;
  width: 160px;
  text-align: right;
  cursor: pointer;
}
.add-invoice::before {
  position: absolute;
  content: "";
  top: 50%;
  left: 6px;
  width: 32px;
  height: 32px;
  background-color: hsl(0, 0%, 100%);
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 50%;
  transform: translateY(-50%);
}
.symbol {
  position: absolute;
  color: #7b5cfa;
  font-size: 20px;
  font-weight: 800;
  left: 16px;
  top: 13px;
}

@media screen and (max-width: 1024px) {
  .filter {
    position: relative;
  }
  .filter-body {
    padding: 16px;
    top: 40px;
    left: -70px;
    gap: 8px;
  }
  label {
    margin-left: 8px;
  }
  .add-invoice {
    padding: 8px 14px;
    width: 80px;
  }
  .add-invoice::before {
    left: 6px;
    width: 20px;
    height: 20px;
  }
  .symbol {
    font-size: 16px;
    left: 11px;
    top: 8px;
  }
  .remove {
    display: none;
  }
}
</style>
