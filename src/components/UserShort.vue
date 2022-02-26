<template>
  <div class="user-item" @click="showDetail">
    <p class="due">Nama: {{ user.name }}</p>
    <p class="name">{{ user.email }}</p>
    <div
      class="status"
      :class="[user.is_admin == 1 ? 'pending-background' : 'paid-background']"
    >
      <div
        class="status-circle"
        :class="[user.is_admin == 1 ? 'circle-pending' : 'circle-paid']"
      ></div>
      <div
        class="status-text"
        :class="[user.is_admin == 1 ? 'pending-color' : 'paid-color']"
      >
        {{ user.is_admin == 1 ? "Admin" : "User" }}
      </div>
    </div>
    <svg
      color="hsl(252, 94%, 67%)"
      viewBox="0 0 1024 1024"
      style="fill: currentcolor; width: 10px; height: 10px"
    >
      <path
        d="M328.4 30l-144.8 144.8 337.2 337.2-337.2 337.2 144.8 144.8 482-482z"
      ></path>
    </svg>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "UserShort",
  props: {
    user: Object,
    index: Number,
  },
  methods: {
    ...mapMutations(["SET_EDIT_USER", "SET_USER_IS_OPEN"]),
    showDetail() {
      this.SET_EDIT_USER({ status: true, id: this.user.id });
      this.SET_USER_IS_OPEN();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.user-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px 15px 32px;
  border: 1px solid #1e2139;
  border-radius: 8px;
  background-color: #1e2139;
  color: white;
  transition: border 350ms ease-in-out;
  cursor: pointer;
  margin-bottom: 20px;
}
.user-item:hover {
  border: 1px solid #7b5cfa;
}
.id {
  flex-basis: 5%;
  font-weight: 700;
}
.due {
  flex-basis: 30%;
  font-size: 12px;
  text-align: center;
}
.name {
  flex-basis: 20%;
  font-size: 12px;
  text-align: left;
}
.price {
  font-size: 16px;
  font-weight: 700;
  flex-basis: 25%;
}
.status {
  flex-basis: 15%;
  width: 105px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 6px;
  font-weight: 700;
}
.status-circle {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: white;
}
.status-text {
  font-size: 12px;
}
svg {
  flex-basis: 5%;
}
.draft-background {
  background-color: #292c45;
}
.draft-color {
  color: rgb(224, 228, 251);
}
.pending-background {
  background-color: rgba(255, 145, 0, 0.06);
}
.pending-color {
  color: rgb(255, 145, 0);
}
.paid-background {
  background-color: rgba(51, 215, 160, 0.06);
}
.paid-color {
  color: rgb(51, 215, 160);
}
.circle-draft {
  background-color: rgb(224, 228, 251);
}
.circle-pending {
  background-color: rgb(255, 145, 0);
}
.circle-paid {
  background-color: rgb(51, 215, 160);
}

@media screen and (max-width: 1024px) {
  .user-item {
    display: grid;
    grid-template-columns: 1fr 1fr 30px;
    grid-template-rows: auto;
    align-items: center;
    row-gap: 10px;
    padding: 16px 16px;
    margin-bottom: 10px;
  }
  .id {
    justify-self: start;
    grid-column-start: 1;
    grid-column-end: 2;
  }
  .due {
    justify-self: start;
    grid-column-start: 1;
    grid-column-end: 2;
    text-align: start;
  }
  .price {
    justify-self: start;
    grid-column-start: 1;
    grid-column-end: 2;
  }
  .name {
    justify-self: end;
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 1;
    grid-row-end: 2;
  }
  .status {
    justify-self: end;
    align-self: center;
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 2;
    grid-row-end: 4;
  }
  svg {
    justify-self: end;
    align-self: center;
    grid-column-start: 3;
    grid-column-end: 4;
    grid-row-start: 1;
    grid-row-end: 4;
  }
}
</style>
