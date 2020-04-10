import React from "react"
import { fetchReposContributedToByUser } from "./api"
import Intro from "./Intro"
import Form from "./Form"
import RepoTable from "./RepoTable"

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      repos: [],
      isLoading: false,
    }
  }

  onChange = (event) => {
    this.setState({ username: event.target.value })
  }

  onSubmit = async (event) => {
    event.preventDefault()
    this.setState({ isLoading: true })
    const { state } = this
    const { username } = state
    const response = await fetchReposContributedToByUser(username)
    const result = await response.json()
    const { nodes } = result.data.user.repositoriesContributedTo
    this.setState({ repos: nodes, isLoading: false, username: "" })
  }

  render() {
    const { onChange, onSubmit, state } = this
    const { isLoading, repos = [], username } = state
    const isDisabled = !username || isLoading

    return (
      <div className="App">
        <Intro />
        <Form onSubmit={onSubmit} isDisabled={isDisabled} onChange={onChange} username={username} />
        <h2>Repos</h2>
        {isLoading && <p>Loading...</p>}
        {!!repos.length && <RepoTable repos={repos} />}
      </div>
    )
  }
}

export default App
