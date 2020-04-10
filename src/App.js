import React from "react"
import Intro from "./Intro"
import Form from "./Form"
import RepoTable from "./RepoTable"
import { REPOSITORIES_CONTRIBUTED_TO_QUERY } from "./queries"

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
    const { props, state } = this
    const { client } = props
    const { username } = state
    const result = await client.query({
      query: REPOSITORIES_CONTRIBUTED_TO_QUERY,
      variables: { username },
    })
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
