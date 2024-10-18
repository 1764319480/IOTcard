import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
import 'element-plus/dist/index.css'

const app = createApp(App)
const pinia = createPinia();
pinia.use(createPersistedState({
    storage: sessionStorage // 存储引擎，默认为 localStorage
  }))
app.use(pinia)
app.use(router)

app.mount('#app')
