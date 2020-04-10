import React from "react"
import Table from "react-bootstrap/Table"

function RepoTable(props) {
  const { repos = [] } = props
  return (
    <Table data-testid="repo-table" striped bordered hover>
      <thead>
        <tr>
          <th>Owner</th>
          <th>Name</th>
          <th>Stars</th>
        </tr>
      </thead>
      <tbody>
        {repos.map((x) => {
          const { id, name, owner, stargazers } = x
          const { login: repoOwner } = owner
          const { totalCount: starCount } = stargazers
          return (
            <tr key={id}>
              <td>{repoOwner}</td>
              <td>{name}</td>
              <td>{starCount}</td>
            </tr>
          )
        })}
      </tbody>
    </Table>
  )
}

export default RepoTable
