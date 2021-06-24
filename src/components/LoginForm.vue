<template>
  <vs-dialog v-model="active" class="login-dialog">
    <template #header>
      <h4 class="not-margin">Welcome to <b>RSS3 Scan</b></h4>
    </template>
    <div class="con-form">Please Connect to your Re:ID extension to login</div>

    <template #footer>
      <div class="footer-dialog">
        <vs-button block> Connect </vs-button>
      </div>
    </template>
  </vs-dialog>
</template>

<script>
export default {
  name: "LoginForm",
  mounted() {
    this.$on("show", () => {
      this.active = true;
    });
  },
  data: () => ({
    active: false,
  }),
};
</script>

<style lang="scss">
.login-dialog {
  .con-form {
  }

  .footer-dialog {
    margin: {
      top: 2rem;
    }
  }
}
</style>
