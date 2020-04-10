import gql from "graphql-tag"

// https://developer.github.com/v4/explorer/
export const REPOSITORIES_CONTRIBUTED_TO_QUERY = gql`
  query RepositoriesContributedTo($username: String!) {
    user(login: $username) {
      repositoriesContributedTo(first: 50, privacy: PUBLIC) {
        totalCount
        nodes {
          id
          owner {
            id
            login
          }
          name
          description
          stargazers {
            totalCount
          }
        }
      }
    }
  }
`
