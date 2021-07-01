import Vue from "vue";
import Vuesax from "vuesax";
import App from "./App.vue";
import axios from "axios";
import VueAxios from "vue-axios";
import router from "./router";

import "vuesax/dist/vuesax.css"; //Vuesax styles
import "@/assets/css/theme.css";
import "boxicons/css/boxicons.css"; //Boxicons styles
import i18n from "./i18n";

Vue.config.productionTip = false;
Vue.use(Vuesax, {
  colors: {
    primary: "#87EB00",
    success: "rgb(23, 201, 100)",
    danger: "rgb(242, 19, 93)",
    warning: "rgb(255, 130, 0)",
    dark: "rgb(36, 33, 69)",
  },
});
Vue.use(VueAxios, axios);

new Vue({
  router,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
