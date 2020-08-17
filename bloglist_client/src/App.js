import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Notification from './components/Notification'
import NewBlogForm from './components/NewBlogForm'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import { initializeBlogs, createBlog } from './reducers/blogReducer'
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

  const [newBlogFormVisible, setNewBlogFormVisible] = useState(false)

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

  const handleCreateBlog = async (blogObject) => {
    console.log('handleCreateBlog')
    try {
      dispatch(createBlog(blogObject))
      displayNotification('Blog added')
    } catch (error) {
      console.log(error.response)
      if (error.response.data.error) {
        displayError(error.response.data.error)
      } else {
        displayError('An error occured')
      }
    }
  }

  const hideWhenVisible = { display: newBlogFormVisible ? 'none' : '' }
  const showWhenVisible = { display: newBlogFormVisible ? '' : 'none' }

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
        <div style={hideWhenVisible}>
          <button id="newBlogButton" onClick={() => setNewBlogFormVisible(true)}>New blog</button>
        </div>

        <div style={showWhenVisible}>
          <h2>Create new blog</h2>
          <NewBlogForm
            createBlog={handleCreateBlog}
          />
          <button onClick={() => setNewBlogFormVisible(false)}>Cancel</button>
        </div>
      </>
    )
  }
}

export default App