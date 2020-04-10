import React from "react"
import Button from "react-bootstrap/Button"

function Form(props) {
  const { onSubmit, isDisabled, onChange, username } = props
  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>
          Username:
          <input type="text" name="username" placeholder="billfienberg" onChange={onChange} value={username} />
        </label>
      </div>
      <div>
        <Button type="submit" disabled={isDisabled} variant="primary">
          Fetch Contributions
        </Button>
      </div>
    </form>
  )
}

export default Form
