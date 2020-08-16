import deepFreeze from 'deep-freeze'
import notificationReducer from './notificationReducer'

describe('notification reducer', () => {
  const initialState = null

  test('invalid action does nothing', () => {
    const action = {
      type: 'INVALID'
    }

    const newState = notificationReducer(initialState, action)
    expect(newState).toBe(initialState)
  })

  test('setting notification returns proper state', () => {
    const state = 'Previous notification'
    const action = {
      type: 'NOTIFICATION.SET',
      notification: 'This is a test',
      messageType: 'notice'
    }
    deepFreeze(state)
    const newState = notificationReducer(state, action)
    expect(newState).toEqual(
      {
        message: 'This is a test',
        type: 'notice'
      }
    )
  })

  test('clears the notification correctly', () => {
    const notification = {
      message: 'Previous notification',
      type: 'notice'
    }
    const actionSet = {
      type: 'NOTIFICATION.SET',
      notification: notification.message,
      messageType: 'notice'
    }
    const actionClear = { type: 'NOTIFICATION.CLEAR' }
    const newState = notificationReducer(null, actionSet)
    expect(newState).toEqual(notification)
    const clearState = notificationReducer(newState, actionClear)
    expect(clearState.notification).toBe(null)
  })
})