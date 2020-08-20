import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const UserList = () => {
  const users = useSelector(state => state.users)
  const blogs = useSelector(state => state.blogs)

  return (
    <div>
      <h2>Users</h2>
      <table id="userTable">
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user =>
            <tr key={user.id} id={`userRow_${user.username}`}>
              <td>
                <Link to={`/users/${user.id}`} >
                  {user.name}
                </Link>
              </td>
              <td>{blogs.reduce((n, blog) => blog.user.username === user.username ? n+1 : n, 0)}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default UserList
