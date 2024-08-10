import { createApp } from 'vue'
import { router } from './router'
import { utils } from './utils'
import mitt from 'mitt'
import App from './App.vue'
import axios from 'axios'
import moment from 'moment'

import './assets/main.css'

const app = createApp(App)
const emitter = mitt()

app.config.globalProperties.$utils = utils
app.config.globalProperties.$emitter = emitter
app.config.globalProperties.$axios = axios
app.config.globalProperties.$moment = moment

app.use(router)
app.mount('#app')
