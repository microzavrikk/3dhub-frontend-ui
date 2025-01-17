import { DefaultApolloClient, provideApolloClient } from '@vue/apollo-composable'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';

import App from './App.vue'
import router from './routes/index'
import { apolloClient } from './service/backend/connect-graphql'
import { Ripple } from 'primevue';


const app = createApp(App)

app.use(createPinia())
provideApolloClient(apolloClient)
app.provide(DefaultApolloClient, apolloClient)
app.use(router)
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            prefix: 'p',
            darkModeSelector: 'system',
            cssLayer: false
        }
    },
    ripple: true
 });
app.mount('#app')
