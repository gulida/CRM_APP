import Vue from 'vue'
import Vuex from 'vuex'
import auth from "@/store/auth";
import info from "@/store/info";
import category from "@/store/category";
import record from "@/store/record";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null
  },
  getters: {
    error: state => state.error
  },
  mutations: {
    setError (state, error) {
      state.error = error
    },
    clearError (state) {
      state.error = null
    }
  },
  actions: {
    async fetchCurrency () {
      const res = await fetch(`https://api.exchangeratesapi.io/latest?base=EUR&symbols=USD,RUB`)
      return await res.json()
    }
  },
  modules: {
    auth,
    info,
    category,
    record
  }
})
