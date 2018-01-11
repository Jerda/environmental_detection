import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './Admin.vue'
import axios from 'axios'
import router from './router/index.js'
import { Message, Loading } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from '@/components/admin/store/index'
import jwtToken from '@/components/admin/helpers/jwt'
import helpers from '@/components/admin/helpers/common'
import './style.less'

window.axios = axios;

Vue.use(VueRouter);
Vue.use(Loading.directive);
Vue.prototype.$message = Message;
Vue.use(helpers);

/*
 将token值加入请求中
 */
axios.interceptors.request.use(function (config) {
    if (jwtToken.getToken()) {
        config.headers['Authorization'] = 'Bearer ' + jwtToken.getToken();
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});


axios.interceptors.response.use(function(response) {
    //对响应数据做些事
    return response;
},function (error) {
    //请求错误时做些事
    if (error.response.status == 401 || error.response.status == 419) {
        store.dispatch('refreshToken');
        return Promise.reject(error);
    } else {
        return Promise.reject(error);
    }
});

const app = new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app-box');

