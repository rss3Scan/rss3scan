<template>
  <div class="center">
    <vs-navbar center-collapsed not-line v-model="index" id="header">
      <template #left>
        <router-link to="/">
          <img src="@/assets/logo.png" style="max-height: 7vh" alt="logo" />
        </router-link>
        <router-link to="/">
          <span>RSS3://Scan</span>
        </router-link>
      </template>
      <vs-navbar-item :active="index == 'Home'" id="Home">
        {{ $t("header.home") }}
      </vs-navbar-item>
      <vs-navbar-item :active="index == 'Address'" id="Address" disabled>
        {{ $t("header.address") }}
      </vs-navbar-item>
      <!--<vs-navbar-item :active="index == 'Resources'" id="Resources">
        Resources
      </vs-navbar-item>-->
      <vs-navbar-item :active="index == 'About'" id="About">
        {{ $t("header.about") }}
      </vs-navbar-item>
      <template #right>
        <!-- <vs-button flat></vs-button> | -->
        <vs-button
          style="color: #000"
          gradient
          @click="$refs.login.$emit('show')"
          >{{ $t("header.signin") }}</vs-button
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
        this.$router.push({
          name,
        });
      }
    },
  },
};
</script>
<style>
#header {
  background: #fbfbfb;
}
@media (max-width: 600px) {
  #header span {
    display: none;
  }
}
#header span {
  -webkit-text-stroke: 0.2px #282828;
  color: var(--vs-primary);
}
</style>
