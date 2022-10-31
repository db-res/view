
import { createStore } from 'vuex'
import createPersistedstate from 'vuex-persistedstate'
import global from './modules/global.js'
// import user from './modules/user.js'

export default createStore({
    plugins: [
        createPersistedstate({
            storage: window.sessionStorage, 
            key: 'data',
            paths: ['nav']
        })
    ],
  ...global,
  modules: {
    // user
  }
})