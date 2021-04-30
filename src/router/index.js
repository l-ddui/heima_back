// 工程化
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 创建路由对象
const router = new VueRouter({
    routes: [
        // 重定向
        {
            path: '/',
            redirect: { name: 'index' }
        },
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
            component: () => import('@/views/index.vue'),
            redirect: ({ name: 'hello' }),
            // 嵌套路由
            children: [
                {
                    name: 'hello',
                    path: 'hello',
                    component: () => import('@/views/hello.vue'),
                },
                {
                    name: 'postPublish',
                    path: 'postPublish',
                    component: () => import('@/views/postPublish.vue'),
                },
                {
                    name: 'postList',
                    path: 'postList',
                    component: () => import('@/views/postList.vue'),
                },
            ]
        },
    ]
})

router.beforeEach((to, from, next) => {
    // console.log(to);
    if (to.path.indexOf("/index/") != -1) {
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