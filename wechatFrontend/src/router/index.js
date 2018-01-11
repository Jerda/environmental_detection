import VueRouter from 'vue-router'
import Store from '../components/store/index'
import jwtToken from '../components/helpers/jwt'

const register = () => import('../components/auth/register.vue');
const login = () => import('../components/auth/login.vue');
const userType = () => import('../components/auth/type.vue');

/*
 用户
 */
const user = () => import('../components/user/index.vue');
const userInfo = () => import('../components/user/info.vue');
const factoryList = () => import('../components/user/factory_list.vue');
const governor = () => import('../components/user/governor/index.vue');
const userResetPassword = () => import('../components/user/passwords/reset.vue');
const userForgotPassword = () => import('../components/user/passwords/forgot.vue');
const applyUserInfo = () => import('../components/user/governor/apply_user_info.vue');

/*
 监控
 */
const video = () => import('../components/video/index.vue');

/*
 监测
 */
const environment = () => import('../components/environment/index.vue');


let routes = [
    {
        path: '/register',
        name: 'register',
        component: register
    },
    {
        path: '/login',
        name: 'login',
        component: login
    },
    {
        path: '/user-type',
        name: 'user-type',
        component: userType
    },
    {
        path: '/',
        name: 'user',
        component: user,
        meta: {userAuth: true}
        /*children: [
            {
                path: 'info',
                name: 'user-info',
                component: userInfo
            }
        ],*/
    },
    {
        path: '/userInfo',
        name: 'user-info',
        component: userInfo,
        meta: {userAuth: true}

    },
    {
        path: '/userResetPassword',
        name: 'user-reset-password',
        component: userResetPassword,
        meta: {userAuth: true}
    },
    {
        path: '/userForgotPassword',
        name: 'user-forgot-password',
        component: userForgotPassword,
        meta: {userAuth: true}
    },
    {
        path: '/factoryList',
        name: 'factoryList',
        component: factoryList,
        meta: {userAuth: true}
    },
    {
        path: '/governor',
        name: 'governor',
        component: governor,
        meta: {userAuth: true}
    },
    {
        path: '/apply-user-info/:user_id',
        name: 'apply-user-info',
        component: applyUserInfo,
        meta: {userAuth: true}

    },
    {
        path: '/video',
        name: 'video',
        component: video,
        meta: {userAuth: true},
        children: [],
    },
    {
        path: '/environment',
        name: 'environment',
        component: environment,
        meta: {userAuth: true},
        children: [],
    },
];

const router = new VueRouter({
    mode: 'history',
    routes,
});


router.beforeEach((to, from, next) => {
    if (to.meta.userAuth) {
        if (Store.state.authenticated || jwtToken.getToken()) {
            return next()
        } else {
            return next({'name': 'login'});
        }
    }
});


export default router


