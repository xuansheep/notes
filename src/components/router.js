import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);

/*export default new Router({
    routes: [
        {
            path: '/',
            component: LogIn
        },
        {
            path:'/index',
            component:Index
        }
    ]
})*/

const router = new Router({
    routes: [
        {path: '/', redirect: '/logIn'},
        {path: '/logIn', component: () => import('../page/LogIn.vue')},
        {path: '/index', component: () => import('../page/Index.vue')},
    ]
});

export default router