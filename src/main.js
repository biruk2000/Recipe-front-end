import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './index.css'

// import Vue from 'vue'
import { apolloProvider } from './utils/apollo.js'



const app = createApp(App)
app.use(store).use(router);
app.use(apolloProvider);
app.mount('#app')
