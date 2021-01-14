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

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    let result;
    try {
        result = originalPush.call(this, location).catch(err => err)
    } catch (e) {
    }
    return result;
};

const router = new Router({
    //mode: 'history',
    routes: [
        {path: '/', redirect: '/logIn'},
        {path: '/logIn', component: () => import('../page/LogIn.vue')},
        {path: '/index', component: () => import('../page/Index.vue')},
        {path: '/mark', component: () => import('../page/Mark.vue')},
        {path: '/person', component: () => import('../page/Person.vue')},
        {path: '/nga', component: () => import('../page/Nga.vue')},
        {path: '/reply/:tid', component: () => import('../page/NgaReply.vue')},
        {path: '/user/:uid', component: () => import('../page/NgaUser.vue')},
        {path: '/userReply/:authorId', component: () => import('../page/NgaUserReply.vue')},
        {path: '/web', component: () => import('../page/Web.vue')},
        {path: '/calendar', component: () => import('../page/Calendar.vue')},
        {path: '/threeBody', component: () => import('../page/ThreeBody.vue')},
        {path: '/door', component: () => import('../page/Door.vue')},

        {path: '/mobile/nga', component: () => import('../page/mobile/Nga.vue')},
        {path: '/mobile/reply/:tid', component: () => import('../page/mobile/NgaReply.vue')},

        {path: '/lottery', component: () => import('../page/Lottery.vue')},
    ]
});

export default router