import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Typography
} from '@material-ui/core'

const UserList = () => {
  const users = useSelector(state => state.users)
  const blogs = useSelector(state => state.blogs)

  return (
    <div>
      <Typography variant="h3">
        Users
      </Typography>
      <TableContainer component={Paper}>
        <Table id="userTable" size="small">
          <TableHead>
            <TableRow>
              <TableCell>
              User
              </TableCell>
              <TableCell>
              Blogs created
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow id={`userRow_${user.username}`} key={user.id}>
                <TableCell>
                  <Link to={`/users/${user.id}`} >
                    {user.name}
                  </Link>
                </TableCell>
                <TableCell>
                  {blogs.reduce((n, blog) => blog.user.username === user.username ? n + 1 : n, 0)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default UserList
