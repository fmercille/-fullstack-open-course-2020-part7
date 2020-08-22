import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { like, deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'


const Blog = ({ blog }) => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  if (!blog) {
    return null
  }

  if (!blog.comments) {
    blog.comments = []
  }

  const deleteButtonStyle = {
    display: ((user && blog.user.username === user.username) ? '' : 'none')
  }

  const handleLike = (event) => {
    event.preventDefault()
    try {
      dispatch(like(blog))
    } catch (error) {
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
      if (error.response.data.error) {
        dispatch(setNotification('error', error.response.data.error))
      } else {
        dispatch(setNotification('error', 'An error occured'))
      }
    }
  }

  return (
    <div className="blog">
      <h1>
        {blog.title} {blog.author}
      </h1>
      <div>
        <a href={blog.url}>
          {blog.url}
        </a>
      </div>
      <div className="blogLikes">
        Likes {blog.likes} <button onClick={handleLike} className="likeButton">like</button>
      </div>
      <div>
        added by {blog.user.name}
      </div>
      <div style={deleteButtonStyle} className="deleteButton">
        <button onClick={handleDelete}>remove</button>
      </div>
      <div>
        <ul>
          {blog.comments.map(comment => <li key={Math.floor(Math.random() * 1000000)}>{comment}</li>)}
        </ul>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object,
}

export default Blog
