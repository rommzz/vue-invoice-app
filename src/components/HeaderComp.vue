<template>
  <div class="header">
    <div>
      <div class="logo-container" style="margin-bottom: 2em">
        <router-link :to="{ name: 'Home' }">
          <svg
            class="icon"
            style="width: 24px; height: 24px"
            viewBox="0 0 24 24"
          >
            <path fill="currentColor" :d="mdiFile" />
          </svg>
        </router-link>
      </div>
      <div class="logo-container">
        <router-link :to="{ name: 'UserList' }">
          <svg
            class="icon"
            style="width: 24px; height: 24px"
            viewBox="0 0 24 24"
          >
            <path fill="currentColor" :d="mdiAccountMultiple" />
          </svg>
        </router-link>
      </div>
    </div>
    <div class="user-info">
      <a href="https://github.com/fatihozoglu" target="_blank">
        <img
          class="user-photo"
          width="40px"
          height="40px"
          :src="require('../assets/profile-photo.jpg')"
          alt="profile photo"
        />
      </a>
    </div>
  </div>
</template>

<script>
import { mdiFile, mdiAccountMultiple } from "@mdi/js";
export default {
  name: "HeaderComp",
  props: {},
  data() {
    return {
      mdiFile: mdiFile,
      mdiAccountMultiple: mdiAccountMultiple
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.icon {
  cursor: pointer;
  color: #fff;
}
.icon:hover {
  color: #1e2139;
}
.header {
  height: 100vh;
  width: 103px;
  background-color: #1e2139;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: fixed;
  z-index: 3;
}
.logo-container {
  width: 100%;
  height: 103px;
  background-color: #7b5cfa;
  border-bottom-right-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.logo {
  width: 40px;
  height: 40px;
  position: relative;
  background-color: white;
  border-radius: 50%;
}
.logo-rect {
  background: #7b5cfa;
  position: absolute;
  width: 100%;
  height: 100%;
  clip-path: polygon(80% 0, 20% 0, 50% 50%);
}
.user-info {
  width: 100%;
  height: 90px;
  border-top: 1px solid rgb(73, 79, 110);
  display: flex;
  align-items: center;
  justify-content: center;
}
.user-photo {
  border-radius: 50%;
}

@media screen and (max-width: 1024px) {
  .header {
    height: 80px;
    width: 100vw;
    flex-direction: row;
    justify-content: space-between;
    border-radius: 0;
  }
  .logo-container {
    width: 80px;
    height: 100%;
    border-bottom-right-radius: 20px;
    border-top-right-radius: 20px;
  }
  .logo {
    width: 30px;
    height: 30px;
    position: relative;
    background-color: white;
    border-radius: 50%;
  }
  .user-info {
    width: 90px;
    height: 100%;
    border-left: 1px solid rgb(73, 79, 110);
    border-top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
