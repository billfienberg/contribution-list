import React from "react"
import { waitForElementToBeRemoved } from "@testing-library/dom"
import { render, fireEvent } from "@testing-library/react"
import { fetchReposContributedToByUser as mockFetchReposContributedToByUser } from "./api"
import mockData from "./mockData"
import App from "./App"

jest.mock("./api")

test("renders the Contributions List app", async () => {
  mockFetchReposContributedToByUser.mockResolvedValueOnce({ json: () => mockData })
  const { getByRole, getByLabelText, queryByText, getByTestId, queryByTestId } = render(<App />)

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
  const username = "billfienberg"
  fireEvent.change(usernameInput, { target: { value: username } })

  // button should not be disabled because input is not empty
  expect(fetchReposButton.disabled).toBe(false)

  // API request should not have been called yet
  expect(mockFetchReposContributedToByUser).toHaveBeenCalledTimes(0)

  // call API
  fireEvent.click(fetchReposButton)

  // API request should not have been called once
  expect(mockFetchReposContributedToByUser).toHaveBeenCalledTimes(1)

  // API should have been called with username that was typed into input
  expect(mockFetchReposContributedToByUser).toHaveBeenCalledWith(username)

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
