// import '@/assets/styles/mixin.scss'
import './assets/main.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

import i18n from '@/locales'
app.use(i18n)

import { Icon } from '@iconify/vue' // 引入iconify
app.component('Icon', Icon)

// 自定义指令
import directives from '@/directives'
Object.keys(directives).forEach(key => {
  app.directive(key, directives[key])
})


app.mount('#app')
