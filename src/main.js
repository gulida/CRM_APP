import Vue from 'vue'
import Vuelidate from "vuelidate/src";
import VueMeta from 'vue-meta'
import Paginate from 'vuejs-paginate'
import firebase from "firebase/app";

import App from './App.vue'
import router from './router'
import store from './store'
import dateFilter from "@/filters/date.filter";
import currencyFilter from "@/filters/currency.filter";
import localizeFilter from "@/filters/localize.filter";
import messagePlugin from './utils/message.plugin'
import titlePlugin from './utils/title.plugin'
import Loader from "@/components/app/Loader";
import tooltipDirective from './directives/tooltip.directive'

import "materialize-css/dist/js/materialize.min"
import './registerServiceWorker'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false
Vue.use(Vuelidate)
Vue.use(VueMeta)
Vue.use(messagePlugin)
Vue.use(titlePlugin)
Vue.component('Loader', Loader)
Vue.component('Paginate', Paginate)
Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)
Vue.filter('localize', localizeFilter)
Vue.directive('tooltip', tooltipDirective)

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


