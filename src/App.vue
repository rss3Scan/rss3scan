<template>
  <div id="app">
    <div id="nav">
      <Header />
    </div>
    <router-view />
    <Footer />
  </div>
</template>

<script>
  import Header from "@/components/Header.vue";
  import Footer from "@/components/Footer.vue";

  export default {
    components: {
      Header,
      Footer,
    },
  };
</script>

<style lang="scss">
  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #nav {
    padding: 30px;
  }

  #nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  #nav a.router-link-exact-active {
    color: #42b983;
  }

  ::-webkit-scrollbar-thumb {
    background: #8c8c8c;
    border-radius: 5px;
  }

  ::-webkit-scrollbar-track {
    background: #ededed;
  }

  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
    display: block;
    background: #fff;
  }
</style>
