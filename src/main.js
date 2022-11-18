import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'

import './assets/main.css'

// import * as Vue from 'vue' // in Vue 3
import axios from 'axios'
import VueAxios from 'vue-axios'

// import 'rest-lc/index.css';
// import 'scss-lc/index.min.css'; 

const app = createApp(App)

app.use(router)
app.use(store)
app.use(VueAxios, axios)

app.mount('#app')
