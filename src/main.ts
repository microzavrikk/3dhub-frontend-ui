import { DefaultApolloClient, provideApolloClient } from '@vue/apollo-composable'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './routes/index'
import { apolloClient } from './service/backend/connect-graphql'

const app = createApp(App)

app.use(createPinia())
provideApolloClient(apolloClient)
app.provide(DefaultApolloClient, apolloClient)

app.use(router)
app.mount('#app')
