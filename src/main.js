import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import BaseCard from './components/UI/BaseCard.vue'
import Basebutton from '@/components/Basebutton'

const vue = createApp(App).use(router)
vue.component('base-card', BaseCard)
vue.component('base-button',Basebutton)
vue.mount('#app');