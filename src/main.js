import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Router from './router'
const pinia = createPinia()
import './normalize.css'
import App from './App.vue'

createApp(App).use(Router).use(pinia).mount('#app')