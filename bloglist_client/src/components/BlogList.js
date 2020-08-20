import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'


const BlogList = ({ blogs }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    display: 'block'
  }

  return (
    <div>
      <h2>blogs</h2>
      <div className="blogList">
        {blogs.map(blog =>
          <div key={blog.id} style={blogStyle}>
            <Link to={`/blogs/${blog.id}`}>
              {blog.title}
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

BlogList.propTypes = {
  blogs: PropTypes.array.isRequired
}

export default BlogList
