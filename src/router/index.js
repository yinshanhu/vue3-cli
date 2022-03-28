import { createRouter, createWebHashHistory } from 'vue-router'

export default createRouter({
    history: createWebHashHistory(),
    routes: [{
        path: '/index',
        component: () =>
            import ('../views/index.vue')
    }]
})