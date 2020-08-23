import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { like, deleteBlog, addComment } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { makeStyles } from '@material-ui/core/styles'
import {
  Button,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}))

const Blog = ({ blog }) => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const classes = useStyles()

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

  const handleNewComment = (event) => {
    event.preventDefault()
    try {
      dispatch(addComment(blog.id, event.target.comment.value))
      event.target.comment.value = ''
    } catch (error) {
      if (error.response.data.error) {
        dispatch(setNotification('error', error.response.data.error))
      } else {
        dispatch(setNotification('error', 'An error occured'))
      }
    }
  }

  return (
    <Typography>
      <div className="blog">
        <Typography variant="h3">
          {blog.title} {blog.author}
        </Typography>
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
        <h2>comments</h2>
        <div>
          <form onSubmit={handleNewComment}>
            <TextField label="Comment" name="comment" />
            <Button variant="contained" color="primary" type="submit">Add comment</Button>
          </form>
        </div>
        <div>
          <List className={classes.root}>
            {blog.comments.map(comment => (
              <ListItem key={Math.floor(Math.random() * 1000000)} dense>
                <ListItemText primary={comment} />
              </ListItem>
            ))}
          </List>

        </div>
      </div>
    </Typography>
  )
}

Blog.propTypes = {
  blog: PropTypes.object,
}

export default Blog
