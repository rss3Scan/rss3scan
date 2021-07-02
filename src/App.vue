<template>
  <div id="app">
    <div id="nav">
      <Header />
    </div>
    <div id="view">
      <router-view />
    </div>
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

<style>
#app {
  text-align: center;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-box-flex: 1;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  min-height: 100vh;
  max-width: 100%;
  position: relative;
}
#view {
  flex: 1 1 auto;
  margin-top: 10px;
}
#nav {
  margin-top: 30px;
  margin-bottom: 40px;
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
