import React, { useState } from "react"
import Intro from "./Intro"
import Form from "./Form"
import RepoTable from "./RepoTable"
import { REPOSITORIES_CONTRIBUTED_TO_QUERY } from "./queries"

function App(props) {
  const [username, setUsername] = useState("")
  const [repos, setRepos] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const { client } = props
  const isDisabled = !username || isLoading

  async function onSubmit(event) {
    event.preventDefault()
    setIsLoading(true)

    const result = await client.query({
      query: REPOSITORIES_CONTRIBUTED_TO_QUERY,
      variables: { username },
    })
    const { nodes } = result.data.user.repositoriesContributedTo

    setRepos(nodes)
    setIsLoading(false)
    setUsername("")
  }

  function onChange(event) {
    setUsername(event.target.value)
  }

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

export default App
