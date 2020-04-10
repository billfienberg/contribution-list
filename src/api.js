import { REPOSITORIES_CONTRIBUTED_TO_QUERY } from "./queries"

export function fetchReposContributedToByUser(username) {
  const variables = { username }
  const token = process.env.REACT_APP_ACCESS_TOKEN
  const body = JSON.stringify({
    query: REPOSITORIES_CONTRIBUTED_TO_QUERY,
    variables,
  })

  // Querying data using `fetch`
  // https://www.prisma.io/tutorials/build-react-graphql-app-with-fetch-ct19/#querying-data-using-fetch
  return fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: token ? `Bearer ${token}` : "" },
    body,
  })
}
