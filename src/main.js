// import '@/assets/styles/mixin.scss'
import './assets/main.scss'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/themes/light.css'
import 'tippy.js/animations/scale.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)

import { VueQueryPlugin } from "vue-query";
app.use(VueQueryPlugin);

// dayjs
import dayjsPlugin from '@/plugins/dayjs'
app.use(dayjsPlugin)

import i18n from '@/locales'
app.use(i18n)



import { Icon } from '@iconify/vue' // 引入iconify
app.component('Icon', Icon)

// 自定义组件
import components from '@/components'
components(app)

// 自定义指令
import directives from '@/directives'
Object.keys(directives).forEach(key => {
  app.directive(key, directives[key])
})


app.mount('#app')
