import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client/core'
import { createApolloProvider } from '@vue/apollo-option'
import { setContext } from '@apollo/client/link/context';



const httpLink = new HttpLink({
    // You should use an absolute URL here
    uri: 'http://localhost:8080/v1/graphql',
  })


const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    // const token =  localStorage.getItem('token');
    // console.log("token is this from ", token);
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        // authorization: token ? `Bearer ${token}` : undefined,
        "x-hasura-admin-secret": 'thisismyadminsecret',
      }
    }
  });
  
  // Create the apollo client
 export const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    connectToDevTools: true,
    assumeImmutableResults: false
  })
  
  // Create a provider
  export const apolloProvider = createApolloProvider({
    defaultClient: apolloClient,
  })