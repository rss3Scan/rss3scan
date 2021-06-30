<template>
  <div class="home">
    <Search>
      <img alt="Scan logo" src="@/assets/logo_title.svg" class="main-logo" />
    </Search>
  </div>
</template>

<script>
import Search from "@/components/common/Search";
// @ is an alias to /src
export default {
  name: "Home",
  components: {
    Search,
  },
  data: () => ({}),
  methods: {},
};
</script>

<style lang="scss">
.home {
}

.main-logo {
  max-width: 100%;
  height: auto;
}
</style>
