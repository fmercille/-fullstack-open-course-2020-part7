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
      notification: 'This is a test'
    }
    deepFreeze(state)
    const newState = notificationReducer(state, action)
    expect(newState).toBe('This is a test')
  })

  test('clears the notification correctly', () => {
    const notification = 'Previous notification'
    const actionSet = {
      type: 'NOTIFICATION.SET',
      notification: notification
    }
    const actionClear = { type: 'NOTIFICATION.CLEAR' }
    const newState = notificationReducer(null, actionSet)
    expect(newState).toBe(notification)
    const clearState = notificationReducer(newState, actionClear)
    expect(clearState).toBe(null)
  })
})