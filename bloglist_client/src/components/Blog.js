import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { like, deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'


const Blog = ({ blog }) => {
  const [expanded, setExpanded] = useState(false)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const deleteButtonStyle = {
    display: (blog.user.username === user.username ? '' : 'none')
  }

  const handleLike = (event) => {
    event.preventDefault()
    try {
      dispatch(like(blog))
    } catch (error) {
      console.log(error.response)
      if (error.response.data.error) {
        dispatch(setNotification('error', error.response.data.error))
      } else {
        dispatch(setNotification('error', 'An error occured'))
      }
    }
  }

  const handleDelete = (event) => {
    event.preventDefault()
    try {
      dispatch(deleteBlog(blog))
    } catch (error) {
      console.log(error)
      if (error.response.data.error) {
        dispatch(setNotification('error', error.response.data.error))
      } else {
        dispatch(setNotification('error', 'An error occured'))
      }
    }
  }

  let expandedInfo = ''
  if (expanded) {
    expandedInfo = (
      <>
        <div>
          {blog.url}
        </div>
        <div className="blogLikes">
          Likes {blog.likes} <button onClick={handleLike} className="likeButton">like</button>
        </div>
        <div>
          {blog.user.name}
        </div>
        <div style={deleteButtonStyle} className="deleteButton">
          <button onClick={handleDelete}>remove</button>
        </div>
      </>
    )
  }

  return (
    <div style={blogStyle} className="blog">
      {blog.title} {blog.author} <button className="showButton" onClick={() => setExpanded(!expanded)}>{expanded ? 'Hide' : 'Show'}</button>
      {expandedInfo}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog
