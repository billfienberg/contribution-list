import React from "react"
import { fetchReposContributedToByUser } from "./api"
import Intro from "./Intro"
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
        <form onSubmit={onSubmit}>
          <div>
            <label>
              Username:
              <input type="text" name="username" placeholder="billfienberg" onChange={onChange} value={username} />
            </label>
          </div>
          <div>
            <button type="submit" disabled={isDisabled}>
              Fetch Contributions
            </button>
          </div>
        </form>
        <h2>Repos</h2>
        {isLoading && <p>Loading...</p>}
        {!!repos.length && <RepoTable repos={repos} />}
      </div>
    )
  }
}

export default App
