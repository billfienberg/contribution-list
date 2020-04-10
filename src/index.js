import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import "bootstrap/dist/css/bootstrap.min.css"

// https://www.howtographql.com/react-apollo/1-getting-started/
import { ApolloProvider } from "react-apollo"
import client from "./api"

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App client={client} />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root"),
)
