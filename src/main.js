import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from "./router";
import request from "@/utils/request";
import './assets/icon/iconfont.css'
import axios from "axios";

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.request = request;
axios.defaults.withCredentials = false;

new Vue({
  router,
  request,
  render: h => h(App),
}).$mount('#app')
