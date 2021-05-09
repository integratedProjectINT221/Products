import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import Basebutton from '@/components/UI/Basebutton'

const vue = createApp(App).use(router)
vue.component('base-button',Basebutton)
vue.mount('#app');