import loginService from '../services/login'
import blogService from '../services/blogs'

let initialState = null
const storedUser = JSON.parse(window.localStorage.getItem('user'))

if (storedUser) {
  initialState = storedUser
  blogService.setToken(storedUser.token)
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case 'USER.LOGIN':
    return action.user
  case 'USER.LOGOUT':
    return null
  default:
    return state
  }
}

const login = (username, password) => {
  return async dispatch => {
    const user = await loginService.login({ username, password })
    blogService.setToken(user.token)
    window.localStorage.setItem('user', JSON.stringify(user))
    dispatch({
      type: 'USER.LOGIN',
      user
    })
  }
}

const logout = () => {
  console.log('logout')
  window.localStorage.clear()
  blogService.setToken(null)

  return async dispatch => {
    dispatch({ type: 'USER.LOGOUT' })
  }
}

export default reducer

export {
  login,
  logout
}