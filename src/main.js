import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ls from "./plugins/localStorage.js";
import "./plugins/element.js";
import "./plugins/axios.js";

Vue.config.productionTip = false;
Vue.prototype.$ls = ls;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");