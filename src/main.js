import { createApp } from 'vue'
import './assets/css/main.css'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import routes from './router/index.js'
import store from "./store/index.js"

const router = createRouter({
    history: createWebHistory(),
    scrollBehavior(to, from, savedPosition) {
        // always scroll to top
        return { top: 0 }
    },
    routes,
})

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
