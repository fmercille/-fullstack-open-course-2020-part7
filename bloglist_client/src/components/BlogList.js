import React from 'react'
import PropTypes from 'prop-types'
import Blog from './Blog'


const BlogList = ({ blogs }) => {
  return (
    <div>
      <h2>blogs</h2>
      <div className="blogList">
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    </div>
  )
}

BlogList.propTypes = {
  blogs: PropTypes.array.isRequired
}

export default BlogList
