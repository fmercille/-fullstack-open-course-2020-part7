import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'
import {
  AppBar,
  Toolbar,
  IconButton,
  Button
} from '@material-ui/core'

const Menu = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const handleLogout = async (event) => {
    event.preventDefault()
    dispatch(logout())
    dispatch(setNotification('success', 'Logout successful', 5))
  }

  const loggedInUser = user
    ? <>{user.name} is logged in <Button id="logout" color="inherit" component={Link} to="#" onClick={handleLogout}>Logout</Button></>
    : <></>

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
        </IconButton>
        <Button color="inherit" component={Link} to="/blogs">
          blogs
        </Button>
        <Button color="inherit" component={Link} to="/users">
          users
        </Button>
        {loggedInUser}
      </Toolbar>
    </AppBar>
  )
}

export default Menu
