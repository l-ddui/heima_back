// 工程化
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 创建路由对象
const router = new VueRouter({
    routes: [
        // 登录页面
        {
            name: 'login',
            path: '/login',
            component: () => import('@/views/login.vue')
        },
        // 首页
        {
            name: 'index',
            path: '/index',
            component: () => import('@/views/index.vue')
        },
    ]
})

router.beforeEach((to, from, next) => {
    if (to.name == "index") {
        let token = localStorage.getItem('heimaback_token')
        if (token) {
            next()
        } else {

            next({ name: 'login' })
        }
    } else {
        next()
    }

})

// 暴露
export default router