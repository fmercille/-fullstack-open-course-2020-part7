import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import Notification from './components/Notification'
import NewBlogFormContainer from './components/NewBlogFormContainer'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import UserList from './components/UserList'
import UserDetail from './components/UserDetail'
import Menu from './components/Menu'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/usersReducer'
import { setNotification } from './reducers/notificationReducer'
import { login } from './reducers/userReducer'
import { Container } from '@material-ui/core'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const notificationMessage = useSelector(state => state.notification)
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  const displayNotification = (message) => {
    dispatch(setNotification('success', message, 5))
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

  const userMatch = useRouteMatch('/users/:id')
  const userDetail = userMatch
    ? users.find(user => user.id === userMatch.params.id)
    : null

  const blogMatch = useRouteMatch('/blogs/:id')
  const blogDetail = blogMatch
    ? blogs.find(blog => blog.id === blogMatch.params.id)
    : null

  if (user === null) {
    return (
      <Container>
        <Notification message={notificationMessage.message} messageType={notificationMessage.type} />
        <LoginForm handleLogin={handleLogin} />
      </Container>
    )
  } else {
    return (
      <Container>
        <Menu />
        <Notification message={notificationMessage.message} messageType={notificationMessage.type} />

        <Switch>
          <Route path="/blogs/:id">
            <Blog blog={blogDetail} />
          </Route>
          <Route path="/blogs">
            <BlogList blogs={blogs} />
            <NewBlogFormContainer />
          </Route>
          <Route path="/users/:id">
            <UserDetail user={userDetail} />
          </Route>
          <Route path="/users">
            <UserList blogs={blogs} />
          </Route>
          <Route path="/">
            <BlogList blogs={blogs} />
            <NewBlogFormContainer />
          </Route>
        </Switch>
      </Container>
    )
  }
}

export default App