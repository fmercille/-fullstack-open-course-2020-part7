import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

const UserList = () => {
  const users = useSelector(state => state.users)
  const blogs = useSelector(state => state.blogs)

  return (
    <div>
      <h2>Users</h2>
      <table id="userTable">
        <thead>
          <td></td>
          <td>blogs created</td>
        </thead>
        <tbody>
          {users.map(user =>
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{blogs.reduce((n, blog) => blog.user.username === user.username ? n+1 : n, 0)}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

UserList.propTypes = {
  users: PropTypes.array.isRequired
}

export default UserList
