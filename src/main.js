import Vue from "vue";
import vuetify from "./plugins/vuetify";
import "./plugins/axios";
import "./filters/formatDate";
import App from "./App.vue";

Vue.config.productionTip = false;

new Vue({
  vuetify,
  render: h => h(App)
}).$mount("#app");
