import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import bookings from './modules/bookings'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    bookings
  },
  
  strict: process.env.NODE_ENV !== 'production'
})