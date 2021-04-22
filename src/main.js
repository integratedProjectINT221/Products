import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'

const vue = createApp(App).use(router)
vue.mount('#app');