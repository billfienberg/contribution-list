// https://www.howtographql.com/react-apollo/1-getting-started/
import { ApolloClient } from "apollo-client"
import { createHttpLink } from "apollo-link-http"
import { InMemoryCache } from "apollo-cache-inmemory"
import { setContext } from "apollo-link-context"

const httpLink = createHttpLink({
  uri: "https://api.github.com/graphql",
})

const authLink = setContext((_, { headers }) => {
  const token = process.env.REACT_APP_ACCESS_TOKEN
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

export default client
