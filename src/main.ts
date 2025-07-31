import './assets/main.css'
import 'primeicons/primeicons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import PrimeVue from 'primevue/config'
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice'
import App from './App.vue'
import Password from 'primevue/password'
import Select from 'primevue/select'
import Button from 'primevue/button'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)

app.use(PrimeVue, {
  unstyled: false,
  pt: true
})
app.use(ToastService)

app.component('PrimePassword', Password)
app.component('PrimeSelect', Select)
app.component('PrimeButton', Button)
app.component('PrimeToast', Toast);

app.use(pinia)

app.mount('#app')
