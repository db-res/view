export default {
    state: {
        nav:{
            type:'index'
        }
    },
    getters: {

    },
    mutations: {
        updateNtype(state, val) {
            state.nav.type = val
        },
    },
    actions: {
        asyncUpdateType(store, val) {
            setTimeout(() => {
              store.commit('updateNtype', val)
            }, 2000)
        }
    },
}