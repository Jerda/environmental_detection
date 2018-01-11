import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import router from './router/index'
import top from './components/layouts/top.vue'
// import store from './components/admin/store/index'
// import jwtToken from './components/admin/helpers/jwt'
// import helpers from './components/admin/helpers/common'
import axios from 'axios'
import Wechat from './Wechat.vue'

Vue.use(VueRouter);
// Vue.use(helpers);

FastClick.attach(document.body);

Vue.config.productionTip = false;
Vue.prototype.axios= axios;


Vue.component('top', top);

new Vue({
    el: '#app',
    router,
    // store,
    render: h => h(App),
    components: Wechat
});
