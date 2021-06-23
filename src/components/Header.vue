<template>
  <div class="center example-nav">
    <vs-navbar not-line center-collapsed v-model="active">
      <template #left>
        <img
          src="@/assets/RSS3_Scan.svg"
          style="
              height: 7vh;
          "
          alt=""
        />
      </template>
      <vs-navbar-item :active="active == 'home'" id="home">
        Home
      </vs-navbar-item>
      <vs-navbar-item :active="active == 'address'" id="address">
        Address
      </vs-navbar-item>
      <vs-navbar-item :active="active == 'resources'" id="resources">
        Resources
      </vs-navbar-item>
      <vs-navbar-item :active="active == 'about'" id="about">
        About
      </vs-navbar-item>
      <template #right>
        <!-- <vs-button flat></vs-button> | -->
        <vs-button gradient>Sign In</vs-button>
      </template>
    </vs-navbar>
  </div>
</template>
<script>
export default {
  name: "Header",
  data:() => ({
      active: 'home'
    })
};
</script>
