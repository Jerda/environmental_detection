
require('./bootstrap');

window.Vue = require('vue');

import VueRouter from 'vue-router'
import router from './routes/admin.js'
import { Message, Loading } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './components/admin/store/index'
import jwtToken from './components/admin/helpers/jwt'
import helpers from './components/admin/helpers/common'

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
    }
});

Vue.use(VueRouter);
Vue.use(Loading.directive);
Vue.prototype.$message = Message;
Vue.use(helpers);


const app = new Vue({
    el: '#app',
    router,
    store,
    components: {}
});

