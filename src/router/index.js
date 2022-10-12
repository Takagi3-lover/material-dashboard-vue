import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const routes = [
    {
        path: "/",
        redirect: "/login"
    },

    //默认初始界面是登陆界面
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login.vue')
    },
    //注册界面
    {
        path: '/register',
        name: 'Register',
        component: () => import('../views/Register.vue')
    },
    //找回密码界面
    {
        path: '/findPassword',
        name: 'FindPassword',
        component: () => import('../views/FindPassword.vue')
    },
    //用户主界面
    {
        path: '/mainPage',
        name: 'MainPage',
        component: () => import('../views/MainPage.vue'),
        redirect: '/mainPage/predictPage',
        children: [
            {
                path: '/mainPage/predictPage',
                name: 'PredictPage',
                component: () => import('../components/PredictPage.vue')
            },
        ]


    },
    //用户个人中心界面
    {
        path: '/personal',
        name: 'Personal',
        component: () => import('../views/Personal.vue'),
        redirect: '/personal/info',
        children: [
            {
                path: '/personal/info',
                name: 'Info',
                component: () => import('../components/Info.vue')
            },
            {
                path: '/personal/VIP',
                name: 'proUser',
                component: () => import('../components/proUser.vue')
            },
            {
                path: '/personal/changeEmail',
                name: 'changeEmail',
                component: () => import('../components/changeEmail.vue')
            },
            {
                path: '/personal/revisePassword',
                name: 'revisePassword',
                component: () => import('../components/revisePassword.vue')
            }
        ]
    },
    {
        path: '/admin',
        name: 'testPage',
        component: () => import('../views/testPage.vue')
    },

]
const router = new VueRouter({
        mode: "history",
        base: process.env.BASE_URL,
        routes
    }
)
export default router