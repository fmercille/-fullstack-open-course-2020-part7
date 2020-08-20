import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

const UserDetail = (user) => {
  const blogs = useSelector(state => state.blogs)
  if (!user || !(user.user)) {
    return null
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <h2>added blogs</h2>
      <ul>
        {blogs
          .filter(blog => blog.user.id === user.user.id)
          .map(blog =>
            <li key={blog.id}>{blog.title}</li>
          )}
      </ul>
    </div>
  )
}

UserDetail.propTypes = {
  user: PropTypes.object
}

export default UserDetail
