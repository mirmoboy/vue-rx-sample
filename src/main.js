// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRx from 'vue-rx'

import { Observable } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription' // Disposable if using RxJS4
import { Subject } from 'rxjs/Subject' // required for domStreams option
import VueCookie from 'vue-cookie'
import VueCroppie from 'vue-croppie'


Vue.use(VueRx, {
  Observable,
  Subscription,
  Subject
})

import Buefy from 'buefy'
import 'buefy/lib/buefy.css'

Vue.use(Buefy)
Vue.use(VueCookie)
Vue.use(VueCroppie)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})