import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Notification from './components/Notification'
import NewBlogFormContainer from './components/NewBlogFormContainer'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import { initializeBlogs } from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'
import { login, logout } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const notificationMessage = useSelector((state) => state.notification)
  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const displayNotification = (message) => {
    dispatch(setNotification('notice', message, 5))
  }

  const displayError = (message) => {
    dispatch(setNotification('error', message, 5))
  }

  const handleLogin = ({ username, password }) => {
    dispatch(login(username, password))
      .then(() => {
        displayNotification('Login successful')
      })
      .catch(() => {
        displayError('Wrong credentials')
      })
  }

  const handleLogout = async () => {
    dispatch(logout())
    displayNotification('Logout successful')
  }

  if (user === null) {
    return (
      <>
        <Notification message={notificationMessage.message} messageType={notificationMessage.type} />
        <LoginForm handleLogin={handleLogin} />
      </>
    )
  } else {
    blogs.sort((a, b) => a.likes > b.likes ? -1 : (a.likes < b.likes ? 1 : 0))
    return (
      <>
        <Notification message={notificationMessage.message} messageType={notificationMessage.type} />
        <div>
          {user.name} is logged in <button id="logout" onClick={handleLogout}>Logout</button>
        </div>

        <BlogList blogs={blogs} />
        <NewBlogFormContainer />
      </>
    )
  }
}

export default App