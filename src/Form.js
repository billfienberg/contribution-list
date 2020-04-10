import React from "react"

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
        <button type="submit" disabled={isDisabled}>
          Fetch Contributions
        </button>
      </div>
    </form>
  )
}

export default Form
