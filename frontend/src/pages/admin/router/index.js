import VueRouter from 'vue-router'
import Store from '@/components/admin/store/index'
import jwtToken from '@/components/admin/helpers/jwt'
//
/**
 * Router懒加载
 */
const login = () => import('@/components/admin/auth/login.vue');
const register = () => import('@/components/admin/auth/register.vue');
const index = () => import('@/components/admin/layouts/index.vue');
const wechat_user = () => import('@/components/admin/wechat/user.vue');
const wechat_config = () => import('@/components/admin/wechat/config.vue');
const wechat_menu = () => import('@/components/admin/wechat/menu/index.vue');
const wechat_menu_add = () => import('@/components/admin/wechat/menu/add.vue');
const wechat_material = () => import('@/components/admin/wechat/material/index.vue');
const wechat_material_add = () => import('@/components/admin/wechat/material/add.vue');
const examine = () => import('@/components/admin/examine/index.vue');
const factory = () => import('@/components/admin/factory/index.vue');
const factory_add = () => import('@/components/admin/factory/add.vue');
const region = () => import('@/components/admin/region/index.vue');
const region_modify = () => import('@/components/admin/region/edit.vue');
const farmer = () => import('@/components/admin/farmer/index.vue');
const worker = () => import('@/components/admin/worker/index.vue');
const worker_detail = () => import('@/components/admin/worker/detail.vue');
const video = () => import('@/components/admin/video/index.vue');
const yun = () => import('@/components/admin/yun/index.vue');
const environment = () => import('@/components/admin/environment/index.vue');
const history_reject = () => import('@/components/admin/history/reject.vue');


let routes = [
    {path: '/login', name: 'login', component: login, meta: {requiresGuest: true}},
    {path: '/register', name: 'register', component: register},
    {path: '/', name: 'index', component: index, children: [
        {path: '/wechat-user', name: 'wechat-user', component: wechat_user, meta: {adminAuth: true}},
        {path: '/wechat-config', name: 'wechat-config', component: wechat_config, meta: {adminAuth: true}},
        {path: '/wechat-menu', name: 'wechat-menu', component: wechat_menu, meta: {adminAuth: true}},
        {path: '/wechat-menu-add', name: 'wechat-menu-add', component: wechat_menu_add, meta: {adminAuth: true}},
        {path: '/wechat-material', name: 'wechat-material', component: wechat_material, meta: {adminAuth: true}},
        {path: '/wechat-material-add', name: 'wechat-material-add', component: wechat_material_add, meta: {adminAuth: true}},
        {path: '/factory/:id?', name: 'factory', component: factory, props: true, meta: {adminAuth: true}},
        {path: '/factory/:farmer_id?', name: 'factory-by-farmer_id', component: factory, props: true, meta: {adminAuth: true}},
        {path: '/factory-add/:id', name: 'factory-add', props: true, component: factory_add, meta: {adminAuth: true}},
        {path: '/region', name: 'region', component: region, meta: {adminAuth: true}},
        {path: '/region-edit/:id', name: 'region-edit', props: true, component: region_modify, meta: {adminAuth: true}},
        {path: '/farmer/:id?', name: 'farmer', props: true, component: farmer, meta: {adminAuth: true}},
        {path: '/farmer/:worker_id?', name: 'farmer-by-worker', props: true, component: farmer, meta: {adminAuth: true}},
        {path: '/worker', name: 'worker', component: worker, meta: {adminAuth: true}},
        {path: '/worker-detail', name: 'worker-detail', component: worker_detail, meta: {adminAuth: true}},
        {path: '/video', name: 'video', component: video, meta: {adminAuth: true}},
        {path: '/yun', name: 'yun', component: yun, meta: {adminAuth: true}},
        {path: '/environment', name: 'environment', component: environment, meta: {adminAuth: true}},
        {path: '/history-reject', name: 'history-reject', component: history_reject, meta: {adminAuth: true}},
    ]},

];


const router = new VueRouter({
    routes,
});

router.beforeEach((to, from, next) => {
    return next();
    /*if (to.meta.adminAuth) {
        if (Store.state.authenticated || jwtToken.getToken()) {
            return next()
        } else {
            return next({'name': 'login'});
        }
    } else {
        return next()
    }*/
});

export default router
