import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/main.css'

// import 'rest-lc/index.css';
// import 'scss-lc/index.min.css'; 

const app = createApp(App)

app.use(router)

app.mount('#app')
