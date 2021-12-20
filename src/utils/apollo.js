import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client/core'
import { createApolloProvider } from '@vue/apollo-option'


const httpLink = new HttpLink({
    // You should use an absolute URL here
    uri: 'http://localhost:8080/v1/graphql',
  })
  
  // Create the apollo client
 export const apolloClient = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    connectToDevTools: true,
  })
  
  // Create a provider
  export const apolloProvider = createApolloProvider({
    defaultClient: apolloClient,
  })