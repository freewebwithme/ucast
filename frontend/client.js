import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { hasSubscription } from "@jumpn/utils-graphql";
import * as AbsintheSocket from "@absinthe/socket";
import { createAbsintheSocketLink } from "@absinthe/socket-apollo-link";
import { Socket as PhoenixSocket } from "phoenix";
import * as SecureStore from "expo-secure-store";

const HTTP_ENDPOINT = "http://192.168.1.2:4000/api";
const WS_ENDPOINT = "ws://192.168.1.2:4000/socket";

// Create an HTTP link to the Phoenix app's HTTP endpoint URL.
const httpLink = createHttpLink({
  uri: HTTP_ENDPOINT
});

// Create a WebSocket link to the Phoenix app's socket URL.
const socketLink = createAbsintheSocketLink(
  AbsintheSocket.create(new PhoenixSocket(WS_ENDPOINT))
);

// If an authentication token exists in local storage, put
// the token in the "Authorization" request header.
// Returns an object to set the context of the GraphQL request.

async function getUserToken() {
  const userToken = await SecureStore.getItemAsync("userToken");
  return userToken;
}

const authLink = setContext(async (_, { headers }) => {
  // TODO: Delete usertoken to work on login process.
  //  SecureStore.deleteItemAsync("userToken");
  const token = await getUserToken();
  const result = {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  };
  return result;
});

// Create a link that "splits" requests based on GraphQL operation type.
// Queries and mutations go through the HTTP link.
// Subscriptions go through the WebSocket link.

const link = new ApolloLink.split(
  operation => hasSubscription(operation.query),
  socketLink,
  authLink.concat(httpLink)
);

// Create the Apollo Client instance.
const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache()
});

export default client;
