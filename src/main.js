import 'style/index.css'
import 'style/index.styl'

import Vue from 'vue'
import App from './App.vue'

const version = '0.0.3'

new Vue({
  el: '#app',
  render: c => c(App),
  provide: { version }
})
