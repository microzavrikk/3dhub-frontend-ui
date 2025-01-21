import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './routes/index'
import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import { DefaultApolloClient } from '@vue/apollo-composable'

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
  cache,
  uri: 'http://127.0.0.1:4000/graphql'
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.provide(DefaultApolloClient, apolloClient)

app.mount('#app')
