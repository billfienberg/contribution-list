import React from "react"
import { waitForElementToBeRemoved } from "@testing-library/dom"
import { render, fireEvent } from "@testing-library/react"
import mockData from "./mockData"
import App from "./App"
import { MockedProvider } from "@apollo/react-testing"
import { ApolloConsumer } from "react-apollo"
import { REPOSITORIES_CONTRIBUTED_TO_QUERY } from "./queries"

const username = "billfienberg"
const mocks = [
  {
    request: {
      query: REPOSITORIES_CONTRIBUTED_TO_QUERY,
      variables: { username },
    },
    result: mockData,
  },
]

test("renders the Contributions List app", async () => {
  const { getByRole, getByLabelText, queryByText, getByTestId, queryByTestId } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <ApolloConsumer>{(client) => <App client={client} />}</ApolloConsumer>
    </MockedProvider>,
  )

  // input should be empty
  const usernameInput = getByLabelText(/username/i)
  expect(usernameInput.value).toBe("")

  // button should be disabled because input is empty
  const fetchReposButton = getByRole(/button/i)
  expect(fetchReposButton.disabled).toBe(true)

  // loading should not be rendered because no request is in progress
  expect(queryByText(/loading/i)).not.toBeInTheDocument()

  // repo table should not be rendered because no repos have been returned from the API
  expect(queryByTestId(/repo-table/i)).not.toBeInTheDocument()

  // type username into input
  fireEvent.change(usernameInput, { target: { value: username } })

  // button should not be disabled because input is not empty
  expect(fetchReposButton.disabled).toBe(false)

  // call API
  fireEvent.click(fetchReposButton)

  // loading should be rendered because request is in progress
  expect(queryByText(/loading/i)).toBeInTheDocument()

  // wait for request to finish
  await waitForElementToBeRemoved(() => queryByText(/loading/i))

  // loading should not be rendered because request is done
  expect(queryByText(/loading/i)).not.toBeInTheDocument()

  // input should be reset
  expect(usernameInput.value).toBe("")

  // repo table should be rendered because repos have been returned from the API
  expect(getByTestId(/repo-table/i)).toBeInTheDocument()
})
