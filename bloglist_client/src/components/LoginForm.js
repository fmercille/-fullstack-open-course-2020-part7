import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  TextField
} from '@material-ui/core'

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    handleLogin({ username, password })
  }

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <TextField label="username" id="username" value={username} name="username" onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
          <TextField label="password" id="password" type="password" value={password} name="password" onChange={({ target }) => setPassword(target.value)} />
        </div>
        <Button id="loginButton" variant="contained" color="primary" type="submit">
          Login
        </Button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
}

export default LoginForm