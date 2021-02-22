import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import ls from "../plugins/localStorage.js";

Vue.use(VueRouter);

//解决当前路由跳转当前路由报错的问题
const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(() => {});
};
const routes = [{
        path: "/",
        name: "Home",
        component: Home,
        children: [{
            path: "/account",
            component: () =>
                import ( /* webpackChunkName: "account" */ "@/views/home/Account.vue")
        }, {
            path: "/home-setting",
            component: () =>
                import ( /* webpackChunkName: "HomeSetting" */ "@/views/home/HomeSetting.vue")
        }, {
            path: "/live-setting",
            component: () =>
                import ( /* webpackChunkName: "LiveSetting" */ "@/views/home/LiveSetting.vue")
        }, {
            path: "/promote-site-configuration",
            component: () =>
                import ( /* webpackChunkName: "LiveSetting" */ "@/views/promote/SiteConfiguration.vue")
        }, {
            path: "/promote-offer",
            component: () =>
                import ( /* webpackChunkName: "LiveSetting" */ "@/views/promote/Offer.vue")
        }, {
            path: "/promote-category",
            component: () =>
                import ( /* webpackChunkName: "LiveSetting" */ "@/views/promote/Category.vue")
        }, {
            path: "/promote-product",
            component: () =>
                import ( /* webpackChunkName: "LiveSetting" */ "@/views/promote/Product.vue")
        }]
    },
    {
        path: "/login",
        name: "Login",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ "../views/Login.vue"),
        meta: {
            isLogin: true
        }
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

router.beforeEach((to, from, next) => {
    // react to route changes...
    // don't forget to call next()
    next()
})

router.afterEach((to, from) => {
    const isLogged = ls.get("isLogged") || false

    if (!isLogged) {
        if (!to.meta.isLogin) {
            router.replace({
                path: "/login"
            });
        }
    } else {
        if (to.meta.isLogin) {
            router.replace({
                path: "/"
            });
        }
    }
});

export default router;