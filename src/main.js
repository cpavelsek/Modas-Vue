//src/main.js
import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, BootstrapVueIcons }  from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

//var cors = require('cors')

//.use(cors()) 


Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
