import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// Vue3.0 API
import compositionAPI from "@vue/composition-api";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

// sha1 加密
import sha1 from "js-sha1";

Vue.use(compositionAPI);
Vue.use(ElementUI);

Vue.prototype.$encrypt = sha1;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
