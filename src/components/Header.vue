<template>
  <div class="center">
    <vs-navbar center-collapsed not-line v-model="index">
      <template #left>
        <router-link to="/">
          <img src="@/assets/RSS3_Scan.svg" style="height: 7vh" alt="" />
        </router-link>
      </template>
      <vs-navbar-item :active="index == 'Home'" id="Home">
        Home
      </vs-navbar-item>
      <vs-navbar-item :active="index == 'Address'" id="Address">
        Address
      </vs-navbar-item>
      <vs-navbar-item :active="index == 'Resources'" id="Resources">
        Resources
      </vs-navbar-item>
      <vs-navbar-item :active="index == 'About'" id="About">
        About
      </vs-navbar-item>
      <template #right>
        <!-- <vs-button flat></vs-button> | -->
        <vs-button gradient @click="$refs.login.$emit('show')"
          >Sign In</vs-button
        >
      </template>
    </vs-navbar>
    <LoginForm ref="login" />
  </div>
</template>
<script>
import LoginForm from "@/components/LoginForm";

export default {
  name: "Header",
  components: {
    LoginForm,
  },
  data: () => ({
    index: "Home",
  }),
  watch: {
    index: "routerChange",
    $route() {
      this.index = this.$route.name;
    },
  },
  methods: {
    routerChange(name) {
      if (name != this.$route.name) {
        let params = {};
        if (name == "Address") params["addr"] = "0x0";
        this.$router.push({ name, params });
      }
    },
  },
};
</script>
