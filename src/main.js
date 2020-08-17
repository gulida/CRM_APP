import Vue from 'vue'
import Vuelidate from "vuelidate/src";
import firebase from "firebase/app";

import App from './App.vue'
import router from './router'
import store from './store'
import dateFilter from "@/filters/date.filter";
import messagePlugin from './utils/message.plugin'

import "materialize-css/dist/js/materialize.min"
import './registerServiceWorker'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false
Vue.use(Vuelidate)
Vue.use(messagePlugin)
Vue.filter('date', dateFilter)

const firebaseConfig = {
  apiKey: "AIzaSyBMCAd6bXcP6KSZquAmWv82vzjbqnbif4Y",
  authDomain: "crm-app-52b3a.firebaseapp.com",
  databaseURL: "https://crm-app-52b3a.firebaseio.com",
  projectId: "crm-app-52b3a",
  storageBucket: "crm-app-52b3a.appspot.com",
  messagingSenderId: "532386357302",
  appId: "1:532386357302:web:579ef36e4df1296c72f897",
  measurementId: "G-35GW0MNGW7"
};

let app

firebase.initializeApp(firebaseConfig)

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})

