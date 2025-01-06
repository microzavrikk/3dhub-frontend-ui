import { InMemoryCache, type ApolloClientOptions, ApolloClient } from '@apollo/client/core'
import { HttpLink, split } from '@apollo/client/core'
import { createClient } from 'graphql-ws'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'
import { setContext } from '@apollo/client/link/context'
import { BaseHOSTHttp, BaseHOSTWs } from './make-link'
import { UserAuthService } from '../auth/user.auth.service'

const cache = new InMemoryCache({
  resultCaching: false,
  typePolicies: {
    ConfiguresQuery: {
      keyFields: []
    }
  }
})

const httpLink = new HttpLink({
  uri: BaseHOSTHttp + '/graphql'
})

const wsLink = new GraphQLWsLink(
  createClient({
    url: BaseHOSTWs + '/graphql',
    connectionParams(...args) {
      //@ts-ignore
      const token = UserAuthService.getAuthToken()
      return { authorization: token ? `Bearer ${token}` : '' }
    }
  })
)

const authLink = setContext((_, data) => {
  //@ts-ignore
  const token = UserAuthService.getAuthToken()
  const headers = data?.headers ?? {}
  return {
    headers: {
      ...(headers || {}),
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const httpAuthLink = authLink.concat(httpLink)
const wsAuthLink = authLink.concat(wsLink)

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
  },
  wsAuthLink,
  httpAuthLink
)

const options: ApolloClientOptions<any> = {
  cache,
  link,
  credentials: 'include',
  queryDeduplication: false,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'network-only'
    },
    query: {
      fetchPolicy: 'network-only'
    }
  }
}

export const apolloClient = new ApolloClient(options)
