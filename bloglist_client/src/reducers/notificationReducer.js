const initialState = {
  notification: null,
  type: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case 'NOTIFICATION.SET':
    return {
      message: action.notification,
      type: action.messageType
    }
  case 'NOTIFICATION.CLEAR':
    return initialState
  default:
    return state
  }
}

let timeoutId = null

const setNotification = (messageType, message, duration = 5) => {
  return async dispatch => {
    dispatch({
      type: 'NOTIFICATION.SET',
      notification: message,
      messageType
    })

    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => dispatch(clearNotification()), duration * 1000)
  }
}

const clearNotification = () => {
  return {
    type: 'NOTIFICATION.CLEAR'
  }
}

export default reducer

export {
  setNotification,
  clearNotification
}