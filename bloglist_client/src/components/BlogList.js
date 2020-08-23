import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Typography
} from '@material-ui/core'

const BlogList = ({ blogs }) => {
  return (
    <div>
      <Typography variant="h3">
        Blogs
      </Typography>

      <TableContainer component={Paper}>
        <Table className="blogList">
          <TableBody>
            {blogs.map(blog => (
              <TableRow key={blog.id}>
                <TableCell>
                  <Link to={`/blogs/${blog.id}`}>
                    {blog.title}
                  </Link>
                </TableCell>
                <TableCell>
                  {blog.author}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

BlogList.propTypes = {
  blogs: PropTypes.array.isRequired
}

export default BlogList
