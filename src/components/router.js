import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);


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
        {path: '/stat', component: () => import('../page/NgaStat.vue')},
        {path: '/web', component: () => import('../page/Web.vue')},
        {path: '/calendar', component: () => import('../page/Calendar.vue')},
        {path: '/releaseGroup', component: () => import('../page/ReleaseGroup.vue')},
        {path: '/release/:groupId', component: () => import('../page/Release.vue')},
        {path: '/serverMonitor', component: () => import('../page/ServerMonitor.vue')},
        {path: '/threeBody', component: () => import('../page/ThreeBody.vue')},
        {path: '/door', component: () => import('../page/Door.vue')},

        {path: '/mobile/nga', component: () => import('../page/mobile/Nga.vue')},
        {path: '/mobile/reply/:tid', component: () => import('../page/mobile/NgaReply.vue')},

        {path: '/lottery', component: () => import('../page/Lottery.vue')},
    ]
});

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title;
    } else {
        document.title = 'NOTES';
    }
    next();
});

export default router