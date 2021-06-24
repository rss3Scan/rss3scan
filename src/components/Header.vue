<template>
  <div class="center">
    <vs-navbar center-collapsed not-line v-model="index" id="logo">
      <template #left>
        <router-link to="/">
          <img src="@/assets/logo.png" style="max-height: 7vh" alt="logo" />
        </router-link>
        <p>RSS3://Scan</p>
      </template>
      <vs-navbar-item :active="index == 'Home'" id="Home">
        Home
      </vs-navbar-item>
      <vs-navbar-item :active="index == 'Address'" id="Address" disabled>
        Address
      </vs-navbar-item>
      <!--<vs-navbar-item :active="index == 'Resources'" id="Resources">
        Resources
      </vs-navbar-item>-->
      <vs-navbar-item :active="index == 'About'" id="About">
        About
      </vs-navbar-item>
      <template #right>
        <!-- <vs-button flat></vs-button> | -->
        <vs-button
          style="color: #000"
          gradient
          @click="$refs.login.$emit('show')"
          >Sign In</vs-button>
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
          this.$router.push({
            name
          });
        }
      },
    },
  };
</script>
<style>
@media (max-width: 600px) {
  #logo p {
    display: none;
  }
}
</style>
