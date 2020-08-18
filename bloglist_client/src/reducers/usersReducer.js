import userService from '../services/users'

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'USERS.INIT':
    return action.data
  default:
    return state
  }
}

const initializeUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch({
      type: 'USERS.INIT',
      data: users
    })
  }
}

export default reducer

export {
  initializeUsers
}