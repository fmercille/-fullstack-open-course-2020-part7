import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'

const Menu = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const navStyle = {
    display: 'block',
    backgroundColor: '#BBBBBB',
    padding: '1px'
  }

  const menuStyle = {
    paddingInlineStart: '0px'
  }

  const menuItemStyle = {
    display: 'inline',
    paddingLeft: '10px'
  }

  const handleLogout = async () => {
    dispatch(logout())
    dispatch(setNotification('notice', 'Logout successful', 5))
  }

  const loggedInUser = user
    ? <li style={menuItemStyle}>{user.name} is logged in <button id="logout" onClick={handleLogout}>Logout</button></li>
    : <></>

  return (
    <nav style={navStyle}>
      <ul style={menuStyle}>
        <li style={menuItemStyle}>
          <Link to='/blogs'>blogs</Link>
        </li>
        <li style={menuItemStyle}>
          <Link to='/users'>users</Link>
        </li>
        {loggedInUser}
      </ul>
    </nav>
  )
}

export default Menu
