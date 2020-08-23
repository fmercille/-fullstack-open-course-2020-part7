import React from 'react'
import PropTypes from 'prop-types'
import { Alert } from '@material-ui/lab'

const Notification = ({ message, messageType }) => {
  if (message === null || !['error', 'info', 'success', 'warning'].includes(messageType)) {
    return null
  } else {
    return (
      <Alert severity={messageType} className="notification">
        {message}
      </Alert>
    )
  }
}

Notification.propTypes = {
  message: PropTypes.string,
  messageType: PropTypes.string.isRequired,
}

export default Notification